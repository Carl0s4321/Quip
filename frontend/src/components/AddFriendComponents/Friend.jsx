import { useEffect, useState } from "react";
import { fetchUserInfo } from "../../utils/userUtils";

function Friend({ friend }) {
  const [userInfo, setUserInfo] = useState();
  useEffect(() => {
    async function getUserInfo() {
      const response = await fetchUserInfo(friend);
      setUserInfo(response);
    }
    getUserInfo();
  }, []);

  return (
    <div key={friend}>
      <p>
        {userInfo?.user?.name}
        <sub className="ml-1 text-darkBlue">#{userInfo?.formattedId}</sub>
      </p>
    </div>
  );
}

export default Friend;
