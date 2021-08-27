import React, { useState } from 'react';
import { Link, Route } from 'react-router-dom';
import { Form, Input, Button, Checkbox } from 'antd';
import styled from 'styled-components';
import axios from '../utils/axios';
import SignUpContainer from '../containers/SignUpContainer';
import { BigLogoIcon, LeftBackgroundIcon, RightBackgroundIcon } from './Icon';

const LoggedOut = () => {
  const [loginResult, setLoginResult] = useState('');

  // 로그인 버튼 누르면 실행
  const onLogin = async (values) => {
    axios
      .post(`/users/login`, values)
      .then((response) => {
        if (response.data.message === '존재하지 않는 사용자입니다.') {
          setLoginResult('가입되지 않은 이메일입니다.');
        } else if (response.data.message === '올바르지 않은 비밀번호입니다.') {
          setLoginResult('올바르지 않은 비밀번호입니다.');
        } else {
          window.sessionStorage.setItem(
            'userInfo',
            JSON.stringify({ accessToken: response.data.accessToken }),
          );
          window.location.replace('/');
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Background>
      <LeftBackgroundIcon className="background-left" />
      <RightBackgroundIcon className="background-right" />
      <LoginForm>
        <div id="title">
          <BigLogoIcon id="logo" />
          <h1>로그인하고 행성으로 떠나기</h1>
        </div>
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{ remember: true }}
          onFinish={onLogin}
        >
          <Form.Item
            name="email"
            rules={[{ required: true, message: '이메일을 입력해주세요!' }]}
          >
            <Input className="input-box" placeholder="이메일을 입력해주세요" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: '비밀번호를 입력해주세요!' }]}
          >
            <Input
              className="input-box"
              type="password"
              placeholder="비밀번호를 입력해주세요"
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              로그인
            </Button>
            <Checkbox className="remember">이메일 상태 유지</Checkbox>
            <p>{loginResult}</p>
            <div className="link">
              <a
                className="login-form-forgot child"
                href="http://localhost:3000"
              >
                아이디 찾기
              </a>
              |
              <a
                className="login-form-forgot child"
                href="http://localhost:3000"
              >
                비밀번호 찾기
              </a>
              |
              <Link className="child" to="/signup">
                회원가입
              </Link>
            </div>
            <Route path="/signup" component={SignUpContainer} exact />
          </Form.Item>
        </Form>
      </LoginForm>
    </Background>
  );
};

const LoginForm = styled.div`
  max-width: 31.25em;
  width: 25.714em;
  height: 36.143em;
  position: absolute;
  left: 50%;
  top: 50%;
  margin-left: -12.875em;
  margin-top: -18.0715em;
  #title {
    width: 100%;
    height: 13.571em;
    position: relative;
  }
  h1 {
    color: white;
    bottom: 0%;
    position: absolute;
    left: 50%;
    margin-left: -5.405em;
    margin-bottom: 0;
    font-size: 2em;
  }
  #logo {
    position: absolute;
    top: 0%;
    left: 50%;
    margin-left: -4.9125em;
  }
  .login-form {
    position: absolute;
    top: 250px;
    width: 100%;
  }
  .input-box {
    height: 3.286em;
  }
  .login-form-button {
    width: 100%;
    height: 3.571em;
  }
  .ant-row {
    margin-bottom: 0.571em;
  }
  .link {
    display: flex;
  }
  .remember {
    margin: 0.7em 0;
  }
  .link .child {
    flex: 1;
    text-align: center;
    margin: 0 1.2em;
    color: white;
  }
`;

const Background = styled.div`
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

export default LoggedOut;
