/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-useless-escape */
import React, { useState } from 'react';
import { Form, Input, Select, Button } from 'antd';
import styled from 'styled-components';
import { useRecoilState } from 'recoil';
import axios from '../../utils/axios';
import { signUpProcessState, userInfoState } from '../../state/atom';
import {
  BigLogoIcon,
  LeftBackgroundIcon,
  RightBackgroundIcon,
} from '../common/Icon';

const { Option } = Select;

const ChooseRequired = () => {
  const setRequiredOrOption = useRecoilState(signUpProcessState)[1];
  const setUserInfo = useRecoilState(userInfoState)[1];
  const [form] = Form.useForm();

  const onFinish = (values) => {
    
    axios
      .get(`/users/duplicate-email/${values.email}`)
      .then((response) => {
        setUserInfo(values);
        setRequiredOrOption('option');
      })
      .catch((error) => {
        if (error.response.status === 409) {
          alert('이미 존재하는 이메일입니다.');
        }
      });
  };

  const [autoCompleteResult, setAutoCompleteResult] = useState([]);

  return (
    <Background>
      <LeftBackgroundIcon className="background-left" />
      <RightBackgroundIcon className="background-right" />
      <SignUpForm>
        <BigLogoIcon id="logo" />
        <div id="signup-form">
          <div id="label-col">
            <p>닉네임</p>
            <p>이메일</p>
            <p>비밀번호</p>
            <p>비밀번호 확인</p>
          </div>
          <Form id="inputs" form={form} name="register" onFinish={onFinish}>
            <Form.Item
              name="nickname"
              rules={[
                {
                  required: true,
                  message: '닉네임을 입력해주세요.',
                  whitespace: true,
                },
                {
                  max: 20,
                  message: '20자 이하로 입력해주세요.',
                  whitespace: true,
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="email"
              rules={[
                {
                  type: 'email',
                  message: '유효한 이메일이 아닙니다.',
                },
                {
                  required: true,
                  message: '이메일을 입력해주세요.',
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="password"
              className="password"
              rules={[
                {
                  type: 'string',
                  pattern:
                    '^(?=.*[a-z])(?=.*[A-Z])(?=.*[$@$!%*?&])[A-Za-z0-9$@$!%*?&]{8,}$',
                  message: '알파벳 대소문자, 특수문자(8글자 이상, 띄어쓰기 제외)를 포함해주세요!',
                },
                {
                  required: true,
                  message: '비밀번호를 입력해주세요.',
                },
              ]}
              hasFeedback
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              name="confirm"
              className="password"
              dependencies={['password']}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: '비밀번호가 일치하지 않습니다.',
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }

                    return Promise.reject(
                      new Error(
                        '비밀번호가 일치하지 않습니다.',
                      ),
                    );
                  },
                }),
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item>
              <Button id="signup-button" type="primary" htmlType="submit">
                가입하기
              </Button>
            </Form.Item>
          </Form>
        </div>
      </SignUpForm>
    </Background>
  );
};

const SignUpForm = styled.div`
  max-width: 31.25em;
  width: 25.714em;
  height: 40em;
  position: absolute;
  left: 50%;
  top: 50%;
  margin-left: -12.875em;
  margin-top: -25em;
  #logo {
    position: absolute;
    top: 0%;
    left: 50%;
    margin-left: -4.9125em;
  }
  #signup-form {
    position: absolute;
    bottom: 0%;
    width: 100%;
  }
  #label-col {
    position: absolute;
    left: -30%;
    p {
      margin-top: 0.8em;
      margin-bottom: 3.6em;
    }
  }
  #inputs {
    width: 100%;
  }
  input {
    height: 3.286em;
  }
  .password input {
    height: 2.55em;
  }
  #signup-button {
    width: 100%;
    height: 3.571em;
  }
`;

const Background = styled.div`
  background: linear-gradient(to bottom, #480088 0%, #0e032c 100%);
  width: 100%;
  height: 100%;
  .background-left {
    position: absolute;
    width: 33%;
    top: -2%;
  }
  .background-right {
    position: absolute;
    width: 33%;
    bottom: 0%;
    right: 0%;
  }
`;

export default ChooseRequired;
