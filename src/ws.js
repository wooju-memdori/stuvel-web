import openSocket from 'socket.io-client';
import Peer from 'peerjs';

const socketURL = 'http://localhost:3000/room';
let socket;
let peer;

export function initSocket(roomId, userId) {
  socket = openSocket(socketURL);
  socket.emit('join-room', roomId, userId);
}

export function initPeer() {
  peer = new Peer();
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
