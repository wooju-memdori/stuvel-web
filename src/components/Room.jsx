import React, { useRef, useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { string, func } from 'prop-types';
// import { Spin } from 'antd';
// import { LoadingOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';
import styled from 'styled-components';
import Footer from './Footer';
// eslint-disable-next-line
import { createSocketConnectionInstance } from '../utils/socketConnection';

import {
  micStatusState,
  camStatusState,
  streamingState,
  userDetailsState,
  displayStreamState,
  roomIdState,
} from '../state/atom';

export default function Room({ paramRoomId }) {
  const [roomId, setRoomId] = useRecoilState(roomIdState);
  if (paramRoomId) {
    setRoomId(paramRoomId);
  }
  const socketInstance = useRef(null);
  const [micStatus, setMicStatus] = useRecoilState(micStatusState);
  const [camStatus, setCamStatus] = useRecoilState(camStatusState);
  const [streaming, setStreaming] = useRecoilState(streamingState);
  // 추후 로그인 기능이 구현되면 userDetails에 로그인 유저 정보 넣을 것
  const userDetails = useRecoilValue(userDetailsState);
  const [displayStream, setDisplayStream] = useRecoilState(displayStreamState);

  const updateFromInstance = (key, value) => {
    if (key === 'streaming') setStreaming(value);
    if (key === 'displayStreaming') setDisplayStream(value);
  };

  const startConnection = () => {
    socketInstance.current = createSocketConnectionInstance({
      updateInstance: updateFromInstance,
      userDetails,
      roomId,
      camStatus,
      micStatus,
      streaming,
      displayStream,
    });
  };

  useEffect(() => {
    startConnection();
    return () => {
      socketInstance.current.destroyConnection();
    };
  }, []);

  const handleMyCam = () => {
    if (!displayStream) {
      const { toggleVideoTrack } = socketInstance.current;
      const newStatus = !camStatus;
      setCamStatus(newStatus);
      toggleVideoTrack({ video: newStatus, audio: micStatus });
    }
  };

  const handleMyMic = () => {
    if (!displayStream) {
      const { toggleAudioTrack } = socketInstance.current;
      const newStatus = !micStatus;
      setMicStatus(newStatus);
      toggleAudioTrack({ video: camStatus, audio: newStatus });
    }
  };

  const toggleScreenShare = () => {
    const { reInitializeStream, toggleVideoTrack } = socketInstance.current;
    if (displayStream) toggleVideoTrack({ video: false, audio: true });
    reInitializeStream(
      false,
      true,
      !displayStream ? 'displayMedia' : 'userMedia',
    ).then(() => {
      setDisplayStream(!displayStream);
      setCamStatus(false);
    });
  };

  return (
    <RoomPage>
      {/* <Spin
        indicator={<LoadingOutlined spin />}
        size="large"
        spinning={!streaming}
      > */}
      <div id="room-div">
        <RoomContainer id="room-container" />
      </div>
      {streaming && (
        <Footer
          handleMyCam={handleMyCam}
          handleMyMic={handleMyMic}
          toggleScreenShare={toggleScreenShare}
          roomId={roomId}
        />
      )}
      {/* </Spin> */}
    </RoomPage>
  );
}

Room.propTypes = {
  paramRoomId: string.isRequired,
};

Footer.propTypes = {
  handleMyCam: func.isRequired,
  handleMyMic: func.isRequired,
  toggleScreenShare: func.isRequired,
};

const RoomPage = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  .ant-layout-footer {
    position: absolute;
    width: 100%;
    bottom: 0%;
    height: 15%;
  }
  #room-div {
    width: 80%;
    height: 75%;
    position: absolute;
    top: 7%;
    left: 10%;
  }
`;

const RoomContainer = styled.div`
  width: 100%;
  display: grid;
  grid-gap: 6px 6px;
  grid-template-columns: repeat(auto-fit, minmax(400px, auto));
  grid-template-rows: repeat(auto-fit, minmax(100px, auto));
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  & > * {
    width: 100%;
    height: 0;
  }
  .user-container {
    padding-bottom: 56.2%;
    position: relative;
  }
  .video-container {
    position: absolute;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .video-container h3 {
    position: absolute;
    bottom: 0.2%;
    z-index: 1;
    width: 50%;
    margin: 0;
    left: 3%;
    font-weight: 700;
  }
  .user-container:first-child:nth-last-child(1) {
    .video-container h3 {
      font-size: 2.5em;
    }
  }
  .black-nemo {
    position: absolute;
    bottom: 0;
    z-index: 1;
    width: 50%;
  }
  .other div {
    backface-visibility: hidden;
    transition: 1s;
  }
  .other .video-container {
    position: absolute;
    transform: rotateY(0deg);
  }
  .other:active .video-container {
    transform: rotateY(180deg);
  }
  .other .user-info {
    width: 100%;
    height: 100%;
    position: absolute;
    transform: rotateY(-180deg);
    background-color: #0b0016;
    border: 0.125em solid #fff;
    box-sizing: border-box;
    border-radius: 0.5em;
    padding: 1.438em 2.5em;
  }
  .user-info > * {
    height: 100%;
    display: inline-block;
  }
  .profile {
    float: left;
    height: 43%;
    width: 30%;
  }
  .profile img {
    height: 100%;
    border-radius: 9.985em;
  }
  .default-info {
    width: 60%;
    height: 45%;
  }
  .default-info h3 {
    font-size: 1.5em;
    font-weight: 700;
  }
  @media (min-width: 1900px) {
    .default-info h3 {
      font-size: 2em;
      font-weight: 700;
    }
    .default-info span {
      font-size: 1.5em;
    }
  }
  .gender-img {
    position: relative;
    left: 0.7em;
  }
  .score-img {
    position: relative;
    left: 1.4em;
  }
  .tags {
    width: 80%;
    height: 40%;
    position: relative;
    top: 1.3em;
  }
  .other:active .user-info {
    transform: rotateY(0deg);
  }
  video {
    backface-visibility: hidden;
    -webkit-transform: scaleX(-1);
    transform: scaleX(-1);
    width: 100%;
    height: 100%;
    object-fit: cover;
    border: 0.125em solid #000000;
    box-sizing: border-box;
    border-radius: 0.5em;
  }
  .display-media {
    -webkit-transform: scaleX(1);
    transform: scaleX(1);
  }
`;
