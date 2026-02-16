import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, Navigate } from "react-router-dom";
import { Layout, Spin, Typography, Space, Progress } from "antd";
import { fontSize } from "../lib/theme/designTokens";
import { useSimulation } from "../hooks/useSimulation";
import { mapFormToRequest, runSimulation } from "../lib/api/simulationClient";

const { Content } = Layout;
const { Title, Text } = Typography;

export default function LoadingPage() {
  const { t } = useTranslation("common");
  const navigate = useNavigate();
  const { state, setResult, setError } = useSimulation();
  const hasStarted = useRef(false);

  useEffect(() => {
    if (state.status !== "loading" || hasStarted.current) return;
    hasStarted.current = true;

    const request = mapFormToRequest(state.formData);

    runSimulation(request)
      .then((result) => setResult(result))
      .catch((err) =>
        setError(err instanceof Error ? err.message : "Simulation failed"),
      );
  }, [state.status, state.formData, setResult, setError]);

  useEffect(() => {
    if (state.status === "success" || state.status === "error") {
      navigate("/results", { replace: true });
    }
  }, [state.status, navigate]);

  if (state.status === "idle") {
    return <Navigate to="/" replace />;
  }

  return (
    <Layout style={{ minHeight: "100vh", background: "transparent" }}>
      <Content
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Space direction="vertical" align="center" size="large">
          <Spin size="large" />
          <Title level={3} style={{ margin: 0 }}>
            {t("loading.title")}
          </Title>
          <Text type="secondary">{t("loading.subtitle")}</Text>
          <Progress
            percent={100}
            status="active"
            showInfo={false}
            style={{ width: 300, maxWidth: "100%" }}
          />
          <Text type="secondary" style={{ fontSize: fontSize.sm }}>
            {t("loading.hint")}
          </Text>
        </Space>
      </Content>
    </Layout>
  );
}
