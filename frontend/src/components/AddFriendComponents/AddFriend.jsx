import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { createFriendReq, getFriendRequests } from "../../api";
import { useEffect, useState } from "react";
import useUserStore from "../../store/UserStore";
import Request from "./Request";

function AddFriend({ setShowAddFriend, showAddFriend }) {
  const [addFriend, setAddFriend] = useState("");
  const { user } = useUserStore();
  const [requests, setRequests] = useState({
    incomingReqs: [],
    outgoingReqs: [],
  });

  async function handleSubmit(e) {
    e.preventDefault();
    if (user._id != addFriend) {
      const response = await createFriendReq(user._id, addFriend);
      if (response.error) {
        console.error(response.data);
      } else {
        console.log(response);
      }
      setAddFriend("");
    } else {
      console.log("cant add urself dummy!");
    }
  }

  useEffect(() => {
    async function fetchFriendReqs() {
      const response = await getFriendRequests(user);
      console.log(response);
      if (response.error) {
        console.error(error);
      } else {
        setRequests(response);
      }
    }
    fetchFriendReqs();
  }, [user]);

  return (
    <div className="w-3/4 h-full flex justify-center mt-20 items-center">
      <div>
        <FontAwesomeIcon
          className="cursor-pointer"
          icon={faArrowLeft}
          onClick={() => {
            setShowAddFriend(!showAddFriend);
          }}
        />
        <form onSubmit={handleSubmit}>
          <p>Who would you like to add as a friend?</p>
          <div className="border-2 w-fit rounded-md">
            <input
              placeholder="Enter an id"
              className="pl-4 outline-none"
              value={addFriend}
              onChange={(e) => {
                setAddFriend(e.target.value);
              }}
            />
            <button
              type="submit"
              className="bg-lightBlue p-2 text-white hover:bg-darkBlue rounded-md"
            >
              Send Friend Request
            </button>
          </div>
        </form>
        <h1>Requests</h1>
        <div>
          <h2>Incoming ({requests.incomingReqs.length})</h2>
          {requests.incomingReqs.map((incomingReq, index) => {
            return (
              <Request key={index} type="incoming" request={incomingReq} />
            );
          })}

          <h2>Outgoing ({requests.outgoingReqs.length})</h2>
          {requests.outgoingReqs.map((outgoingReq, index) => {
            return (
              <Request key={index} type="outgoing" request={outgoingReq} />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default AddFriend;
