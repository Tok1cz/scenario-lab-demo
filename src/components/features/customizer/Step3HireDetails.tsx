import { useTranslation } from "react-i18next";
import { Typography } from "antd";
import { spacing, fontSize } from "../../../lib/theme/designTokens";
import StepHeader from "./StepHeader";
import RadioOptionCard from "./RadioOptionCard";
import StepSidebar from "./StepSidebar";

const { Title, Text } = Typography;

interface Step3HireDetailsProps {
  hireCost: string;
  startTiming: string;
  billability: string;
  onChangeHireCost: (value: string) => void;
  onChangeStartTiming: (value: string) => void;
  onChangeBillability: (value: string) => void;
}

export default function Step3HireDetails({
  hireCost,
  startTiming,
  billability,
  onChangeHireCost,
  onChangeStartTiming,
  onChangeBillability,
}: Step3HireDetailsProps) {
  const { t } = useTranslation("customizer");

  return (
    <>
      <StepHeader
        currentStep={3}
        totalSteps={4}
        title={t("step3.title")}
        subtitle={t("step3.subtitle")}
      />
      <div style={{ marginBottom: spacing.xl }}>
        <Title
          level={4}
          style={{ marginBottom: spacing.xs, fontStyle: "italic" }}
        >
          {t("step3.question")}
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
              title={t("step3.options.4-6")}
              selected={hireCost === "4-6"}
              onClick={() => onChangeHireCost("4-6")}
            />
            <RadioOptionCard
              title={t("step3.options.6-8")}
              selected={hireCost === "6-8"}
              onClick={() => onChangeHireCost("6-8")}
            />
            <RadioOptionCard
              title={t("step3.options.8+")}
              selected={hireCost === "8+"}
              onClick={() => onChangeHireCost("8+")}
            />
          </div>

          <div style={{ width: 350 }}>
            <StepSidebar title={t("step3.sidebar.title")} items={[]} />
            <div style={{ marginTop: spacing.md }}>
              <Text
                strong
                style={{
                  fontSize: fontSize.sm,
                  display: "block",
                  marginBottom: spacing.xs,
                }}
              >
                {t("step3.sidebar.startTiming.label")}
              </Text>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: spacing.xs,
                  marginBottom: spacing.md,
                }}
              >
                <RadioOptionCard
                  title={t("step3.sidebar.startTiming.options.immediate")}
                  selected={startTiming === "immediate"}
                  onClick={() => onChangeStartTiming("immediate")}
                />
                <RadioOptionCard
                  title={t("step3.sidebar.startTiming.options.1month")}
                  selected={startTiming === "1month"}
                  onClick={() => onChangeStartTiming("1month")}
                />
                <RadioOptionCard
                  title={t("step3.sidebar.startTiming.options.2-3months")}
                  selected={startTiming === "2-3months"}
                  onClick={() => onChangeStartTiming("2-3months")}
                />
              </div>

              <Text
                strong
                style={{
                  fontSize: fontSize.sm,
                  display: "block",
                  marginBottom: spacing.xs,
                }}
              >
                {t("step3.sidebar.billability.label")}
              </Text>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: spacing.xs,
                }}
              >
                <RadioOptionCard
                  title={t("step3.sidebar.billability.options.high")}
                  selected={billability === "high"}
                  onClick={() => onChangeBillability("high")}
                />
                <RadioOptionCard
                  title={t("step3.sidebar.billability.options.medium")}
                  selected={billability === "medium"}
                  onClick={() => onChangeBillability("medium")}
                />
                <RadioOptionCard
                  title={t("step3.sidebar.billability.options.low")}
                  selected={billability === "low"}
                  onClick={() => onChangeBillability("low")}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
