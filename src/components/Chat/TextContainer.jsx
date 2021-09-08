import React from 'react';
import styled from 'styled-components';

const TextContainer = ({ users }) => (
  <StyledTextContainer>
    {users ? (
      <div>
        <h1>People currently chatting:</h1>
        <ActiveContainer>
          <h2>
            {users.map(({ name }) => (
              <ActiveItem key={name}>{name}</ActiveItem>
            ))}
          </h2>
        </ActiveContainer>
      </div>
    ) : null}
  </StyledTextContainer>
);

export default TextContainer;

const StyledTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 100px;
  color: white;
  height: 60%;
  justify-content: space-between;
`;

const ActiveContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 50%;

  h1 {
    margin-bottom: 0px;
  }
`;

const ActiveItem = styled.div`
  display: flex;
  align-items: center;
`;
