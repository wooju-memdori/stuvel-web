import React, { useState, useCallback } from 'react';
import { Form, Input, Button } from 'antd';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import useInput from '../../utils/useInput';
import axios from '../../utils/axios';
import { MaleIcon, FemaleIcon } from '../common/Icon';
import { currentUserInfoState } from '../../state/atom';
import StarIcons from './StarIcons';

const InfoDetails = () => {
  const [currentUserInfo, setCurrentUserInfo] =
    useRecoilState(currentUserInfoState);
  // const [nickname, onChangeNickname, setNickname] = useInput(
  const [nickname, onChangeNickname] = useInput(
    currentUserInfo ? currentUserInfo.nickname : '',
  );
  const [description, onChangeDescription] = useInput(
    currentUserInfo ? currentUserInfo.description : '',
  );
  const [personalInfoChangeSuccess, setPersonalInfoChangeSuccess] =
    useState(null);

  let newUserInfo;
  const onSubmitNicknameandDescData = async () => {
    try {
      const requestData = {
        nickname,
        description,
      };
      const response = await axios.patch(`/users/personal-info`, requestData);
      newUserInfo = {
        ...currentUserInfo,
        nickname: response.data.nickname,
        description: response.data.description,
      };
      setCurrentUserInfo(newUserInfo);
      if (response.status === 200) setPersonalInfoChangeSuccess(true);
      else setPersonalInfoChangeSuccess(false);
      setTimeout(() => {
        setPersonalInfoChangeSuccess(null);
      }, 3000);
    } catch (error) {
      console.log(error);
      setPersonalInfoChangeSuccess(false);
      setTimeout(() => {
        setPersonalInfoChangeSuccess(null);
      }, 3000);
    }
  };

  const onSubmitNicknameandDesc = useCallback(() => {
    onSubmitNicknameandDescData({
      nickname,
      description,
    });
  }, [nickname, description]);

  return (
    <InfoDetailsWrapper>
      <Form>
        <Input value={nickname} onChange={onChangeNickname} />
        <div id="gender">
          <span className="field">gender</span>{' '}
          {currentUserInfo.gender === 0 ? <MaleIcon /> : <FemaleIcon />}
        </div>
        <div id="score">
          <span className="field">Score</span>
          <span>
            <StarIcons mobumScore={currentUserInfo.mobumScore} />
          </span>
        </div>
        <Input
          value={description}
          maxLength={20}
          placeholder="소개글을 입력해주세요 (최대 20자)."
          onChange={onChangeDescription}
        />
        {personalInfoChangeSuccess && (
          <SuccessMessage>정보 변경에 성공하였습니다.</SuccessMessage>
        )}
        {personalInfoChangeSuccess === false && (
          <ErrorMessage>정보 변경에 실패하였습니다.</ErrorMessage>
        )}
        <Button htmlType="submit" onClick={onSubmitNicknameandDesc}>
          수정하기
        </Button>
      </Form>
    </InfoDetailsWrapper>
  );
};

export default InfoDetails;

const InfoDetailsWrapper = styled.div`
  margin-left: 2.5rem;
  font-size: 1rem;
  #nickname {
    font-size: 2rem;
    font-weight: bold;
    padding-bottom: 0.5rem;
    word-wrap: break-word;
    &.small {
      font-size: 1.25rem;
    }
  }
  #score {
    svg {
      padding-right: 0.25rem;
      margin: 0;
    }
  }
  #gender {
    .anticon {
      position: relative;
      left: -5px;
      bottom: -6px;
    }
  }
  #gender,
  #score {
    padding-bottom: 1rem;
    .field {
      display: inline-block;
      width: 4rem;
    }
  }
`;
const SuccessMessage = styled.div`
  color: green;
  font-size: 0.75rem;
`;
const ErrorMessage = styled.div`
  color: red;
  font-size: 0.75rem;
`;
