/*eslint-disable*/
import React from 'react';

import ScrollToBottom from 'react-scroll-to-bottom';
import styled from 'styled-components';

import Message from './Message';

const Messages = ({ messages, name }) => (
  <Scroll>
    {messages.map((message, i) => (
      <div key={i}>
        <Message message={message} name={name} />
      </div>
    ))}
  </Scroll>
);

const Scroll = styled(ScrollToBottom)`
  padding: 5% 0;
  overflow: auto;
  flex: auto;
`;

export default Messages;
