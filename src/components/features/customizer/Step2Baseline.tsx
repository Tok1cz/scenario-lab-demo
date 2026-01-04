import { useTranslation } from "react-i18next";
import { Typography, Input } from "antd";
import { spacing, fontSize } from "../../../lib/theme/designTokens";
import StepHeader from "./StepHeader";
import RadioOptionCard from "./RadioOptionCard";
import StepSidebar from "./StepSidebar";

const { Title, Text } = Typography;

interface Step2BaselineProps {
  cashBuffer: string;
  teamSize: string;
  utilization: string;
  onChangeCashBuffer: (value: string) => void;
  onChangeTeamSize: (value: string) => void;
  onChangeUtilization: (value: string) => void;
}

export default function Step2Baseline({
  cashBuffer,
  teamSize,
  utilization,
  onChangeCashBuffer,
  onChangeTeamSize,
  onChangeUtilization,
}: Step2BaselineProps) {
  const { t } = useTranslation("customizer");

  return (
    <>
      <StepHeader
        currentStep={2}
        totalSteps={4}
        title={t("step2.title")}
        subtitle={t("step2.subtitle")}
      />
      <div style={{ marginBottom: spacing.xl }}>
        <Title
          level={4}
          style={{ marginBottom: spacing.xs, fontStyle: "italic" }}
        >
          {t("step2.question")}
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
              title={t("step2.options.under1")}
              selected={cashBuffer === "under1"}
              onClick={() => onChangeCashBuffer("under1")}
            />
            <RadioOptionCard
              title={t("step2.options.1-3")}
              selected={cashBuffer === "1-3"}
              onClick={() => onChangeCashBuffer("1-3")}
            />
            <RadioOptionCard
              title={t("step2.options.3-6")}
              selected={cashBuffer === "3-6"}
              onClick={() => onChangeCashBuffer("3-6")}
            />
            <RadioOptionCard
              title={t("step2.options.6+")}
              selected={cashBuffer === "6+"}
              onClick={() => onChangeCashBuffer("6+")}
            />
          </div>

          <div style={{ width: 350 }}>
            <StepSidebar title={t("step2.sidebar.title")} items={[]} />
            <div style={{ marginTop: spacing.md }}>
              <Text
                strong
                style={{
                  fontSize: fontSize.sm,
                  display: "block",
                  marginBottom: spacing.xs,
                }}
              >
                {t("step2.sidebar.teamSize.label")}
              </Text>
              <Input
                placeholder={t("step2.sidebar.teamSize.placeholder")}
                size="large"
                value={teamSize}
                onChange={(e) => onChangeTeamSize(e.target.value)}
                style={{ marginBottom: spacing.md }}
              />

              <Text
                strong
                style={{
                  fontSize: fontSize.sm,
                  display: "block",
                  marginBottom: spacing.xs,
                }}
              >
                {t("step2.sidebar.utilization.label")}
              </Text>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: spacing.xs,
                }}
              >
                <RadioOptionCard
                  title={t("step2.sidebar.utilization.options.full")}
                  selected={utilization === "full"}
                  onClick={() => onChangeUtilization("full")}
                />
                <RadioOptionCard
                  title={t("step2.sidebar.utilization.options.stretched")}
                  selected={utilization === "stretched"}
                  onClick={() => onChangeUtilization("stretched")}
                />
                <RadioOptionCard
                  title={t("step2.sidebar.utilization.options.bench")}
                  selected={utilization === "bench"}
                  onClick={() => onChangeUtilization("bench")}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
