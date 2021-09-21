import React from 'react';
import { Link, Route } from 'react-router-dom';
import { Button } from 'antd';
import styled from 'styled-components';
import { FilterIcon } from './Icon';
import RoomContainer from '../../containers/RoomContainer';

const HomePage = () => {
  return (
    <Home>
      <div id="start-button">
        <img alt="stuvel" src={`${window.location.href}logo.svg`} />
        <p id="planet-no">
          현재 <span id="now-planet-no">15개의 행성</span>에
          <br /> 여행자가 표류중 입니다.
        </p>
        <Link to="/room">
          <Button type="primary" size="large" id="random-start">
            행성 착륙하기
          </Button>
        </Link>
        <FilterIcon id="filter" />
        <div id="other-buttons">
          <Button type="default" centered="true" id="make-room">
            우주기지 만들기
          </Button>
          <Button id="star-button" type="default" shape="round" centered="true">
            &#9733;
          </Button>
        </div>
        <Route path="/room/" component={RoomContainer} exact />
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
  height: 100%;
  overflow: hidden;
  position: relative;
  #start-button {
    position: absolute;
    height: 50.5%;
    min-height: 27.688em;
    left: 13%;
    top: 21%;
    z-index: 2;
  }
  #planet-no {
    font-size: 1.75em;
    margin-bottom: 40px;
  }
  #now-planet-no {
    font-weight: 700;
  }
  #start-button img {
    width: 24.47%;
    min-width: 24em;
    max-width: 33em;
    height: auto;
    margin-bottom: 18.28%;
  }
  button {
    height: 3.375em;
    font-size: 1.125em;
  }
  #random-start {
    width: 19.625em;
    margin-bottom: 1em;
  }
  #filter {
    position: relative;
    top: 0.5em;
    left: 1em;
  }
  #make-room {
    margin-right: 1em;
    width: 13.5em;
  }
  #star-button {
    width: 5.125em;
    position: relative;
    top: 0.5em;
  }
  #star-button span {
    font-size: 1.9em;
    position: relative;
    top: -0.15em;
  }
  #background-img {
    position: absolute;
    top: 3.65%;
    left: 17.9%;
    width: 91.5%;
  }
`;

export default HomePage;
