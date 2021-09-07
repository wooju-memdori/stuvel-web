import openSocket from 'socket.io-client';
import Peer from 'peerjs';
import axios from '../utils/axios';

let socketInstance = null;
let peers = {};

class SocketConnection {
  // 컴포넌트에서 SocketConnection을 생성할 때 파라미터로 settings 객체를 준다.
  constructor(settings) {
    this.videoContainer = {};
    this.settings = settings;
    this.streaming = false;
    this.myId = '';
    this.myUserInfo = null; // stuvel에서 사용하는 userId
    this.myPeer = initializePeerConnection();
    this.socket = initializeSocketConnection();
    if (this.socket) this.isSocketConnected = true;
    if (this.myPeer) this.isPeersConnected = true;
    // stuvel-api와 소켓 통신 시작
    this.initializeSocketEvents();
    // 피어 서버와 소켓 통신 시작
    this.initializePeersEvents(settings.roomId);
  }

  initializeSocketEvents = () => {
    this.socket.on('connect', () => {
      console.log('socket connected');
    });
    this.socket.on('user-disconnected', (userId) => {
      console.log('user disconnected: closing peers', userId);
      peers[userId] && peers[userId].close();
      this.removeVideo(userId);
    });
    this.socket.on('disconnect', () => {
      console.log('socket disconnected');
    });
    this.socket.on('error', (err) => {
      console.log('socket error: ', err);
    });
    this.socket.on('display-media', (data) => {
      if (data.value)
        checkAndAddClass(this.getMyVideo(data.userID), 'displayMedia');
      else checkAndAddClass(this.getMyVideo(data.userID), 'userMedia');
    });
  };

  initializePeersEvents = (roomId) => {
    this.myPeer.on('open', async (id) => {
      const { userDetails } = this.settings;
      this.myId = id;
      const userData = {
        userID: id,
        roomID: roomId,
        ...userDetails,
      };
      console.log('peers established and joined room', userData);
      const response = await axios.post(`./room/${roomId}`);
      this.myUserInfo = response.data.userInfo;
      console.log(this.myUserInfo);
      this.socket.emit('join-room', roomId, id, this.myUserInfo);
      this.setNavigatorToStream();
    });
    this.myPeer.on('error', (err) => {
      console.log('peer connection error', err);
      this.myPeer.reconnect();
    });
  };

  setNavigatorToStream = () => {
    // navigator 로부터 음성/영상 stream을 가져옴
    this.getVideoAudioStream().then((stream) => {
      // stream이 있다면 이걸 state를 변경하고
      if (stream) {
        this.streaming = true;
        this.settings.updateInstance('streaming', true);
        // stream과 id로 비디오 element 생성
        this.createVideo({ id: this.myId, userInfo: null, stream });
        // peer 이벤트 리스너
        // 다른 유저가 보낸 stream을 듣고 peer.answer(stream)으로 로컬 스트림 응답함
        this.setPeersListeners(stream);
        // 스트림을 보내고 peers에 있는 userId들을 통해 현재 peer 연결을 모니터링
        this.newUserConnection(stream);
      }
    });
  };

  getVideoAudioStream = (video = true, audio = true) => {
    const myNavigator =
      navigator.mediaDevices.getUserMedia ||
      navigator.mediaDevices.webkitGetUserMedia ||
      navigator.mediaDevices.mozGetUserMedia ||
      navigator.mediaDevices.msGetUserMedia;
    return myNavigator({
      video: video
        ? {
          frameRate: 12,
          noiseSuppression: true,
        }
        : false,
      audio: audio,
    });
  };

  setPeersListeners = (stream) => {
    this.myPeer.on('call', (call) => {
      call.answer(stream);
      call.on('stream', (userVideoStream) => {
        this.createVideo({
          id: call.metadata.id,
          userInfo: call.metadata.userInfo,
          stream: userVideoStream,
        });
      });
      call.on('close', () => {
        console.log('closing peers listeners', call.metadata.id);
        this.removeVideo(call.metadata.id);
      });
      call.on('error', () => {
        console.log('peer error ------');
        this.removeVideo(call.metadata.id);
      });
      peers[call.metadata.id] = call;
    });
  };

  newUserConnection = (stream) => {
    console.log('newUserConnection');
    this.socket.on('user-connected', (peerId, userInfo) => {
      console.log('New User Connected', peerId, userInfo);
      console.log('userID 가져왔어요~', userInfo);
      this.connectToNewUser(peerId, userInfo, stream);
    });
  };

  connectToNewUser(peerId, userInfo, stream) {
    const call = this.myPeer.call(peerId, stream, {
      metadata: { id: this.myId, userInfo: this.myUserInfo },
    });
    call.on('stream', (userVideoStream) => {
      this.createVideo({
        id: peerId,
        userInfo: userInfo,
        stream: userVideoStream,
      });
    });
    call.on('close', () => {
      console.log('closing new user', peerId);
      this.removeVideo(peerId);
    });
    call.on('error', () => {
      console.log('peer error ------');
      this.removeVideo(peerId);
    });
    peers[peerId] = call;
  }

  createVideo = (createObj) => {
    if (!this.videoContainer[createObj.id]) {
      this.videoContainer[createObj.id] = {
        ...createObj,
      };
      const roomContainer = document.getElementById('room-container');
      const userContainer = document.createElement('div');
      userContainer.className = 'user-container';
      const videoContainer = document.createElement('div');
      videoContainer.className = 'video-container';
      const video = document.createElement('video');
      video.srcObject = this.videoContainer[createObj.id].stream;
      video.id = createObj.id;
      video.autoplay = true;
      if (this.myId === createObj.id) video.muted = true;
      videoContainer.appendChild(video);
      userContainer.appendChild(videoContainer);
      if (createObj.userInfo) {
        const userInfoDiv = document.createElement('div');
        userContainer.className += 'oher;   
        this.createUserInfo(userInfoDiv, createObj.userInfo);
        userContainer.appendChild(userInfoDiv);
      }
      roomContainer.appendChild(userContainer);
    } else {
      if (document.getElementById(createObj.id)) {
        document.getElementById(createObj.id).srcObject = createObj.stream;
      }
    }
  };

  createUserInfo = (userInfoDiv, userInfo) => {
    userInfoDiv.className = 'user-info';
    const nickname = document.createElement('p');
    nickname.innerText = userInfo.nickname;
    const gender = document.createElement('p');
    gender.innerText = userInfo.gender;
    const image = document.createElement('img');
    image.src = userInfo.image;
    const tag = document.createElement('p');
    tag.innerText = userInfo.tag;
    const mobumScore = document.createElement('p');
    mobumScore.innerText = userInfo.mobumScore;
    userInfoDiv.appendChild(nickname);
    userInfoDiv.appendChild(gender);
    userInfoDiv.appendChild(image);
    userInfoDiv.appendChild(tag);
    userInfoDiv.appendChild(mobumScore);
  };

  // 화면 공유를 위해 현재 stream을 화면 공유 stream으로 변경
  // 우선 타입을 확인해서 userMedia타입이면 캠과 마이크로부터 스트리밍할 것이고,
  // 화면공유라면 getDisplayMedia()로부터 얻은 display stream을 스트리밍
  // cam 이나 mic를 끄거나 킬 것
  reInitializeStream = (video, audio, type = 'userMedia') => {
    const media =
      type === 'userMedia'
        ? this.getVideoAudioStream(video, audio) // 캠
        : navigator.mediaDevices.getDisplayMedia(); // 화면공유
    return new Promise((resolve) => {
      media.then((stream) => {
        const myVideo = this.getMyVideo();
        if (type === 'displayMedia') {
          this.toggleVideoTrack({ audio, video });
          this.listenToEndStream(stream, { video, audio });
          this.socket.emit('display-media', true);
        }
        checkAndAddClass(myVideo, type);
        this.createVideo({ id: this.myId, stream });
        replaceStream(stream);
        resolve(true);
      });
    });
  };

  removeVideo = (id) => {
    console.log('removeVideo', id);
    delete this.videoContainer[id];
    const video = document.getElementById(id);
    if (video) {
      video.closest('div').remove();
      video.remove();
    }
  };

  destroyConnection = () => {
    const myMediaTracks = this.videoContainer[this.myId]?.stream.getTracks();
    myMediaTracks?.forEach((track) => {
      track.stop();
    });
    socketInstance?.socket.disconnect();
    this.myPeer.destroy();
  };

  getMyVideo = (id = this.myId) => {
    return document.getElementById(id);
  };

  listenToEndStream = (stream, status) => {
    const videoTrack = stream.getVideoTracks();
    if (videoTrack[0]) {
      videoTrack[0].onended = () => {
        this.socket.emit('display-media', false);
        this.reInitializeStream(status.video, status.audio, 'userMedia');
        this.settings.updateInstance('displayStream', false);
        this.toggleVideoTrack(status);
      };
    }
  };

  toggleVideoTrack = ({ video, audio }) => {
    const myVideo = this.getMyVideo();
    if (myVideo && !video) {
      myVideo.srcObject?.getVideoTracks().forEach((track) => {
        if (track.kind === 'video') {
          !video && track.stop();
        }
      });
    } else if (myVideo) {
      this.reInitializeStream(video, audio);
    }
  };

  toggleAudioTrack = ({ video, audio }) => {
    const myVideo = this.getMyVideo();
    if (myVideo)
      myVideo.srcObject?.getAudioTracks().forEach((track) => {
        if (track.kind === 'audio') track.enabled = audio;
        audio ? this.reInitializeStream(video, audio) : track.stop();
      });
  };
}

const initializePeerConnection = () => {
  return new Peer();
};

const initializeSocketConnection = () => {
  return openSocket.connect(`${process.env.REACT_APP_API_URL}/room`, {
    secure: true,
    reconnection: true,
    rejectUnauthorized: false,
    reconnectionAttempts: 10,
  });
};

const replaceStream = (mediaStream) => {
  Object.values(peers).map((peer) => {
    peer.peerConnection?.getSenders().map((sender) => {
      if (sender.track.kind == 'audio') {
        if (mediaStream.getAudioTracks().length > 0) {
          sender.replaceTrack(mediaStream.getAudioTracks()[0]);
        }
      }
      if (sender.track.kind == 'video') {
        if (mediaStream.getVideoTracks().length > 0) {
          sender.replaceTrack(mediaStream.getVideoTracks()[0]);
        }
      }
    });
  });
};

const checkAndAddClass = (video, type = 'userMedia') => {
  if (video?.classList?.length === 0 && type === 'displayMedia') {
    video.classList.add('display-media');
    return;
  }
  video.classList.remove('display-media');
};

export const createSocketConnectionInstance = (settings = {}) => {
  return (socketInstance = new SocketConnection(settings));
};
