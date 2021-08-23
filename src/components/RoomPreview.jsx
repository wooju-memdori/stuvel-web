import React from 'react';
import { useRecoilState, useRecoilValueLoadable } from 'recoil';
import { string } from 'prop-types';
import { Button } from 'antd';
import { Link } from 'react-router-dom';
import { roomUsersInfo, roomConfirmed, refresh } from '../state/atom';

const RoomPreview = ({ roomId }) => {
  const usersInfo = useRecoilValueLoadable(roomUsersInfo(roomId));
  const setConfirmed = useRecoilState(roomConfirmed)[1];
  const [refreshState, setRefresh] = useRecoilState(refresh);

  switch (usersInfo.state) {
    case 'loading':
      return <div>Loading...</div>;
    case 'hasError':
      return <div>잘못된 접근입니다..</div>;
    default: {
      const roomUsers = usersInfo.contents;
      return (
        <div>
          <h1>이곳은 {roomId}번 행성입니다.</h1>
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
          <Button type="default" size="large" as={Link} to="/">
            돌아가기
          </Button>
          <Button
            type="default"
            size="large"
            onClick={() => {
              setRefresh(!refreshState);
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

RoomPreview.propTypes = {
  roomId: string.isRequired,
};

export default RoomPreview;
