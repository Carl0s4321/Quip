import { useState } from "react";
import "../Panel.css";
import SearchBar from "../SearchBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
import { createChat } from "../../api";
import useUserStore from "../../store/UserStore";

function CreateChatModal({ filteredFriends, setShowPopup }) {
  const [selectedFriend, setSelectedFriend] = useState({});
  const [searchString, setSearchString] = useState("");
  const [showErr, setShowErr] = useState(false);
  const {user} = useUserStore();

  async function handleSubmit(e) {
    e.preventDefault();
    if (
      Object.keys(selectedFriend).length === 0 ||
      selectedFriend.name === null ||
      selectedFriend.id === null
    ) {
      setShowErr(true);
    } else {
        const response = await createChat(user._id, selectedFriend.id)
        console.log(response)
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
        placeholder={"Type the name of the friend"}
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
              !(
                filteredFriend.name
                  .toLowerCase()
                  .includes(searchString.toLowerCase()) ||
                filteredFriend.id
                  .toLowerCase()
                  .includes(searchString.toLowerCase())
              )
            ) {
              return null;
            }
            let formattedId = filteredFriend.id.slice(-4);
            return (
              <div
                onClick={() => {
                  setSelectedFriend(filteredFriend);
                  setShowErr(false);
                }}
                key={filteredFriend.id}
                className={`${
                  selectedFriend.id === filteredFriend.id
                    ? " border-2 border-white border-solid"
                    : ""
                } flex flex-row p-2 px-4 cursor-pointer justify-between hover:bg-black rounded-md`}
              >
                <p>
                  {filteredFriend.name}
                  <sub className="ml-1 text-gray-200">#{formattedId}</sub>
                </p>
              </div>
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
