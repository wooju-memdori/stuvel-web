/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { Button, Radio } from 'antd';
import { genderOrInterestState, userInfoState } from '../state/atom';
import {
  UnionSvgIcon,
  PurpleCircleSvgIcon,
  WhiteCircleSvgIcon,
  LeftBackgroundIcon,
  RightBackgroundIcon,
  WomanSvgIcon,
  ManSvgIcon,
} from './common/Icon';

const ChooseGender = () => {
  const setGenderOrInterest = useRecoilState(genderOrInterestState)[1];
  // eslint-disable-next-line no-unused-vars
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);
  const [gender, setGender] = useState(0);
  const addGender = () => {
    const newUserInfo = {
      ...userInfo,
      gender,
    };
    setUserInfo(newUserInfo);
  };

  return (
    <Background>
      <LeftBackgroundIcon className="background-left" />
      <RightBackgroundIcon className="background-right" />
      <SmallMenu>
        <PurpleCircleSvgIcon className="cirle-left" />
        <WhiteCircleSvgIcon className="cirle-middle" />
        <WhiteCircleSvgIcon className="cirle-right" />
        <UnionSvgIcon className="union-icon" />
        <div>
          <p className="text">
            회원가입이 완료되었습니다!
            <br />
            여행자님의 성별을 선택해주세요
          </p>
          <form className="form">
            <Radio.Group size="large" buttonStyle="solid">
              <Radio.Button
                value="a"
                className="gender woman"
                onClick={() => {
                  setGender(0);
                }}
              >
                <WomanSvgIcon className="woman-icon" />
              </Radio.Button>
              <Radio.Button
                value="b"
                className="gender man"
                onClick={() => {
                  setGender(1);
                }}
              >
                <ManSvgIcon className="man-icon" />
              </Radio.Button>
            </Radio.Group>
            <p className="woman-text">여자</p>
            <p className="man-text">남자</p>
            <Button
              className="next-button"
              type="primary"
              onClick={() => {
                addGender();
                setGenderOrInterest('interest');
              }}
            >
              다음
            </Button>
            <Button
              type="default"
              className="skip-button"
              onClick={() => {
                setGenderOrInterest('interest');
              }}
            >
              건너뛰기
            </Button>
          </form>
        </div>
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
`;

const SmallMenu = styled.div`
  position: absolute;
  width: 40.88em;
  height: 54.06em;
  background: #200040;
  border-radius: 50px;
  top: 9.44em;
  left: 35%;
  .cirle-left {
    position: absolute;
    margin-left: 17.7em;
    top: 2.5%;
  }
  .cirle-middle {
    position: absolute;
    margin-left: 20.7em;
    top: 3%;
  }
  .cirle-right {
    position: absolute;
    margin-left: 24em;
    top: 3%;
  }
  .union-icon {
    position: absolute;
    top: 5.69em;
    left: 19.19em;
    width: 2.5em;
    height: 3.13em;
  }
  .next-button {
    position: absolute;
    width: 22.5em;
    height: 3.13em;
    top: 46.94em;
    margin-left: 9.75em;
  }
  .skip-button {
    position: absolute;
    width: 22.5em;
    height: 3.13em;
    top: 42.81em;
    margin-left: 9.75em;
  }
  .text {
    margin-top: 10.44em;
    font-family: Roboto;
    font-weight: bold;
    line-height: 1.44em;
    font-size: 1.25em;
    text-align: center;
  }
  .woman {
    position: absolute;
    width: 12.69em;
    height: 12.69em;
    top: 18.98em;
    margin-left: 4em;
    border-radius: 6.34em;
  }
  .man {
    position: absolute;
    width: 12.69em;
    height: 12.69em;
    top: 18.98em;
    margin-left: 19.2em;
    border-radius: 6.34em;
  }
  .woman-icon {
    margin-left: -1.03em;
    margin-top: -0.06em;
  }
  .man-icon {
    margin-left: -1.03em;
    margin-top: -0.06em;
  }
  .form {
    .ant-radio-group {
      .ant-radio-button-wrapper {
        ::before {
          content: none;
        }
      }
    }
  }
  .woman-text {
    position: absolute;
    top: 532.62px;
    left: 8.2em;
    font-size: 1.25em;
    font-family: Roboto;
    font-style: normal;
    line-height: 1.44em;
  }
  .man-text {
    position: absolute;
    top: 532.62px;
    left: 22.5em;
    font-size: 1.25em;
    font-family: Roboto;
    font-style: normal;
    line-height: 1.44em;
  }
`;

export default ChooseGender;
