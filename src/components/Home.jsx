import { useNavigate } from "react-router-dom";
import useUserStore from "../store/userStore";
import Navbar from "./Navbar";
import WheelMenu from "./WheelMenu";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";

import { styles } from "../styles";


import { Query } from "appwrite";

import { databases, account, DATABASE_ID, BOARDS_ID, ID} from '../lib/appwrite';

const columns = [
  { id: "todo", name: "To Do" },
  { id: "in-progress", name: "In Progress" },
  { id: "done", name: "Done" }
];

const getBoardColumns = async (boardId) => {
  try {
    const response = await databases.getDocument(
      DATABASE_ID,
      BOARDS_COLLECTION_ID,
      boardId
    );

    // json string to array of objects
    const columns = JSON.parse(response.columns);

    return columns;
  } catch (error) {
    console.error('Error fetching board columns:', error);
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
        columns: JSON.stringify(columns),
      }
    );
    return response;
  } catch (error) {
    console.error('Error creating board:', error);
  }
};

const getBoards = async (userId) => {
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

const BoardNamePopup = ({ onSubmit, onClose }) => {
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
      </div>
    </div>
  );
};

const Board = ({board}) => {
  return(
    <div className="boardButton" onClick={() => console.log(board)}>
      {board.boardName}
    </div>
  )
}

const BoardsList = () => {
  const [boards, setBoards] = useState([]);
  const [isPopupVisible, setPopupVisible] = useState(false);
  const {userId} = useUserStore();

  useEffect(() => {
    const fetchBoards = async () => {
      if (!userId) {
        console.error('User ID is not available');
        return;
      }
      const data = await getBoards(userId);
      setBoards(data);
    };

    fetchBoards();
  }, [userId]);

  const handleCreateBoard = async (boardName) => {
    if (userId && boardName) {
      await createBoard(userId, boardName);
      setPopupVisible(false);
      const data = await getBoards(userId);
      setBoards(data);
    }
  };

  return (
    <>
      {userId ? (
            <>
              <h1>Boards</h1>
              <ul className="grid w-full grid-cols-4 gap-5">
                {/* <FontAwesomeIcon
                  icon={faPlus} 
                  className= "boardButton" 
                  onClick={() => {
                    setPopupVisible(true);
                  }}
                /> */}
                <p
                  className= "boardButton" 
                  onClick={() => {
                    setPopupVisible(true);
                  }}
                >+</p>
                { boards.map(board => (
                    <Board 
                      key={board.$id}
                      board={board}
                      />
                  ))}
              </ul>
              {isPopupVisible && (
                <BoardNamePopup
                  onSubmit={handleCreateBoard}
                  onClose={() => setPopupVisible(false)}
                />
              )}
            </>
          ) : null
      }
    </>
  );
};

const Home = () =>{
    const { user, setIsAuthenticated, clearUser} = useUserStore(); 
    const navigate = useNavigate();

    const handleLogout = async () => {
      try{
        await account.deleteSession('current');
        localStorage.removeItem("appwrite-session"); 
        clearUser();
        setIsAuthenticated(false);
        navigate('/');
      }catch(error){
        console.error("Logout error:", error);
      }
    }

    return(
      <>
        <Navbar/>
        <div className={`${styles.padding} bg-slate-700`}>
            <h1>Welcome to the Home Page</h1>
            <p>Welcome back, {user?.name}!</p>

            <BoardsList/>

            <button
            type="button"
            onClick={handleLogout}
            >
            Logout
            </button>

            
        </div>
        <WheelMenu/>
      </>
    )
}
export default Home;