/* eslint-disable */
import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import styled from 'styled-components';
import TextContainer from './TextContainer';
import Messages from './Messages';
import InfoBar from './InfoBar';
import Input from './Input';
import { Row, Col } from 'antd';

const ENDPOINT = `${process.env.REACT_APP_API_URL}/chat`;

let socket;

const Chat = () => {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [users, setUsers] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const name = prompt('Who are you?');
    const room = 1;
    socket = io(ENDPOINT);

    setRoom(room);
    setName(name);

    console.log(name);
    socket.emit('join', { name, room }, (error) => {
      if (error) {
        alert(error);
      }
    });
  }, [ENDPOINT]);

  useEffect(() => {
    socket.on('message', (message) => {
      setMessages((messages) => [...messages, message]);
    });

    socket.on('roomData', ({ users }) => {
      console.log(`roomData is sented! ${users}`);
      setUsers(users);
    });
  }, []);

  const sendMessage = (event) => {
    event.preventDefault();

    if (message) {
      socket.emit('sendMessage', message, () => setMessage(''));
    }
  };

  return (
    <StyledRow>
      <Col span={8} style={{ backgroundColor: '#290054' }}>
        <StyledImg src={`${window.location.href}chat-users-test.png`} />
      </Col>
      <Col span={16}>
        <Container>
          <InfoBar room={room} />
          <Messages messages={messages} name={name} />
          <Input
            message={message}
            setMessage={setMessage}
            sendMessage={sendMessage}
          />
        </Container>
      </Col>
    </StyledRow>
  );
};

export default Chat;

const StyledImg = styled.img`
  width: 100%;
`;

const StyledRow = styled(Row)`
  display: flex;
  background-color: #290054;
  margin-top: -2rem;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: #e9d1ff;
  height: 94vh;
  border: 1px solid white;
`;
