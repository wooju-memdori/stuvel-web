import React from 'react';
import { Avatar } from 'antd';
import styled from 'styled-components';

const InfoBar = ({ room }) => {
  console.log(room);
  return (
    <StyledInfoBar>
      <LeftInnerContainer>
        <Avatar
          style={{ marginRight: '1rem' }}
          size="large"
          src="https://avatars.githubusercontent.com/u/50407047?v=4"
        />
        <h3>하연</h3>
      </LeftInnerContainer>
    </StyledInfoBar>
  );
};

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
  padding-top: 1rem;
  padding-bottom: 1rem;
`;
