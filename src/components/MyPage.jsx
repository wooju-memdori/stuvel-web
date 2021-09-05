import React from 'react';
import { useRecoilValueLoadable } from 'recoil';
import styled from 'styled-components';
import {
  MaleIcon,
  FemaleIcon,
  DefaultProfileIcon,
  StarFilledIcon,
  StarIcon,
} from './Icon';
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
      <div id="top">
        {currentUserInfo?.contents.image ? (
          <ProfileImage
            style={{
              backgroundImage: `url(${currentUserInfo?.contents.image})`,
            }}
          />
        ) : (
          <ProfileImage>
            <DefaultProfileIcon />
          </ProfileImage>
        )}
        <InfoDetails>
          <div id="nickname">{currentUserInfo?.contents.nickname}</div>
          <div id="gender">
            <span className="field">gender</span>{' '}
            {currentUserInfo?.contents.gender === 0 ? (
              <MaleIcon />
            ) : (
              <FemaleIcon />
            )}
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
                      <StarFilledIcon /> <StarFilledIcon />
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
                }[currentUserInfo?.contents.mobumScore]
              }
            </span>
          </div>
        </InfoDetails>
      </div>
      <InterestTags>
        <h1>내 관심사 설정 </h1>

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
  // padding: 10px;
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
    font-size: 1.5rem;
    font-weight: bold;
    color: #e5e5e5;
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
