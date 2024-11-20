import { updateUser, deleteUser } from "../api";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faPencil } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import SearchBar from "../components/SearchBar";
import AddFriend from "../components/AddFriendComponents/AddFriend";
import useUserStore from "../store/UserStore";
import Friend from "../components/AddFriendComponents/Friend";
import auth from "../utils/auth";

export function Profile() {
  const { user } = useUserStore();
  const [userTemp, setuserTemp] = useState(user);
  const [editable, setEditable] = useState(false);
  const [searchString, setSearchString] = useState("");
  const [friends, setFriends] = useState(user.friends);
  const [showAddFriend, setShowAddFriend] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    
  }, []);

  function handleChange(e) {
    setuserTemp({ ...userTemp, [e.target.name]: e.target.value });
  }

  function handleDelete() {
    const response = deleteUser(userTemp._id);
    sessionStorage.removeItem("User");
    delete axios.defaults.headers.common["Authorization"];
    navigate("/");
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const response = await updateUser(userTemp);
    if (response.error) {
      console.error(response.error);
    } else {
      auth.setToken(response.token)
    }

    setEditable(!editable);
  }

  return (
    <>
      {showAddFriend ? (
        <AddFriend
          setShowAddFriend={setShowAddFriend}
          showAddFriend={showAddFriend}
        />
      ) : (
        <div className="flex w-full justify-center items-center mt-20">
          <div className="w-3/4 bg-red-500 flex flex-col md:flex-row gap-x-16 items-center md:items-start">
            <div className="flex flex-col gap-y-3 items-center mb-4 md:mb-0">
              <div className="w-[150px] h-[150px] rounded-full bg-gray-500 flex items-center justify-center">
                <FontAwesomeIcon
                  icon={faUser}
                  className="text-6xl text-gray-700"
                />
              </div>
              <div
                onClick={() => {
                  setEditable(!editable);
                }}
                className="flex flex-row items-center gap-x-2 cursor-pointer"
              >
                <FontAwesomeIcon icon={faPencil} />
                <span>Edit</span>
              </div>
            </div>
            <div className="flex flex-col items-center md:items-start">
              <h1 className="font-bold text-3xl">My Profile</h1>
              <p>{user._id}</p>
              <form
                onSubmit={handleSubmit}
                className="flex flex-col mt-5 gap-4"
              >
                <div className="flex flex-col">
                  <span>NAME</span>
                  <input
                    className={`mt-1 p-2 border rounded-md focus:outline-none ${
                      editable
                        ? "border-gray-300 bg-white"
                        : "border-gray-300 bg-gray-100"
                    }`}
                    disabled={!editable}
                    value={userTemp.name}
                    name="name"
                    onChange={(e) => {
                      handleChange(e);
                    }}
                    required
                    type="text"
                  />
                </div>
                <div className="flex flex-col">
                  <span>EMAIL</span>
                  <input
                    className={`mt-1 p-2 border rounded-md focus:outline-none ${
                      editable
                        ? "border-gray bg-white"
                        : "border-gray bg-gray-100"
                    }`}
                    disabled={!editable}
                    value={userTemp.email}
                    name="email"
                    onChange={(e) => {
                      handleChange(e);
                    }}
                    required
                    type="email"
                  />
                </div>
                {editable && (
                  <button className="p-2 rounded-xl bg-green-400">SAVE</button>
                )}
              </form>
              <button>Reset Password</button>
              <button
                onClick={handleDelete}
                className="p-2 bg-red-800 rounded-xl"
              >
                Delete Account
              </button>
            </div>
            <div className="flex grow flex-col items-center md:items-start">
              <div className="flex flex-row items-center justify-between w-full">
                <h1 className="font-bold text-3xl text-center mb-2">
                  My Friends
                </h1>
                <button
                  onClick={() => {
                    setShowAddFriend(!showAddFriend);
                  }}
                  className="p-2 bg-lightBlue text-white rounded-md"
                >
                  Add Friend
                </button>
              </div>
              <SearchBar
                placeholder={"Type id of the friend"}
                searchString={searchString}
                setSearchString={setSearchString}
              />
              <div className="max-h-[250px] w-full overflow-y-scroll custom-scrollbar overflow-x-hidden">
                {friends.map((friend, index) => {
                  if (
                    searchString &&
                    !friend.toLowerCase().includes(searchString.toLowerCase())
                  ) {
                    return null;
                  }

                  return <Friend key={index} friend={friend} />;
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
