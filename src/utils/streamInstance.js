import axios from './axios';

let streamInstance = null;   

class StreamInstance {
  // 컴포넌트에서 SocketConnection을 생성할 때 파라미터로 settings 객체를 준다.
  constructor(settings) {
    this.videoContainer = {};
    this.settings = settings;
    this.streaming = false;
    this.myId = '0';
    this.setNavigatorToStream();


    


  }

  setNavigatorToStream = () => {
    // navigator 로부터 음성/영상 stream을 가져옴
    this.getVideoAudioStream().then((stream) => {
      // stream이 있다면 이걸 state를 변경하고
      if (stream) {
        this.streaming = true;
        this.settings.updateInstance('streaming', true);
        // stream과 id로 비디오 element 생성
        this.createVideo({ id: this.myId, stream });
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

  createVideo = (createObj) => {
    if (!this.videoContainer[createObj.id]) {
      this.videoContainer[createObj.id] = {
        ...createObj,
      };
      const videoContainer = document.getElementById('video-container');
      const video = document.createElement('video');
      video.srcObject = this.videoContainer[createObj.id].stream;
      video.id = createObj.id;
      video.autoplay = true;
      if (this.myId === createObj.id) video.muted = true;
      videoContainer.appendChild(video);
    } else {
      if (document.getElementById(createObj.id)) {
        document.getElementById(createObj.id).srcObject = createObj.stream;
      }
    }
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
        }
        checkAndAddClass(myVideo, type);
        this.createVideo({ id: this.myId, stream });
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

const checkAndAddClass = (video, type = 'userMedia') => {
  if (video?.classList?.length === 0 && type === 'displayMedia') {
    video.classList.add('display-media');
    return;
  }
  video.classList.remove('display-media');
};

export const createStreamInstance = (settings = {}) => {
  return (streamInstance = new StreamInstance(settings));
};
