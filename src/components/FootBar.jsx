import React from 'react';
import { Button } from 'antd';
import { useRecoilValue } from 'recoil';
import { camStatusState, displayStreamState } from '../state/atom';

const FootBar = ({ handleMyCam, toggleScreenShare }) => {
  const camStatus = useRecoilValue(camStatusState);
  const displayStream = useRecoilValue(displayStreamState);

  return (
    <>
      <Button onClick={handleMyCam}>
        {camStatus ? 'Disable Cam' : 'Enable Cam'}
      </Button>
      <Button onClick={toggleScreenShare}>
        {displayStream ? 'Stop Screen Share' : 'Share Screen'}
      </Button>
      {camStatus ? <div>your cam is on</div> : <div>your cam is off</div>}
    </>
  );
};

export default FootBar;
