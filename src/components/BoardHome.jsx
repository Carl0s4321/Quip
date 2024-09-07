import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { databases, DATABASE_ID, BOARDS_ID, TODO_ID} from "../lib/appwrite";
import { SectionWrapper } from "../hoc";

import { Query } from "appwrite";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";


const BoardHome = () => {
  const { boardId } = useParams(); // get boardId from url '/board/:boardId
  const [board, setBoard] = useState(null);
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  const getTasks = async (boardId) => {
    try {
      const response = await databases.listDocuments(
        DATABASE_ID, 
        TODO_ID,
        [Query.equal('boardId', boardId)] // get todo tasks for current board only
      );
      
      return response.documents;
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  
  const Task = ({eachData}) => {
    // console.log('eachData: ', eachData);
    return(
      <div className="">
        {eachData.taskTitle}
        {eachData.taskSubTitle}
      </div>
    )
  }

  useEffect(() => {
    const fetchBoardDetails = async () => {
      // fetch board details w boardId
      const response = await databases.getDocument(DATABASE_ID, BOARDS_ID, boardId);
      setBoard(response);
      // console.log('response', response)
      const result = await getTasks(response.$id);
      
      setData(result);
    };

    fetchBoardDetails();
  }, [boardId]);
  
  if (!board) return <p>Loading...</p>;
  // console.log('data:', data)

  return (
    <div className="bg-blue-500">
      <div className="flex flex-row">
        <FontAwesomeIcon icon={faArrowLeft} className='p-5 cursor-pointer'onClick={()=>{navigate('/home')}}/>
        <div className="flex flex-col">
          <h2>{board.boardName}</h2>
          <p>board creator user id: {board.userId}</p>
          <p>board id: {board.$id}</p>
          {
            data.map(eachData => (
              <Task eachData = {eachData}/>
            ))
          }
        </div>
      </div>

    </div>
  );
};

export default SectionWrapper(BoardHome,"");
