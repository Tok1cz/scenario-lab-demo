import { Card, Typography } from "antd";
import { spacing, fontSize } from "../../../lib/theme/designTokens";

const { Title, Text } = Typography;

interface StepSidebarProps {
  title: string;
  items: string[];
}

export default function StepSidebar({ title, items }: StepSidebarProps) {
  return (
    <Card
      style={{
        background: "#f9fafb",
        borderColor: "#e5e7eb",
      }}
      styles={{ body: { padding: spacing.lg } }}
    >
      <Title
        level={5}
        style={{
          marginTop: 0,
          marginBottom: spacing.md,
          fontSize: fontSize.md,
        }}
      >
        {title}
      </Title>
      {items.length > 0 && (
        <ul style={{ paddingLeft: spacing.md, margin: 0 }}>
          {items.map((item) => (
            <li key={item} style={{ marginBottom: spacing.xs }}>
              <Text type="secondary" style={{ fontSize: fontSize.sm }}>
                {item}
              </Text>
            </li>
          ))}
        </ul>
      )}
    </Card>
  );
}
