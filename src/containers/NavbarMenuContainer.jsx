import React from 'react';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { currentNavbarComponent } from '../state/atom';
import MyPage from '../components/MyPage';
import Chat from '../components/Chat/Chat';
import { CloseButtonIcon } from '../components/Icon';

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
            Social: <div>Social</div>,
            Chat: <Chat />,
            Settings: <div>Settings</div>,
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
  width: 573px;
  height: 100%;
  z-index: 3;
  background-color: #200040;
  padding-left: 1.5rem;
  padding-right: 1.5rem;
`;

const Header = styled.div`
  font-size: 1.25rem;
  font-weight: bold;
  text-align: left;
  border-bottom: 1px solid #ebebeb;
  padding: 0.5rem;
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
