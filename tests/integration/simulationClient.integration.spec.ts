import { describe, it, expect } from "vitest";
import {
  mapFormToRequest,
  runSimulation,
} from "../../src/lib/api/simulationClient";

describe("Simulation Client Integration", () => {
  it("processes safe scenario correctly", async () => {
    const form = {
      hireType: "technical",
      cashBuffer: "6+",
      teamSize: "10",
      utilization: "full",
      hireCost: "6-8",
      startTiming: "immediate",
      billability: "high",
      utilizationDownside: "slight",
      paymentRisk: "low",
    };

    const request = mapFormToRequest(form);
    const response = await runSimulation(request);

    expect(response.status).toBe("safe");
    expect(response.time_to_layoff_zone_months).toBeNull();
    expect(response.horizon_months).toBe(6);
    expect(response.suggested_action).toContain("supports this hire");
  });

  it("processes risky scenario correctly", async () => {
    const form = {
      hireType: "technical",
      cashBuffer: "1-3",
      teamSize: "10",
      utilization: "bench",
      hireCost: "8+",
      startTiming: "immediate",
      billability: "medium",
      utilizationDownside: "moderate",
      paymentRisk: "medium",
    };

    const request = mapFormToRequest(form);
    const response = await runSimulation(request);

    expect(response.status).toBe("risky");
    expect(response.time_to_layoff_zone_months).toBeTruthy();
    expect(response.breakpoints).toContain("utilization_drops");
  });

  it("processes dangerous scenario correctly", async () => {
    const form = {
      hireType: "technical",
      cashBuffer: "under1",
      teamSize: "5",
      utilization: "bench",
      hireCost: "8+",
      startTiming: "immediate",
      billability: "low",
      utilizationDownside: "severe",
      paymentRisk: "high",
    };

    const request = mapFormToRequest(form);
    const response = await runSimulation(request);

    expect(response.status).toBe("dangerous");
    expect(response.time_to_payroll_breach_months).toBeTruthy();
    expect(response.breakpoints).toContain("payroll_breach");
    expect(response.suggested_action).toContain("Strongly consider delaying");
  });

  it("maps form values to request correctly", () => {
    const form = {
      hireType: "technical",
      cashBuffer: "3-6",
      teamSize: "15",
      utilization: "stretched",
      hireCost: "6-8",
      startTiming: "immediate",
      billability: "high",
      utilizationDownside: "moderate",
      paymentRisk: "low",
    };

    const request = mapFormToRequest(form);

    expect(request.current_monthly_payroll_eur).toBe(75000);
    expect(request.cash_balance_eur).toBe(300000);
    expect(request.utilization_pct).toBe(70);
    expect(request.new_hire_gross_annual_eur).toBe(84000);
    expect(request.dso_days).toBe(30);
  });
});
