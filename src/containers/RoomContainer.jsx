import React from 'react';
import { useRecoilValue } from 'recoil';
import { string } from 'prop-types';
import { roomConfirmedState } from '../state/atom';
import Room from '../components/Room';
import RoomPreview from '../components/RoomPreview';

const RoomContainer = ({ match }) => {
  if (match.params.roomId) {
    return <Room paramRoomId={match.params.roomId} />;
  }

  const roomConfirmedValue = useRecoilValue(roomConfirmedState);

  // 방이 확정되었을 경우 케이스 1. 착륙하기 버튼 눌렀을 때
  if (roomConfirmedValue) {
    return <Room />;
  }

  return <RoomPreview />;
};

RoomContainer.propTypes = {
  match: string.isRequired,
};

export default RoomContainer;
