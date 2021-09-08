import React from 'react';
import styled from 'styled-components';

const InfoBar = ({ room }) => (
  <StyledInfoBar>
    <LeftInnerContainer>
      <h3>{room}</h3>
    </LeftInnerContainer>
  </StyledInfoBar>
);

export default InfoBar;

const StyledInfoBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #290054;
  border-radius: 4px 4px 0 0;
  height: 60px;
  width: 100%;
`;

const LeftInnerContainer = styled.div`
  flex: 0.5;
  display: flex;
  align-items: center;
  margin-left: 5%;
  color: white;
`;
