import {
  CheckCircleOutlined,
  WarningOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";
import type { JSX } from "react";

export interface StatusConfig {
  title: string;
  color: string;
  bgColor: string;
  borderColor: string;
  icon: JSX.Element;
  description: string;
}

export function getStatusConfig(
  status: string | null | undefined,
): StatusConfig {
  switch (status) {
    case "safe":
      return {
        title: "Safe Hire",
        color: "#52c41a",
        bgColor: "#f6ffed",
        borderColor: "#b7eb8f",
        icon: <CheckCircleOutlined style={{ fontSize: 24 }} />,
        description:
          "Tested downside scenarios stay outside layoff and payroll breach thresholds.",
      };
    case "dangerous":
      return {
        title: "Dangerous Hire",
        color: "#ff4d4f",
        bgColor: "#fff1f0",
        borderColor: "#ffa39e",
        icon: <CloseCircleOutlined style={{ fontSize: 24 }} />,
        description:
          "Risk of cash breach under realistic downside. High caution advised.",
      };
    case "risky":
    default:
      return {
        title: "Risky Hire",
        color: "#faad14",
        bgColor: "#fffbe6",
        borderColor: "#ffe58f",
        icon: <WarningOutlined style={{ fontSize: 24 }} />,
        description:
          "A moderate downside pushes you into the layoff zone within a few months.",
      };
  }
}

export function getRiskZonePosition(
  timeToLayoff: number | null | undefined,
  timeToPayroll: number | null | undefined,
): number {
  if (!timeToLayoff && !timeToPayroll) return 15;
  if (!timeToLayoff) return 15;
  if (timeToLayoff <= 3) return 85;
  if (timeToLayoff <= 5) return 60;
  return 15;
}
