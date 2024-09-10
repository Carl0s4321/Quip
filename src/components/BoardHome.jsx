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
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();
  const grid = 8;

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


  const getListStyle = isDraggingOver => ({
    background: isDraggingOver ? "lightblue" : "lightgrey",
    padding: grid,
    width: 550
  });

  const getItemStyle = (isDragging, draggableStyle) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: "none",
    padding: grid * 2,
    margin: `0 0 ${grid}px 0`,
  
    // change background colour if dragging
    background: isDragging ? "lightgreen" : "grey",
  
    // styles we need to apply on draggables
    ...draggableStyle
  });
  
  const Task = ({ task, index }) => {
    // console.log('task: ', task);
  
    return (
      <Draggable key={task.$id} draggableId={task.$id} index={index}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            style={getItemStyle(
              snapshot.isDragging,
              provided.draggableProps.style
            )}
          >
            {task.taskTitle}
            <br />
            {task.taskSubTitle}
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
      
      setTasks(result);
    };

    fetchBoardDetails();
  }, []);

  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
  
    return result;
  };

  const handleOnDragEnd = (result) => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const items = reorder(
      tasks,
      result.source.index,
      result.destination.index
    );

    setTasks(items);
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
              {(provided, snapshot) => (
                <div {...provided.droppableProps} ref={provided.innerRef} style={getListStyle(snapshot.isDraggingOver)}>
                  {tasks.map((task, index) => (

                    <Task key={task.$id} task={task} index={index}/>

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
