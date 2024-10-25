import { useEffect, useState } from "react";
import { getBoards } from "../api";
import useUserStore from "../store/UserStore";

function Board({board}){
    return(
        <>
        a
        <p>{board.boardName}</p>
        </>
    )
}

function Boards() {
  const { user } = useUserStore();
  const [boards, setBoards] = useState([]);

  useEffect(() => {
    const fetchBoards = async () => {
      setBoards([]); // clear previous boards
      if (user) {
        try {
          const response = await getBoards(user._id);
          setBoards(response);
        } catch (error) {
          console.error("Error fetching boards:", error);
        }
      }
    };

    fetchBoards();
  }, [user]);

  return (
    <>
      qqqertgyhtj
      {boards.length > 0 ? (
        boards.map((board, index) => <p key={index}><Board board={board}/></p>)
      ) : (
        <></>
        // no boards found
      )}
    </>
  );
}

export default Boards;
