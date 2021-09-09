/* eslint-disable prettier/prettier */
import React from 'react';
import { Layout } from 'antd';
import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import { func } from 'prop-types';
import {
  CamIcon,
  MicIcon,
  NoCamIcon,
  ScreenShareIcon,
  NoMicIcon,
  NoScreenShareIcon,
} from './Icon';
import {
  camStatusState,
  micStatusState,
  displayStreamState,
} from '../state/atom';

const TextAlignCentered = styled.div`
  text-align: center;
  .cam-handle {
    display: inline-block;
    margin: 0 3%;
  }
  .handle-icon svg circle {
    transition: 0.2s;
  }
  .handle-icon svg:hover {
    circle {
      fill: #34006a;
    }
  }
`;

const MyCamFooter = ({ handleMyCam, handleMyMic, toggleScreenShare }) => {
  const camStatus = useRecoilValue(camStatusState);
  const micStatus = useRecoilValue(micStatusState);
  const displayStream = useRecoilValue(displayStreamState);

  return (
    <Layout.Footer>
      <TextAlignCentered>
        <div className="cam-handle">
          {camStatus ? (
            <CamIcon onClick={handleMyCam} className="handle-icon" />
          ) : (
            <NoCamIcon onClick={handleMyCam} />
          )}
          <p>캠</p>
        </div>

        <div className="cam-handle">
          {micStatus ? (
            <MicIcon onClick={handleMyMic} className="handle-icon" />
          ) : (
            <NoMicIcon onClick={handleMyMic} />
          )}

          <p>마이크</p>
        </div>
        <div className="cam-handle">
          {displayStream ? (
            <ScreenShareIcon
              onClick={toggleScreenShare}
              className="handle-icon"
            />
          ) : (
            <NoScreenShareIcon onClick={toggleScreenShare} />
          )}

          <p>화면공유</p>
        </div>
      </TextAlignCentered>
    </Layout.Footer>
  );
};

MyCamFooter.propTypes = {
  handleMyCam: func.isRequired,
  handleMyMic: func.isRequired,
  toggleScreenShare: func.isRequired,
};

const TextAlignCentered = styled.div`
  text-align: center;
  .cam-handle {
    display: inline-block;
    margin: 0 3%;
  }
  .handle-icon svg circle {
    transition: 0.2s;
  }
  .handle-icon svg:hover {
    circle {
      fill: #34006a;
    }
  }
`;

export default MyCamFooter;
