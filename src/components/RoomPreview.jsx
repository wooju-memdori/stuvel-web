import React from 'react';
import styled from 'styled-components';
// import { useRecoilValue } from 'recoil';
import RoomUsers from './RoomUsers';
import PreviewMyCam from './PreivewMyCam';
// import { roomIdState } from '../state/atom';
import { RoomPlanetIcon } from './Icon';

const RoomPreview = () => {
  // const nowRoomId = useRecoilValue(roomIdState);
  return (
    <RoomPreviewPage>
      <div className="mycam">
        <div className="room-id">
          <RoomPlanetIcon />
          행성 A-3923을 찾았습니다.
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
  width: 100%;
  height: 100%;
  .mycam {
    float: left;
    width: 43.5%;
    height: 100%;
    padding: 4.3%;
  }
  .room-id {
    font-size: 1.714em;
    margin-bottom: 2.15em;
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
