import React, { useRef, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import MyCamFooter from './MyCamFooter';
import { createStreamInstance } from '../../utils/streamInstance';
import {
  micStatusState,
  camStatusState,
  streamingState,
  displayStreamState,
} from '../../state/atom';

const PreviweMyCam = () => {
  const streamInstance = useRef(null);
  const [micStatus, setMicStatus] = useRecoilState(micStatusState);
  const [camStatus, setCamStatus] = useRecoilState(camStatusState);
  const [streaming, setStreaming] = useRecoilState(streamingState);
  const [displayStream, setDisplayStream] = useRecoilState(displayStreamState);

  const updateFromInstance = (key, value) => {
    if (key === 'streaming') setStreaming(value);
    if (key === 'displayStreaming') setDisplayStream(value);
  };

  console.log('micStatus : ', micStatus);
  console.log('camStatus : ', camStatus);
  console.log('streaming : ', streaming);
  console.log('displayStream : ', displayStream);

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
    <PreviewCam>
      <Spin
        indicator={<LoadingOutlined spin />}
        size="large"
        spinning={!streaming}
      >
        <div id="room-container">
          <div id="video-container" />
        </div>

        {streaming && (
          <MyCamFooter
            handleMyCam={handleMyCam}
            handleMyMic={handleMyMic}
            toggleScreenShare={toggleScreenShare}
          />
        )}
      </Spin>
    </PreviewCam>
  );
};

const PreviewCam = styled.div`
  height: 50%;
  .ant-spin-nested-loading {
    height: 100%;
  }
  .ant-spin-container {
    height: 100%;
  }
  #room-container {
    width: 100%;
    overflow: hidden;
  }
  #video-container {
    position: relative;
    padding-bottom: 56.2%;
  }
  video {
    -webkit-transform: scaleX(-1);
    transform: scaleX(-1);
    border-radius: 0.5em;
    position: absolute;
    object-fit: cover;
    width: 100%;
    height: 100%;
  }
`;

export default PreviweMyCam;
