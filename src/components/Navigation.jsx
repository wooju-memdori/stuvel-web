import React, { useCallback, useState } from 'react';
import { useRecoilValue, useRecoilState } from 'recoil';
import { Layout, Menu } from 'antd';
import styled from 'styled-components';
import {
  collapsedState,
  roomIdState,
  currentNavbarComponent,
} from '../state/atom';
import {
  LogowithDotIcon,
  SettingsIcon,
  SingleUserIcon,
  PlanetIcon,
  ChatBubbleIcon,
  FriendsIcon,
} from './common/Icon';
import NavbarMenuContainer from '../containers/NavbarMenuContainer';

const Navigation = ({ onCollapse }) => {
  const collapsed = useRecoilValue(collapsedState);
  const roomId = useRecoilValue(roomIdState);
  const [currentHeader, setCurrentHeader] = useRecoilState(
    currentNavbarComponent,
  );

  const [showModalMenu, setShowModalMenu] = useState(false);
  const onModalShow = useCallback((key) => {
    setShowModalMenu(true);
    setCurrentHeader(key);
  }, []);

  const onModalClose = useCallback(() => {
    setShowModalMenu(false);
    setCurrentHeader('');
  }, []);

  return (
    <>
      {showModalMenu ? <NavbarMenuContainer onClose={onModalClose} /> : ''}
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={onCollapse} // TODO: 없어도 될 듯합니다
        trigger={null}
      >
        <a href="/">
          <LogowithDotIcon id="logo" />
        </a>
        <Menu theme="dark" mode="inline">
          <Menu.Item
            key="My Page"
            className={currentHeader === 'My Page' ? 'active' : ''}
            onClick={({ key }) => onModalShow(key)}
          >
            <SingleUserIcon />
            <span>My Page</span>
          </Menu.Item>
          <Menu.Item
            key="Social"
            className={currentHeader === 'Social' ? 'active' : ''}
            onClick={({ key }) => onModalShow(key)}
          >
            <FriendsIcon />
            <span>Social</span>
          </Menu.Item>
          <Menu.Item
            key="Chat"
            className={currentHeader === 'Chat' ? 'active' : ''}
            onClick={({ key }) => onModalShow(key)}
          >
            <ChatBubbleIcon />
            <span>Chat</span>
          </Menu.Item>
          <Menu.Item
            key="Settings"
            className={currentHeader === 'Settings' ? 'active' : ''}
            onClick={({ key }) => onModalShow(key)}
          >
            <SettingsIcon />
            <span>Settings</span>
          </Menu.Item>
          <Menu.Item key="Sailing" className={roomId ? 'active' : ''}>
            <PlanetIcon />
            {roomId ? <span>Sailing</span> : <span>Off</span>}
          </Menu.Item>
        </Menu>
      </Sider>
    </>
  );
};

export default Navigation;

const Sider = styled(Layout.Sider)`
  width: 80px !important;
  min-width: 80px !important;
  max-width: 80px !important;
  text-align: center;
  color: #ebebeb;
  #logo {
    padding-top: 15px;
  }
  .ant-layout-sider-children {
    background-color: #340069;
  }
  .ant-menu {
    background-color: transparent;
  }
  .ant-menu-item-active,
  .ant-menu-item-selected {
    background-color: transparent !important;
  }
  .ant-menu-item {
    flex-direction: column;
    height: 88px;
    text-align: center;
    padding: 0 !important;
    margin: 0 !important;
    & svg {
      margin-top: 15px;
    }
    & svg path {
      transition: 0.25s;
    }
    &:not(:last-child) {
      border-right: 5px solid transparent;
      border-left: 5px solid transparent;
      &:hover,
      &.active {
        background-color: rgba(255, 255, 255, 0.1) !important;
        transition: 0.5s;
      }
    }
    &:not(:last-child):hover,
    &:not(:last-child).active {
      border-right: 5px solid #bd01e4;
    }
    & .ant-menu-title-content {
      display: flex;
      position: relative;
      bottom: 10px;
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      padding-bottom: 5px;
      line-height: 1;
      margin-left: 0 !important;
      & span:last-child {
        text-align: center;
        margin: 0;
        margin-top: 5px;
      }
    }
  }
  .ant-menu-item:last-child {
    position: absolute;
    bottom: 0;
    border-bottom: 5px solid transparent;
    cursor: auto;
    & .ant-menu-title-content {
      bottom: 5px;
      & svg {
        margin-top: 0;
        padding-top: 10px;
      }
    }
    &.active {
      border-bottom: 5px solid #bd01e4;
    }
  }
  .ant-menu-item:not(.active):not(:hover) {
    svg path {
      fill: rgba(255, 255, 255, 0.5);
      transition: 0.25s;
    }
    span {
      color: rgba(255, 255, 255, 0.5) !important;
    }
  }
`;
