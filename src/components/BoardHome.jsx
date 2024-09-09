import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { databases, DATABASE_ID, BOARDS_ID, TODO_ID} from "../lib/appwrite";
import { SectionWrapper } from "../hoc";

import { Query } from "appwrite";
import { DragDropContext,Droppable, Draggable } from "@hello-pangea/dnd";


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
  
  const Task = ({ eachData, index }) => {
    console.log('eachData: ', eachData);
  
    return (
      <Draggable key={eachData.$id} draggableId={eachData.$id} index={index}>
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            style={{
              padding: '16px',
              margin: '8px',
              backgroundColor: '#f0f0f0',
              border: '1px solid #ddd',
              ...provided.draggableProps.style,
            }}
          >
            {eachData.taskTitle}
            <br />
            {eachData.taskSubTitle}
          </div>
        )}
      </Draggable>
    );
  };
  

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
  
  const handleOnDragEnd = (result) => {
    <>
    
    </>
  }
  
  if (!board) return <p>Loading...</p>;

  return (
    <div className="bg-blue-500">
      <div className="flex flex-row">
        <FontAwesomeIcon icon={faArrowLeft} className='p-5 cursor-pointer'onClick={()=>{navigate('/home')}}/>
        <div className="flex flex-col">
          <h2>{board.boardName}</h2>
          <p>board creator user id: {board.userId}</p>
          <p>board id: {board.$id}</p>



          <DragDropContext onDragEnd={handleOnDragEnd}>
            <Droppable droppableId="droppable-1">
              {(provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef}>
                  {data.map((eachData, index) => (

                    <Task key={eachData.$id} eachData={eachData} index={index}/>

                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>

        </div>
      </div>

    </div>
  );
};

export default SectionWrapper(BoardHome,"");
