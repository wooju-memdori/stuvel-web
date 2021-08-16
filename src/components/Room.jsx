import React, { useRef, useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { createSocketConnectionInstance } from '../socketConnection';
import { string } from 'prop-types';
import { Layout, Spin } from 'antd';
import 'antd/dist/antd.css';
import styled from 'styled-components';
import FootBar from './FootBar';
import { LoadingOutlined } from '@ant-design/icons';
import {
  micStatusState,
  camStatusState,
  streamingState,
  userDetailsState,
  displayStreamState,
} from '../state/atom';

export default function Room({ roomId }) {
  let socketInstance = useRef(null);
  const [micStatus, setMicStatus] = useRecoilState(micStatusState);
  const [camStatus, setCamStatus] = useRecoilState(camStatusState);
  const [streaming, setStreaming] = useRecoilState(streamingState);
  // 추후 로그인 기능을 위한 userDetails
  const [userDetails, setUserDetails] = useRecoilState(userDetailsState);
  const [displayStream, setDisplayStream] = useRecoilState(displayStreamState);

  useEffect(() => {
    return () => {
      socketInstance.current.destroyConnection();
    };
  }, []);

  useEffect(() => {
    startConnection();
  }, []);

  const startConnection = () => {
    socketInstance.current = createSocketConnectionInstance({
      updateInstance: updateFromInstance,
      userDetails,
      roomId: roomId,
    });
  };

  const updateFromInstance = (key, value) => {
    if (key === 'streaming') setStreaming(value);
    if (key === 'displayStreaming') setDisplayStream(value);
  };

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
      const { toggleVideoTrack } = socketInstance.current;
      const newStatus = !micStatus;
      setMicStatus(newStatus);
      toggleVideoTrack({ video: camStatus, audio: newStatus });
    }
  };

  const toggleScreenShare = () => {
    const { reInitializeStream, toggleVideoTrack } = socketInstance.current;
    displayStream && toggleVideoTrack({ video: false, audio: true });
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
    <>
      <Spin
        indicator={<LoadingOutlined spin />}
        size="large"
        spinning={!streaming}
      >
        <RoomContainer id="room-container"></RoomContainer>
        <Layout.Footer>
          {streaming && (
            <FootBar
              handleMyCam={handleMyCam}
              handleMyMic={handleMyMic}
              toggleScreenShare={toggleScreenShare}
            />
          )}
        </Layout.Footer>
      </Spin>
    </>
  );
}

Room.propTypes = {
  roomId: string.isRequired,
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
