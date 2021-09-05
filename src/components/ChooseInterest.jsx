import React, { useState } from 'react';
import { Button, Checkbox } from 'antd';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { userInfoState, signUpProcessState } from '../state/atom';
import axios from '../utils/axios';
import {
  UnionSvgIcon,
  PurpleCircleSvgIcon,
  WhiteCircleSvgIcon,
  LeftBackgroundIcon,
  RightBackgroundIcon,
} from './Icon';

const ChooseInterest = () => {
  const [interests, setInterests] = useState();
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);
  const setSignUpProcess = useRecoilState(signUpProcessState)[1];

  const addInterests = () => {
    const newUserInfo = {
      ...userInfo,
      tag: interests,
    };
    console.log(userInfo);
    setUserInfo(newUserInfo);
  };

  const onChange = (checkedValues) => {
    console.error(checkedValues);
    setInterests(checkedValues);
    addInterests();
  };

  const world = [
    { label: 'economy', value: 'economy' },
    { label: 'market', value: 'market' },
    { label: 'social issue', value: 'social issue' },
    { label: 'politics', value: 'politics' },
  ];

  const sports = [
    { label: 'baseball', value: 'baseball' },
    { label: 'basketball', value: 'basketball' },
    { label: 'golf', value: 'golf' },
    { label: 'soccer', value: 'soccer' },
    { label: 'tennis', value: 'tennis' },
    { label: 'vollyball', value: 'vollyball' },
  ];

  const tech = [
    { label: 'engineering', value: 'engineering' },
    { label: 'AI', value: 'AI' },
    { label: 'developer', value: 'developer' },
    { label: 'designer', value: 'designer' },
    { label: 'VR/AR', value: 'VR/AR' },
  ];

  const art = [
    { label: 'food', value: 'Apple' },
    { label: 'dance', value: 'Travel' },
    { label: 'fashion', value: 'Marriage' },
    { label: 'beauty', value: 'beauty' },
    { label: 'design', value: 'design' },
    { label: 'book', value: 'book' },
    { label: 'advertisement', value: 'advertisement' },
    { label: 'photo', value: 'photo' },
  ];

  const entertainment = [
    { label: 'game', value: 'game' },
    { label: 'TV', value: 'TV' },
    { label: 'comedy', value: 'comedy' },
    { label: 'story', value: 'story' },
    { label: 'music', value: 'music' },
    { label: 'movie', value: 'movie' },
    { label: 'comics', value: 'comics' },
    { label: 'cartoon', value: 'cartoon' },
  ];

  const language = [
    { label: 'Portuguese', value: 'Portuguese' },
    { label: 'Indonesian', value: 'Indonesian' },
    { label: 'German', value: 'German' },
    { label: 'Chinese', value: 'Chinese' },
    { label: 'hindi', value: 'hindi' },
    { label: 'Spanish', value: 'Spanish' },
    { label: 'Japanese', value: 'Japanese' },
    { label: 'Russian', value: 'Russian' },
    { label: 'English', value: 'English' },
    { label: 'Korean', value: 'Korean' },
  ];

  const MBTI = [
    { label: 'ISTJ', value: 'ISTJ' },
    { label: 'ISTP', value: 'ISTP' },
    { label: 'ISFJ', value: 'ISFJ' },
    { label: 'ISFP', value: 'ISFP' },
    { label: 'INTJ', value: 'INTJ' },
    { label: 'INTP', value: 'INTP' },
    { label: 'INFJ', value: 'INFJ' },
    { label: 'INFP', value: 'INFP' },
    { label: 'ESTJ', value: 'ESTJ' },
    { label: 'ESTP', value: 'ESTP' },
    { label: 'ESFJ', value: 'ESFJ' },
    { label: 'ESFP', value: 'ESFP' },
    { label: 'ENTJ', value: 'ENTJ' },
    { label: 'ENTP', value: 'ENTP' },
    { label: 'ENFJ', value: 'ENFJ' },
    { label: 'ENFP', value: 'ENFP' },
  ];
  return (
    <Background>
      <LeftBackgroundIcon className="background-left" />
      <RightBackgroundIcon className="background-right" />
      <SmallMenu>
        <PurpleCircleSvgIcon className="cirle-left" />
        <PurpleCircleSvgIcon className="cirle-middle" />
        <WhiteCircleSvgIcon className="cirle-right" />
        <UnionSvgIcon className="union-icon" />
        <p className="text">회원님의 관심사를 선택해주세요</p>
        <div>
          <div className="scroll">
            <InterestMenu>
              <p className="first">world</p>
              <Checkbox.Group
                className="check"
                options={world}
                onChange={onChange}
              />
              <p className="font">sports</p>
              <Checkbox.Group
                className="check"
                options={sports}
                onChange={onChange}
              />
              <p className="font">tech</p>
              <Checkbox.Group
                className="check"
                options={tech}
                onChange={onChange}
              />
              <p className="font">art</p>
              <Checkbox.Group
                className="check"
                options={art}
                onChange={onChange}
              />
              <p className="font">entertainment</p>
              <Checkbox.Group
                className="check"
                options={entertainment}
                onChange={onChange}
              />
              <p className="font">language</p>
              <Checkbox.Group
                className="check"
                options={language}
                onChange={onChange}
              />
              <p className="font">MBTI</p>
              <Checkbox.Group
                className="check"
                options={MBTI}
                onChange={onChange}
              />
            </InterestMenu>
          </div>
          <div>
            <Button
              type="primary"
              className="select-button"
              onClick={() => {
                console.log(userInfo);
                axios.post('/users/signup', userInfo).then((response) => {
                  console.log(response.data);
                  setSignUpProcess('finish');
                });
              }}
            >
              설정완료
            </Button>
          </div>
        </div>
      </SmallMenu>
    </Background>
  );
};

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
    top: 2.5%;
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
    margin-top: 10.19em;
    font-family: Roboto;
    font-weight: bold;
    line-height: 1.44em;
    font-size: 1.25em;
    text-align: center;
  }
  .select-button {
    width: 22.5em;
    height: 3.13em;
    border-radius: -50px;
    margin-left: 9.31em;
    margin-top: 0.97em;
  }
`;

const InterestMenu = styled.div`
  width: 100%;
  height: 33.75em;
  background: #35105b;
  padding-top: 2.81em;
  overflow-x: hidden;
  overflow-y: auto;
  ::-webkit-scrollbar {
    width: 0.38em;
  }
  ::-webkit-scrollbar-thumb {
    height: 17%;
    background-color: #c4c4c4;
    border-radius: 10px;
  }
  ::-webkit-scrollbar-track {
    background-color: rgba(0, 0, 0, 0);
  }
  .first {
    margin-left: 2em;
    font-weight: bold;
    font-family: Roboto;
    font-style: normal;
  }
  .font {
    font-size: 1em;
    margin-left: 2em;
    margin-top: 2em;
    font-weight: bold;
    font-family: Roboto;
    font-style: normal;
  }
  .check {
    margin-left: 2em;
    .ant-checkbox-wrapper-checked {
      background: #fb95fd;
      border-radius: 1em;
    }
    span {
      border-radius: 1em;
      line-height: 1.19em;
    }
    .ant-checkbox-inner {
      display: none;
      padding-top: 10px;
    }
    label {
      margin-bottom: 0.5em;
      background: white;
      border-radius: 1em;
      span {
        color: black;
        font-weight: 500;
        line-height: 1.69em;
      }
    }
  }
`;

export default ChooseInterest;
