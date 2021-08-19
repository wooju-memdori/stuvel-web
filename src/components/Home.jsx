import React from 'react';
import { Layout, Menu, Button } from 'antd';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { collapsedState } from '../state/atom';
import {
  LogoIcon,
  PlanetIcon,
  ChatIcon,
  SettingsIcon,
  FriendsIcon,
} from './Icon';

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
          <Menu.Item key="1" icon={<LogoIcon />}>
            <a href="/">STUVEL</a>
          </Menu.Item>
          <Menu.Item href="/room" key="2" icon={<PlanetIcon />}>
            <a href="/room">행성탐사</a>
          </Menu.Item>
          <Menu.Item key="3" icon={<ChatIcon />}>
            채팅
          </Menu.Item>
          <Menu.Item key="4" icon={<SettingsIcon />}>
            설정
          </Menu.Item>
          <Menu.Item key="5" icon={<FriendsIcon />}>
            동료
          </Menu.Item>
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
