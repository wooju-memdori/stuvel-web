import React, { useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import VideoItem from '../components/Video';
import {
  userState,
  localStream,
  peersInfoState,
  usersState,
} from '../state/atom';
import { getPeer, getSocket } from '../ws';

const VideoContainer = ({ roomId }) => {
  const [localStreamValue, setLocalStream] = useRecoilState(localStream);
  const [peersInfo, setPeersInfo] = useRecoilState(peersInfoState);
  const [users, setUsers] = useRecoilState(usersState);
  const user = useRecoilValue(userState);

  function closeStream() {
    setLocalStream(null);

    localStreamValue.getTracks().forEach(function (track) {
      track.stop();
    });
  }

  function openStream() {
    const myPeer = getPeer();
    const socket = getSocket();

    navigator.mediaDevices
      .getUserMedia({
        video: true,
      })
      .then((stream) => {
        setLocalStream(stream);
        console.log(user);
        socket.emit('stream-opened', roomId, user);

        for (let otherId in users) {
          myPeer.call(otherId, stream);
          console.log('called');
          /*
          let call = peersInfoState[otherId]
            ? peersInfoState[otherId].call
            : null;
          if (call) {
            call.answer(stream);
            console.log('answered');
          } else {
          }
          */
        }
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
      {localStreamValue ? (
        <VideoItem stream={localStreamValue} />
      ) : (
        <div>카메라 꺼짐</div>
      )}
      {Object.keys(peersInfo).map((otherId) =>
        peersInfo[otherId] ? (
          <VideoItem key={otherId} stream={peersInfo[otherId].stream} />
        ) : (
          <div>{otherId}는 stream이 없습니다.</div>
        ),
      )}
    </div>
  );
};

export default VideoContainer;
