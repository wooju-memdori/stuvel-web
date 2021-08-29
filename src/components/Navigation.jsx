import React from 'react';
import { useRecoilValue } from 'recoil';
import { Layout, Menu } from 'antd';
import { collapsedState } from '../state/atom';
import {
  LogoIcon,
  PlanetIcon,
  ChatIcon,
  SettingsIcon,
  FriendsIcon,
} from './Icon';

const Navigation = ({ onCollapse }) => {
  const collapsed = useRecoilValue(collapsedState);

  return (
    <Layout.Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
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
    </Layout.Sider>
  );
};

export default Navigation;
