import React, { useEffect } from 'react';
import { useRecoilState, useRecoilValueLoadable } from 'recoil';
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
        <div>
          <h1>이곳은 {nowRoomId}번 행성입니다.</h1>
          {roomUsers.map((user) => {
            return (
              <div>
                <img src={user.image} alt="" width="100px" />
                <h3>{user.nickname}</h3>
                <p>성별 {user.gender}</p>
                <p>태그 {user.tag}</p>
                <p>lv. {user.level}</p>
                <p>score {user.mobum_score}</p>
              </div>
            );
          })}
          <Link to="/">돌아가기</Link>
          <Button
            type="default"
            size="large"
            onClick={() => {
              setRefresh(!refresh);
            }}
          >
            다른 행성 찾아보기
          </Button>
          <Button
            type="primary"
            size="large"
            onClick={() => {
              setConfirmed(true);
            }}
          >
            착륙하기
          </Button>
        </div>
      );
    }
  }
};

RoomUsers.propTypes = {
  roomId: string.isRequired,
};

export default RoomUsers;
