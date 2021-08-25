import React, { useState } from 'react';
import { Link, Route } from 'react-router-dom';
import { Form, Input, Button /* , Checkbox */ } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import axios from '../utils/axios';
import SignUpContainer from '../containers/SignUpContainer';

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

  const LoginForm = styled.div`
    max-width: 500px;
  `;

  return (
    <>
      <LoginForm>
        <h1 className="login-title">로그인하고 행성으로 떠나기</h1>
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{ remember: true }}
          onFinish={onLogin}
        >
          <Form.Item
            name="email"
            rules={[{ required: true, message: 'Please input your Email!' }]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="이메일을 입력해주세요"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please input your Password!' }]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="비밀번호"
            />
          </Form.Item>
          <Form.Item>
            {/* <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>로그인 상태 유지</Checkbox>
            </Form.Item> */}

            <a className="login-form-forgot" href="http://localhost:3000">
              아이디 찾기
            </a>
            <a className="login-form-forgot" href="http://localhost:3000">
              비밀번호 찾기
            </a>
            <Link to="/signup">회원가입</Link>
            <Route path="/signup" component={SignUpContainer} exact />
          </Form.Item>

          <Form.Item>
            <p>{loginResult}</p>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              로그인
            </Button>
          </Form.Item>
        </Form>
      </LoginForm>
    </>
  );
};

export default LoggedOut;
