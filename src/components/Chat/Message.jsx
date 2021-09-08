/* eslint-disable */

import React from 'react';
import styled from 'styled-components';

const Message = ({ message: { text, user, time }, name }) => {
  let isSentByCurrentUser = false;

  const trimmedName = name.trim().toLowerCase();

  if (user === trimmedName) {
    isSentByCurrentUser = true;
  }
  return isSentByCurrentUser ? (
    <MessageContainer>
      <SendText>{time}</SendText>
      <MessageBox>
        <MessageText color="white">{text}</MessageText>
      </MessageBox>
    </MessageContainer>
  ) : (
    <MessageContainer justifyStart>
      <MessageBox myMessage>
        <MessageText color="black">{text}</MessageText>
      </MessageBox>
      <SendText myMessage>{user}</SendText>
    </MessageContainer>
  );
};

export default Message;

const MessageContainer = styled.div`
  display: flex;
  justify-content: ${(props) =>
    props.justifyStart ? 'flex-start' : 'flex-end'};
  padding: 0 5%;
  margin-top: 3px;
`;

const MessageBox = styled.div`
  background: ${(props) => (props.myMessage ? '#5C4DB8' : '#645572')};
  border-radius: 8px;
  padding: 5px 10px;
  color: white;
  display: inline-block;
  max-width: 80%;
`;

const MessageText = styled.p`
  width: 100%;
  letter-spacing: 0;
  float: left;
  word-wrap: break-word;
  color: white;
`;

const SendText = styled.p`
  display: flex;
  align-items: center;
  color: #828282;
  letter-spacing: 0.3px;
  padding-right: ${(props) => (props.myMessage ? 0 : 0.5)}em;
  padding-left: ${(props) => (props.myMessage ? 0.5 : 0)}em;
`;
