import "../Panel.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faUser, faX } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { faFaceSadTear } from "@fortawesome/free-regular-svg-icons";
import { getUserChats } from "../../api";
import useUserStore from "../../store/UserStore";
import CreateChatModal from "./CreateChatModal";
import Chat from "./Chat";
import ChatRoom from "./ChatRoom";

function Chats({ openPanel }) {
  const [chats, setChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState();
  const { user } = useUserStore();
  const [friends, setFriends] = useState(user.friends);
  const [showPopup, setShowPopup] = useState(false);
  const [showChatRoom, setShowChatRoom] = useState(false);
  const [filteredFriends, setFilteredFriends] = useState([]);
  const [receiverUser, setReceiverUser] = useState(null);

  useEffect(() => {
    // console.log(friends);
    // console.log(user);

    async function fetchChats() {
      const response = await getUserChats(user);
      // console.log(response)
      if (response) {
        setChats(response);
      } else {
        console.error("iun chats useeffects");
      }
      // console.log(response);Z
    }

    // returns friends who dont have a chat with the curr user yet
    setFilteredFriends(
      friends.filter(
        (friend) => !chats.some((chat) => chat.members.includes(friend.id))
      )
    );
    fetchChats();
  }, [user]);

  return (
    <>
      <div
        className={`${
          openPanel ? "open" : ""
        } panel scrollbar text-white p-5 overflow-y-scroll`}
      >
        {showChatRoom ? (
          <ChatRoom
            setShowChatRoom={setShowChatRoom}
            selectedChat={selectedChat}
          />
        ) : (
          <>
            <button
              onClick={() => {
                setShowPopup(!showPopup);
              }}
              className="flex flex-row items-center w-fit p-2 rounded-md gap-2 hover:bg-primary mb-3"
            >
              New Chat
              <FontAwesomeIcon icon={faPlus} />
            </button>
            {chats.length > 0 ? (
              <div className="flex flex-col">
                {chats.map((chat, index) => {
                  return (
                    <Chat
                      setReceiverUser={setReceiverUser}
                      receiverUser={receiverUser}
                      setSelectedChat={setSelectedChat}
                      key={index}
                      chat={chat}
                      user={user}
                      setShowChatRoom={setShowChatRoom}
                    />
                  );
                })}
              </div>
            ) : (
              <div className="p-10 flex flex-col items-center gap-5 text-gray-400">
                <FontAwesomeIcon
                  icon={faFaceSadTear}
                  className="w-full h-full"
                />
                No chats yet...
              </div>
            )}

            {showPopup && (
              <CreateChatModal
                setShowPopup={setShowPopup}
                filteredFriends={filteredFriends}
              />
            )}
          </>
        )}
      </div>
    </>
  );
}

export default Chats;
