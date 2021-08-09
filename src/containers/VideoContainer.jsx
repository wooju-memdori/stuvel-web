import React from 'react';
import { useRecoilState } from 'recoil';
import VideoItem from '../components/Video';
import { localStream } from '../state/atom';

const VideoContainer = () => {
  const [localStreamValue, setLocalStream] = useRecoilState(localStream);

  function closeStream() {
    setLocalStream(null);

    localStreamValue.getTracks().forEach(function (track) {
      track.stop();
    });
  }

  function openStream() {
    navigator.mediaDevices
      .getUserMedia({
        video: true,
      })
      .then((stream) => {
        setLocalStream(stream);
      });
  }

  return (
    <div>
      <button
        type="button"
        onClick={localStreamValue ? closeStream : openStream}
      >
        카메라 키기
      </button>
      <VideoItem stream={localStreamValue} />
    </div>
  );
};

export default VideoContainer;
