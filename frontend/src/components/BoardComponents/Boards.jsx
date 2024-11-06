import { useEffect, useState } from "react";
import { getBoards } from "../../api";
import useUserStore from "../../store/UserStore";
import "./board.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import useBoardStore from "../../store/BoardStore";
import BoardPopup from "./Popup/BoardPopup";
import { Link } from "react-router-dom";
import { createBoard, deleteBoard } from "../../api";

function Board({ board, setFetchTrigger, fetchTrigger }) {
  const [isHovered, setIsHovered] = useState(false);
  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  return (
    <div
      className="relative"
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
    >
      <Link to={`/board/${board._id}`}>
        <div className="board">
          <span>{board.boardName}</span>
        </div>
      </Link>
      {isHovered && (
        <button
          onClick={async () => {
            const response = await deleteBoard(board._id);
            setFetchTrigger(!fetchTrigger);
            // console.log("delete response: ", response);
          }}
          className="text-red-600 hover:text-red-800 absolute top-0 right-0"
        >
          <FontAwesomeIcon
            icon={faCircleXmark}
            className="bg-white rounded-full text-3xl"
          />
        </button>
      )}
    </div>
  );
}

function Boards() {
  const { user } = useUserStore();
  const [boards, setBoards] = useState([]);
  const [sharedBoards, setSharedBoards] = useState([]);
  const [isPopupVisible, setPopupVisible] = useState(false);
  const { searchString } = useBoardStore();
  const [fetchTrigger, setFetchTrigger] = useState(false);

  async function handleCreateBoard(boardName) {
    // console.log(user)
    const response = await createBoard(boardName, user);
    console.log("response in handlecreateboard", response);
    setPopupVisible(!isPopupVisible);
    setFetchTrigger(!fetchTrigger);
  }

  useEffect(() => {
    const fetchBoards = async () => {
      if (user) {
        try {
          const response = await getBoards(user._id);
          setBoards(response);
        } catch (error) {
          console.error("Error fetching boards:", error);
        }
      }
    };

    setBoards([]); // clear previous boards
    fetchBoards();
  }, [user, fetchTrigger]);

  return (
    <div className="w-4/5">
      <div className="w-full">
        <h2 className="my-5 text-xl">Your boards</h2>

        <div className="grid gap-8 grid-flow-row-dense grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {searchString ? (
            <></>
          ) : (
            <div
              className="board"
              onClick={() => {
                setPopupVisible(true);
              }}
            >
              <FontAwesomeIcon icon={faPlus} />
            </div>
          )}
          {boards.length > 0 ? (
            boards.map((board, index) => {
              if (
                searchString &&
                !board.boardName
                  .toLowerCase()
                  .includes(searchString.toLowerCase())
              ) {
                return null;
              }
              return (
                <Board
                  key={index}
                  board={board}
                  setFetchTrigger={setFetchTrigger}
                  fetchTrigger={fetchTrigger}
                />
              );
            })
          ) : (
            <></>
            // no boards found
          )}
        </div>
      </div>

      <div className="w-full">
        <h2 className="my-5 text-xl">Shared with me</h2>
      </div>

      {/* POPUP FOR BOARD CREATION */}
      {isPopupVisible && (
        <BoardPopup
          type="create"
          onSubmit={handleCreateBoard}
          onClose={() => setPopupVisible(false)}
        />
      )}
    </div>
  );
}

export default Boards;
