import { create } from "zustand";
import { io } from "socket.io-client";

const socket = io("http://localhost:3000", { autoConnect: false });

const useSocketStore = create((set) => ({
  isConnected: false,
  socket,

  connectSocket: () => {
    if (!socket.connected) {
      socket.connect();
      socket.on("connect", () => {
        console.log("client connected: ", socket.id);
        set({ isConnected: true });
      });
    }
  },

  disconnectSocket: () => {
    if (socket.connected) {
      console.log(socket.id, "disconnected");
      socket.disconnect();
      set({ isConnected: false });
    }
  },
}));

export default useSocketStore;
