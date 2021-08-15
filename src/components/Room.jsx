import React, { useRef, useEffect, useState, useLayoutEffect } from 'react';
import { createSocketConnectionInstance } from '../socketConnection';
import { string } from 'prop-types';
import { Layout, Button, Spin } from 'antd';
import 'antd/dist/antd.css';
import UserPopup from './UserPopup';
import styled from 'styled-components';
import { LoadingOutlined } from '@ant-design/icons';

export default function Room({ roomId }) {
  let socketInstance = useRef(null);
  const [micStatus, setMicStatus] = useState(true);
  const [camStatus, setCamStatus] = useState(true);
  const [streaming, setStreaming] = useState(false);
  const [userDetails, setUserDetails] = useState(null);
  const [displayStream, setDisplayStream] = useState(false);

  useEffect(() => {
    return () => {
      socketInstance.current.destroyConnection();
    };
  }, []);

  useEffect(() => {
    startConnection();
  }, []);

  // invoke the connection class to start the call
  const startConnection = () => {
    let params = { quality: 12 };
    socketInstance.current = createSocketConnectionInstance({
      updateInstance: updateFromInstance,
      params,
      userDetails,
      roomId: roomId,
    });
  };

  const updateFromInstance = (key, value) => {
    if (key === 'streaming') setStreaming(value);
    if (key === 'displayStreaming') setDisplayStream(value);
  };

  const handleDisconnect = () => {
    socketInstance.current?.destroyConnection();
    props.history.push('/');
  };

  const handleMyCam = () => {
    if (!displayStream) {
      const { toggleVideoTrack } = socketInstance.current;
      setCamStatus(!camStatus);
      toggleVideoTrack({ video: camStatus, audio: micStatus });
    }
  };

  const handleUserDetails = (userDetails) => {
    setUserDetails(userDetails);
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
          <div>
            {streaming && (
              <>
                <Button onClick={handleMyCam}>
                  {camStatus ? 'Disable Cam' : 'Enable Cam'}
                </Button>
                <Button onClick={toggleScreenShare}>
                  {displayStream ? 'Stop Screen Share' : 'Share Screen'}
                </Button>
                {camStatus ? (
                  <div>your cam is on</div>
                ) : (
                  <div>your cam is off</div>
                )}
              </>
            )}
          </div>
        </Layout.Footer>
        <UserPopup submitHandle={handleUserDetails}></UserPopup>
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
