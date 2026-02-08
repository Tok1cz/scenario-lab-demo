import type { components } from "../../api-schema/generated";

type HiringSimRequest = components["schemas"]["HiringSimRequest"];
type HiringSimResponse = components["schemas"]["HiringSimResponse"];

/**
 * Maps the user-friendly form values to API request parameters.
 */
export function mapFormToRequest(form: {
  hireType: string;
  cashBuffer: string;
  teamSize: string;
  utilization: string;
  hireCost: string;
  startTiming: string;
  billability: string;
  utilizationDownside: string;
  paymentRisk: string;
}): HiringSimRequest {
  const cashBufferMap: Record<string, number> = {
    under1: 0.5,
    "1-3": 2,
    "3-6": 4,
    "6+": 7,
  };
  const bufferMonths = cashBufferMap[form.cashBuffer] ?? 4;

  const teamSize = parseInt(form.teamSize, 10) || 10;
  const monthlyPayroll = teamSize * 5000;
  const cashBalance = bufferMonths * monthlyPayroll;

  const utilizationMap: Record<string, number> = {
    full: 95,
    stretched: 85,
    bench: 70,
  };
  const utilization = utilizationMap[form.utilization] ?? 85;

  const hireCostMap: Record<string, number> = {
    "4-6": 60000,
    "6-8": 84000,
    "8+": 108000,
  };
  const annualSalary = hireCostMap[form.hireCost] ?? 84000;

  const billabilityMap: Record<string, number> = {
    high: 2.5,
    medium: 1.8,
    low: 1.2,
  };
  const revenueMultiplier = billabilityMap[form.billability] ?? 1.8;

  const paymentRiskMap: Record<string, number> = {
    low: 30,
    medium: 60,
    high: 90,
  };
  const dsoDays = paymentRiskMap[form.paymentRisk] ?? 45;

  const scenarioMap: Record<string, string> = {
    slight: "mild_downside",
    moderate: "realistic_downside",
    severe: "realistic_downside",
  };
  const scenarioType =
    scenarioMap[form.utilizationDownside] ?? "realistic_downside";

  const downsideUtilMap: Record<string, number> = {
    slight: 80,
    moderate: 70,
    severe: 60,
  };
  const utilizationDownside = downsideUtilMap[form.utilizationDownside] ?? 70;

  return {
    cash_balance_eur: cashBalance,
    current_monthly_payroll_eur: monthlyPayroll,
    employer_cost_multiplier: 1.3,
    fixed_costs_monthly_eur: Math.round(monthlyPayroll * 0.15),
    baseline_monthly_revenue_eur: Math.round(
      monthlyPayroll * (utilization / 100) * 1.4,
    ),
    utilization_pct: utilizationDownside,
    client_concentration_pct: form.paymentRisk === "high" ? 40 : 25,
    dso_days: dsoDays,
    new_hire_gross_annual_eur: annualSalary,
    new_hire_revenue_multiplier: revenueMultiplier,
    country_code: "DE",
    scenario_type: scenarioType,
  };
}

/**
 * Generates a deterministic mock response based on the inputs.
 * Used when the real API is not available.
 */
function generateMockResponse(request: HiringSimRequest): HiringSimResponse {
  const cashBuffer =
    (request.cash_balance_eur ?? 0) /
    Math.max(request.current_monthly_payroll_eur ?? 1, 1);
  const utilPct = request.utilization_pct ?? 85;
  const hireMonthlyCost = (request.new_hire_gross_annual_eur ?? 84000) / 12;
  const payrollAfterHire =
    (request.current_monthly_payroll_eur ?? 50000) + hireMonthlyCost * 1.3;

  // Risk scoring
  const riskScore =
    (cashBuffer < 2 ? 30 : cashBuffer < 4 ? 15 : 0) +
    (utilPct < 70 ? 30 : utilPct < 80 ? 15 : 0) +
    ((request.dso_days ?? 30) > 60 ? 15 : 0) +
    (hireMonthlyCost > 7000 ? 10 : 0);

  const status =
    riskScore >= 45 ? "dangerous" : riskScore >= 20 ? "risky" : "safe";

  const timeToLayoff = status === "safe" ? null : status === "risky" ? 4 : 2;
  const timeToPayroll =
    status === "safe"
      ? null
      : Math.round((request.cash_balance_eur ?? 0) / payrollAfterHire) || 3;

  const breakpoints: string[] = [];
  if (utilPct < 85) breakpoints.push("utilization_drops");
  if (utilPct < 75) breakpoints.push("bench_builds");
  if (timeToLayoff !== null) breakpoints.push("layoff_zone");
  if (status === "dangerous") breakpoints.push("payroll_breach");

  const earliestEvent =
    timeToLayoff !== null
      ? { type: "layoff_zone", month: timeToLayoff }
      : timeToPayroll !== null && status !== "safe"
        ? { type: "payroll_breach", month: timeToPayroll }
        : null;

  const suggestedActions: Record<string, string> = {
    safe: "Current position supports this hire under tested downside scenarios.",
    risky:
      "Delay start by 1-2 months OR secure project coverage to keep utilization above the breakpoint.",
    dangerous:
      "Strongly consider delaying this hire until cash runway exceeds 4 months or secured revenue increases.",
  };

  return {
    status,
    time_to_layoff_zone_months: timeToLayoff,
    time_to_payroll_breach_months: timeToPayroll,
    horizon_months: 6,
    earliest_event: earliestEvent,
    breakpoints,
    what_breaks_first: breakpoints[breakpoints.length - 1] ?? null,
    suggested_action: suggestedActions[status],
    assumptions_used: {
      cash_buffer_months: Math.round(cashBuffer * 10) / 10,
      hire_cost_monthly: Math.round(hireMonthlyCost),
      utilization_downside: utilPct,
    },
  };
}

const API_BASE = import.meta.env.VITE_API_BASE_URL ?? "";

/**
 * Calls the simulation API. Falls back to mock if the API is unavailable.
 */
export async function runSimulation(
  request: HiringSimRequest,
): Promise<HiringSimResponse> {
  // If no API base is configured, go straight to mock
  if (!API_BASE) {
    // Simulate network delay for realistic UX
    await new Promise((r) => setTimeout(r, 2000));
    return generateMockResponse(request);
  }

  try {
    const res = await fetch(`${API_BASE}/api/v1/simulate/hiring`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(request),
    });

    if (!res.ok) {
      throw new Error(`API responded with ${res.status}`);
    }

    return (await res.json()) as HiringSimResponse;
  } catch (err) {
    console.warn("API unavailable, using mock simulation:", err);
    await new Promise((r) => setTimeout(r, 1500));
    return generateMockResponse(request);
  }
}
