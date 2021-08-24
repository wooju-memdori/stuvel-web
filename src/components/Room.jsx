import React, { useRef, useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { string } from 'prop-types';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
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
    <Spin
      indicator={<LoadingOutlined spin />}
      size="large"
      spinning={!streaming}
    >
      <RoomContainer id="room-container" />
      {streaming && (
        <Footer
          handleMyCam={handleMyCam}
          handleMyMic={handleMyMic}
          toggleScreenShare={toggleScreenShare}
          roomId={roomId}
        />
      )}
    </Spin>
  );
}

Room.propTypes = {
  paramRoomId: string.isRequired,
};

const RoomContainer = styled.div`
  background-color: black;
  display: grid;
  height: calc(100vh - 64px);
  grid-gap: 6px 6px;
  grid-template-columns: repeat(auto-fit, minmax(400px, auto));
  grid-template-rows: repeat(auto-fit, minmax(100px, auto));
  & > * {
    width: 100%;
    height: 100%;
  }
  video {
    -webkit-transform: scaleX(-1);
    transform: scaleX(-1);
    width: 100%;
    height: 100%;
  }
  .display-media {
    -webkit-transform: scaleX(1);
    transform: scaleX(1);
  }
`;
