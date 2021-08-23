import React from 'react';
import { Layout, Button } from 'antd';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { func } from 'prop-types';
import {
  camStatusState,
  micStatusState,
  displayStreamState,
} from '../state/atom';

const TextAlignCentered = styled.div`
  text-align: center;
`;

const MyCamFooter = ({ handleMyCam, handleMyMic, toggleScreenShare }) => {
  const camStatus = useRecoilValue(camStatusState);
  const micStatus = useRecoilValue(micStatusState);
  const displayStream = useRecoilValue(displayStreamState);

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
      </TextAlignCentered>
    </Layout.Footer>
  );
};

MyCamFooter.propTypes = {
  handleMyCam: func.isRequired,
  handleMyMic: func.isRequired,
  toggleScreenShare: func.isRequired,
};

export default MyCamFooter;
