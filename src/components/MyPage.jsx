import React, { useState, useEffect, useCallback } from 'react';
import { useRecoilState, useRecoilValueLoadable } from 'recoil';
import styled from 'styled-components';
import {
  MaleIcon,
  FemaleIcon,
  DefaultProfileIcon,
  StarFilledIcon,
  StarIcon,
  PlusButtonIcon,
} from './common/Icon';
import { currentUserInfoState, currentUserInfoFetchState } from '../state/atom';

import FullModalContainer from '../containers/FullModalContainer';

const MyPage = () => {
  const [currentUserInfo, setCurrentUserInfo] =
    useRecoilState(currentUserInfoState);

  const currentUserFetchInfo = useRecoilValueLoadable(
    currentUserInfoFetchState(),
  );

  // const sampleUser = {
  //   tags: ['History', 'Fun'],
  // };

  const [openTagsChoice, setOpenTagChoice] = useState(false);

  const onModalShow = useCallback(() => {
    setOpenTagChoice(true);
  }, []);

  const onModalClose = useCallback(() => {
    setOpenTagChoice(false);
  }, []);

  useEffect(() => {
    if (!currentUserInfo) {
      switch (currentUserFetchInfo.state) {
        case 'hasValue':
          setCurrentUserInfo(currentUserFetchInfo.contents);
          break;
        case 'hasError':
          // console.error(currentUserFetchInfo.contents.message);
          // setIsLoading(false);
          break;
        case 'loading':
          console.log('loading');
          // setIsLoading(true);
          break;
        default:
          console.log('loading');
      }
    }
  }, [currentUserFetchInfo, currentUserInfo]);

  return (
    <>
      {openTagsChoice && <FullModalContainer onClose={onModalClose} />}
      {currentUserInfo && (
        <Profile>
          <div id="top">
            {currentUserInfo.image ? (
              <ProfileImage
                style={{
                  backgroundImage: `url(${currentUserInfo.image})`,
                }}
              />
            ) : (
              <ProfileImage>
                <DefaultProfileIcon />
              </ProfileImage>
            )}
            <InfoDetails>
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
                  {
                    {
                      5: (
                        <>
                          <StarFilledIcon />
                          <StarFilledIcon />
                          <StarFilledIcon />
                          <StarFilledIcon />
                          <StarFilledIcon />
                        </>
                      ),
                      4: (
                        <>
                          <StarFilledIcon />
                          <StarFilledIcon />
                          <StarFilledIcon />
                          <StarFilledIcon />
                          <StarIcon />
                        </>
                      ),
                      3: (
                        <>
                          <StarFilledIcon />
                          <StarFilledIcon />
                          <StarFilledIcon />
                          <StarIcon />
                          <StarIcon />
                        </>
                      ),
                      2: (
                        <>
                          <StarFilledIcon />
                          <StarFilledIcon />
                          <StarIcon />
                          <StarIcon />
                          <StarIcon />
                        </>
                      ),
                      1: (
                        <>
                          <StarFilledIcon />
                          <StarIcon />
                          <StarIcon />
                          <StarIcon />
                          <StarIcon />
                        </>
                      ),
                    }[currentUserInfo.mobumScore]
                  }
                </span>
              </div>
            </InfoDetails>
          </div>
          <InterestTags>
            <h1>
              내 관심사 설정
              <PlusButtonIcon onClick={onModalShow} />
            </h1>
            {currentUserInfo.tag &&
              currentUserInfo.tag.map((tag) => (
                <button type="button" key={tag}>
                  {tag}
                </button>
              ))}
          </InterestTags>
        </Profile>
      )}
    </>
  );
};

const Profile = styled.div`
  width: 100%;
  padding-left: 1.5rem;
  padding-right: 1.5rem;
  color: #e5e5e5;
  display: flex;
  flex-direction: column;
  #top {
    display: flex;
    flex-direction: row;
  }
`;

const ProfileImage = styled.div`
  width: 138px;
  height: 138px;
  margin-top: 0.75rem;
  border-radius: 50%;
  background-size: cover;
`;

const InfoDetails = styled.div`
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
const InterestTags = styled.div`
  margin-top: 3rem;
  h1 {
    font-size: 1.25rem;
    font-weight: bold;
    color: #e5e5e5;
    & .anticon {
      position: absolute;
      right: 0;
      padding-right: 2rem;
      cursor: pointer;
    }
  }
  button {
    margin: 0.25rem;
    font-size: 1rem;
    color: black;
    background-color: #ebebeb;
    border-radius: 25px;
    border: none;
  }
`;

export default MyPage;
