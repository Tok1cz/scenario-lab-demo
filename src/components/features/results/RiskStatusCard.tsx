import { Card, Typography } from "antd";
import { spacing, fontSize } from "../../../lib/theme/designTokens";

const { Title, Paragraph } = Typography;

interface StatusConfig {
  title: string;
  color: string;
  bgColor: string;
  borderColor: string;
  description: string;
}

interface RiskStatusCardProps {
  config: StatusConfig;
  description?: string;
}

export function RiskStatusCard({ config, description }: RiskStatusCardProps) {
  return (
    <Card
      style={{
        background: config.bgColor,
        borderColor: config.borderColor,
        borderWidth: 2,
      }}
      bodyStyle={{ padding: spacing.xl }}
    >
      <Title
        level={1}
        style={{
          margin: 0,
          color: config.color,
          fontStyle: "italic",
          fontSize: fontSize.display2,
        }}
      >
        {config.title}
      </Title>
      <Paragraph
        style={{
          fontSize: fontSize.lg,
          margin: `${spacing.md}px 0 0 0`,
        }}
      >
        {description || config.description}
      </Paragraph>
    </Card>
  );
}
