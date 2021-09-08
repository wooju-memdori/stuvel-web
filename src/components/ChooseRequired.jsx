import React, { useState } from 'react';
import { Form, Input, Button } from 'antd';
import styled from 'styled-components';
import { useRecoilState } from 'recoil';
import { signUpProcessState, userInfoState } from '../state/atom';
import { BigLogoIcon, LeftBackgroundIcon, RightBackgroundIcon } from './Icon';

const ChooseRequired = () => {
  const setRequiredOrOption = useRecoilState(signUpProcessState)[1];
  const setUserInfo = useRecoilState(userInfoState)[1];
  const [alertText, setAlertText] = useState();
  const [firstPwd, setFirstPwd] = useState();
  const [lastPwd] = useState();

  const onFinish = (values) => {
    const userDefaultInfo = {
      nickname: values.nickname,
      email: values.email,
      password: values.password,
    };
    setUserInfo(userDefaultInfo);
    setRequiredOrOption('option');
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const orginPwd = (e) => {
    setFirstPwd(e.target.value);
  };

  const pwdCheck = (e) => {
    const pwdInfo = {
      firstPwd,
      lastPwd,
    };
    console.log(pwdInfo);
    if (!(firstPwd === e.target.value)) {
      setAlertText('비밀번호가 일치하지 않습니다.');
    }
  };

  return (
    <Background>
      <LeftBackgroundIcon className="background-left" />
      <RightBackgroundIcon className="background-right" />
      <SignUpForm>
        <BigLogoIcon id="logo" />
        <div>
          <Form
            name="sign-up-form"
            colon="false"
            labelCol={{
              span: 6,
            }}
            wrapperCol={{
              span: 16,
            }}
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >
            <Form.Item
              size="middle"
              label="닉네임"
              labelAlign="left"
              name="nickname"
            >
              <Input className="input" />
            </Form.Item>

            <Form.Item labelAlign="left" label="이메일" name="email">
              <Input
                className="input diffPwd"
                placeholder="이메일을 입력해주세요"
              />
            </Form.Item>

            <Form.Item label="비밀번호" labelAlign="left" name="password">
              <Input.Password
                className="input"
                placeholder="(대문자, 소문자, 특수문자 조합 8자 이상)"
                value={firstPwd}
                onChange={orginPwd}
                rules={[
                  {
                    required: true,
                    message: '대문자, 소문자, 특수문자를 포함해주세요',
                  },
                ]}
              />
            </Form.Item>

            <Form.Item label="비밀번호 확인" labelAlign="left" name="pwdCheck">
              <Input.Password
                className="input diffPwd"
                placeholder="비밀번호 확인을 입력해주세요"
                value={lastPwd}
                onChange={pwdCheck}
                rules={[
                  {
                    required: true,
                    message: '',
                  },
                ]}
              />
              <p className="check-text">{alertText}</p>
            </Form.Item>

            <Form.Item
              className="input"
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
            >
              <Button type="primary" htmlType="submit" className="button">
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
  height: 36.143em;
  position: absolute;
  top: 50%;
  left: 38%;
  margin-top: -18.0715em;
  #logo {
    position: absolute;
    top: -33%;
    left: 60%;
    margin-left: -4.9125em;
  }
  .input {
    top: -9%;
    height: 2.88em;
    width: 22.5em;
    margin-left: 16%;
    margin-bottom: 1em;
  }
  .diffPwd {
    margin-bottom: 1.5em;
  }
  .button {
    margin-left: -16%;
    width: 22.5em;
    height: 3.13em;
  }
  .check-text {
    position: absolute;
    top: 4.2em;
    left: 3.8em;
    font-family: Roboto;
    font-size: 0.75em;
    color: #d45667;
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

export default ChooseRequired;
