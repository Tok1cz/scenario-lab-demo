import { useTranslation } from "react-i18next";
import { Layout, Typography, Card } from "antd";
import type { components } from "../api/generated";
import { spacing, fontSize } from "../lib/theme/designTokens";
import {
  getStatusConfig,
  getRiskZonePosition,
} from "../lib/utils/resultsHelpers.tsx";
import {
  SectionHeader,
  RiskStatusCard,
  RiskZonesBar,
  TimeToEventCard,
  TimelineVisualization,
  FailureLadder,
} from "../components/features/results";
import styles from "./ResultsPage.module.css";

const { Content } = Layout;
const { Text } = Typography;

type HiringSimResponse = components["schemas"]["HiringSimResponse"];

// Mock data for development
const mockData: HiringSimResponse = {
  status: "risky",
  time_to_layoff_zone_months: 4,
  time_to_payroll_breach_months: 6,
  horizon_months: 6,
  earliest_event: {
    type: "layoff_zone",
    month: 4,
  },
  breakpoints: ["utilization_drops", "bench_builds", "layoff_zone"],
  what_breaks_first: "layoff_zone",
  suggested_action:
    "Delay start by 1-2 months OR secure coverage to keep utilization above the breakpoint.",
  assumptions_used: {
    cash_buffer_months: 4,
    hire_cost_monthly: 8000,
    utilization_downside: 70,
  },
};

export default function ResultsPage() {
  const { t } = useTranslation("results");
  const data = mockData;

  const statusConfig = getStatusConfig(data.status);
  const riskPosition = getRiskZonePosition(
    data.time_to_layoff_zone_months,
    data.time_to_payroll_breach_months
  );

  const failureStages = [
    {
      key: "healthy",
      title: t("failureLadder.stages.healthy"),
      status: "healthy",
    },
    {
      key: "drops",
      title: t("failureLadder.stages.drops"),
      status: data.breakpoints?.includes("utilization_drops")
        ? "failed"
        : "pending",
    },
    {
      key: "bench",
      title: t("failureLadder.stages.bench"),
      status: data.breakpoints?.includes("bench_builds") ? "failed" : "pending",
    },
    {
      key: "layoff",
      title: t("failureLadder.stages.layoff"),
      status: data.breakpoints?.includes("layoff_zone") ? "failed" : "pending",
    },
    {
      key: "breach",
      title: t("failureLadder.stages.breach"),
      status: data.breakpoints?.includes("payroll_breach")
        ? "failed"
        : "pending",
    },
  ];

  const getStatusDescription = () => {
    if (
      data.status === "risky" &&
      data.earliest_event?.type === "layoff_zone"
    ) {
      return `A moderate downside pushes you into the layoff zone within ${data.earliest_event.month} months.`;
    }
    return statusConfig.description;
  };

  const getTimelineTitle = () => {
    if (data.earliest_event) {
      const eventType =
        data.earliest_event.type === "layoff_zone"
          ? "Layoff zone"
          : "Payroll breach";
      return `Earliest event: ${eventType} in Month ${data.earliest_event.month}`;
    }
    return t("timeline.noEvents", { months: data.horizon_months || 6 });
  };

  const getLayoffSubtitle = () => {
    return data.time_to_layoff_zone_months
      ? "- runway < 3 months OR bench > 25% for 2 months"
      : "- not reached within horizon";
  };

  return (
    <Layout style={{ minHeight: "100vh", background: "#fafafa" }}>
      <Content
        style={{
          padding: `${spacing.xxl}px ${spacing.lg}px`,
          maxWidth: 1400,
          margin: "0 auto",
          width: "100%",
        }}
      >
        {/* Header */}
        <div style={{ marginBottom: spacing.lg }}>
          <Text type="secondary" style={{ fontSize: fontSize.md }}>
            {t("header")}
          </Text>
        </div>

        {/* Risk Status + Risk Zones Grid */}
        <div className={styles.mainGrid}>
          <div className={styles.leftColumn}>
            <SectionHeader>{t("title")}</SectionHeader>
            <RiskStatusCard
              config={statusConfig}
              description={getStatusDescription()}
            />
          </div>

          <div className={styles.rightColumn}>
            <SectionHeader>{t("riskZones")}</SectionHeader>
            <RiskZonesBar position={riskPosition} />
          </div>
        </div>

        {/* Timeline Section - Full Width */}
        <div style={{ marginTop: spacing.xxl }}>
          <SectionHeader>{t("timeline.title")}</SectionHeader>
          <Typography.Title
            level={3}
            style={{ marginBottom: spacing.md, fontStyle: "italic" }}
          >
            {getTimelineTitle()}
          </Typography.Title>

          {/* Time to Event Cards */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: spacing.md,
              marginBottom: spacing.xl,
            }}
          >
            <TimeToEventCard
              label={t("timeline.layoffZone")}
              months={data.time_to_layoff_zone_months}
              subtitle={getLayoffSubtitle()}
            />
            <TimeToEventCard
              label={t("timeline.payrollBreach")}
              months={data.time_to_payroll_breach_months}
              subtitle="- cash < 1 month payroll"
            />
          </div>

          {/* Timeline Visualization */}
          <TimelineVisualization
            layoffMonth={data.time_to_layoff_zone_months}
            payrollMonth={data.time_to_payroll_breach_months}
            horizonMonths={data.horizon_months || 6}
          />

          <Text
            type="secondary"
            style={{
              fontSize: fontSize.sm,
              display: "block",
              marginTop: spacing.md,
            }}
          >
            Note: This is a stress test outcome over a 6-month horizon - not a
            point forecast.
          </Text>
        </div>

        {/* Failure Ladder - Full Width */}
        <div style={{ marginTop: spacing.xxl }}>
          <SectionHeader>{t("failureLadder.title")}</SectionHeader>
          <FailureLadder
            stages={failureStages}
            currentStageKey={data.what_breaks_first}
            suggestedAction={data.suggested_action}
          />
        </div>

        {/* Footer */}
        <div style={{ marginTop: spacing.xl }}>
          <Card style={{ background: "#f0f5ff", borderColor: "#adc6ff" }}>
            <Text type="secondary" style={{ fontSize: fontSize.sm }}>
              {t("demoNote")}
            </Text>
          </Card>

          <Text
            type="secondary"
            style={{
              fontSize: fontSize.sm,
              display: "block",
              textAlign: "center",
              marginTop: spacing.md,
            }}
          >
            {t("disclaimer")}
          </Text>
        </div>
      </Content>
    </Layout>
  );
}
