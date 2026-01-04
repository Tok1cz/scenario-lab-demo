import { Card, Typography } from "antd";
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
  return (
    <Card bodyStyle={{ padding: spacing.lg }}>
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
          fontSize: fontSize.display1,
        }}
      >
        {months ? `${months} months` : "6+ months"}
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
