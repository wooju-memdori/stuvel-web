import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import ChooseInterest from '../components/ChooseInterest';
import { CloseButtonIcon } from '../components/Icon';

const FullModalContainer = ({ onClose }) => {
  return (
    <>
      <LayoutContainer>
        <Header>
          <button type="button" onClick={onClose} onKeyDown={onClose}>
            <CloseButtonIcon />
          </button>
        </Header>
        <Content>
          <ChooseInterest />
        </Content>
      </LayoutContainer>
    </>
  );
};

FullModalContainer.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default FullModalContainer;

const LayoutContainer = styled.div`
  position: fixed;
  z-index: 2000;
  background-color: #200040;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
`;

const Header = styled.div`
  font-size: 1.25rem;
  padding-left: 1.5rem;
  padding-right: 1.5rem;
  font-weight: bold;
  text-align: left;
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
  z-index: 3000;
`;
