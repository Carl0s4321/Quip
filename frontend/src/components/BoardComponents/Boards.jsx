import { useEffect, useState } from "react";
import { getBoards } from "../../api";
import useUserStore from "../../store/UserStore";
import './board.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import useBoardStore from "../../store/BoardStore";
import BoardPopup from './BoardPopup'
import { Link } from "react-router-dom";



function Board({board}){
    return(
      <Link to={`/board/${board._id}`}>
        <div className="board">
          <p>{board.boardName}</p>
        </div>
      </Link>
    )
}

function Boards() {
  const { user } = useUserStore();
  const [boards, setBoards] = useState([]);
  const [sharedBoards, setSharedBoards] = useState([]);
  const [isPopupVisible, setPopupVisible] = useState(false);
  const {searchString} = useBoardStore();

  function handleCreateBoard(){
    // TODO
  }

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
    <div className="w-4/5">
      <div className="w-full">
        <h2 className="my-5 text-xl">Your boards</h2>
        
        <div className="grid gap-8 grid-flow-row-dense grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {searchString ? <></> :
            <div className="board" onClick={()=>{
              setPopupVisible(true);
            }}>
              <FontAwesomeIcon icon={faPlus}/>
            </div>
          }
          {boards.length > 0 ? (
            boards.map((board, index) => {
              if(searchString && !board.boardName.toLowerCase().includes(searchString.toLowerCase())){
                return null;
              }
              return(
                <Board key={index} board={board} />
              )
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
          type='create'
          onSubmit={handleCreateBoard}
          onClose={() => setPopupVisible(false)}
        />
      )}
    </div>

  );
}

export default Boards;
