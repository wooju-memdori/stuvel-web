import React, { useState } from 'react';
import { Layout, Button, message } from 'antd';
import { useRecoilValue } from 'recoil';
import {
  camStatusState,
  micStatusState,
  displayStreamState,
} from '../state/atom';

const FootBar = ({ handleMyCam, handleMyMic, toggleScreenShare, roomId }) => {
  const camStatus = useRecoilValue(camStatusState);
  const micStatus = useRecoilValue(micStatusState);
  const displayStream = useRecoilValue(displayStreamState);

  const copy = () => {
    navigator.clipboard
      .writeText(`http://localhost:3002/room/${roomId}`)
      .then(() => message.success('Invitation link copied!'))
      .catch(() => message.error('Browser not support clipboard api'));
  };

  return (
    <Layout.Footer>
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
    </Layout.Footer>
  );
};

export default FootBar;
