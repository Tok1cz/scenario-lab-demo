import { Card, Typography } from "antd";
import { useTranslation } from "react-i18next";
import { spacing, fontSize } from "../../../lib/theme/designTokens";
import type { StatusConfig } from "../../../lib/utils/resultsHelpers";

const { Title, Paragraph } = Typography;

interface RiskStatusCardProps {
  config: StatusConfig;
  description?: string;
}

export function RiskStatusCard({ config, description }: RiskStatusCardProps) {
  const { t } = useTranslation("results");

  return (
    <Card
      style={{
        background: config.bgColor,
        borderColor: config.borderColor,
        borderWidth: 2,
      }}
      styles={{ body: { padding: spacing.xl } }}
    >
      <Title
        level={1}
        style={{
          margin: 0,
          color: config.color,
          fontStyle: "italic",
          fontSize: "clamp(36px, 8vw, 56px)",
        }}
      >
        {t(config.titleKey)}
      </Title>
      <Paragraph
        style={{
          fontSize: fontSize.lg,
          margin: `${spacing.md}px 0 0 0`,
        }}
      >
        {description ?? t(config.descriptionKey)}
      </Paragraph>
    </Card>
  );
}
