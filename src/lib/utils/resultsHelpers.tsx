import {
  CheckCircleOutlined,
  WarningOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";
import type { JSX } from "react";

export interface StatusConfig {
  titleKey: string;
  color: string;
  bgColor: string;
  borderColor: string;
  icon: JSX.Element;
  descriptionKey: string;
}

const ICON_SIZE = 24;

export function getStatusConfig(
  status: string | null | undefined,
): StatusConfig {
  switch (status) {
    case "safe":
      return {
        titleKey: "status.safe.title",
        color: "#52c41a",
        bgColor: "#f6ffed",
        borderColor: "#b7eb8f",
        icon: <CheckCircleOutlined style={{ fontSize: ICON_SIZE }} />,
        descriptionKey: "status.safe.description",
      };
    case "dangerous":
      return {
        titleKey: "status.dangerous.title",
        color: "#ff4d4f",
        bgColor: "#fff1f0",
        borderColor: "#ffa39e",
        icon: <CloseCircleOutlined style={{ fontSize: ICON_SIZE }} />,
        descriptionKey: "status.dangerous.description",
      };
    case "risky":
    default:
      return {
        titleKey: "status.risky.title",
        color: "#faad14",
        bgColor: "#fffbe6",
        borderColor: "#ffe58f",
        icon: <WarningOutlined style={{ fontSize: ICON_SIZE }} />,
        descriptionKey: "status.risky.description",
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
