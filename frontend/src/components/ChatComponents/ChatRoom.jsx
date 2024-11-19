import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { getMessages, createMessage } from "../../api";
import Message from "./Message";
import "../Panel.css";
import useUserStore from "../../store/UserStore";
import useSocketStore from "../../store/SocketStore";

function ChatRoom({ setShowChatRoom, selectedChat }) {
  console.log(selectedChat);
  const { socket } = useSocketStore();

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState(null);
  const [inputMessage, setInputMessage] = useState("");
  const { user } = useUserStore();

  function joinChat(chatId) {
    socket.emit("joinChat", chatId);
  }

  useEffect(() => {
    async function fetchMessages() {
      const response = await getMessages(selectedChat);
      if (response.error) {
        console.error(response.error);
      } else {
        // console.log("MESSAGES", response);
        setMessages(response);
      }
    }

    joinChat(selectedChat._id);
    fetchMessages();
  }, [selectedChat, user]);

  // sending message
  useEffect(() => {
    if (socket === null) return;
    if (newMessage){
      console.log('in send message useeffect,' , newMessage)
      socket.emit("sendMessage", selectedChat._id, newMessage);
    }
  }, [newMessage]);


  // receiving message
  useEffect(() => {
    socket.on("getMessage", (newMessage) => {
      setMessages((prev) => [...prev, newMessage]);
    });

    return () => {
      socket.off("getMessage");
    };
  }, [socket, selectedChat]);

  async function handleCreateMessage(e) {
    e.preventDefault();

    const response = await createMessage(
      selectedChat._id,
      user._id,
      inputMessage
    );
    if (response.error) {
      console.error(response.error);
    } else {
      setInputMessage("");
      setNewMessage(response);
      console.log(response);
    }
  }

  return (
    <div className="w-full h-full overflow-x-hidden">
      <div className="flex items-center justify-between mb-4">
        <FontAwesomeIcon
          onClick={() => {
            setShowChatRoom(false);
          }}
          icon={faArrowLeft}
          className="cursor-pointer fixed z-[999]"
        />
        <span className="flex-1 text-center">ChatRoom</span>
      </div>
      <div className="h-[80%] mb-2 overflow-y-scroll overflow-x-hidden scrollbar flex flex-col gap-y-2">
        {messages.map((message, index) => {
          return <Message key={index} message={message} />;
        })}
      </div>
      <form
        onSubmit={handleCreateMessage}
        className="text-black flex flex-row gap-2 w-full"
      >
        <input
          placeholder="Message"
          className="rounded-full outline-none pl-6 w-1/2 grow"
          value={inputMessage}
          onChange={(e) => {
            setInputMessage(e.target.value);
          }}
          required
        />
        <button type="submit" className="bg-lightBlue rounded-full shrink-0">
          <FontAwesomeIcon
            icon={faPaperPlane}
            className="text-white p-2 text-2xl"
          />
        </button>
      </form>
    </div>
  );
}

export default ChatRoom;
