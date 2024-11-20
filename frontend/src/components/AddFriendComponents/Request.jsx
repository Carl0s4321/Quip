import { useEffect, useState } from "react";
import { getUser, removeFriendReq, updateUser } from "../../api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faXmarkCircle,
} from "@fortawesome/free-solid-svg-icons";
import useUserStore from "../../store/UserStore";
import auth from "../../utils/auth";

function Request({ request, type }) {
  const buttonStyle = {
    fontSize: "2em",
  };

  const { user, setUser } = useUserStore();
  const [currUser, setCurrUser] = useState(user);
  const [otherUser, setOtherUser] = useState();
  const [trigger, setTrigger] = useState(false);

  const [loading, setLoading] = useState(true);
  const [info, setInfo] = useState({
    reqId: request._id,
    userId: type === "outgoing" ? request.receiverId : request.senderId,
    sent: new Date(request.sent).toLocaleDateString(),
  });

  useEffect(() => {
    async function fetchUserInfo() {
      const response = await getUser(info.userId);
      if (response.error) {
        console.error(response.error);
      } else {
        setOtherUser(response);
        setInfo((prev) => ({ ...prev, name: response.name }));
      }
    }
    fetchUserInfo();
    setLoading(false);

    console.log(info);
  }, [request]);

  function handleAcceptReq() {
    setOtherUser((prev) => ({
      ...prev,
      friends: [...prev.friends, currUser._id],
    }));

    setCurrUser((prev) => ({
      ...prev,
      friends: [...prev.friends, otherUser._id ],
    }));
    setTrigger(true);
  }

  useEffect(() => {
    async function acceptReq() {
      try {
        console.log("otherUser", otherUser);
        const response2 = await updateUser(otherUser);
        if (response2.error) {
          console.error("Error updating otherUser:", response2.error);
          throw new Error(`Error updating otherUser: ${response2.error}`);
        }
        // TODO tell the other user to also update the token

        const response = await updateUser(currUser);
        if (response.error) {
          console.error("Error updating currUser:", response.error);
          throw new Error(`Error updating otherUser: ${response.error}`);
        }

        auth.setToken(response.token);

        const deleteResponse = await removeFriendReq(info);
        if (deleteResponse.error) {
          throw new Error(`Error deleting request: ${deleteResponse.error}`);
        } else {
          console.log("Request is accepted and removed successfully.");
        }
      } catch (error) {
        console.error("Unexpected error in acceptReq:", error);
      }
    }

    console.log("in here", trigger);

    if (trigger) {
      console.log("other:", otherUser, "\ncurr: ", currUser);
      acceptReq();
      setTrigger(false);
    }
  }, [otherUser, currUser]);

  function handleDeclineReq() {
    async function declineReq() {
      const response = await removeFriendReq(info);
      if (response.error) {
        console.error(response.error);
      } else {
        console.log("request is declined");
      }
    }
    declineReq();
  }

  if (loading) {
    return <>Loading</>;
  }

  return (
    <>
      <div className="flex flex-row gap-x-5 items-center">
        <p>{info.name}</p>
        <p>{info.userId}</p>
        <p>{info.sent}</p>
        <div className="gap-x-5 flex flex-row">
          {type === "incoming" && (
            <button
              className="text-lightBlue hover:text-darkBlue"
              style={buttonStyle}
              onClick={() => {
                handleAcceptReq();
              }}
            >
              <FontAwesomeIcon icon={faCheckCircle} />
            </button>
          )}
          <button
            className="text-red-500 hover:text-red-700"
            style={buttonStyle}
            onClick={handleDeclineReq}
          >
            <FontAwesomeIcon icon={faXmarkCircle} />
          </button>
        </div>
      </div>
    </>
  );
}

export default Request;
