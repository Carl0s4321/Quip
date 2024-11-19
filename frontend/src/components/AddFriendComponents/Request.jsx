import { useEffect, useState } from "react";
import { getUser } from "../../api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faXmarkCircle,
} from "@fortawesome/free-solid-svg-icons";

function Request({ request, type }) {
  const buttonStyle = {
    fontSize: "2em",
  };

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
        setInfo((prev) => ({ ...prev, name: response.name }));
      }
    }
    fetchUserInfo();
    setLoading(false);

    console.log(info);
  }, [request]);

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
            >
              <FontAwesomeIcon icon={faCheckCircle} />
            </button>
          )}
          <button
            className="text-red-500 hover:text-red-700"
            style={buttonStyle}
          >
            <FontAwesomeIcon icon={faXmarkCircle} />
          </button>
        </div>
      </div>
    </>
  );
}

export default Request;
