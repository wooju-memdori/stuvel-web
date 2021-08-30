import React from 'react';
import { useRecoilValue } from 'recoil';
import { Layout, Menu } from 'antd';
import styled from 'styled-components';
import { collapsedState } from '../state/atom';
import {
  LogowithDotIcon,
  SettingsIcon,
  SingleUserIcon,
  PlanetIcon,
  ChatBubbleIcon,
  FriendsIcon,
} from './Icon';

const Navigation = ({ onCollapse }) => {
  const collapsed = useRecoilValue(collapsedState);

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={onCollapse}
      trigger={null}
    >
      <LogowithDotIcon id="logo" />
      <Menu theme="dark" mode="inline">
        <Menu.Item
          key="1"
          className={window.location.pathname === '/room' ? 'active' : ''}
        >
          <a href="/room">
            <SingleUserIcon />
            <span>My Page</span>
          </a>
        </Menu.Item>
        <Menu.Item
          key="2"
          className={window.location.pathname === '/social' ? 'active' : ''}
        >
          <a href="/social">
            <FriendsIcon />
            <span>Social</span>
          </a>
        </Menu.Item>
        <Menu.Item
          key="3"
          className={window.location.pathname === '/chat' ? 'active' : ''}
        >
          <a href="/chat">
            <ChatBubbleIcon />
            <span>Chat</span>
          </a>
        </Menu.Item>
        <Menu.Item
          key="4"
          className={window.location.pathname === '/settings' ? 'active' : ''}
        >
          <a href="/settings">
            <SettingsIcon />
            <span>Settings</span>
          </a>
        </Menu.Item>
        <Menu.Item
          key="5"
          className={window.location.pathname === '/sailing' ? 'active' : ''}
        >
          <a href="/sailing">
            <PlanetIcon />
            {window.location.pathname === '/sailing' ? (
              <span>Sailing</span>
            ) : (
              <span>Off</span>
            )}
          </a>
        </Menu.Item>
      </Menu>
    </Sider>
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
