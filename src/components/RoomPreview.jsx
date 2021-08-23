import React, { useRef, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import MyCamFooter from './MyCamFooter';
import RoomUsers from './RoomUsers';
import { createStreamInstance } from '../utils/streamInstance';
import {
  micStatusState,
  camStatusState,
  streamingState,
  displayStreamState,
} from '../state/atom';

const RoomPreview = () => {
  const streamInstance = useRef(null);
  const [micStatus, setMicStatus] = useRecoilState(micStatusState);
  const [camStatus, setCamStatus] = useRecoilState(camStatusState);
  const [streaming, setStreaming] = useRecoilState(streamingState);
  const [displayStream, setDisplayStream] = useRecoilState(displayStreamState);

  const updateFromInstance = (key, value) => {
    if (key === 'streaming') setStreaming(value);
    if (key === 'displayStreaming') setDisplayStream(value);
  };

  const startStream = () => {
    streamInstance.current = createStreamInstance({
      updateInstance: updateFromInstance,
    });
  };

  useEffect(() => {
    startStream();
    return () => {
      streamInstance.current.destroyConnection();
    };
  }, []);

  const handleMyCam = () => {
    if (!displayStream) {
      const { toggleVideoTrack } = streamInstance.current;
      const newStatus = !camStatus;
      setCamStatus(newStatus);
      toggleVideoTrack({ video: newStatus, audio: micStatus });
    }
  };

  const handleMyMic = () => {
    if (!displayStream) {
      const { toggleAudioTrack } = streamInstance.current;
      const newStatus = !micStatus;
      setMicStatus(newStatus);
      toggleAudioTrack({ video: camStatus, audio: newStatus });
    }
  };

  const toggleScreenShare = () => {
    const { reInitializeStream, toggleVideoTrack } = streamInstance.current;
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
    <div>
      <Spin
        indicator={<LoadingOutlined spin />}
        size="large"
        spinning={!streaming}
      >
        <RoomContainer id="room-container" />
        {streaming && (
          <MyCamFooter
            handleMyCam={handleMyCam}
            handleMyMic={handleMyMic}
            toggleScreenShare={toggleScreenShare}
          />
        )}
      </Spin>
      <RoomUsers />
    </div>
  );
};

const RoomContainer = styled.div`
  width: 50%;
  video {
    -webkit-transform: scaleX(-1);
    transform: scaleX(-1);
    width: 100%;
    height: 100%;
  }
`;

export default RoomPreview;
