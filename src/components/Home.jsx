import React from 'react';
import { Button } from 'antd';
import styled from 'styled-components';
import { FilterIcon, StarIcon } from './Icon';

const HomePage = () => {
  return (
    <Home>
      <div id="start-button">
        <img alt="stuvel" src={`${window.location.href}logo.svg`} />
        <p>현재 15개의 행성에 여행자가 표류중 입니다</p>
        <Button href="/room" type="primary" centered="true" id="random-start">
          랜덤으로 출발하기
        </Button>
        <FilterIcon />
        <Button type="default" centered="true">
          우주기지 만들기
        </Button>
        <Button
          icon={<StarIcon />}
          type="default"
          shape="round"
          centered="true"
        />
        <p>coming soon</p>
      </div>
      <img
        id="background-img"
        alt="home background"
        src={`${window.location.href}homeBackground.png`}
      />
    </Home>
  );
};

const Home = styled.div`
  width: 100%;
  overflow: hidden;
  #start-button {
    width: 24.47%;
    left: 13%;
    top: 21%;
  }
  #start-button img {
    width: 100%;
  }
  #random-start {
    width: 19.625em;
  }
  #background-img {
    width: 91.5%;
  }
`;

export default HomePage;
