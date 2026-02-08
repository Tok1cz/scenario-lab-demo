import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { Layout, Typography, Space, Card, Button, List } from "antd";
import { RocketOutlined, EditOutlined } from "@ant-design/icons";
import { spacing, fontSize } from "../lib/theme/designTokens";
import { useSimulation } from "../hooks/useSimulation";

const { Content } = Layout;
const { Title, Paragraph, Text } = Typography;

export default function LandingPage() {
  const { t } = useTranslation("landing");
  const navigate = useNavigate();
  const { state, quickRun } = useSimulation();

  useEffect(() => {
    if (state.status === "loading") {
      navigate("/simulate");
    }
  }, [state.status, navigate]);

  const assumptions = [
    t("assumptions.cashBuffer"),
    t("assumptions.hireCost"),
    t("assumptions.utilization"),
    t("assumptions.payments"),
  ];

  const benefits = [
    t("benefits.status"),
    t("benefits.timeline"),
    t("benefits.breakpoints"),
  ];

  const differentiators = [
    t("differentiation.noSetup"),
    t("differentiation.ranges"),
    t("differentiation.breakpoints"),
  ];

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Content
        style={{
          padding: `${spacing.xxl}px ${spacing.lg}px`,
          maxWidth: 1200,
          margin: "0 auto",
        }}
      >
        <Space direction="vertical" size="large" style={{ width: "100%" }}>
          {/* Hero Section */}
          <div style={{ textAlign: "center", marginBottom: spacing.xl }}>
            <Title level={1}>{t("hero.title")}</Title>
            <Paragraph style={{ fontSize: fontSize.xl, color: "#6b7280" }}>
              {t("hero.subtitle")}
            </Paragraph>
          </div>

          {/* Assumptions Card */}
          <Card>
            <Text strong style={{ fontSize: fontSize.lg }}>
              {t("assumptions.title")}
            </Text>
            <List
              size="small"
              dataSource={assumptions}
              renderItem={(item) => (
                <List.Item>
                  <Text>• {item}</Text>
                </List.Item>
              )}
              style={{ marginTop: spacing.md }}
            />
          </Card>

          {/* Two Column Section */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: spacing.lg,
            }}
          >
            {/* Benefits */}
            <Card title={t("benefits.title")}>
              <List
                size="small"
                dataSource={benefits}
                renderItem={(item) => (
                  <List.Item>
                    <Text>• {item}</Text>
                  </List.Item>
                )}
              />
              <Paragraph
                type="secondary"
                style={{ marginTop: spacing.md, fontSize: fontSize.sm }}
              >
                {t("disclaimer")}
              </Paragraph>
            </Card>

            {/* Differentiation */}
            <Card title={t("differentiation.title")}>
              <List
                size="small"
                dataSource={differentiators}
                renderItem={(item) => (
                  <List.Item>
                    <Text>• {item}</Text>
                  </List.Item>
                )}
              />
            </Card>
          </div>

          {/* CTA Section */}
          <Card style={{ textAlign: "center", background: "#f0f9ff" }}>
            <Space direction="vertical" size="middle" style={{ width: "100%" }}>
              <Button
                type="primary"
                size="large"
                icon={<RocketOutlined />}
                style={{ minWidth: 200 }}
                onClick={quickRun}
              >
                {t("cta.primary")}
              </Button>

              <div>
                <Text type="secondary">{t("cta.customize")}</Text>
                <br />
                <Button
                  type="link"
                  icon={<EditOutlined />}
                  onClick={() => navigate("/customize")}
                >
                  {t("cta.secondary")}
                </Button>
              </div>
            </Space>
          </Card>
        </Space>
      </Content>
    </Layout>
  );
}
