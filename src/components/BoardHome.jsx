import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { databases, DATABASE_ID, BOARDS_ID} from "../lib/appwrite";
import { SectionWrapper } from "../hoc";
import Column from "./Column";

import { Query } from "appwrite";
import { DragDropContext,Droppable, Draggable } from "@hello-pangea/dnd";

import useBoardStore from "../store/boardStore";


const BoardHome = () => {
  const {clearBoardInfo, getBoard, board} = useBoardStore();

  const [columns, setColumns] = useState([]);

  const navigate = useNavigate();
  const grid = 8;

  useEffect(() => {
    getBoard();
  }, []);

  console.log(board)
  
  const handleOnDragEnd = (result) => {

    // const reorder = (list, startIndex, endIndex) => {
    //   const result = Array.from(list);
    //   const [removed] = result.splice(startIndex, 1);
    //   result.splice(endIndex, 0, removed);
    
    //   return result;
    // };

    const{destination, source, type} = result;

    // dropped outside the list
    if (!destination) {
      return;
    }

    // column drag
    // if(type==="column"){
      
    // }

    // const items = reorder(
    //   tasks,
    //   result.source.index,
    //   result.destination.index
    // );

    // setTasks(items);
  }



  
  if (!board) return <p>Loading...</p>;


  return (
    <div className="bg-blue-500">
      <div className="flex flex-row">
        <FontAwesomeIcon icon={faArrowLeft} className='p-5 cursor-pointer'onClick={()=>{
          clearBoardInfo();
          navigate('/home')
          }}/>

        <div className="flex flex-col">
          <h2>{board.boardInfo.boardName}</h2>
          <p>board id: {board.boardInfo.$id}</p>
          <p>board creator user id: {board.boardInfo.creatorId}</p>

          <DragDropContext onDragEnd={handleOnDragEnd}>
            <Droppable droppableId="board" type="column" direction="horizontal">
              {(provided) => (
                <div
                  className="grid grid-cols-1 md:grid-cols-3 gap-5 max-7-xl mx-auto"
                  ref={provided.innerRef} 
                  {...provided.droppableProps}
                >
                  {
                    Array.from(board.columns).map(([id, column], index) => (
                      <Column key={id} id={id} tasks={column.tasks} index={index}/>
                    ))
                  }

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
