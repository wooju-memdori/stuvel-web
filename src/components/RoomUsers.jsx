import React, { useEffect } from 'react';
import { useRecoilState, useRecoilValueLoadable } from 'recoil';
import styled from 'styled-components';
import { Button, Rate } from 'antd';
import { Link } from 'react-router-dom';
import {
  roomUsersInfoState,
  roomConfirmedState,
  refreshState,
  roomIdState,
} from '../state/atom';
import axios from '../utils/axios';
import { ToHomeIcon, ExitIcon, FemaleIcon, MaleIcon } from './Icon';

const RoomUsers = () => {
  const [nowRoomId, setRoomId] = useRecoilState(roomIdState);
  const usersInfo = useRecoilValueLoadable(roomUsersInfoState(nowRoomId));
  const setConfirmed = useRecoilState(roomConfirmedState)[1];
  const [refresh, setRefresh] = useRecoilState(refreshState);

  const getNewRoomId = async () => {
    const response = await axios.get(`/room/`);
    setRoomId(response.data);
  };

  useEffect(() => {
    // 방 아직 확정 안했으면 방 번호 새로 구하기
    // 케이스 1. 처음 들어왔을때 2. 다른 행성 찾기 버튼 눌렀을 때
    getNewRoomId();
  }, [refresh]);

  switch (usersInfo.state) {
    case 'loading':
      return <div>Loading...</div>;
    case 'hasError':
      return <div>잘못된 접근입니다..</div>;
    default: {
      const roomUsers = usersInfo.contents;
      const usersList = [...roomUsers];
      console.log(usersList);
      if (usersList.length < 3 && usersList.length >= 1) {
        while (usersList.length < 3) {
          usersList.push({});
        }
      }
      return (
        <RoomInfo>
          <div id="room-style">
          <h3>행성 스타일</h3>
          </div>
          <div id="room-users">
            <h3>행성 방문자</h3>
            {usersList.length === 0 ? (
              <div className="user-info" id="no-user">
                <img
                  className="left-up-nemo"
                  alt=""
                  src={`${window.location.href}/../nemo1.png`}
                />
                <img
                  className="right-down-nemo"
                  alt=""
                  src={`${window.location.href}/../nemo1.png`}
                />
                <div className="no-record">
                  No record <br />
                  <span className="greeting">당신이 첫 방문자입니다 :-)</span>
                </div>
              </div>
            ) : (
              usersList.map((user) => {
              return (
                
                  <div className="user-info">
                  <img
                      className="right-up-nemo"
                      alt=""
                      src={`${window.location.href}/../nemo1.png`}
                    />
                    <img
                      className="left-down-nemo"
                      alt=""
                      src={`${window.location.href}/../nemo1.png`}
                    />
                    {user.nickname ? (
                      <>
                        <div className="profile">
                          <div className="profile-img">
                            {user.image ? (
                              <img src={user.image} alt="" />
                            ) : (
                              <img
                                src={`${window.location.href}/../defaultProfile.png`}
                                alt=""
                              />
                            )}
                          </div>
                          <div className="default-info">
                            <h3>{user.nickname}</h3>
                            <div className="gender">
                              <span className="gender-txt">gender</span>
                              {user.gender === 0 ? (
                                <FemaleIcon className="gender-img" />
                              ) : (
                                <MaleIcon className="gender-img" />
                              )}
                            </div>
                            <div className="score">
                              <span className="score-txt">score</span>
                              <Rate disabled defaultValue={user.mobum_score} />
                            </div>
                          </div>
                        </div>
                        <div className="tags">
                          <img
                            src={`${window.location.href}/../tagsExample.svg`}
                            alt=""
                          />
                        </div>
                        <p>{user.tag}</p>
                      </>
                    ) : (
                      <div className="no-record">No record</div>
                    )}
                  </div>
              );
            })
            )}
            <div id="links">
              <Button
                type="primary"
                size="large"
                onClick={() => {
                  setConfirmed(true);
                }}
              >
                행성 착륙하기
              </Button>
              <Button
                type="default"
                size="large"
                onClick={() => {
                  setRefresh(!refresh);
                }}
              >
                다른 행성 찾기
              </Button>
              <div id="exit">
                <Link to="/">
                <ToHomeIcon />
                  <p>나가기</p>
                </Link>
              </div>
            </div>
          </div>
        </RoomInfo>
      );
    }
  }
};

const RoomInfo = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  padding: 5%;
  #room-style {
    width: 100%;
    height: 15%;
  }
  #room-users {
    width: 100%;
    height: 83%;
    position: relative;
  }
  h3 {
    font-size: 1.75em;
    font-weight: 900;
  }
  .user-info {
    height: 10.75em;
    width: 100%;
    background: rgba(39, 35, 51, 0.97);
    border: 1px solid #ffffff;
    border-radius: 0.571em;
    margin: 1% 0;
    position: relative;
    display: inline-flex;
  }
  #no-user {
    height: 33.5em;
    border-radius: 1em;
    background: rgba(0, 0, 0, 0);
  }
  .right-up-nemo {
    width: 12.79%;
    position: absolute;
    top: 0;
    right: 0;
    -moz-transform: scaleX(-1);
    -o-transform: scaleX(-1);
    -webkit-transform: scaleX(-1);
    -transform: scaleX(-1);
  }
  .left-down-nemo {
    width: 12.79%;
    position: absolute;
    left: 0;
    bottom: 0;
    -moz-transform: scaleY(-1);
    -o-transform: scaleY(-1);
    -webkit-transform: scaleY(-1);
    -transform: scaleY(-1);
  }
  .left-up-nemo {
    width: 24.15%;
    position: absolute;
    top: 0;
    left: 0;
  }
  .right-down-nemo {
    width: 24.15%;
    position: absolute;
    -moz-transform: scale(-1);
    -o-transform: scale(-1);
    -webkit-transform: scale(-1);
    -transform: scale(-1);
    bottom: 0;
    right: 0;
  }
  .profile {
    float: left;
    min-width: 25em;
    height: 100%;
    border-right: 1px solid #ffffff;
    display: inline-flex;
  }
  .profile-img {
    height: 100%;
    width: 9.185em;
    position: relative;
    display: inline-block;
    padding: 1.56em 0 1.56em 1.56em;
  }
  .profile .profile-img img {
    width: 7.625em;
    border-radius: 9.985em;
  }
  .profile .default-profile {
    width: 7.625em;
    height: 7.625em;
    border-radius: 9.985em;
    float: left;
  }
  .profile .default-info {
    width: 16.313em;
    padding: 4%;
  }
  .profile .defaultInfo h3 {
    font-size: 1.5em;
    font-weight: 700;
  }
  .gender-img {
    position: relative;
    left: 0.7em;
  }
  .gender-txt {
    position: relative;
    bottom: 0.5em;
  }
  .ant-rate {
    position: relative;
    left: 1.2em;
  }
  .tags {
    padding: 2%;
  }
  .tags img {
    width: 100%;
    height: 100%;
  }
  .user-info .no-record {
    position: absolute;
    top: 50%;
    margin-top: -1em;
    width: 100%;
    text-align: center;
    font-weight: 900;
    font-size: 1.75em;
    color: #616161;
  }
  #no-user .no-record {
    margin-top: -1.7em;
  }
  .greeting {
    font-size: 1.5em;
  }
  #links {
    bottom: 0;
    right: 0;
    width: 90%;
    position: absolute;
    display: inline-flex;
  }
  #links button {
    width: 40%;
    height: 3.375em;
    margin-right: 3%;
  }
  #exit {
    margin-left: 2%;
    position: absolute;
    right: 0;
    top: 0;
  }
  #exit .anticon {
    width: 100%;
  }
  #exit p {
    color: white;
    position: relative;
    left: 1em;
    margin: 0;
  }
`;

export default RoomUsers;
