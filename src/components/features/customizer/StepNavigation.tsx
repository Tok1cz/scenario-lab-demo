import { Button } from "antd";
import { useTranslation } from "react-i18next";
import { spacing } from "../../../lib/theme/designTokens";

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
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        marginTop: spacing.xxl,
      }}
    >
      {showBack ? (
        <Button size="large" onClick={onBack}>
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
        style={{ minWidth: 200 }}
      >
        {nextLabel ?? t("buttons.next")}
      </Button>
    </div>
  );
}
