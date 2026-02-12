import { Card, Typography } from "antd";
import { useTranslation } from "react-i18next";
import { spacing, fontSize } from "../../../lib/theme/designTokens";

const { Title, Text } = Typography;

interface TimeToEventCardProps {
  label: string;
  months: number | null | undefined;
  subtitle: string;
}

export function TimeToEventCard({
  label,
  months,
  subtitle,
}: TimeToEventCardProps) {
  const { t } = useTranslation("results");

  return (
    <Card styles={{ body: { padding: spacing.lg } }}>
      <Text
        type="secondary"
        style={{
          fontSize: fontSize.md,
          display: "block",
          marginBottom: spacing.xs,
        }}
      >
        {label}
      </Text>
      <Title
        level={1}
        style={{
          margin: `${spacing.xs}px 0`,
          fontStyle: "italic",
          fontSize: "clamp(32px, 7vw, 48px)",
        }}
      >
        {months
          ? t("timeline.monthsValue", { months })
          : t("timeline.monthsPlus")}
      </Title>
      <Text
        type="secondary"
        style={{ fontSize: fontSize.sm, display: "block" }}
      >
        {subtitle}
      </Text>
    </Card>
  );
}
