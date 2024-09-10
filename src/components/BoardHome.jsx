import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { databases, DATABASE_ID, BOARDS_ID, TODO_ID, INPROGRESS_ID, DONE_ID} from "../lib/appwrite";
import { SectionWrapper } from "../hoc";

import { Query } from "appwrite";
import { DragDropContext,Droppable, Draggable } from "@hello-pangea/dnd";

import useBoardStore from "../store/boardStore";


const BoardHome = () => {
  const {clearBoardInfo, getBoard, board} = useBoardStore();


  const [columns, setColumns] = useState([]);

  const navigate = useNavigate();
  const grid = 8;

  
  // const Task = (props) => {
  //   const task = props.task;
  //   const index = props.index;
  //   const draggableProps = props.draggableProps;
  //   const dragHandleProps = props.dragHandleProps;
  //   const innerRef = props.innerRef;
  //   // console.log('task: ', task);
  
  //   return (
  //     <div 
  //       className="bg-white rounde-md space-y-2 drop-shadow-md"
  //       {...draggableProps}
  //       {...dragHandleProps}
  //       ref={innerRef}
  //     >
  //           {task.taskTitle}
  //           <br />
  //           {task.taskSubTitle}
  //     </div>
  //   );
  // };
  

  // useEffect(() => {
  //   const fetchBoardDetails = async () => {
  //     // fetch board details w boardId
  //     const response = await databases.getDocument(DATABASE_ID, BOARDS_ID, currentBoardId);
  //     setBoard(response);
  //     // console.log('response', response)
  //     const { todo: fetchedTodoTasks, inprogress: fetchedInProgressTasks, done: fetchedDoneTasks } = await getTasks(boardId);

  //     setColumns([
  //       { id: 'ToDo', tasks: fetchedTodoTasks },
  //       { id: 'InProgress', tasks: fetchedInProgressTasks },
  //       { id: 'Done', tasks: fetchedDoneTasks },
  //     ]);

      
  //     setTodoTasks(fetchedTodoTasks);
  //     setInProgressTasks(fetchedInProgressTasks);
  //     setDoneTasks(fetchedDoneTasks);
      
  //   };
    
  //   console.log(currentBoardId)
  //   fetchBoardDetails();
  // }, [currentBoardId]);

  useEffect(() => {
    getBoard();
  }, []);
  
  // const handleOnDragEnd = (result) => {

  //   const reorder = (list, startIndex, endIndex) => {
  //     const result = Array.from(list);
  //     const [removed] = result.splice(startIndex, 1);
  //     result.splice(endIndex, 0, removed);
    
  //     return result;
  //   };

  //   const{destination, source, type} = result;

  //   // dropped outside the list
  //   if (!destination) {
  //     return;
  //   }

  //   // column drag
  //   if(type==="column"){
      
  //   }

  //   // const items = reorder(
  //   //   tasks,
  //   //   result.source.index,
  //   //   result.destination.index
  //   // );

  //   // setTasks(items);
  // }

  // const Column = (props) => {
  //   const index = props.index;
  //   const tasks = props.tasks;
  //   const id = props.id;
  //   return(
  //     <Draggable draggableId={id} index={index}>
  //       {(provided)=>(
  //         <div 
  //           ref={provided.innerRef} 
  //           {...provided.draggableProps} 
  //           {...provided.dragHandleProps}
  //         >
            
  //           <Droppable droppableId={`droppable-` + index} type="card">
  //             {(provided, snapshot) => (
  //               <div 
  //                 {...provided.droppableProps} 
  //                 ref={provided.innerRef}
  //                 className={`p-2 rounded-2xl shadow-sm ${snapshot.isDraggingOver? "bg-green-200" : "bg-white/50"}`}
  //               >
  //                     <h2 className="flex justify-between font-semibold text-xl p-2">
  //                       {id}
  //                       <span className="text-gray-500 bg-gray-200 rounded-full px-2 py-1 text-sm font-normal">
  //                         {tasks.length}
  //                       </span>
  //                     </h2>

  //                     <div className="space-y-2">
  //                       {tasks.map((task, index) => (
  //                         <Draggable
  //                           key={task.$id}
  //                           draggableId={task.$id}
  //                           index={index}
  //                         >
  //                           {(provided) => (
  //                             <Task 
  //                               key={id} 
  //                               task={task} 
  //                               index={index}
  //                               innerRef={provided.innerRef}
  //                               draggableProps={provided.draggableProps}
  //                               dragHandleProps={provided.dragHandleProps}  
  //                             />

  //                           )}
  //                         </Draggable>
  //                       ))}
  //                       {provided.placeholder}

  //                       <div>
  //                         <button>
  //                           +
  //                         </button>
  //                       </div>
  //                     </div>
  //               </div>
  //             )}
  //           </Droppable>

  //         </div>
  //       )}

  //     </Draggable>
  //   )
  // }

  
  if (!board) return <p>Loading...</p>;


  return (
    <div className="bg-blue-500">
      <div className="flex flex-row">
        <FontAwesomeIcon icon={faArrowLeft} className='p-5 cursor-pointer'onClick={()=>{
          clearBoardInfo();
          navigate('/home')
          }}/>
          <div className="flex flex-col">
            <h2>name: {board.boardInfo.boardName}</h2>
            <p>board id: {board.boardInfo.$id}</p>
            <p>board creator user id: {board.boardInfo.creatorId}</p>
          </div>
        {/* <div className="flex flex-col">
          <h2>{board.boardName}</h2>
          <p>board id: {currentBoardId}</p>
          <p>board creator user id: {board.userId}</p>

          <DragDropContext onDragEnd={handleOnDragEnd}>
            <Droppable droppableId="board" type="column" direction="horizontal">
              {(provided) => (
                <div 
                  className="grid grid-cols-1 md:grid-cols-3 gap-5 max-7-xl mx-auto"
                  ref={provided.innerRef} 
                  {...provided.droppableProps}
                >
                    {columns.map((column, index) => (
                      <Column 
                        tasks={column.tasks} 
                        id={column.id} 
                        index={index} 
                        key={column.id}
                      />
                    ))}
                    {provided.placeholder}
                </div>
              )}
            </Droppable>
            
          </DragDropContext>

        </div> */}
      </div>

    </div>
  );
};

export default SectionWrapper(BoardHome,"");
