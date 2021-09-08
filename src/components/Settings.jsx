import React from 'react';
import styled from 'styled-components';

const Settings = () => {
  return (
    <SettingsContainer>
      <EachSettingsContainer>
        <h1>사용자 설정</h1>
        <h2>프로필변경</h2>
        <h2>닉네임변경</h2>
        <h2>비밀번호 변경</h2>
        <h2>관심사</h2>
      </EachSettingsContainer>
      <EachSettingsContainer>
        <h1>알림</h1>
        <h2>채팅 알림 켜기/끄기</h2>
        <h2>알림 소리 켜기/끄기</h2>
        <h2>알림 소리 크기</h2>
        <h2>입/퇴장 알림</h2>
      </EachSettingsContainer>
      <EachSettingsContainer>
        <h1>팔로우 설정</h1>
        <h2>차단 유저 관리</h2>
        <h2>초대범위 설정</h2>
        <h2>채팅범위 설정</h2>
      </EachSettingsContainer>
      <EachSettingsContainer>
        <h1>로그아웃</h1>
        <h1>회원탈퇴</h1>
      </EachSettingsContainer>
    </SettingsContainer>
  );
};

export default Settings;

const SettingsContainer = styled.div`
  padding-left: 1.5rem;
  padding-right: 1.5rem;
  margin-right: 1rem;
  padding-bottom: 1.5rem;
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
  padding-bottom: 1.5rem;
  h1 {
    font-weight: bold;
    margin-bottom: 1.5rem;
  }
  h2 {
    padding-bottom: 0.25rem;
  }
  &:not(:last-child) {
    border-bottom: 0.75px solid #e5e5e5;
  }
  &:last-child {
    margin-top: 2.5rem;

    h1:nth-child(1) {
      color: #ff0000;
    }
  }
`;
