import { Typography } from "antd";
import { useTranslation } from "react-i18next";
import { spacing, fontSize } from "../../../lib/theme/designTokens";
import styles from "./FailureLadder.module.css";

const { Text } = Typography;

interface FailureStage {
  key: string;
  title: string;
  status: string;
}

interface FailureLadderProps {
  stages: FailureStage[];
  currentStageKey?: string | null;
  suggestedAction?: string | null;
}

export function FailureLadder({
  stages,
  currentStageKey,
  suggestedAction,
}: FailureLadderProps) {
  const { t } = useTranslation("results");
  const currentIndex = stages.findIndex((s) => s.key === currentStageKey);

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: spacing.xxl,
      }}
    >
      {/* Left: Ladder stages */}
      <div className={styles.failureLadder}>
        {stages.map((stage, index) => (
          <div
            key={stage.key}
            className={`${styles.ladderStage} ${
              index === 0 ? styles.healthy : ""
            } ${index === currentIndex ? styles.current : ""} ${
              index === stages.length - 1 ? styles.breach : ""
            }`}
          >
            <Text strong style={{ fontSize: fontSize.md }}>
              {index + 1}) {stage.title}
            </Text>
          </div>
        ))}
      </div>

      {/* Right: Explanations */}
      <div>
        <div style={{ marginBottom: spacing.lg }}>
          <Text
            strong
            style={{
              fontSize: fontSize.md,
              display: "block",
              marginBottom: spacing.xs,
            }}
          >
            {t("failureLadder.whatBreaksFirst")}
          </Text>
          <Text style={{ fontSize: fontSize.md }}>
            {t("failureLadder.whatBreaksFirstExplanation")}
          </Text>
        </div>

        <div style={{ marginBottom: spacing.lg }}>
          <Text
            strong
            style={{
              fontSize: fontSize.md,
              display: "block",
              marginBottom: spacing.xs,
            }}
          >
            {t("failureLadder.breakpoints")}
          </Text>
          <Text style={{ fontSize: fontSize.md }}>
            {t("failureLadder.breakpointsExplanation")}
          </Text>
        </div>

        <div>
          <Text
            strong
            style={{
              fontSize: fontSize.md,
              display: "block",
              marginBottom: spacing.xs,
            }}
          >
            {t("failureLadder.suggestedAction")}
          </Text>
          <Text style={{ fontSize: fontSize.md }}>
            {suggestedAction || t("failureLadder.defaultAction")}
          </Text>
        </div>
      </div>
    </div>
  );
}
