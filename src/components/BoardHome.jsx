import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { databases, DATABASE_ID, BOARDS_ID, TODO_ID, INPROGRESS_ID, DONE_ID} from "../lib/appwrite";
import { SectionWrapper } from "../hoc";

import { Query } from "appwrite";
import { DragDropContext,Droppable, Draggable } from "@hello-pangea/dnd";


const BoardHome = () => {
  const { boardId } = useParams(); // get boardId from url '/board/:boardId
  const [board, setBoard] = useState(null);
  // const [tasks, setTasks] = useState([]);

  const [todoTasks, setTodoTasks] = useState([]);
  const [inProgressTasks, setInProgressTasks] = useState([]);
  const [doneTasks, setDoneTasks] = useState([]);

  const [columns, setColumns] = useState([]);

  const navigate = useNavigate();
  const grid = 8;

  const getTasks = async (boardId) => {
    try {
      const [todo, inprogress, done] = await Promise.all([
        databases.listDocuments(
          DATABASE_ID, 
          TODO_ID,
          [Query.equal('boardId', boardId)]
        ),
        databases.listDocuments(
          DATABASE_ID, 
          INPROGRESS_ID,
          [Query.equal('boardId', boardId)]
        ),
        databases.listDocuments(
          DATABASE_ID, 
          DONE_ID,
          [Query.equal('boardId', boardId)]
        )
      ]);
  
      return {
        todo: todo.documents,
        inprogress: inprogress.documents,
        done: done.documents,
      };
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
  
  const Task = (props) => {
    const task = props.task;
    const index = props.index;
    const draggableProps = props.draggableProps;
    const dragHandleProps = props.dragHandleProps;
    const innerRef = props.innerRef;
    // console.log('task: ', task);
  
    return (
      <div 
        className="bg-white rounde-md space-y-2 drop-shadow-md"
        {...draggableProps}
        {...dragHandleProps}
        ref={innerRef}
      >
            {task.taskTitle}
            <br />
            {task.taskSubTitle}
      </div>
    );
  };
  

  useEffect(() => {
    const fetchBoardDetails = async () => {
      // fetch board details w boardId
      const response = await databases.getDocument(DATABASE_ID, BOARDS_ID, boardId);
      setBoard(response);
      // console.log('response', response)
      const { todo: fetchedTodoTasks, inprogress: fetchedInProgressTasks, done: fetchedDoneTasks } = await getTasks(boardId);

      setColumns([
        { id: 'ToDo', tasks: fetchedTodoTasks },
        { id: 'InProgress', tasks: fetchedInProgressTasks },
        { id: 'Done', tasks: fetchedDoneTasks },
      ]);

      setTodoTasks(fetchedTodoTasks);
      setInProgressTasks(fetchedInProgressTasks);
      setDoneTasks(fetchedDoneTasks);

    };

    fetchBoardDetails();
  }, [boardId]);


  useEffect(() => {
    console.log('Updated tasks:', { todoTasks, inProgressTasks, doneTasks });
  }, [todoTasks, inProgressTasks, doneTasks]);



  
  const handleOnDragEnd = (result) => {

    const reorder = (list, startIndex, endIndex) => {
      const result = Array.from(list);
      const [removed] = result.splice(startIndex, 1);
      result.splice(endIndex, 0, removed);
    
      return result;
    };

    const{destination, source, type} = result;

    // dropped outside the list
    if (!destination) {
      return;
    }

    // column drag
    if(type==="column"){
      
    }

    // const items = reorder(
    //   tasks,
    //   result.source.index,
    //   result.destination.index
    // );

    // setTasks(items);
  }

  const Column = (props) => {
    const index = props.index;
    const tasks = props.tasks;
    const id = props.id;
    return(
      <Draggable draggableId={id} index={index}>
        {(provided)=>(
          <div 
            ref={provided.innerRef} 
            {...provided.draggableProps} 
            {...provided.dragHandleProps}
          >
            
            <Droppable droppableId={`droppable-` + index} type="card">
              {(provided, snapshot) => (
                <div 
                  {...provided.droppableProps} 
                  ref={provided.innerRef}
                  className={`p-2 rounded-2xl shadow-sm ${snapshot.isDraggingOver? "bg-green-200" : "bg-white/50"}`}
                >
                      <h2 className="flex justify-between font-semibold text-xl p-2">
                        {id}
                        <span className="text-gray-500 bg-gray-200 rounded-full px-2 py-1 text-sm font-normal">
                          {tasks.length}
                        </span>
                      </h2>

                      <div className="space-y-2">
                        {tasks.map((task, index) => (
                          <Draggable
                            key={task.$id}
                            draggableId={task.$id}
                            index={index}
                          >
                            {(provided) => (
                              <Task 
                                key={id} 
                                task={task} 
                                index={index}
                                innerRef={provided.innerRef}
                                draggableProps={provided.draggableProps}
                                dragHandleProps={provided.dragHandleProps}  
                              />

                            )}
                          </Draggable>
                        ))}
                        {provided.placeholder}

                        <div>
                          <button>
                            +
                          </button>
                        </div>
                      </div>
                </div>
              )}
            </Droppable>

          </div>
        )}

      </Draggable>
    )
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

        </div>
      </div>

    </div>
  );
};

export default SectionWrapper(BoardHome,"");
