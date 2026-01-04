import { Layout, Spin, Typography, Space } from "antd";

const { Content } = Layout;
const { Title, Text } = Typography;

export default function LoadingPage() {
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
          <Title level={3}>Running simulation...</Title>
          <Text type="secondary">Testing downside scenarios</Text>
        </Space>
      </Content>
    </Layout>
  );
}
