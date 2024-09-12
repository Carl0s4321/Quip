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
import Search from "./search";
import WheelMenu from "./WheelMenu";


const BoardHome = () => {
  const {clearBoardInfo, getBoard, board, setBoardColumns, updateTaskInDB} = useBoardStore();

  const [columns, setColumns] = useState([]);

  const navigate = useNavigate();
  const grid = 8;

  useEffect(() => {
    getBoard();
  }, []);

  // console.log(board)
  
  const handleOnDragEnd = (result) => {

    const{destination, source, type} = result;

    // dropped outside the board
    if (!destination) {
      return;
    }

    // column drag 
    if(type==="column"){
      const entries = Array.from(board.columns);
      const [removed] = entries.splice(source.index, 1);
      entries.splice(destination.index, 0, removed);
      const rearrangedColumns = new Map(entries);
      setBoardColumns(rearrangedColumns);
    }

    console.log('source.droppableId', source.droppableId)
    console.log('Number(source.droppableId)', Number(source.droppableId))

    // make copy for task dragging
    const columns =  Array.from(board.columns);
    const startColIndex = columns[Number(source.droppableId)];
    const finishColIndex = columns[Number(destination.droppableId)];

    console.log('HERE', columns)
    console.log('startColIndex', startColIndex)
    console.log('finishColIndex', finishColIndex)


    const startCol= {
      id: startColIndex[0],
      tasks: startColIndex[1].tasks,
    }
    const finishCol= {
      id: finishColIndex[0],
      tasks: finishColIndex[1].tasks,
    }

    console.log(startCol, finishCol)

    if(!startCol || !finishCol) return;

    // if a task is grabbed but not moved
    if(source.index === destination.index && startCol === finishCol) return;

    const newTasks = startCol.tasks;
    const [taskMoved] = newTasks.splice(source.index, 1);

    if(startCol.id === finishCol.id){
      // dragging and dropping in same column
      newTasks.splice(destination.index, 0 ,taskMoved);
      const newCol = {
        id: startCol.id,
        tasks: newTasks,
      }
      const newColumns = new Map(board.columns);
      newColumns.set(startCol.id, newCol);

      setBoardColumns(newColumns);
    }else{
      // drag to another column
      const finishTasks = Array.from(finishCol.tasks);
      finishTasks.splice(destination.index, 0, taskMoved);

      const newCol = {
        id: startCol.id,
        tasks: newTasks,
      }
      const newColumns = new Map(board.columns);

      // removing the dragged task from start column
      newColumns.set(startCol.id, newCol);
      // adding the dragged task to finish column
      newColumns.set(finishCol.id, {
        id: finishCol.id,
        tasks: finishTasks,
      })

      updateTaskInDB(taskMoved, finishCol.id, board.boardInfo.$id);

      setBoardColumns(newColumns);


    }

  }



  
  if (!board) return <p>Loading...</p>;


  return (
    <div className="bg-blue-500">
      <div className="flex flex-row">
        <FontAwesomeIcon icon={faArrowLeft} className='p-5 cursor-pointer'onClick={()=>{
          clearBoardInfo();
          navigate('/home')
          }}/>

        <div className="flex flex-col w-full p-3">
          <h2>{board.boardInfo.boardName}</h2>
          <p>board id: {board.boardInfo.$id}</p>
          <p>board creator user id: {board.boardInfo.creatorId}</p>

          <Search placeholder="Search Task..."/>

          <div className="mt-5">
            <DragDropContext onDragEnd={handleOnDragEnd} >
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
        <WheelMenu/>
      </div>

    </div>
  );
};

export default SectionWrapper(BoardHome,"");
