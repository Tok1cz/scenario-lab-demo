import { useTranslation } from "react-i18next";
import { Typography } from "antd";
import { spacing, fontSize } from "../../../lib/theme/designTokens";
import StepHeader from "./StepHeader";
import RadioOptionCard from "./RadioOptionCard";
import StepSidebar from "./StepSidebar";

const { Title, Text } = Typography;

interface Step4DownsideProps {
  utilizationDownside: string;
  paymentRisk: string;
  onChangeUtilizationDownside: (value: string) => void;
  onChangePaymentRisk: (value: string) => void;
}

export default function Step4Downside({
  utilizationDownside,
  paymentRisk,
  onChangeUtilizationDownside,
  onChangePaymentRisk,
}: Step4DownsideProps) {
  const { t } = useTranslation("customizer");

  return (
    <>
      <StepHeader
        currentStep={4}
        totalSteps={4}
        title={t("step4.title")}
        subtitle={t("step4.subtitle")}
      />
      <div style={{ marginBottom: spacing.xl }}>
        <Title
          level={4}
          style={{ marginBottom: spacing.xs, fontStyle: "italic" }}
        >
          {t("step4.question")}
        </Title>

        <div style={{ display: "flex", gap: spacing.lg }}>
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              gap: spacing.sm,
            }}
          >
            <RadioOptionCard
              title={t("step4.options.slight.title")}
              subtitle={t("step4.options.slight.subtitle")}
              selected={utilizationDownside === "slight"}
              onClick={() => onChangeUtilizationDownside("slight")}
            />
            <RadioOptionCard
              title={t("step4.options.moderate.title")}
              subtitle={t("step4.options.moderate.subtitle")}
              selected={utilizationDownside === "moderate"}
              onClick={() => onChangeUtilizationDownside("moderate")}
            />
            <RadioOptionCard
              title={t("step4.options.severe.title")}
              subtitle={t("step4.options.severe.subtitle")}
              selected={utilizationDownside === "severe"}
              onClick={() => onChangeUtilizationDownside("severe")}
            />
          </div>

          <div style={{ width: 350 }}>
            <StepSidebar title={t("step4.sidebar.title")} items={[]} />
            <div style={{ marginTop: spacing.md }}>
              <Text
                strong
                style={{
                  fontSize: fontSize.sm,
                  display: "block",
                  marginBottom: spacing.xs,
                }}
              >
                {t("step4.sidebar.label")}
              </Text>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: spacing.xs,
                }}
              >
                <RadioOptionCard
                  title={t("step4.sidebar.options.low.title")}
                  subtitle={t("step4.sidebar.options.low.subtitle")}
                  selected={paymentRisk === "low"}
                  onClick={() => onChangePaymentRisk("low")}
                />
                <RadioOptionCard
                  title={t("step4.sidebar.options.medium.title")}
                  subtitle={t("step4.sidebar.options.medium.subtitle")}
                  selected={paymentRisk === "medium"}
                  onClick={() => onChangePaymentRisk("medium")}
                />
                <RadioOptionCard
                  title={t("step4.sidebar.options.high.title")}
                  subtitle={t("step4.sidebar.options.high.subtitle")}
                  selected={paymentRisk === "high"}
                  onClick={() => onChangePaymentRisk("high")}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
