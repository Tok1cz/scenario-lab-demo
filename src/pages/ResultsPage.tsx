import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, Navigate } from "react-router-dom";
import { Layout, Typography, Button, Space, Result } from "antd";
import { EditOutlined, ReloadOutlined, HomeOutlined } from "@ant-design/icons";
import { spacing, fontSize } from "../lib/theme/designTokens";
import { useSimulation } from "../hooks/useSimulation";
import {
  getStatusConfig,
  getRiskZonePosition,
} from "../lib/utils/resultsHelpers";
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

export default function ResultsPage() {
  const { t } = useTranslation("results");
  const navigate = useNavigate();
  const { state, reset, startSimulation } = useSimulation();

  useEffect(() => {
    if (state.status === "loading") {
      navigate("/simulate");
    }
  }, [state.status, navigate]);

  if (state.status === "error") {
    return (
      <Layout style={{ minHeight: "100vh" }}>
        <Content
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Result
            status="error"
            title={t("error.title")}
            subTitle={state.error ?? ""}
            extra={[
              <Button
                key="home"
                onClick={() => {
                  reset();
                  navigate("/");
                }}
              >
                {t("actions.backToHome")}
              </Button>,
              <Button
                key="retry"
                type="primary"
                onClick={() => navigate("/customize")}
              >
                {t("actions.tryAgain")}
              </Button>,
            ]}
          />
        </Content>
      </Layout>
    );
  }

  if (state.status !== "success" || !state.result) {
    return <Navigate to="/" replace />;
  }

  const data = state.result;

  const statusConfig = getStatusConfig(data.status);
  const riskPosition = getRiskZonePosition(
    data.time_to_layoff_zone_months,
    data.time_to_payroll_breach_months,
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

  let statusDescriptionParams: { months?: number } = {};
  if (data.status === "risky" && data.earliest_event?.type === "layoff_zone") {
    statusDescriptionParams = { months: data.earliest_event.month };
  } else if (data.status === "dangerous") {
    statusDescriptionParams = {
      months: data.time_to_payroll_breach_months || 0,
    };
  }

  const statusDescription =
    t(statusConfig.descriptionKey, statusDescriptionParams) ?? "";

  const timelineTitle = data.earliest_event
    ? t("timeline.earliestEvent", {
        event:
          data.earliest_event.type === "layoff_zone"
            ? t("timeline.layoffZoneEvent")
            : t("timeline.payrollBreachEvent"),
        month: data.earliest_event.month,
      })
    : t("timeline.noEvents", { months: data.horizon_months || 6 });

  const layoffSubtitle = data.time_to_layoff_zone_months
    ? t("timeline.layoffSubtitle")
    : t("timeline.layoffNotReached");

  return (
    <Layout style={{ minHeight: "100vh" }}>
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
              description={statusDescription}
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
            {timelineTitle}
          </Typography.Title>

          {/* Time to Event Cards */}
          <div className={styles.eventCardsGrid}>
            <TimeToEventCard
              label={t("timeline.layoffZone")}
              months={data.time_to_layoff_zone_months}
              subtitle={layoffSubtitle}
            />
            <TimeToEventCard
              label={t("timeline.payrollBreach")}
              months={data.time_to_payroll_breach_months}
              subtitle={t("timeline.payrollSubtitle")}
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
            {t("timeline.stressTestNote")}
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

        {/* Action Buttons */}
        <div
          style={{
            marginTop: spacing.xl,
            display: "flex",
            justifyContent: "center",
            gap: spacing.md,
          }}
        >
          <Space size="middle" wrap>
            <Button
              size="large"
              icon={<HomeOutlined />}
              onClick={() => {
                reset();
                navigate("/");
              }}
            >
              {t("actions.startOver")}
            </Button>
            <Button
              size="large"
              icon={<EditOutlined />}
              onClick={() => navigate("/customize")}
            >
              {t("actions.editAnswers")}
            </Button>
            <Button
              type="primary"
              size="large"
              icon={<ReloadOutlined />}
              onClick={() => startSimulation()}
            >
              {t("actions.runAgain")}
            </Button>
          </Space>
        </div>

        {/* Footer */}
        <div style={{ marginTop: spacing.xl }}>
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
