import "../Panel.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faUser, faX } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { faFaceSadTear } from "@fortawesome/free-regular-svg-icons";
import { getUserChats } from "../../api";
import useUserStore from "../../store/UserStore";
import CreateChatModal from "./CreateChatModal";

function Chats({ openPanel }) {
  const [chats, setChats] = useState([
    // "John",
    // "John",
    // "John",
    // "John",
    // "John",
    // "John",
    // "John",
    // "John",
    // "John",
    // "John",
    // "John",
    // "John",
    // "John",
    // "John",
    // "John",
    // "John",
  ]);
  const { user } = useUserStore();
  const [friends, setFriends] = useState(user.friends);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    console.log(friends);
    // console.log(user);
    async function fetchChats() {
      const response = await getUserChats(user);
      // console.log(response);Z
    }
    fetchChats();
  }, []);

  return (
    <>
      <div
        className={`${
          openPanel ? "open" : ""
        } panel scrollbar text-white p-5 overflow-y-scroll`}
      >
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
            {chats.map((chat) => {
              return (
                <div className="flex flex-row items-center gap-5 p-2 hover:bg-gray-400 rounded-md border-white cursor-pointer">
                  <FontAwesomeIcon
                    icon={faUser}
                    className="rounded-full bg-gray-500 p-3"
                  />
                  {chat}
                  <FontAwesomeIcon icon={faX} className="" />
                </div>
              );
            })}
          </div>
        ) : (
          <div className="p-10 flex flex-col items-center gap-5 text-gray-400">
            <FontAwesomeIcon icon={faFaceSadTear} className="w-full h-full" />
            No chats yet...
          </div>
        )}

        {showPopup && (
          <CreateChatModal setShowPopup={setShowPopup} filteredFriends={friends}/>
        )}
      </div>
    </>
  );
}

export default Chats;
