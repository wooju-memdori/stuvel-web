import React from 'react';
import { useRecoilValueLoadable } from 'recoil';
import styled from 'styled-components';
import { MaleIcon, FemaleIcon, DefaultProfileIcon } from './Icon';
import { currentUserInfoState } from '../state/atom';

const MyPage = () => {
  // const [userInfo, setUserInfo] = useRecoilState(userInfoState);
  const currentUserInfo = useRecoilValueLoadable(currentUserInfoState());
  //   const setConfirmed = useRecoilState(roomConfirmedState)[1];
  //   const [refresh, setRefresh] = useRecoilState(refreshState);

  const sampleUserInfo = {
    user: {
      id: 2,
      email: 'gmlwls3520@naver.com',
      nickname: '은근',
      gender: 0,
      password:
        'oRv9NhjZO6Niei9POEpfym/33pxqel2MJdPdnVOa3GJ0squ8mRxwZ8epzIfvSlzjy1397CoMffckqBWiJzyEww==',
      image:
        'https://stuvelimg.s3.ap-northeast-2.amazonaws.com/img/1629643289663_unnamed.jpg',
      tag: ['react', 'node'],
      level: 1,
      mobumScore: 1,
      salt: 'ylu1wFPOiTHUJwXeb1Sba86DDWEPFTJs2JHu+wt2F4sHDjaEC7DZroh+fGelgIg7uve0UUtbyG7I2qpbgXrPgQ==',
      roomId: null,
      createdAt: '2021-08-22T14:41:29.000Z',
      updatedAt: '2021-08-31T17:07:17.000Z',
      room_id: null,
    },
  };

  console.log(currentUserInfo);

  return (
    <Profile>
      {currentUserInfo.contents.image ? (
        <ProfileImage
          style={{
            backgroundImage: `url(${currentUserInfo.contents.image})`,
          }}
        />
      ) : (
        <ProfileImage>
          <DefaultProfileIcon />
        </ProfileImage>
      )}

      <InfoDetails>
        <div>{currentUserInfo.contents.nickname}</div>
        <div>
          <span>gender</span>{' '}
          {currentUserInfo.contents.gender === 0 ? (
            <MaleIcon />
          ) : (
            <FemaleIcon />
          )}
        </div>
        <div>
          <span>Score</span>
          {currentUserInfo.contents.mobumScore}
        </div>
      </InfoDetails>
      <InterestTags>
        {/* TODO */}
        {sampleUserInfo.user.tag.map((tag) => (
          <button type="button" key={tag}>
            {tag}
          </button>
        ))}
      </InterestTags>
    </Profile>
  );
};

const Profile = styled.div`
  width: 100%;
  padding: 10px;
  display: flex;
`;

const ProfileImage = styled.div`
  width: 138px;
  height: 138px;
  margin-top: 0.75rem;
  border-radius: 50%;
  background-size: cover;
`;

const InterestTags = styled.div`
  button {
    font-size: 0.75rem;
    color: black;
    background-color: white;
    border-radius: 25px;

    border: none;
  }
`;

const InfoDetails = styled.div``;

export default MyPage;