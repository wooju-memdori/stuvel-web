import React from 'react';
import { useRecoilValueLoadable } from 'recoil';
import { roomId } from '../state/atom';
import Room from '../components/Room';

const RoomContainer = ({ match }) => {
  if (match.params.roomId) {
    return <Room roomId={match.params.roomId} />;
  }

  const roomIdLoadable = useRecoilValueLoadable(roomId());

  switch (roomIdLoadable.state) {
    case 'loading':
      return <div>Loading...</div>;
    case 'hasError':
      return <div>잘못된 접근입니다..</div>;
    default: {
      return <Room roomId={roomIdLoadable.contents} />;
    }
  }
};

export default RoomContainer;
