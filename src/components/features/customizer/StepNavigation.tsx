import { Button } from "antd";
import { useTranslation } from "react-i18next";
import styles from "./StepNavigation.module.css";

interface StepNavigationProps {
  onBack?: () => void;
  onNext: () => void;
  nextLabel?: string;
  nextDisabled?: boolean;
  showBack?: boolean;
}

export default function StepNavigation({
  onBack,
  onNext,
  nextLabel,
  nextDisabled = false,
  showBack = true,
}: StepNavigationProps) {
  const { t } = useTranslation("common");

  return (
    <div className={styles.navigationContainer}>
      {showBack ? (
        <Button size="large" onClick={onBack} className={styles.backButton}>
          {t("buttons.back")}
        </Button>
      ) : (
        <div />
      )}
      <Button
        type="primary"
        size="large"
        onClick={onNext}
        disabled={nextDisabled}
        className={styles.nextButton}
      >
        {nextLabel ?? t("buttons.next")}
      </Button>
    </div>
  );
}
