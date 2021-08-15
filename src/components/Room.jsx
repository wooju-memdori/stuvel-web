import React, { useEffect } from 'react';
import { string, object, isRequired } from 'prop-types';
import VideoContainer from '../containers/VideoContainer';
import useSocket from '../hooks/useSocket';

export default function Room({ roomId }) {
  // 로그인 기능 구현 이전
  useSocket(roomId);
  return (
    <>
      <div>방번호: {roomId}</div>
      <VideoContainer roomId={roomId} />
    </>
  );
}

Room.propTypes = {
  roomId: string.isRequired,
};
