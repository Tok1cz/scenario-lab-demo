import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Layout } from "antd";
import { spacing } from "../lib/theme/designTokens";
import {
  StepNavigation,
  Step1HireType,
  Step2Baseline,
  Step3HireDetails,
  Step4Downside,
} from "../components/features/customizer";

const { Content } = Layout;

interface FormData {
  hireType: string;
  cashBuffer: string;
  teamSize: string;
  utilization: string;
  hireCost: string;
  startTiming: string;
  billability: string;
  utilizationDownside: string;
  paymentRisk: string;
}

export default function CustomizerPage() {
  const { t } = useTranslation("customizer");
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    hireType: "",
    cashBuffer: "",
    teamSize: "",
    utilization: "",
    hireCost: "",
    startTiming: "",
    billability: "",
    utilizationDownside: "",
    paymentRisk: "",
  });

  const updateField = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep((prev) => prev + 1);
    } else {
      // Navigate to loading/results page
      console.log("Submit form:", formData);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

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
    <Layout style={{ minHeight: "100vh", background: "#fafafa" }}>
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
          showBack={currentStep > 1}
        />
      </Content>
    </Layout>
  );
}
