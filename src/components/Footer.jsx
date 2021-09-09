/* eslint-disable prettier/prettier */
import React from 'react';
import { Layout, message } from 'antd';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { func, string } from 'prop-types';
import {
  camStatusState,
  micStatusState,
  displayStreamState,
} from '../state/atom';
import {
  CamIcon,
  MicIcon,
  NoCamIcon,
  ScreenShareIcon,
  NoMicIcon,
  NoScreenShareIcon,
  LinkShareIcon,
  ExitIcon
} from './Icon';

const Footer = ({ handleMyCam, handleMyMic, toggleScreenShare, roomId }) => {
  const camStatus = useRecoilValue(camStatusState);
  const micStatus = useRecoilValue(micStatusState);
  const displayStream = useRecoilValue(displayStreamState);

  const copy = () => {
    navigator.clipboard
      .writeText(`${window.location.host}/room/${roomId}`)
      .then(() => message.success('Invitation link copied!'))
      .catch(() => message.error('Browser not support clipboard api'));
  };
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
        <div className="cam-handle">
          <LinkShareIcon
            onClick={copy}
            className="handle-icon"
          />
          <p>링크복사</p>
        </div>
        <div className="cam-handle">
          <ExitIcon />
          <p>나가기</p>
        </div>
      </TextAlignCentered>
    </Layout.Footer>
  );
};

Footer.propTypes = {
  handleMyCam: func.isRequired,
  handleMyMic: func.isRequired,
  toggleScreenShare: func.isRequired,
  roomId: string.isRequired,
};

const TextAlignCentered = styled.div`
  text-align: center;
  .cam-handle {
    display: inline-block;
    margin: 0 1%;
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

export default Footer;
