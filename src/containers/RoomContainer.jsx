import React from 'react';
import { useRecoilValueLoadable } from 'recoil';
import { getRoomId } from '../state/room';
import Room from '../components/Room';

const RoomContainer = () => {
  const roomIdLoadable = useRecoilValueLoadable(getRoomId());

  switch (roomIdLoadable.state) {
    case 'loading':
      return <div>Loading...</div>;
    case 'hasError':
      return <div>잘못된 접근입니다..</div>;
    default:
      console.log(`roomId: ${roomIdLoadable.contents}`);
      return <Room roomId={roomIdLoadable.contents} />;
  }
};

export default RoomContainer;
