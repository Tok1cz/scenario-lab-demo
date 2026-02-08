import { useCallback, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { Layout } from "antd";
import { spacing } from "../lib/theme/designTokens";
import { useSimulation } from "../hooks/useSimulation";
import {
  StepNavigation,
  Step1HireType,
  Step2Baseline,
  Step3HireDetails,
  Step4Downside,
} from "../components/features/customizer";

const { Content } = Layout;

export default function CustomizerPage() {
  const { t } = useTranslation("customizer");
  const navigate = useNavigate();
  const { state, updateField, nextStep, prevStep, startSimulation } =
    useSimulation();

  const { formData, currentStep } = state;

  useEffect(() => {
    if (state.status === "loading") {
      navigate("/simulate");
    }
  }, [state.status, navigate]);

  const handleNext = useCallback(() => {
    if (currentStep < 4) {
      nextStep();
    } else {
      startSimulation();
    }
  }, [currentStep, nextStep, startSimulation]);

  const handleBack = useCallback(() => {
    if (currentStep > 1) {
      prevStep();
    } else {
      navigate("/");
    }
  }, [currentStep, prevStep, navigate]);

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <Step1HireType
            value={formData.hireType}
            onChange={(value) => updateField("hireType", value)}
          />
        );

      case 2:
        return (
          <Step2Baseline
            cashBuffer={formData.cashBuffer}
            teamSize={formData.teamSize}
            utilization={formData.utilization}
            onChangeCashBuffer={(value) => updateField("cashBuffer", value)}
            onChangeTeamSize={(value) => updateField("teamSize", value)}
            onChangeUtilization={(value) => updateField("utilization", value)}
          />
        );

      case 3:
        return (
          <Step3HireDetails
            hireCost={formData.hireCost}
            startTiming={formData.startTiming}
            billability={formData.billability}
            onChangeHireCost={(value) => updateField("hireCost", value)}
            onChangeStartTiming={(value) => updateField("startTiming", value)}
            onChangeBillability={(value) => updateField("billability", value)}
          />
        );

      case 4:
        return (
          <Step4Downside
            utilizationDownside={formData.utilizationDownside}
            paymentRisk={formData.paymentRisk}
            onChangeUtilizationDownside={(value) =>
              updateField("utilizationDownside", value)
            }
            onChangePaymentRisk={(value) => updateField("paymentRisk", value)}
          />
        );

      default:
        return null;
    }
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Content
        style={{
          padding: `${spacing.xxl}px ${spacing.lg}px`,
          maxWidth: 1400,
          margin: "0 auto",
          width: "100%",
        }}
      >
        {renderStep()}
        <StepNavigation
          onBack={handleBack}
          onNext={handleNext}
          nextLabel={
            currentStep === 4 ? t("navigation.submit") : t("navigation.next")
          }
        />
      </Content>
    </Layout>
  );
}
