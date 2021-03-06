import React from 'react';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { currentNavbarComponent } from '../state/atom';
import MyPage from '../components/myPage/MyPage';
import Settings from '../components/Settings';
import Chat from '../components/chat/Chat';
import { CloseButtonIcon } from '../components/common/Icon';
import Social from '../components/social/Social';

const NavbarMenuContainer = ({ onClose }) => {
  const currentHeader = useRecoilValue(currentNavbarComponent);

  return (
    <>
      <LayoutContainer>
        <Header>
          {currentHeader}
          <button type="button" onClick={onClose} onKeyDown={onClose}>
            <CloseButtonIcon />
          </button>
        </Header>
        <Content>
          {{
            'My Page': <MyPage />,
            Social: <Social />,
            Chat: <Chat />,
            Settings: <Settings />,
          }[currentHeader] || ''}
        </Content>
      </LayoutContainer>
    </>
  );
};

NavbarMenuContainer.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default NavbarMenuContainer;

const LayoutContainer = styled.div`
  position: fixed;
  left: 80px;
  width: 34%;
  height: 100%;
  z-index: 3;
  background-color: #200040;
  border-right: 1px solid #ebebeb;
`;

const Header = styled.div`
  font-size: 1.25rem;
  padding-left: 1.5rem;
  padding-right: 1.5rem;
  font-weight: bold;
  text-align: left;
  border-bottom: 1px solid #ebebeb;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  & button {
    background-color: transparent;
    border: none;
    position: absolute;
    right: 0;
    padding-right: 1rem;
    cursor: pointer;
  }
`;
const Content = styled.div`
  margin-top: 2rem;
  z-index: 1000;
`;
