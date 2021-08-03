import React, { useState } from 'react';
import styled from 'styled-components';
import io from 'socket.io-client';
import Peer from 'peer';

const socket = io('http://localhost:3000/room');

// let server to generate own client id
const myPeer = new Peer(undefined, {
  host: '/',
  port: '3001',
});

const VideoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, 300px);
  grid-auto-rows: 300px;
`;

const peers = {};

function addVideoStream(video, stream) {
  // HTMLMediaElement.srcObject : MediaStream
  video.srcObject = stream;
  video.addEventListener('loadedmetadata', () => {
    video.play();
  });
  VideoGrid.append(video);
}

// <이전>
// localhost:3000/room:roomId 를 주소창에 친다.
// 그러면 서버가 room.ejs 에 있는 프론트 페이지를 내려준다.
// <지금>
// localhost:3003/room:roomId를 주소창에 친다.
// 클라이언트가

function connectToNewUser(userId, stream) {
  const call = myPeer.call(userId, stream);
  const video = document.createElement('video');

  call.on('stream', (userVideoStream) => {
    addVideoStream(video, userVideoStream);
  });
  call.on('close', () => {
    video.remove();
  });

  peers[userId] = call;
}

const Room = () => {
  // 1. connectToNewUser - 내가 서버에 연결됐지만 캠이 연결안된상태 [False]
  // 2. addVideoStream - 캠이 연결됨 [True]
  // 3. connectToNewUser - 내가 서버에 연결됐지만 캠이 연결안된상태 [True, False]
  // 4. addVideoStream - 캠이 연결됨 [True, True]
  // 5. remove - 내가 캠을 끔 [True]
  const [videoExist, setVideoExist] = useState([false]);

  const myVideo = document.createElement('video');
  myVideo.muted = true;

  // navigator: 현재 머무르고 있는 브라우저의 정보를 얻을 수 있는 엘리먼트
  // navigator.mediaDevices: 카메라, 마이크, 화면공유와 같이 현재 연결된 미디어 입력 장치에 접근할 수 있는 MediaDevice객체 반환
  navigator.mediaDevices
    // 사용자에게 입력장치 사용권한을 요청, 사용자가 수락하면 요청한 미디어 종류의 트랙을 포함한 MediaStream객체 반환
    // MediaStream 객체로 이행하는 Promise
    .getUserMedia({
      video: true,
      audio: true,
    })
    // stream 사용
    .then((stream) => {
      addVideoStream(myVideo, stream);

      // receive the call
      myPeer.on('call', (call) => {
        call.answer(stream);
        const video = document.createElement('video');
        call.on('stream', (userVideoStream) => {
          addVideoStream(video, userVideoStream);
        });
      });

      socket.on('user-connected', (userId) => {
        connectToNewUser(userId, stream);
      });
    });

  socket.on('user-disconnected', (userId) => {
    if (peers[userId]) peers[userId].close();
  });

  return <VideoGrid />;
};

export default Room;
