import openSocket from 'socket.io-client';
import Peer from 'peerjs';

const socketURL = 'http://localhost:3000/room';
let socket;
let peer;
let userId;

export function initSocket(roomId, cb) {
  socket = openSocket(socketURL);
  peer = new Peer();
  let userId;
  peer.on('open', cb);
  return userId;
}

export function getSocket() {
  return socket;
}

export function getPeer() {
  return peer;
}

export function onUserConnectedSocket(cb) {
  return new Promise((resolve, reject) => {
    if (socket) {
      socket.on('user-connected', cb);
    } else {
      reject();
    }
  });
}

export function onStreamOpenedSocket(cb) {
  return new Promise((resolve, reject) => {
    console.log('stream open listener');
    if (socket) {
      socket.on('stream-opened', cb);
    } else {
      reject();
    }
  });
}

export function onStreamClosedSocket(cb) {
  return new Promise((resolve, reject) => {
    if (socket) {
      socket.on('stream-closed', cb);
    } else {
      reject();
    }
  });
}

export function onCallPeer(cb) {
  return new Promise((resolve, reject) => {
    if (peer) {
      peer.on('call', cb);
    } else {
      reject();
    }
  });
}

export function disconnectSocket() {
  socket.disconnect();
}
