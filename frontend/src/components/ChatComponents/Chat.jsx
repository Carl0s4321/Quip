import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faX } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { getUser } from "../../api";

function Chat({ chat, user, setShowChatRoom, setSelectedChat}) {
  const [receiverUser, setReceiverUser] = useState(null);
  const [showXbutton, setShowXButton] = useState(false);

  // get the other person's id
  const receiverId = chat?.members.find((id) => id !== user._id);
  const lastUpdatedDate = new Date(chat.lastUpdated).toLocaleDateString();

  useEffect(() => {
    async function getUserInfo(receiverId) {
      const response = await getUser(receiverId);
      setReceiverUser(response);
    }
    getUserInfo(receiverId);
  }, []);

  if (!receiverUser) {
    return <>Loading...</>;
  }

  return (
    <div
      onMouseEnter={() => {
        setShowXButton(true);
      }}
      onMouseLeave={() => {
        setShowXButton(false);
      }}
      onClick={() => {
        setShowChatRoom(true);
        setSelectedChat(chat);
      }}
      className="flex flex-row items-center gap-5 p-2 px-3 hover:bg-black rounded-md border-white cursor-pointer"
    >
      <FontAwesomeIcon icon={faUser} className="rounded-full bg-gray-500 p-3" />
      <div className="flex flex-col gap-y-1">
        <p>{receiverUser.name}</p>
        <p className="text-xs text-gray-400">{lastUpdatedDate}</p>
      </div>
      {showXbutton && (
        <FontAwesomeIcon
          icon={faX}
          className="ml-auto text-gray-400 hover:text-white p-2"
        />
      )}
    </div>
  );
}

export default Chat;
