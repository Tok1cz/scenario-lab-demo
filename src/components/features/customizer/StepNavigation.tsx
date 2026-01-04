import { Button } from "antd";
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
  nextLabel = "Next",
  nextDisabled = false,
  showBack = true,
}: StepNavigationProps) {
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
          Back
        </Button>
      ) : (
        <div />
      )}
      <Button
        type="primary"
        size="large"
        onClick={onNext}
        disabled={nextDisabled}
        style={{
          background: "#1f2937",
          borderColor: "#1f2937",
          minWidth: 200,
        }}
      >
        {nextLabel}
      </Button>
    </div>
  );
}
