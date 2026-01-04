import { Typography, Progress } from "antd";
import { spacing, fontSize } from "../../../lib/theme/designTokens";

const { Title, Text } = Typography;

interface StepHeaderProps {
  currentStep: number;
  totalSteps: number;
  title: string;
  subtitle: string;
}

export default function StepHeader({
  currentStep,
  totalSteps,
  title,
  subtitle,
}: StepHeaderProps) {
  const progress = (currentStep / totalSteps) * 100;

  return (
    <div style={{ marginBottom: spacing.xl }}>
      <Text
        type="secondary"
        style={{
          fontSize: fontSize.sm,
          display: "block",
          marginBottom: spacing.xs,
        }}
      >
        Guided Intake - Step {currentStep} of {totalSteps}
      </Text>
      <div style={{ marginBottom: spacing.md }}>
        <Text
          type="secondary"
          style={{
            fontSize: fontSize.xs,
            display: "block",
            marginBottom: spacing.xxs,
          }}
        >
          Progress
        </Text>
        <div style={{ display: "flex", alignItems: "center", gap: spacing.sm }}>
          <Progress
            percent={progress}
            strokeColor="#1f2937"
            trailColor="#e5e7eb"
            showInfo={false}
            style={{ flex: 1 }}
          />
          <Text type="secondary" style={{ fontSize: fontSize.sm }}>
            {progress}%
          </Text>
        </div>
      </div>
      <Title
        level={2}
        style={{ margin: `${spacing.md}px 0`, fontStyle: "italic" }}
      >
        {title}
      </Title>
      <Text type="secondary" style={{ fontSize: fontSize.md }}>
        {subtitle}
      </Text>
    </div>
  );
}
