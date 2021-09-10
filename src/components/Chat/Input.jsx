import { Button } from 'antd';
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
    </Form>
    <StyledDiv>
      <Button
        style={{
          float: 'right',
          width: '4.625rem',
          margin: '0 1rem 1rem 0',
        }}
        type="primary"
      >
        전송
      </Button>
    </StyledDiv>
  </>
);

export default Input;

const StyledDiv = styled.div`
  background-color: #15002a;
`;

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
  resize: none;
  &:focus {
    outline: none;
  }
`;
