import React from 'react';
import { Form, Input, Button } from 'antd';
import { useRecoilState } from 'recoil';
import { requiredOrOptionState, userInfoState } from '../state/atom';

const ChooseRequired = () => {
  const setRequiredOrOption = useRecoilState(requiredOrOptionState)[1];
  const setUserInfo = useRecoilState(userInfoState)[1];

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

  return (
    <div>
      <Form
        name="basic"
        labelCol={{
          span: 8,
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
          label="닉네임"
          name="nickname"
          rules={[
            {
              required: true,
              message: '닉네임을 입력하세요',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="이메일"
          name="email"
          rules={[
            {
              required: true,
              message: '이메일을 입력해주세요 (ex. woozu@naver.com)',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="비밀번호"
          name="password"
          rules={[
            {
              required: true,
              message: '비밀번호를 입력하세요',
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          label="비밀번호 확인"
          name="pwdCheck"
          rules={[
            {
              required: true,
              message: '비밀번호 체크',
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit">
            가입하기
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ChooseRequired;
