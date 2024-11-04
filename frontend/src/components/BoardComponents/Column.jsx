import Task from "./Task";
import { Droppable, Draggable } from "@hello-pangea/dnd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark, faPlus } from "@fortawesome/free-solid-svg-icons";
import socket from "../../utils/socket";
import { useEffect } from "react";

function Column({ column, tasks, index, boardId }) {
  function handleDeleteColumn() {
    const taskIds = Object.values(tasks).map((task) => task.id);
    socket.emit("deleteColumn", {
      columnId: column.id,
      taskIds: taskIds,
      boardId: boardId,
    });
    // console.log(column);
    // console.log(tasks);
  }

  function handleCreateTask() {
    socket.emit("createTask", {
      content: 'testask',
      columnId: column.id,
      boardId: boardId,
    });
  }

  return (
    <>
    <Draggable draggableId={column.id} key={column.id} index={index}>
      {(provided) => (
        <div
          className="m-2 border-2 border-black w-full flex flex-col"
          {...provided.draggableProps}
          ref={provided.innerRef}
        >
          <div className="flex flex-row p-2">
            <h2 {...provided.dragHandleProps} className="grow">
              {column.title}
            </h2>
            <div className="cursor-pointer" onClick={handleDeleteColumn}>
              <FontAwesomeIcon
                icon={faCircleXmark}
                className="rounded-full text-red-500 text-2xl"
              />
            </div>
          </div>
          <Droppable droppableId={column.id} type="task">
            {(provided, snapshot) => (
              <div className="flex flex-col h-full">
                <div
                  className={`${
                    snapshot.isDraggingOver ? "bg-green-400" : ""
                  } p-2 transition-colors duration-200 ease-in-out flex-grow min-h-28`}
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  {tasks.map((task, index) => {
                    return <Task boardId={boardId} key={task.id} task={task} index={index} />;
                  })}
                  {provided.placeholder}
                </div>
                <div className="p-2">
                  <button onClick={handleCreateTask}>
                    <span className="pr-2">
                      <FontAwesomeIcon icon={faPlus}/>
                    </span>
                    Add task
                  </button>
                </div>
              </div>
            )}
          </Droppable>
        </div>
      )}
    </Draggable>


                   
    
    </>
    
    
  );
}

export default Column;
