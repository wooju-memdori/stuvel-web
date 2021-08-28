import React from 'react';
import styled from 'styled-components';
import RoomUsers from './RoomUsers';
import PreviewMyCam from './PreivewMyCam';

const RoomPreview = () => {
  return (
    <RoomPreviewPage>
      <div className="mycam">
        <PreviewMyCam />
      </div>
      <div className="room-users">
        <RoomUsers />
      </div>
    </RoomPreviewPage>
  );
};

const RoomPreviewPage = styled.div`
  .mycam {
    float: left;
    width: 40%;
  }
  .room-users {
    float: right;
    width: 60%;
  }
`;

export default RoomPreview;
