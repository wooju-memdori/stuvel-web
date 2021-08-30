import React from 'react';
import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import RoomUsers from './RoomUsers';
import PreviewMyCam from './PreivewMyCam';
import { roomIdState } from '../state/atom';
import { RoomPlanetIcon } from './Icon';

const RoomPreview = () => {
  const nowRoomId = useRecoilValue(roomIdState);
  return (
    <RoomPreviewPage>
      <div className="mycam">
        <div className="room-id">
          <RoomPlanetIcon />
          <span id="room-no-sen">
            행성 <span id="room-no">{nowRoomId}</span>을 찾았습니다.
          </span>
        </div>
        <PreviewMyCam />
      </div>
      <div className="room-info">
        <RoomUsers className="room-users" />
      </div>
    </RoomPreviewPage>
  );
};

const RoomPreviewPage = styled.div`
  overflow: hidden;
  width: 100%;
  height: 100%;
  #room-no-sen {
    font-size: 1em;
  }
  #room-no {
    font-size: 1.5em;
    font-weight: 900;
  }
  .mycam {
    float: left;
    width: 43.5%;
    height: 90%;
    padding: 8% 2.5%;
  }
  .room-id {
    font-size: 1.714em;
    height: 20%;
  }
  .room-id .anticon {
    top: 1em;
    position: relative;
    margin-right: 0.7em;
  }
  .room-info {
    float: right;
    width: 56.5%;
    height: 100%;
    border-left: 1px solid #ffffff;
    background: #0b0016;
    position: relative;
  }
`;

export default RoomPreview;
