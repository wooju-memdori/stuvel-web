import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import axios from 'axios';
import io from 'socket.io-client';
import Peer from 'peerjs';
import Video from './VideoItem';

const RoomContainer = () => {
  console.log(
    'roomcontainer',
  );

  const [localStream, setLocalStream] = useState(null);
  const [roomId, setRoomId] = useState(typeof (useParams()) === 'string' ? useParams() : null);
  const serverAddress = 'http://localhost:3000';

  console.log(useParams());

  const myPeer = new Peer(undefined, {
    host: '/',
    port: 3001,
  });

  let getRoomId;

  useEffect(() => {
    console.log('useEffect');
    if (!roomId) {
      getRoomId = async () => {
        const res = await axios.get(`${serverAddress}/room/`);
        setRoomId(res.data);
        console.log(res.data);
      };
      getRoomId();
    } else {
      navigator.mediaDevices
        .getUserMedia({
          video: true,
        })
        .then((stream) => {
          setLocalStream(stream);
        });
    }
  }, []);

  if (roomId) {
    console.log(`roomId${roomId}`);
    useHistory().push(`/room/${roomId}`);
  }

  const socket = io(`${serverAddress}/room`);

  // when connect to peer server and get back id, emit this id and room id
  myPeer.on('open', (id) => {
    socket.emit('join-room', roomId, id);
  });

  return (
    <>
      { localStream && <Video stream={localStream} />}
    </>
  );
};

export default RoomContainer;
