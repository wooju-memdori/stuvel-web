import { useEffect } from 'react';
import { useSetRecoilState, useRecoilState, useRecoilValue } from 'recoil';
import { userState, usersState, peersInfoState } from '../state/atom';
import {
  disconnectSocket,
  initSocket,
  onUserConnectedSocket,
  onCallPeer,
  onStreamOpenedSocket,
  onStreamClosedSocket,
  getSocket,
} from '../ws';

const useSocket = (roomId, userId) => {
  const setUsers = useSetRecoilState(usersState);
  const [peersInfo, setPeersInfo] = useRecoilState(peersInfoState);
  const [user, setUser] = useRecoilState(userState);

  const socketCommincation = () => {
    onUserConnectedSocket((otherId) => {
      console.log(`${otherId} joined the room`);
      setPeersInfo({
        ...peersInfo,
        [otherId]: null,
      });
      setUsers((oldUsers) => [...oldUsers, otherId]);
    });

    // otherId가 stream open했다는 소켓 메시지
    onStreamOpenedSocket((otherId) => {
      console.log(`${otherId}'s stream opened`);
      listenPeer(otherId);
    });

    // otherId가 stream close 했다는 소켓 메시지
    onStreamClosedSocket((otherId) => {
      console.log(`${otherId}'s stream closed`);
    });
  };

  const listenPeer = (otherId) => {
    onCallPeer((call) => {
      console.log('onCallPeer');

      call.on('stream', (userVideoStream) => {
        console.log(`onStream`);
        setPeersInfo({
          ...peersInfo,
          [otherId]: {
            call: call,
            stream: userVideoStream,
          },
        });
        console.log(`${otherId}의 stream을 추가하였습니다.`);
      });
    });
  };

  useEffect(() => {
    initSocket(roomId, (id) => {
      setUser(id);
      getSocket().emit('join-room', roomId, id);
      listenPeer();
    });
    socketCommincation();
    return () => {
      disconnectSocket();
      socketCommincation();
    };
  }, []);

  return null;
};

export default useSocket;