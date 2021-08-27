import React, { useEffect } from 'react';
import { useRecoilState, useRecoilValueLoadable } from 'recoil';
import styled from 'styled-components';
import { string } from 'prop-types';
import { Button } from 'antd';
import { Link } from 'react-router-dom';
import {
  roomUsersInfoState,
  roomConfirmedState,
  refreshState,
  roomIdState,
} from '../state/atom';
import axios from '../utils/axios';

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
      return (
        <RoomInfo>
          {roomUsers.map((user) => {
            return (
              <>
                <h3>Room style</h3>
                <h3>행성 방문자</h3>
                <div className="user-info">
                  <div className="profile">
                    <img src={user.image} alt="" width="100px" />
                    <div className="defaultInfo">
                      <p>{user.nickname}</p>
                      <p>성별 {user.gender}</p>
                      <p>score {user.mobum_score}</p>
                    </div>
                  </div>
                  <p>태그 {user.tag}</p>
                </div>
              </>
            );
          })}
          <Link to="/">나가기</Link>
          <Button
            type="default"
            size="large"
            onClick={() => {
              setRefresh(!refresh);
            }}
          >
            다른 행성 찾기
          </Button>
          <Button
            type="primary"
            size="large"
            onClick={() => {
              setConfirmed(true);
            }}
          >
            행성 착륙하기
          </Button>
        </RoomInfo>
      );
    }
  }
};

const RoomInfo = styled.div`
  width: 80%;
  height: 80%;
  position: absolute;
  left: 50%;
  top: 50%;
  margin-left: -40%;
  margin-top: -40%;
  .user-info {
    height: 10.286em;
    background: rgba(39, 35, 51, 0.97);
    border: 1px solid #ffffff;
    border-radius: 0.571em;
  }
  .profile {
    float: left;
    width: 40%;
    height: 100%;
    border-right: 1px solid #ffffff;
    padding: 1em;
  }
  .profile img {
    position: absolute;
    border-radius: 9.985em;
    float: left;
  }
  .profile .defaultInfo {
    width: 43%;
    float: right;
  }
`;

RoomUsers.propTypes = {
  roomId: string.isRequired,
};

export default RoomUsers;
