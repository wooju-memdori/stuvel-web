import { useEffect } from 'react';
import { useSetRecoilState, useRecoilState } from 'recoil';
import { usersState, localStream, peersInfoState } from '../state/atom';
import {
  getPeer,
  disconnectSocket,
  initSocket,
  onUserConnectedSocket,
} from '../ws';

const useSocket = (roomId, userId) => {
  const setUsers = useSetRecoilState(usersState);
  const [peersInfo, setPeersInfo] = useRecoilState(peersInfoState);

  const socketCommincation = () => {
    onUserConnectedSocket((otherId) => {
      setUsers((oldUsers) => [...oldUsers, userId]);
      listenPeer(otherId);
    });
  };

  const listenPeer = (otherId) => {
    let call = peersInfo[otherId].call;

    if (!call) {
      call = getPeer().call(userId);
      onCallPeer((call) => {
        setPeersInfo((prevState) => ({
          ...prevState,
          [userId]: { call },
        }));
      });
    }

    call.on('stream', (userVideoStream) => {
      addVideoStream(video, userVideoStream);
    });

    call.on('close', () => {
      video.remove();
    });
  };

  useEffect(() => {
    initSocket(roomId, userId);
    socketCommincation();
    return () => {
      disconnectSocket();
      socketCommincation();
    };
  }, [localStream]);

  return null;
};

export default useSocket;
