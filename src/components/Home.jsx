import React from 'react';
import { Layout, Menu, Button } from 'antd';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { collapsedState } from '../state/atom';

const { Header, Content, Sider } = Layout;

const Center = styled.div`
  margin: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
`;

const HomePage = () => {
  const [collapsed, setCollapsed] = useRecoilState(collapsedState);

  const onCollapse = () => {
    setCollapsed(!collapsed);
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
        <div>로고자리</div>
        <Menu theme="dark" mode="inline">
          <Menu.Item key="1">메뉴아이템1</Menu.Item>
          <Menu.Item key="2">메뉴아이템2</Menu.Item>
        </Menu>
      </Sider>

      <Layout>
        <Header>Stuvel</Header>
        <Content>
          <Center>
            <Button href="/room" type="primary" shape="round" centered="true">
              Start
            </Button>
          </Center>
        </Content>
      </Layout>
    </Layout>
  );
};

export default HomePage;
