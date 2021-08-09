import React from 'react';
import { useRecoilValue } from 'recoil';
import { socket } from '../state/atom';
import VideoContainer from '../containers/VideoContainer';

export default function Room(roomId) {
  const socketValue = useRecoilValue(socket(roomId));
  console.log(socketValue);
  return <VideoContainer />;
}
