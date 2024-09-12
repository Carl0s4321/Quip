import { useState, useEffect } from "react";
import useUserStore from "../store/userStore";

import { Query } from "appwrite";
import { databases, DATABASE_ID, BOARDS_ID, ID} from '../lib/appwrite';

import useBoardStore from "../store/boardStore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { styles } from "../styles";

const BoardPopup = ({ type, onClick, onSubmit, onClose }) => {
    const [boardName, setBoardName] = useState('');
    
    const handleSubmit = (e) => {
      e.preventDefault();
      if (boardName.trim()) {
        onSubmit(boardName);
      }
    };
  
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white rounded-xl p-4 shadow-md w-80">
          {type === 'create' ? (
            <>
              <h2 className="text-lg font-semibold mb-4">Enter Board Name</h2>
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  value={boardName}
                  onChange={(e) => setBoardName(e.target.value)}
                  className="border border-gray-300 rounded p-2 w-full mb-4"
                  placeholder="Board Name"
                  />
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="bg-blue-500 text-white rounded px-4 py-2 mr-2"
                    >
                    Create
                  </button>
                  <button
                    type="button"
                    onClick={onClose}
                    className="bg-gray-500 text-white rounded px-4 py-2"
                    >
                    Cancel
                  </button>
                </div>
              </form>
            </>
          ) : (
            <>
              <p className="text-lg mb-2">Are you sure you want to <span className="font-semibold">delete</span> this board?</p>
              <div className="flex w-full justify-evenly">
                <button className="p-2 bg-green-500 text-white rounded-md px-6 hover:bg-green-600" onClick={onClick}>Yes</button>
                <button className="p-2 bg-red-500 text-white rounded-md px-6 hover:bg-red-600" onClick={onClose}>No</button>
              </div>
            </>

          )}
        </div>
      </div>
    );
};
  
const Board = ({board, onClick, handleDeleteClick}) => {
  const [isHovered, setIsHovered] = useState(false);
  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

    return(
      <div className="relative p-3">
        <div className="boardButton" 
          onClick={onClick} 
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
        {isHovered && (
          <div className="absolute top-0 right-0" onClick={handleDeleteClick}>
            <button className="text-red-600">
              <FontAwesomeIcon icon={faCircleXmark} className="bg-white rounded-full" />
            </button>
          </div>
        )}
          {board.boardName}
        </div>
      </div>
    )
  }  

const BoardsList = ({navigate}) => {
    const [boardList, setBoardList] = useState([]);
    const [isPopupVisible, setPopupVisible] = useState(false);
    const [isPopupDelVisible, setPopupDelVisible] = useState(false);
    const [boardIdToDelete, setBoardIdToDelete] = useState(null);
    const {userId} = useUserStore();
    const {setBoardInfo} = useBoardStore(); 

    const getBoardList = async (userId) => {
      try {
        // console.log('userID: ', userId)
        const response = await databases.listDocuments(
          DATABASE_ID, 
          BOARDS_ID,
          [Query.equal('userId', userId)] // get boards only made by current user
        );
        // console.log(response)
        return response.documents;
      } catch (error) {
        console.error('Error fetching boards:', error);
      }
    };

    const createBoard = async (userId, boardName) => {
      try {
        const response = await databases.createDocument(
          DATABASE_ID,
          BOARDS_ID,
          ID.unique(), // use document id as boardId? 
          {
            userId,
            boardName,
          }
        );
        return response;
      } catch (error) {
        console.error('Error creating board:', error);
      }
    };
  
    const handleCreateBoard = async (boardName) => {
      if (userId && boardName) {
        await createBoard(userId, boardName);
        setPopupVisible(false);
        const data = await getBoardList(userId);
        setBoardList(data);
      }
    };

    const handleDeleteBoard = async (boardId) => {
      try{
        await databases.deleteDocument(
          DATABASE_ID,
          BOARDS_ID,
          boardId
        );
        setPopupDelVisible(false);
        setBoardIdToDelete(null);
        const data = await getBoardList(userId);
        setBoardList(data);
      } catch(error){
        console.error('Error deleting board:', error);
      }

    }

    useEffect(() => {
      const fetchBoardList = async () => {
        if (!userId) {
          console.error('User ID is not available');
          return;
        }
        const data = await getBoardList(userId);
        setBoardList(data);
      };
  
      fetchBoardList();
    }, [userId]);
  
    return (
      <>
        {userId ? (
              <>
                <h1 className={`${styles.sectionSubText} font-semibold`}>Your Workspaces</h1>
                <ul className="grid w-full grid-cols-1 md:grid-cols-4 gap-5 mt-4">
                  <div className="relative p-3">
                    <div
                      className= "boardButton" 
                      onClick={() => {
                        setPopupVisible(true);
                      }}
                    >+</div>
                  </div>
                  { boardList.map(eachBoard => (
                      <Board 
                        key={eachBoard.$id}
                        board={eachBoard}
                        onClick={() => {
                          setBoardInfo(eachBoard);
                          navigate(`/board`);
                        }}
                        handleDeleteClick={(e) => {
                          e.stopPropagation(); // cause theres nested buttons in the board button
                          setBoardIdToDelete(eachBoard.$id);
                          setPopupDelVisible(true);
                        }}
                        />
                    ))}
                </ul>

                {/* POPUP FOR BOARD CREATION */}
                {isPopupVisible && (
                  <BoardPopup
                    type='create'
                    onSubmit={handleCreateBoard}
                    onClose={() => setPopupVisible(false)}
                  />
                )}

                {/* POPUP FOR BOARD DELETION */}
                {isPopupDelVisible && (
                  <BoardPopup
                    type='delete'
                    onClick={()=>handleDeleteBoard(boardIdToDelete)}
                    onClose={() => {
                      setBoardIdToDelete(null);
                      setPopupDelVisible(false);
                    }}
                  />
                )}

              </>
            ) : <p>Loading...</p>
        }
      </>
    );
  };

  export default BoardsList;