import { useTranslation } from "react-i18next";
import { Typography } from "antd";
import { spacing, fontSize } from "../../../lib/theme/designTokens";
import StepHeader from "./StepHeader";
import RadioOptionCard from "./RadioOptionCard";
import StepSidebar from "./StepSidebar";

const { Title, Text } = Typography;

interface Step1HireTypeProps {
  value: string;
  onChange: (value: string) => void;
}

export default function Step1HireType({ value, onChange }: Step1HireTypeProps) {
  const { t } = useTranslation("customizer");

  return (
    <>
      <StepHeader
        currentStep={1}
        totalSteps={4}
        title={t("step1.title")}
        subtitle={t("step1.subtitle")}
      />
      <div style={{ marginBottom: spacing.xl }}>
        <Title
          level={4}
          style={{ marginBottom: spacing.xs, fontStyle: "italic" }}
        >
          {t("step1.question")}
        </Title>
        <Text
          type="secondary"
          style={{ display: "block", marginBottom: spacing.md }}
        >
          {t("step1.help")}
        </Text>

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
              title={t("step1.options.first")}
              selected={value === "first"}
              onClick={() => onChange("first")}
            />
            <RadioOptionCard
              title={t("step1.options.replacement")}
              selected={value === "replacement"}
              onClick={() => onChange("replacement")}
            />
            <RadioOptionCard
              title={t("step1.options.capacity")}
              selected={value === "capacity"}
              onClick={() => onChange("capacity")}
            />
            <RadioOptionCard
              title={t("step1.options.preemptive")}
              selected={value === "preemptive"}
              onClick={() => onChange("preemptive")}
            />
          </div>

          <div style={{ width: 350 }}>
            <StepSidebar
              title={t("step1.sidebar.title")}
              items={[
                t("step1.sidebar.items.item1"),
                t("step1.sidebar.items.item2"),
                t("step1.sidebar.items.item3"),
              ]}
            />
            <Text
              type="secondary"
              style={{
                fontSize: fontSize.sm,
                display: "block",
                marginTop: spacing.md,
              }}
            >
              {t("step1.sidebar.note")}
            </Text>
          </div>
        </div>
      </div>
    </>
  );
}
