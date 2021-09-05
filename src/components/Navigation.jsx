import React, { useCallback, useState } from 'react';
import { useRecoilValue, useRecoilState } from 'recoil';
import { Layout, Menu } from 'antd';
import styled from 'styled-components';
import { collapsedState, currentNavbarComponent } from '../state/atom';
import {
  LogowithDotIcon,
  SettingsIcon,
  SingleUserIcon,
  PlanetIcon,
  ChatBubbleIcon,
  FriendsIcon,
} from './Icon';

import NavbarMenuContainer from '../containers/NavbarMenuContainer';

const Navigation = ({ onCollapse }) => {
  const collapsed = useRecoilValue(collapsedState);
  const setCurrentHeader = useRecoilState(currentNavbarComponent)[1];

  const [showModalMenu, setShowModalMenu] = useState(false);
  const onModalShow = useCallback((key) => {
    setShowModalMenu(true);
    setCurrentHeader(key);
  }, []);

  const onModalClose = useCallback(() => {
    setShowModalMenu(false);
  }, []);

  return (
    <>
      {showModalMenu ? <NavbarMenuContainer onClose={onModalClose} /> : ''}

      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={onCollapse}
        trigger={null}
      >
        <a href="/">
          <LogowithDotIcon id="logo" />
        </a>
        <Menu theme="dark" mode="inline">
          <Menu.Item
            key="My Page"
            className={window.location.pathname === '/room' ? 'active' : ''}
            onClick={({ key }) => onModalShow(key)}
          >
            <SingleUserIcon />
            <span>My Page</span>
          </Menu.Item>
          <Menu.Item
            key="Social"
            className={window.location.pathname === '/social' ? 'active' : ''}
            onClick={({ key }) => onModalShow(key)}
          >
            <FriendsIcon />
            <span>Social</span>
          </Menu.Item>
          <Menu.Item
            key="Chat"
            className={window.location.pathname === '/chat' ? 'active' : ''}
            onClick={({ key }) => onModalShow(key)}
          >
            <ChatBubbleIcon />
            <span>Chat</span>
          </Menu.Item>
          <Menu.Item
            key="Settings"
            className={window.location.pathname === '/settings' ? 'active' : ''}
            onClick={({ key }) => onModalShow(key)}
          >
            <SettingsIcon />
            <span>Settings</span>
          </Menu.Item>
          <Menu.Item
            key="Sailing"
            className={window.location.pathname === '/sailing' ? 'active' : ''}
          >
            <PlanetIcon />
            {window.location.pathname === '/sailing' ? (
              <span>Sailing</span>
            ) : (
              <span>Off</span>
            )}
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
  #logo {
    padding-top: 15px;
  }
  .ant-layout-sider-children {
    background-color: #340069;
  }
  .ant-menu {
    background-color: transparent;
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
    &:hover,
    &.active {
      background-color: rgba(255, 255, 255, 0.1) !important;
      transition: 0.5s;
    }
    &:not(:last-child) {
      border-right: 5px solid transparent;
      border-left: 5px solid transparent;
    }
    &:not(:last-child):hover,
    &:not(:last-child).active {
      border-right: 5px solid #bd01e4;
    }
    & .ant-menu-title-content {
      display: flex;
      &,
      & a {
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
  }
  .ant-menu-item:last-child {
    position: absolute;
    bottom: 0;
    border-bottom: 5px solid transparent;
    & .ant-menu-title-content,
    & .ant-menu-title-content a {
      bottom: 5px;
      & svg {
        margin-top: 0;
        padding-top: 10px;
      }
    }
    &:hover,
    &:active,
    &.active {
      border-bottom: 5px solid #bd01e4;
    }
  }
  .ant-menu-item:not(.active):not(:hover) {
    svg path {
      fill: rgba(255, 255, 255, 0.5);
      transition: 0.25s;
    }
  }
`;
