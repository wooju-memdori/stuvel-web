import React from 'react';
import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import RoomUsers from './RoomUsers';
import PreviewMyCam from './PreivewMyCam';
import { roomIdState } from '../state/atom';

const RoomPreview = () => {
  const nowRoomId = useRecoilValue(roomIdState);
  return (
    <RoomPreviewPage>
      <div className="mycam">
        <h1>행성 {nowRoomId}을 찾았습니다.</h1>
        <PreviewMyCam />
      </div>
      <div className="room-info">
        <RoomUsers className="room-users" />
      </div>
    </RoomPreviewPage>
  );
};

const RoomPreviewPage = styled.div`
  width: 100%;
  height: 100%;
  .mycam {
    float: left;
    width: 40%;
    height: 100%;
  }
  .room-info {
    float: right;
    width: 60%;
    height: 100%;
    border-left: 1px solid #ffffff;
    background: #0b0016;
    padding: 5em;
    position: relative;
  }
  .room-users {
    position: absolute;
    left: 50%;
    top: 50%;
    margin-left: -20.25em;
  }
`;

export default RoomPreview;
