import React from 'react';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { currentNavbarComponent } from '../state/atom';
import MyPage from '../components/MyPage';

const NavbarMenuContainer = ({ onClose }) => {
  const currentHeader = useRecoilValue(currentNavbarComponent);

  return (
    <>
      <LayoutContainer>
        <Header>
          {currentHeader}
          <button type="button" onClick={onClose} onKeyDown={onClose}>
            X
          </button>
        </Header>
        <Content>
          {{
            'My Page': <MyPage />,
            Social: <div>Social</div>,
            Chat: <div>Chat</div>,
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
`;

const Header = styled.div`
  font-size: 1.25rem;
  font-weight: 400;
  text-align: left;
  border-bottom: 1px solid white;
`;

const Content = styled.div`
  margin-top: 2rem;
  z-index: 1000;
`;
