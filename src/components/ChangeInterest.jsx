import React, { useState } from 'react';
import { Button, Checkbox } from 'antd';
import styled from 'styled-components';
import axios from '../utils/axios';
import {
  UnionSvgIcon,
  PurpleCircleSvgIcon,
  WhiteCircleSvgIcon,
  LeftBackgroundIcon,
  RightBackgroundIcon,
} from './Icon';

const ChangeInterest = () => {
  const [interests, setInterests] = useState();

  const addInterests = async () => {
    try {
      const response = await axios.patch('/users/interests', interests);

      alert('관심사 변경에 성공하였습니다.');
      console.log(response);
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

  const Knowledge = [
    { label: 'History', value: '1' },
    { label: 'Science', value: '2' },
    { label: 'Physics', value: '3' },
    { label: 'Math', value: '4' },
    { label: 'Psychology', value: '5' },
    { label: 'The Future', value: '6' },
    { label: 'Education', value: '7' },
    { label: 'Philosophy', value: '8' },
    { label: 'Space', value: '9' },
    { label: 'Covid-19', value: '10' },
    { label: 'Biology', value: '11' },
  ];

  const Wellness = [
    { label: 'Weights', value: '12' },
    { label: 'Veganism', value: '13' },
    { label: 'Health', value: '14' },
    { label: 'Meditation', value: '15' },
    { label: 'Fitness', value: '16' },
  ];

  const Tech = [
    { label: 'Venture', value: '17' },
    { label: 'Startups', value: '18' },
    { label: 'Product', value: '19' },
    { label: 'Engineering', value: '20' },
    { label: 'VR/AR', value: '21' },
    { label: 'AI', value: '22' },
    { label: 'Marketing', value: '23' },
    { label: 'Crypto', value: '24' },
    { label: 'Programmer', value: '25' },
    { label: 'Designer', value: '26' },
    { label: 'Project Manager', value: '27' },
  ];

  const Languages = [
    { label: 'Portuguese', value: '28' },
    { label: 'Indonesian', value: '29' },
    { label: 'German', value: '30' },
    { label: 'Hindi', value: '31' },
    { label: 'Mandarin', value: '32' },
    { label: 'Spanish', value: '33' },
    { label: 'Japanese', value: '34' },
    { label: 'Arabic', value: '35' },
    { label: 'Russian', value: '36' },
    { label: 'French', value: '37' },
    { label: 'English', value: '38' },
    { label: 'Korean', value: '39' },
  ];

  const Entertainment = [
    { label: 'Gaming', value: '40' },
    { label: 'Music', value: '41' },
    { label: 'Karaoke', value: '42' },
    { label: 'Celebrities', value: '43' },
    { label: 'Podcasts', value: '44' },
    { label: 'Anime & Manga', value: '45' },
    { label: 'Fun', value: '46' },
    { label: 'Variety', value: '47' },
    { label: 'Movies', value: '48' },
    { label: 'Television', value: '49' },
    { label: 'Performances', value: '50' },
    { label: 'Comedy', value: '51' },
    { label: 'Storytelling', value: '52' },
  ];

  const Life = [
    { label: 'Pregnancy', value: '53' },
    { label: 'Travelling', value: '54' },
    { label: 'Weddings', value: '55' },
    { label: 'Dating', value: '56' },
    { label: 'Parenting', value: '57' },
    { label: 'Relationships', value: '58' },
    { label: 'Job Hunting', value: '59' },
    { label: 'Career', value: '60' },
    { label: 'Real Estate', value: '61' },
    { label: 'Stocks', value: '62' },
    { label: 'Side Jobs', value: '63' },
    { label: 'Networking', value: '64' },
    { label: 'Business', value: '65' },
    { label: 'Entrepreneurship', value: '66' },
  ];

  const Sports = [
    { label: 'Basketball', value: '67' },
    { label: 'MMA', value: '68' },
    { label: 'Golf', value: '69' },
    { label: 'Soccer', value: '70' },
    { label: 'Football', value: '71' },
    { label: 'Cycling', value: '72' },
    { label: 'Baseball', value: '73' },
    { label: 'Tennis', value: '74' },
    { label: 'Volleyball', value: '75' },
  ];

  const Arts = [
    { label: 'Food & Drink', value: '76' },
    { label: 'Dance', value: '77' },
    { label: 'Theater', value: '78' },
    { label: 'Fashion', value: '79' },
    { label: 'Beauty', value: '80' },
    { label: 'Design', value: '81' },
    { label: 'Sci-Fi', value: '82' },
    { label: 'Writing', value: '83' },
    { label: 'Photography', value: '84' },
    { label: 'Advertising', value: '85' },
    { label: 'Architecture', value: '86' },
    { label: 'Books', value: '87' },
  ];

  const WorldAffairs = [
    { label: 'Economics', value: '88' },
    { label: 'Markets', value: '89' },
    { label: 'Social Issues', value: '90' },
    { label: 'Current Events', value: '91' },
    { label: 'Climate', value: '92' },
    { label: 'Politics', value: '93' },
    { label: 'Geopolitics', value: '94' },
  ];

  const MBTI = [
    { label: 'ISTJ', value: '95' },
    { label: 'ISTP', value: '96' },
    { label: 'ISFJ', value: '97' },
    { label: 'ISFP', value: '98' },
    { label: 'INTJ', value: '99' },
    { label: 'INTP', value: '100' },
    { label: 'INFJ', value: '101' },
    { label: 'INFP', value: '102' },
    { label: 'ESTJ', value: '103' },
    { label: 'ESTP', value: '104' },
    { label: 'ESFJ', value: '105' },
    { label: 'ESFP', value: '106' },
    { label: 'ENTJ', value: '107' },
    { label: 'ENTP', value: '108' },
    { label: 'ENFJ', value: '109' },
    { label: 'ENFP', value: '110' },
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
              <p className="font">WorldAffairs</p>
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

export default ChangeInterest;
