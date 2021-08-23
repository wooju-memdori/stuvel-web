import React from 'react';
import { func } from 'prop-types';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { Layout, Menu } from 'antd';
import { collapsedState, isModalVisibleState } from '../state/atom';
import Friends from './Friends';
import {
  LogoIcon,
  PlanetIcon,
  ChatIcon,
  SettingsIcon,
  FriendsIcon,
} from './Icon';

const Navigation = ({ onCollapse }) => {
  const collapsed = useRecoilValue(collapsedState);
  const setIsModalVisible = useSetRecoilState(isModalVisibleState);
  const showModal = () => {
    setIsModalVisible(true);
    console.log(true);
  };

  return (
    <>
      <Friends />
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
          <Menu.Item onClick={showModal} key="5" icon={<FriendsIcon />}>
            동료
          </Menu.Item>
        </Menu>
      </Layout.Sider>
    </>
  );
};

Navigation.propTypes = {
  onCollapse: func.isRequired,
};

export default Navigation;
