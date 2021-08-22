import React from 'react';
import { useRecoilValueLoadable, useRecoilValue } from 'recoil';
import { roomId, roomConfirmed } from '../state/atom';
import Room from '../components/Room';
import RoomPreview from '../components/RoomPreview';

const RoomContainer = ({ match }) => {
  if (match.params.roomId) {
    return <Room roomId={match.params.roomId} />;
  }

  const roomIdLoadable = useRecoilValueLoadable(roomId());
  const roomConfirmedValue = useRecoilValue(roomConfirmed);

  switch (roomIdLoadable.state) {
    case 'loading':
      return <div>Loading...</div>;
    case 'hasError':
      return <div>잘못된 접근입니다..</div>;
    default: {
      return roomConfirmedValue ? (
        <Room roomId={roomIdLoadable.contents} />
      ) : (
        <RoomPreview roomId={roomIdLoadable.contents} />
      );
    }
  }
};

export default RoomContainer;
