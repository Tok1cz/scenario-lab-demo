import type { ReactNode } from "react";
import { Typography } from "antd";
import { fontSize, spacing } from "../../../lib/theme/designTokens";

const { Text } = Typography;

interface SectionHeaderProps {
  children: ReactNode;
}

export function SectionHeader({ children }: SectionHeaderProps) {
  return (
    <Text
      type="secondary"
      style={{
        fontSize: fontSize.md,
        display: "block",
        marginBottom: spacing.xs,
      }}
    >
      {children}
    </Text>
  );
}
