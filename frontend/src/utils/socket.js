import { io } from 'socket.io-client';

// init socket
const socket = io('http://localhost:3000', { autoConnect: false });

export const connectSocket = () => {
  console.log(socket.connected)

  if (!socket.connected) {
    socket.connect();
    socket.on('connect', () => {console.log('client connected: ', socket.id)});
  }
};

export const disconnectSocket = () => {
  if (socket.connected) {
    console.log(socket.id, 'disconnected')
    socket.disconnect();
  }
};

export default socket;
