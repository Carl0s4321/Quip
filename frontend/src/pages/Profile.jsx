import { updateUser, deleteUser} from "../api";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faPencil, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import useUserStore from "../store/UserStore";
import SearchBar from "../components/SearchBar";
import AddFriend from "../components/AddFriendComponents/AddFriend";

export function Profile() {
  const {user} = useUserStore();
  const [userS, setUserS] = useState({name: "", email: "" });
  const [editable, setEditable] = useState(false);
  const [searchString, setSearchString] = useState('');
  const [friends, setFriends] = useState(user.friends)
  const [showAddFriend, setShowAddFriend] = useState(false)

  const navigate = useNavigate();
  useEffect(() => {
    if(user){
      setUserS(user)
    }
  }, []);

  function handleChange(e) {
    setUserS({ ...userS, [e.target.name]: e.target.value });
  }

  function handleDelete(){
    const response = deleteUser(userS._id)
    sessionStorage.removeItem("User")
    delete axios.defaults.headers.common["Authorization"];
    navigate("/")
  }

  async function handleSubmit(e){
    e.preventDefault()
    const response = await updateUser(userS._id, userS)
    // console.log(response)
    if(response.data.success){
        sessionStorage.setItem("User", response.data.token)
        setUserS(jwtDecode(response.data.token))
    }
    setEditable(!editable)
  }

  async function handleAddFriend(){
    
  }

  return (
    <>
      {showAddFriend ? (<>
        <AddFriend setShowAddFriend={setShowAddFriend} showAddFriend={showAddFriend}/>
      </>) : (<>
      
        <div className="flex flex-col justify-center items-center">
          <div className="p-10 bg-red-500 flex flex-col md:flex-row justify-center items-center md:items-start gap-x-20">
            <div className="flex flex-col gap-y-3 items-center mb-4 md:mb-0">
              <div className="w-[150px] h-[150px] rounded-full bg-gray-500 flex items-center justify-center">
                <FontAwesomeIcon icon={faUser} className="text-6xl text-gray-700" />
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
              <form onSubmit={handleSubmit} className="flex flex-col mt-5 gap-4">
                <div className="flex flex-col">
                  <span>NAME</span>
                  <input
                    className={`mt-1 p-2 border rounded-md focus:outline-none ${
                      editable
                      ? "border-gray-300 bg-white"
                      : "border-gray-300 bg-gray-100"
                    }`}
                    disabled={!editable}
                    value={userS.name}
                    name="name"
                    onChange={(e)=>{
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
                    value={userS.email}
                    name="email"
                    onChange={(e)=>{
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
                  <button onClick={handleDelete} className="p-2 bg-red-800 rounded-xl">Delete Account</button>
            </div>
          </div>
          <h1 className="font-bold text-3xl text-center mb-2">My Friends</h1>
          <button onClick={()=>{handleAddFriend(); setShowAddFriend(!showAddFriend)}} className="p-2 bg-lightBlue text-white rounded-md">Add Friend</button>
          <SearchBar type={'board'} placeholder={'Type name of the friend'} searchString={searchString} setSearchString={setSearchString}/>
          {friends.map((friend)=>{
            if(searchString && !(friend.name.toLowerCase().includes(searchString.toLowerCase()) || friend.id.toLowerCase().includes(searchString.toLowerCase())))
            {return null}

            let formattedId = friend.id.slice(-4);
            return(
              <div    
                key={friend.id}
              >
              <p>
                {friend.name}
                <sub className="ml-1 text-gray-200">#{formattedId}</sub>
              </p>
            </div>
            )

          })}
        </div>
      
      </>)}

    </>
  );
}
