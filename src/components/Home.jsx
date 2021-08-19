import React from 'react';
import { Layout, Button, Row, Col } from 'antd';
import { useRecoilState } from 'recoil';
import { collapsedState } from '../state/atom';
import Navigation from './Navigation';

const HomePage = () => {
  const [collapsed, setCollapsed] = useRecoilState(collapsedState);

  const onCollapse = () => {
    setCollapsed(!collapsed);
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Navigation onCollapse={onCollapse} collapsed={collapsed} />
      <Layout className="site-layout">
        <Layout.Content style={{ margin: '0 16px' }}>
          <Row justify="center" align="middle">
            <Col span={4}>
              <Button href="/room" type="primary" shape="round" centered="true">
                랜덤으로 출발하기
              </Button>
            </Col>
          </Row>
        </Layout.Content>
      </Layout>
    </Layout>
  );
};

export default HomePage;
