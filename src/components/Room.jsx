import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import io from 'socket.io-client';
import Peer from 'peerjs';
import Video from './VideoItem';

const Room = () => {
  let { roomId } = useParams();
  const [localStream, setLocalStream] = useState();
  const serverAddress = 'http://localhost:3000';

  const myPeer = new Peer(undefined, {
    host: '/',
    port: 3001,
  });

  console.log(myPeer);

  console.log(`roomId: ${roomId}`);

  // localhost:3002/room
  // roomId = 10035
  // localhost:3002/room/10035
  if (!roomId) {
    roomId = axios.get(`${serverAddress}/room`)
      .then();
    console.log(roomId);
  }

  const socket = io(`${serverAddress}/room`);

  // when connect to peer server and get back id, emit this id and room id
  myPeer.on('open', (id) => {
    socket.emit('join-room', roomId, id);
  });

  // 무한루프: state변경되어서 렌더링 될때마다 호출되는데, 호출되는 메서드 안에
  // 그 상태를 set해주니까 무한루프
  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({
        video: true,
      })
      .then((stream) => {
        setLocalStream(stream);
      });
  }, []);

  return (
    <>
      <Video stream={localStream} />
    </>
  );
};

export default Room;
