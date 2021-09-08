import React from 'react';
import styled from 'styled-components';

const Input = ({ setMessage, sendMessage, message }) => (
  <>
    <Form>
      <StyledInput
        type="text"
        placeholder="Type a message..."
        value={message}
        onChange={({ target: { value } }) => setMessage(value)}
        onKeyPress={(event) =>
          event.key === 'Enter' ? sendMessage(event) : null
        }
      />
      <SendButton onClick={(e) => sendMessage(e)}>Send</SendButton>
    </Form>
  </>
);

export default Input;

const Form = styled.form`
  display: flex;
  border-top: 2px solid #d3d3d3;
`;

const StyledInput = styled.textarea`
  border: none;
  border-radius: 0;
  padding: 5%;
  width: 100%;
  background-color: #15002a !important;
  &:focus {
    outline: none;
  }
`;

const SendButton = styled.button`
  background: #290054;
  padding: 20px;
  display: inline-block;
  border: none;
  width: 20%;
`;
