import { useEffect, useRef } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { Layout, Spin, Typography, Space, Progress } from "antd";
import { useSimulation } from "../hooks/useSimulation";
import { mapFormToRequest, runSimulation } from "../lib/api/simulationClient";

const { Content } = Layout;
const { Title, Text } = Typography;

export default function LoadingPage() {
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
    <Layout style={{ minHeight: "100vh", background: "#fafafa" }}>
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
            Running simulation...
          </Title>
          <Text type="secondary">
            Stress-testing downside scenarios for your hiring decision
          </Text>
          <Progress
            percent={100}
            status="active"
            showInfo={false}
            style={{ width: 300 }}
          />
          <Text type="secondary" style={{ fontSize: 12 }}>
            This takes a few seconds
          </Text>
        </Space>
      </Content>
    </Layout>
  );
}
