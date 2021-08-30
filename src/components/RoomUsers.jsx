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
import { ExitIcon, FemaleIcon, MaleIcon } from './Icon';

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
      if (usersList.length < 3) {
        while (usersList.length < 3) {
          usersList.push({});
        }
      }
      return (
        <RoomInfo>
          <div id="room-style">
            <h3>Room style</h3>
          </div>
          <div id="room-users">
            <h3>행성 방문자</h3>
            {usersList.map((user) => {
              return (
                <>
                  <div className="user-info">
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
                              gender
                              {user.gender === 0 ? (
                                <FemaleIcon className="gender-img" />
                              ) : (
                                <MaleIcon className="gender-img" />
                              )}
                            </div>
                            <div className="score">
                              score
                              <Rate disabled defaultValue={user.mobum_score} />
                            </div>
                          </div>
                        </div>
                        <p>{user.tag}</p>
                      </>
                    ) : (
                      <div className="no-record">No record</div>
                    )}
                  </div>
                </>
              );
            })}
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
                  <ExitIcon />
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
    margin: 2% 0;
    position: relative;
  }
  .profile {
    float: left;
    min-width: 18.75em;
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
  .user-info .no-record {
    position: absolute;
    top: 50%;
    margin-top: -1.188em;
    width: 100%;
    text-align: center;
    font-weight: 900;
    font-size: 1.75em;
    color: #616161;
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
