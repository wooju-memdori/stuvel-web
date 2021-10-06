import React from 'react';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { MaleIcon, FemaleIcon } from '../common/Icon';
import { currentUserInfoState } from '../../state/atom';

import StarIcons from './StarIcons';

const InfoDetails = () => {
  //   const [currentUserInfo, setCurrentUserInfo] =
  //     useRecoilState(currentUserInfoState);
  const currentUserInfo = useRecoilState(currentUserInfoState)[0];
  return (
    <InfoDetailsWrapper>
      <div
        id="nickname"
        // className={currentUserInfo.nickname.length > 6 ? 'small' : ''}
      >
        {currentUserInfo.nickname}
      </div>
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
