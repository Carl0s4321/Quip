import { useEffect, useState } from "react";
import "../Panel.css";
import SearchBar from "../SearchBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
import { createChat } from "../../api";
import useUserStore from "../../store/UserStore";
import { fetchUserInfo } from "../../utils/userUtils";

function PotentialChat({
  friend,
  selectedFriend,
  setSelectedFriend,
  setShowErr,
}) {
  const [userInfo, setUserInfo] = useState();
  useEffect(() => {
    async function getUserInfo() {
      const response = await fetchUserInfo(friend);
      setUserInfo(response);
    }
    getUserInfo();
  }, []);

  return (
    <div
      onClick={() => {
        setSelectedFriend(friend);
        setShowErr(false);
      }}
      key={friend}
      className={`${
        selectedFriend === friend ? " border-2 border-white border-solid" : ""
      } flex flex-row p-2 px-4 cursor-pointer justify-between hover:bg-black rounded-md`}
    >
      <p>
        {userInfo?.user?.name}
        <sub className="ml-1 text-gray-200">#{userInfo?.formattedId}</sub>
      </p>
    </div>
  );
}

function CreateChatModal({ filteredFriends, setShowPopup }) {
  const [selectedFriend, setSelectedFriend] = useState();
  const [searchString, setSearchString] = useState("");
  const [showErr, setShowErr] = useState(false);
  const { user } = useUserStore();

  async function handleSubmit(e) {
    e.preventDefault();
    if (Object.keys(selectedFriend).length === 0 || selectedFriend === null) {
      setShowErr(true);
    } else {
      const response = await createChat(user._id, selectedFriend);
      console.log(response);
      //   console.log(selectedFriend.name, selectedFriend.id);
      setShowPopup(false);
    }
  }
  return (
    <div className="modal ">
      <h1 className="text-xl font-semibold">Select Friend</h1>
      <SearchBar
        searchString={searchString}
        setSearchString={setSearchString}
        placeholder={"Type the id of the friend"}
      />
      {showErr && (
        <div className="w-full my-3 flex justify-center items-center gap-3 text-red-400">
          <FontAwesomeIcon icon={faTriangleExclamation} />
          No friend selected!
        </div>
      )}
      <form onSubmit={handleSubmit} className="flex flex-col gap-y-2">
        <div className="max-h-[150px] overflow-y-scroll scrollbar">
          {filteredFriends.map((filteredFriend) => {
            if (
              searchString &&
              !filteredFriend.toLowerCase().includes(searchString.toLowerCase())
            ) {
              return null;
            }
            return (
              <PotentialChat
                key={filteredFriend}
                setSelectedFriend={setSelectedFriend}
                selectedFriend={selectedFriend}
                friend={filteredFriend}
                setShowErr={setShowErr}
              />
            );
          })}
        </div>
        <button type="submit" className="custom-button">
          Create a Chat
        </button>
      </form>
    </div>
  );
}

export default CreateChatModal;
