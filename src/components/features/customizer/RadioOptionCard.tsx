import { Card, Typography } from "antd";
import { spacing, fontSize } from "../../../lib/theme/designTokens";
import styles from "./RadioOptionCard.module.css";

const { Text } = Typography;

interface RadioOptionCardProps {
  title: string;
  subtitle?: string;
  selected: boolean;
  onClick: () => void;
}

export default function RadioOptionCard({
  title,
  subtitle,
  selected,
  onClick,
}: RadioOptionCardProps) {
  return (
    <Card
      role="radio"
      aria-checked={selected}
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick();
        }
      }}
      className={`${styles.optionCard} ${selected ? styles.selected : ""}`}
      styles={{ body: { padding: spacing.md } }}
      hoverable
    >
      <Text
        strong
        style={{
          fontSize: fontSize.md,
          display: "block",
          color: selected ? "#1f2937" : "#4b5563",
        }}
      >
        {title}
      </Text>
      {subtitle && (
        <Text
          type="secondary"
          style={{
            fontSize: fontSize.sm,
            display: "block",
            marginTop: spacing.xxs,
          }}
        >
          {subtitle}
        </Text>
      )}
    </Card>
  );
}
