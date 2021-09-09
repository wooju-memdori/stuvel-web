import React from 'react';
import { Layout, Button, message } from 'antd';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { func, string } from 'prop-types';
import {
  camStatusState,
  micStatusState,
  displayStreamState,
} from '../state/atom';

const TextAlignCentered = styled.div`
  text-align: center;
`;

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
        <Button onClick={handleMyCam}>
          {camStatus ? 'Disable Cam' : 'Enable Cam'}
        </Button>
        <Button onClick={handleMyMic}>
          {micStatus ? 'Disable Mic' : 'Enable Mic'}
        </Button>
        <Button onClick={toggleScreenShare}>
          {displayStream ? 'Stop Screen Share' : 'Share Screen'}
        </Button>
        <Button onClick={copy}>Invite Link</Button>
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

export default Footer;
