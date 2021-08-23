import React, { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { string } from 'prop-types';
import { roomId, roomConfirmed, refresh } from '../state/atom';
import Room from '../components/Room';
import RoomPreview from '../components/RoomPreview';
import axios from '../utils/axios';

const RoomContainer = ({ match }) => {
  if (match.params.roomId) {
    return <Room roomId={match.params.roomId} />;
  }

  const [nowRoomId, setRoomId] = useRecoilState(roomId);
  const roomConfirmedValue = useRecoilValue(roomConfirmed);
  const refreshState = useRecoilValue(refresh);

  console.log(refreshState);

  const getNewRoomId = async () => {
    const response = await axios.get(`/room/`);
    setRoomId(response.data);
  };

  useEffect(() => {
    // 방 아직 확정 안했으면 방 번호 새로 구하기
    // 케이스 1. 처음 들어왔을때 2. 다른 행성 찾기 버튼 눌렀을 때
    if (!roomConfirmedValue) {
      getNewRoomId();
    }
  }, [refreshState]);

  // 방이 확정되었을 경우 케이스 1. 착륙하기 버튼 눌렀을 때
  if (roomConfirmedValue) {
    return <Room roomId={nowRoomId} />;
  }

  switch (nowRoomId) {
    case null:
      return <div>행성을 찾는 중..</div>;
    default:
      return <RoomPreview roomId={nowRoomId} />;
  }
};

RoomContainer.propTypes = {
  match: string.isRequired,
};

export default RoomContainer;
