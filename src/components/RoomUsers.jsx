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
          <h3>Room style</h3>
          <h3>행성 방문자</h3>
          {usersList.map((user) => {
            return (
              <>
                <div className="user-info">
                  {user.nickname ? (
                    <>
                      <div className="profile">
                        {user.image ? (
                          <img src={user.image} alt="" />
                        ) : (
                          <img
                            src={`${window.location.href}/../defaultProfile.png`}
                            alt=""
                          />
                        )}
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
        </RoomInfo>
      );
    }
  }
};

const RoomInfo = styled.div`
  width: 80%;
  height: 80%;
  position: absolute;
  left: 10%;
  top: 10%;
  h3 {
    font-size: 1.75em;
    font-weight: 900;
  }
  .user-info {
    height: 10.75em;
    width: 56.188em;
    background: rgba(39, 35, 51, 0.97);
    border: 1px solid #ffffff;
    border-radius: 0.571em;
    margin: 0.626em 0;
    position: relative;
  }
  .profile {
    float: left;
    width: 44.8%;
    height: 100%;
    border-right: 1px solid #ffffff;
    padding: 1.563em;
  }
  .profile img {
    width: 7.625em;
    border-radius: 9.985em;
    float: left;
  }
  .profile .default-profile {
    width: 7.625em;
    height: 7.625em;
    border-radius: 9.985em;
    float: left;
  }
  .profile .default-info {
    width: 57%;
    float: right;
  }
  .profile .defaultInfo h3 {
    font-size: 1.5em;
    font-weight: 700;
  }
  .user-info .no-record {
    position: absolute;
    top: 50%;
    margin-top: -0.9em;
    width: 100%;
    text-align: center;
    font-weight: 900;
    font-size: 1.75em;
    color: #616161;
  }
  #links {
    bottom: 0%;
    right: 0%;
    width: 90%;
    position: absolute;
  }
  #links button {
    width: 16.25em;
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
