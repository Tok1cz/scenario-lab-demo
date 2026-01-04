import { useTranslation } from "react-i18next";
import { Layout, Typography, Card, Space, Badge, Button } from "antd";
import {
  EditOutlined,
  ReloadOutlined,
  ShareAltOutlined,
} from "@ant-design/icons";

const { Content } = Layout;
const { Title, Text } = Typography;

export default function ResultsPage() {
  const { t } = useTranslation("results");

  return (
    <Layout style={{ minHeight: "100vh", background: "#fafafa" }}>
      <Content
        style={{ padding: "48px 24px", maxWidth: 1200, margin: "0 auto" }}
      >
        <Space direction="vertical" size="large" style={{ width: "100%" }}>
          <Title level={2}>{t("title")}</Title>

          {/* Mock Results - Replace with actual data */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: 24,
            }}
          >
            <Card title="Risk Status">
              <Badge status="success" text="Safe Hire" />
              <Text type="secondary" style={{ marginTop: 8, display: "block" }}>
                Results visualization will go here
              </Text>
            </Card>

            <Card title={t("timeline.title")}>
              <Text>Timeline visualization placeholder</Text>
            </Card>

            <Card title={t("failureLadder.title")}>
              <Text>Failure ladder placeholder</Text>
            </Card>
          </div>

          {/* Actions */}
          <Card>
            <Space>
              <Button icon={<EditOutlined />}>
                {t("actions.editAnswers")}
              </Button>
              <Button icon={<ReloadOutlined />}>{t("actions.runAgain")}</Button>
              <Button icon={<ShareAltOutlined />} type="primary">
                Share Results
              </Button>
            </Space>
          </Card>

          <Text
            type="secondary"
            style={{ fontSize: 12, display: "block", textAlign: "center" }}
          >
            {t("disclaimer")}
          </Text>
        </Space>
      </Content>
    </Layout>
  );
}
