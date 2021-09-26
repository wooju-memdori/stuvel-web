import React from 'react';
import styled from 'styled-components';
import { Button } from 'antd';
import {
  BigLogoIcon,
  LeftBackgroundIcon,
  RightBackgroundIcon,
} from '../common/Icon';
import { PurpleCircleSvgIcon } from './SignUpIcon';

const FinishSignUp = () => {
  const moveHome = () => {
    document.location.href = '/';
  };
  return (
    <Background>
      <LeftBackgroundIcon className="background-left" />
      <RightBackgroundIcon className="background-right" />
      <SmallMenu>
        <PurpleCircleSvgIcon className="cirle-left" />
        <PurpleCircleSvgIcon className="cirle-middle" />
        <PurpleCircleSvgIcon className="cirle-right" />
        <BigLogoIcon id="logo" />
        <div>
          <p className="mention1">회원가입이 완료되었습니다!</p>
          <p className="mention2">우주항해를 시작해주세요</p>
        </div>
        <Button
          type="primary"
          htmlType="text"
          className="button"
          onClick={moveHome}
        >
          홈으로 가기
        </Button>
      </SmallMenu>
    </Background>
  );
};

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
  #logo {
    position: absolute;
    top: 5.88em;
    left: 9.89em;
    filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  }
`;

const SmallMenu = styled.div`
  position: absolute;
  width: 29.63em;
  height: 37.38em;
  background: #200040;
  border-radius: 50px;
  top: 15.06em;
  left: 40%;
  .cirle-left {
    position: absolute;
    margin-left: 11.81em;
    top: 1.25em;
  }
  .cirle-middle {
    position: absolute;
    margin-left: 14.31em;
    top: 1.25em;
  }
  .cirle-right {
    position: absolute;
    margin-left: 16.81em;
    top: 1.25em;
  }
  .mention1 {
    position: absolute;
    top: 11.1em;
    left: 4.15em;
    font-family: Noto Sans;
    font-weight: 300;
    font-size: 1.5em;
  }
  .mention2 {
    position: absolute;
    top: 9.5em;
    left: 2.15em;
    width: 21.38em;
    font-family: Noto Sans;
    font-weight: 900;
    font-size: 2em;
  }
  .button {
    position: absolute;
    width: 22.5em;
    height: 3.13em;
    left: 3.7em;
    top: 30.06em;
  }
`;

export default FinishSignUp;
