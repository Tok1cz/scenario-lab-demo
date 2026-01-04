import { useTranslation } from "react-i18next";
import { Layout, Typography, Card, Steps, Space, Button } from "antd";

const { Content } = Layout;
const { Title } = Typography;

export default function CustomizerPage() {
  const { t } = useTranslation("customizer");

  return (
    <Layout style={{ minHeight: "100vh", background: "#fafafa" }}>
      <Content
        style={{ padding: "48px 24px", maxWidth: 900, margin: "0 auto" }}
      >
        <Space direction="vertical" size="large" style={{ width: "100%" }}>
          <Title level={2}>Customizer</Title>

          <Steps
            current={0}
            items={[
              { title: "Hire Type" },
              { title: "Financials" },
              { title: "Downside" },
              { title: "Review" },
            ]}
          />

          <Card>
            <p>Multi-step form will go here</p>
          </Card>

          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Button>Back</Button>
            <Button type="primary">Next</Button>
          </div>
        </Space>
      </Content>
    </Layout>
  );
}
