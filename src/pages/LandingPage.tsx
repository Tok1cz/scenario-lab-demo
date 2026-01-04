import { useTranslation } from 'react-i18next'
import { Layout, Typography, Space, Card, Button, List } from 'antd'
import { RocketOutlined, EditOutlined } from '@ant-design/icons'

const { Content } = Layout
const { Title, Paragraph, Text } = Typography

export default function LandingPage() {
  const { t } = useTranslation('landing')

  const assumptions = [
    t('assumptions.cashBuffer'),
    t('assumptions.hireCost'),
    t('assumptions.utilization'),
    t('assumptions.payments'),
  ]

  const benefits = [
    t('benefits.status'),
    t('benefits.timeline'),
    t('benefits.breakpoints'),
  ]

  const differentiators = [
    t('differentiation.noSetup'),
    t('differentiation.ranges'),
    t('differentiation.breakpoints'),
  ]

  return (
    <Layout style={{ minHeight: '100vh', background: '#fafafa' }}>
      <Content style={{ padding: '48px 24px', maxWidth: 1200, margin: '0 auto' }}>
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          {/* Hero Section */}
          <div style={{ textAlign: 'center', marginBottom: 32 }}>
            <Title level={1}>{t('hero.title')}</Title>
            <Paragraph style={{ fontSize: 18, color: '#6b7280' }}>
              {t('hero.subtitle')}
            </Paragraph>
          </div>

          {/* Assumptions Card */}
          <Card>
            <Text strong style={{ fontSize: 16 }}>{t('assumptions.title')}</Text>
            <List
              size="small"
              dataSource={assumptions}
              renderItem={(item) => (
                <List.Item>
                  <Text>• {item}</Text>
                </List.Item>
              )}
              style={{ marginTop: 16 }}
            />
          </Card>

          {/* Two Column Section */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24 }}>
            {/* Benefits */}
            <Card title={t('benefits.title')}>
              <List
                size="small"
                dataSource={benefits}
                renderItem={(item) => (
                  <List.Item>
                    <Text>• {item}</Text>
                  </List.Item>
                )}
              />
              <Paragraph type="secondary" style={{ marginTop: 16, fontSize: 12 }}>
                {t('disclaimer')}
              </Paragraph>
            </Card>

            {/* Differentiation */}
            <Card title={t('differentiation.title')}>
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
          <Card style={{ textAlign: 'center', background: '#f0f9ff' }}>
            <Space direction="vertical" size="middle" style={{ width: '100%' }}>
              <Button
                type="primary"
                size="large"
                icon={<RocketOutlined />}
                style={{ minWidth: 200 }}
              >
                {t('cta.primary')}
              </Button>
              
              <div>
                <Text type="secondary">{t('cta.customize')}</Text>
                <br />
                <Button
                  type="link"
                  icon={<EditOutlined />}
                >
                  {t('cta.secondary')}
                </Button>
              </div>
            </Space>
          </Card>
        </Space>
      </Content>
    </Layout>
  )
}
