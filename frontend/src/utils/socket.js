import { io } from 'socket.io-client';

const socket = io("http://localhost:3000", {
    autoConnect: false, // no auto connect on import
  });

export default socket;
