import { Typography } from "antd";
import { fontSize } from "../../../lib/theme/designTokens";

const { Text } = Typography;

interface SectionHeaderProps {
  children: React.ReactNode;
}

export function SectionHeader({ children }: SectionHeaderProps) {
  return (
    <Text
      type="secondary"
      style={{
        fontSize: fontSize.md,
        display: "block",
        marginBottom: 8,
      }}
    >
      {children}
    </Text>
  );
}
