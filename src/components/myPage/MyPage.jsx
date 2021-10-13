import React, { useState, useEffect, useCallback } from 'react';
import { useRecoilState, useRecoilValueLoadable } from 'recoil';
import styled from 'styled-components';

import { Button } from 'antd';
import { DefaultProfileIcon, PlusButtonIcon } from '../common/Icon';
import ProfileImageUpdate from './ProfileImageUpdate';
import InfoDetails from './InfoDetails';

import InfoDetailsUpdate from './InfoDetailsUpdate';
import ChangeInterest from './ChangeInterest';
import {
  currentUserInfoState,
  currentUserInfoFetchState,
} from '../../state/atom';

const MyPage = () => {
  const [currentUserInfo, setCurrentUserInfo] =
    useRecoilState(currentUserInfoState);
  const currentUserFetchInfo = useRecoilValueLoadable(
    currentUserInfoFetchState(),
  );

  const [openTagsChoice, setOpenTagChoice] = useState(false);
  const [profileImageUpdate, setProfileImageUpdate] = useState(false);

  const [profileUpdate, setProfileUpdate] = useState(false);

  const onProfileImageClick = useCallback(() => {
    setProfileImageUpdate(true);
  });

  const onProfileUpdateClick = useCallback(() => {
    setProfileUpdate(!profileUpdate);
  });
  const onModalShow = useCallback(() => {
    setOpenTagChoice(true);
  }, []);
  const onModalClose = useCallback(() => {
    setOpenTagChoice(false);
    setProfileImageUpdate(false);
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
      {openTagsChoice && <ChangeInterest onClose={onModalClose} />}
      {profileImageUpdate && <ProfileImageUpdate onClose={onModalClose} />}
      {currentUserInfo && (
        <Profile>
          <Button id="edit-button" onClick={onProfileUpdateClick}>
            {profileUpdate ? '✖' : '🖊'}
          </Button>
          <div id="top">
            {currentUserInfo.image ? (
              <ProfileImage
                style={{
                  backgroundImage: `url(${currentUserInfo.image})`,
                }}
                onClick={onProfileImageClick}
              />
            ) : (
              <ProfileImage onClick={onProfileImageClick}>
                <DefaultProfileIcon />
              </ProfileImage>
            )}
            {profileUpdate ? <InfoDetailsUpdate /> : <InfoDetails />}
          </div>
          <InterestTags>
            <h1>
              내 관심사 설정
              <PlusButtonIcon onClick={onModalShow} />
            </h1>
            {currentUserInfo.tag &&
              currentUserInfo.tag.map((tag) => (
                <button type="button" key={tag.Tag.name}>
                  {tag.Tag.name}
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
  #edit-button {
    position: absolute;
    right: 1.5rem;
    width: 3rem;
    margin: 0.25rem;
  }
  #top {
    display: flex;
    flex-direction: row;
  }
`;

const ProfileImage = styled.div`
  min-width: 138px;
  height: 138px;
  margin-top: 0.75rem;
  border-radius: 50%;
  background-size: cover;
  cursor: pointer;
  transition: 0.8s;
  &:hover {
    transform: translateY(-5px);
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
