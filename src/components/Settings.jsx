import React, { useCallback, useEffect, useState } from 'react';
import { useRecoilState, useRecoilValueLoadable } from 'recoil';
import { Form, Input, Button, Radio } from 'antd';
import styled from 'styled-components';
import { currentUserInfoState, currentUserInfoFetchState } from '../state/atom';
import useInput from '../utils/useInput';
import axios from '../utils/axios';

const Settings = () => {
  const [currentUserInfo, setCurrentUserInfo] =
    useRecoilState(currentUserInfoState);
  const currentUserFetchInfo = useRecoilValueLoadable(
    currentUserInfoFetchState(),
  );
  const [isLoading, setIsLoading] = useState(false);

  const [prevPassword, onChangePrevPassword, setPrevPassword] = useInput('');
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const [passwordError, setPasswordError] = useState(null);
  const [passwordChangeSuccess, setPasswordChangeSuccess] = useState(null);

  useEffect(() => {
    // 회원의 ID, 패스워드 확인 위해 정보 불러옴
    if (!currentUserInfo) {
      switch (currentUserFetchInfo.state) {
        case 'hasValue':
          setCurrentUserInfo(currentUserFetchInfo.contents);
          setIsLoading(false);
          break;
        case 'hasError':
          console.error(currentUserFetchInfo.contents.message);
          setIsLoading(false);
          break;
        case 'loading':
          console.log('loading');
          setIsLoading(true);
          break;
        default:
          console.log('loading');
          setIsLoading(true);
      }
    }
  }, [currentUserFetchInfo]);

  const passwordValidation = (e) => {
    setPasswordCheck(e.target.value);
    // 비밀번호 유효성 검사
    const regExp =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}/;
    if (regExp.test(e.target.value) === false) {
      setPasswordChangeSuccess(false);
      setPasswordError('대문자, 소문자, 숫자, 특수문자를 포함해주세요.');
    } else {
      setPasswordChangeSuccess(null);
      setPasswordError(null);
    }
  };

  const passwordCheckValidation = (e) => {
    setPassword(e.target.value);
    if (!(passwordCheck === e.target.value)) {
      setPasswordChangeSuccess(false);
      setPasswordError('비밀번호가 일치하지 않습니다.');
    } else {
      setPasswordChangeSuccess(null);
      setPasswordError('');
    }
  };

  const onSubmitPasswordData = async () => {
    try {
      if (password !== passwordCheck) {
        setPasswordChangeSuccess(false);
        setPasswordError('새 비밀번호가 일치하지 않습니다.');
        return;
      }
      const response = await axios.patch(`/users/password`, {
        email: currentUserInfo.email,
        newPassword: password,
        password: prevPassword,
      });
      if (response.status === 200) {
        setPasswordChangeSuccess(true);
        setPasswordError(null);
      } else {
        setPasswordChangeSuccess(false);
        setPasswordError(response.data);
      }
      setTimeout(() => {
        setPasswordChangeSuccess(null);
      }, 3000);
    } catch (error) {
      console.error(error.response.data);
      setPasswordChangeSuccess(false);
      setPasswordError(error.response.data);
      setTimeout(() => {
        setPasswordChangeSuccess(null);
      }, 3000);
    }
  };

  const onSubmitPassword = useCallback(() => {
    onSubmitPasswordData();
    setTimeout(() => {
      setPasswordCheck('');
      setPrevPassword('');
      setPassword('');
      setPasswordChangeSuccess(null);
      setPasswordError(null);
    }, 2000);
  }, [password]);

  const onLogOut = useCallback(() => {
    axios
      .delete('/users/logout')
      .then(() => {
        sessionStorage.removeItem('userInfo');
        window.location.replace('/');
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      {currentUserInfo && (
        <SettingsContainer>
          <EachSettingsContainer>
            <h1>사용자 설정</h1>
            <h2 id="id">
              <span className="field">아이디</span>
              <span>{currentUserInfo.email}</span>
            </h2>
            <div id="pw">
              <h2>
                <span className="field">비밀번호 변경</span>
              </h2>
              <Form>
                <div id="input">
                  <Input
                    placeholder="기존 비밀번호 입력"
                    value={prevPassword}
                    type="password"
                    onChange={onChangePrevPassword}
                  />
                  <Input
                    placeholder="새 비밀번호 입력"
                    value={passwordCheck}
                    type="password"
                    onChange={passwordValidation}
                  />
                  <Input
                    placeholder="비밀번호 확인"
                    value={password}
                    type="password"
                    onChange={passwordCheckValidation}
                  />
                </div>
                <div>
                  <Button
                    htmlType="submit"
                    loading={isLoading}
                    onClick={onSubmitPassword}
                  >
                    수정하기
                  </Button>
                </div>
              </Form>
              {passwordChangeSuccess && (
                <SuccessMessage>비밀번호 변경에 성공하였습니다.</SuccessMessage>
              )}

              {passwordChangeSuccess === false && (
                <ErrorMessage>{passwordError}</ErrorMessage>
              )}
            </div>
          </EachSettingsContainer>
          <EachSettingsContainer>
            <h1>알림</h1>
            <h2>
              <span>채팅 알림 </span>
              <Radio.Group
                defaultValue="chat_alarm_on"
                buttonStyle="solid"
                style={{ marginTop: 16 }}
              >
                <Radio.Button value="chat_alarm_on">On</Radio.Button>
                <Radio.Button value="chat_alarm_off">Off</Radio.Button>
              </Radio.Group>
            </h2>
            <h2>
              <span>채팅 미리보기</span>
              <Radio.Group
                defaultValue="chat_alarm_on"
                buttonStyle="solid"
                style={{ marginTop: 16 }}
              >
                <Radio.Button value="chat_alarm_on">On</Radio.Button>
                <Radio.Button value="chat_alarm_off">Off</Radio.Button>
              </Radio.Group>
            </h2>
            <h2>
              <span>멘션 알림</span>
              <Radio.Group
                defaultValue="chat_alarm_on"
                buttonStyle="solid"
                style={{ marginTop: 16 }}
              >
                <Radio.Button value="chat_alarm_on">On</Radio.Button>
                <Radio.Button value="chat_alarm_off">Off</Radio.Button>
              </Radio.Group>
            </h2>
          </EachSettingsContainer>
          <EachSettingsContainer>
            <h1>팔로우</h1>
            <h2>
              <span>팔로우 유저만 초대 가능</span>
              <Radio.Group
                defaultValue="chat_alarm_on"
                buttonStyle="solid"
                style={{ marginTop: 16 }}
              >
                <Radio.Button value="chat_alarm_on">On</Radio.Button>
                <Radio.Button value="chat_alarm_off">Off</Radio.Button>
              </Radio.Group>
            </h2>
            <h2>
              <span>팔로잉 유저만 채팅 가능</span>
              <Radio.Group
                defaultValue="chat_alarm_on"
                buttonStyle="solid"
                style={{ marginTop: 16 }}
              >
                <Radio.Button value="chat_alarm_on">On</Radio.Button>
                <Radio.Button value="chat_alarm_off">Off</Radio.Button>
              </Radio.Group>
            </h2>
            <h2>차단 관리</h2>
          </EachSettingsContainer>
          <EachSettingsContainer>
            <div
              role="button"
              tabIndex={0}
              onKeyDown={onLogOut}
              onClick={onLogOut}
            >
              <h1>
                <span>로그아웃</span>
              </h1>
            </div>
            <h1>
              <span>회원탈퇴</span>
            </h1>
          </EachSettingsContainer>
        </SettingsContainer>
      )}
    </>
  );
};

export default Settings;

const SuccessMessage = styled.div`
  color: green;
  font-size: 0.75rem;
`;

const ErrorMessage = styled.div`
  color: red;
  font-size: 0.75rem;
`;

const SettingsContainer = styled.div`
  margin-right: 1rem;
  padding-bottom: 1rem;
  height: 80vh;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #fff;
  }
  &::-webkit-scrollbar-track {
    background-color: transparent;
  }
`;

const EachSettingsContainer = styled.div`
  font-size: 0.75rem;
  margin-top: 1.5rem;
  padding: 1.5rem;
  padding-top: 0;
  h1 {
    font-weight: bold;
    font-size: 1.25rem;
    margin-bottom: 1.5rem;
  }
  h2 {
    padding-bottom: 0.25rem;
    position: relative;

    span {
      display: inline-block;
    }
    .field {
      color: #d4d4d4;
    }
  }
  &:nth-child(1) {
    margin-top: 0.125rem;
  }
  &:not(:last-child) {
    border-bottom: 10px solid rgba(255, 255, 255, 0.2);
  }
  &:last-child {
    margin-top: 2.5rem;
    h1 span {
      cursor: pointer;
    }
    h1:nth-child(1) {
      color: #ff0000;
    }
  }
  .ant-form {
    display: flex;
    width: 100%;
    .ant-input-group-addon {
      background-color: transparent;
    }
    .ant-input {
      background-color: #47246c !important;
      border-radius: 8px !important;
      height: 2.75rem;
      margin-bottom: 0.5rem;
    }
    button {
      margin-left: 0.5rem;
      border: 1px solid #d300ff;
      border-radius: 10px !important;
      height: 2.75rem;
      flex-grow: 1;
    }
  }

  #id span:nth-child(1) {
    padding-right: 2rem;
  }

  #nickname {
    max-width: 100%;
    flex-grow: 1;
    & input {
      width: 66%;
    }
  }

  #pw {
    max-width: 100%;
    & Form div:nth-child(1) {
      width: 66%;
    }
    & Form div:nth-child(2) {
      display: flex;
      flex-grow: 1;
      & button {
        width: 100%;
        margin-top: auto;
        margin-bottom: 0.5rem;
      }
    }
    input {
      width: 100%;
    }
  }

  h2 .ant-radio-group {
    position: absolute;
    right: 0;
    bottom: 0;
    .ant-radio-button-wrapper {
      background-color: transparent;
      border: 2px solid rgba(255, 255, 255, 0.5);
      color: rgba(255, 255, 255, 0.5);
      margin-left: 0.5rem;
      border-radius: 10px;
      width: 70px;

      text-align: center;

      &::before {
        background-color: transparent;
      }
    }

    .ant-radio-button-wrapper-checked {
      background-color: transparent !important;

      border: 2px solid #d300ff;
      color: white;
    }
  }
`;
