import { Typography } from "antd";
import { useTranslation } from "react-i18next";
import { spacing, fontSize } from "../../../lib/theme/designTokens";
import styles from "./RiskZonesBar.module.css";

const { Text } = Typography;

interface RiskZonesBarProps {
  position: number;
}

export function RiskZonesBar({ position }: RiskZonesBarProps) {
  const { t } = useTranslation("results");

  return (
    <div>
      <div className={styles.riskZonesBar}>
        <div
          className={styles.currentPosition}
          style={{ left: `${position}%` }}
        >
          <div className={styles.positionMarker} />
          <Text
            strong
            style={{
              fontSize: fontSize.sm,
              marginTop: spacing.xxs,
              display: "block",
            }}
          >
            {t("currentPosition")}
          </Text>
        </div>
        <div className={styles.zoneBar}>
          <div className={styles.zoneSafe}>{t("safe")}</div>
          <div className={styles.zoneRisky}>{t("risky")}</div>
          <div className={styles.zoneDangerous}>{t("dangerous")}</div>
        </div>
      </div>
      <div style={{ marginTop: spacing.sm }}>
        <Text
          type="secondary"
          style={{ fontSize: fontSize.sm, display: "block" }}
        >
          {t("zones.dangerous")}
        </Text>
        <Text
          type="secondary"
          style={{ fontSize: fontSize.sm, display: "block" }}
        >
          {t("zones.risky")}
        </Text>
      </div>
    </div>
  );
}
