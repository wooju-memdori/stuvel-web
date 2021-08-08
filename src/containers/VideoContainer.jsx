import React from 'react';
import { useRecoilState } from 'recoil';
import VideoItem from '../components/VideoItem';
import { localStream } from '../state/room';

// 8시: => 2시간 공부..
const VideoContainer = () => {
  const [localSt, setLocalStream] = useRecoilState(localStream);

  function closeStream() {
    setLocalStream(null);

    localSt.getTracks().forEach(function (track) {
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
      <button type="button" onClick={localSt ? closeStream : openStream}>
        카메라 키기
      </button>
      <VideoItem stream={localSt} />
    </div>
  );
};

export default VideoContainer;
