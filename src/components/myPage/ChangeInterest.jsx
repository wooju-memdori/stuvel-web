import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import { Button, Checkbox } from 'antd';
import styled from 'styled-components';
import axios from '../../utils/axios';
import { currentUserInfoState } from '../../state/atom';
import { LeftBackgroundIcon, RightBackgroundIcon } from '../common/Icon';
import {
  UnionSvgIcon,
  PurpleCircleSvgIcon,
  WhiteCircleSvgIcon,
} from '../signup/SignUpIcon';
import FullModalContainer from '../../containers/FullModalContainer';
import {
  Knowledge,
  Wellness,
  Tech,
  Languages,
  Entertainment,
  Life,
  Sports,
  Arts,
  WorldAffairs,
  MBTI,
} from './interests';
import interestTable from './interestTable';

const ChangeInterest = ({ onClose }) => {
  const [interests, setInterests] = useState([]);
  const [currentUserInfo, setCurrentUserInfo] =
    useRecoilState(currentUserInfoState);

  const addInterests = async () => {
    try {
      console.log(`here: ${interests}`);
      const response = await axios.patch('/users/interests', interests);
      setCurrentUserInfo({
        ...currentUserInfo,
        tag: interests.map((tag) => ({
          Tag: {
            id: +tag,
            name: interestTable[+tag - 1],
          },
        })),
      });
      alert('관심사 변경에 성공하였습니다.');
      onClose();
      console.log(`there: ${response}`);
    } catch (err) {
      console.error(err);
      alert('관심사 변경에 실패하였습니다.');
    }
  };

  const onClick = (e) => {
    const uniqueInterests = new Set([...interests]);
    if (e.target.checked) {
      uniqueInterests.add(e.target.value);
    } else {
      uniqueInterests.delete(e.target.value);
    }
    setInterests(Array.from(uniqueInterests));
    console.log(uniqueInterests);
  };

  return (
    <FullModalContainer onClose={onClose}>
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
                <p className="first">Knowledge</p>
                <Checkbox.Group
                  className="check"
                  options={Knowledge}
                  onClick={onClick}
                />
                <p className="font">Wellness</p>
                <Checkbox.Group
                  className="check"
                  options={Wellness}
                  onClick={onClick}
                />
                <p className="font">Tech</p>
                <Checkbox.Group
                  className="check"
                  options={Tech}
                  onClick={onClick}
                />
                <p className="font">Languages</p>
                <Checkbox.Group
                  className="check"
                  options={Languages}
                  onClick={onClick}
                />
                <p className="font">Entertainment</p>
                <Checkbox.Group
                  className="check"
                  options={Entertainment}
                  onClick={onClick}
                />
                <p className="font">Life</p>
                <Checkbox.Group
                  className="check"
                  options={Life}
                  onClick={onClick}
                />
                <p className="font">Sports</p>
                <Checkbox.Group
                  className="check"
                  options={Sports}
                  onClick={onClick}
                />
                <p className="font">Arts</p>
                <Checkbox.Group
                  className="check"
                  options={Arts}
                  onClick={onClick}
                />
                <p className="font">World Affairs</p>
                <Checkbox.Group
                  className="check"
                  options={WorldAffairs}
                  onClick={onClick}
                />
                <p className="font">MBTI</p>
                <Checkbox.Group
                  className="check"
                  options={MBTI}
                  onClick={onClick}
                />
              </InterestMenu>
            </div>
            <div>
              <Button
                type="primary"
                className="select-button"
                onClick={addInterests}
              >
                수정완료
              </Button>
            </div>
          </div>
        </SmallMenu>
      </Background>
    </FullModalContainer>
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
  top: 7em;
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

export default ChangeInterest;
