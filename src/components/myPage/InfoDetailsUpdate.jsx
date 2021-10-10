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

  const [nicknameChangeSuccess, setNicknameChangeSuccess] = useState(null);

  let newUserInfo;
  const onSubmitNicknameData = async (values) => {
    try {
      const response = await axios.patch(`/users/nickname`, values);
      newUserInfo = {
        ...currentUserInfo,
        nickname: response.data.nickname,
      };
      setCurrentUserInfo(newUserInfo);
      if (response.status === 200) setNicknameChangeSuccess(true);
      else setNicknameChangeSuccess(false);
      setTimeout(() => {
        setNicknameChangeSuccess(null);
      }, 3000);
    } catch (error) {
      console.log(error);
      setNicknameChangeSuccess(false);
      setTimeout(() => {
        setNicknameChangeSuccess(null);
      }, 3000);
    }
  };

  const onSubmitNickname = useCallback(() => {
    onSubmitNicknameData({
      nickname,
    });
  }, [nickname]);
  return (
    <InfoDetailsWrapper>
      <Form>
        <Input
          value={nickname}
          onChange={onChangeNickname}
          onSubmit={onSubmitNickname}
        />
        <Button htmlType="submit" onClick={onSubmitNickname}>
          수정하기
        </Button>
      </Form>

      {nicknameChangeSuccess && (
        <SuccessMessage>닉네임 변경에 성공하였습니다.</SuccessMessage>
      )}
      {nicknameChangeSuccess === false && (
        <ErrorMessage>닉네임 변경에 실패하였습니다.</ErrorMessage>
      )}

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
      <Form>
        <Input value={description} onChange={onChangeDescription} />
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
