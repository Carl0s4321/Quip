import Task from "./Task";
import { Droppable, Draggable } from "@hello-pangea/dnd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faPlus } from "@fortawesome/free-solid-svg-icons";
import socket from "../../utils/socket";
import Popup from "./Popup/Popup";
import { useState } from "react";

function Column({ column, tasks, index, boardId}) {
  const [isPopupVisible, setPopupVisible] = useState(false)
  const [editButton, setEditButton] = useState(false)
  const [action, setAction] = useState('')
  const [type, setType] = useState('')

  function deleteColumn() {
    const taskIds = Object.values(tasks).map((task) => task.id);
    socket.emit("deleteColumn", {
      columnId: column.id,
      taskIds: taskIds,
      boardId: boardId,
    });
    togglePopup()
  }

  function editColumn(newTitle){
    socket.emit("editColumn", {
      columnId: column.id,
      title: {
        old: column.title,
        new: newTitle,
      },
      boardId: boardId,
    })
    togglePopup()
  }

  function togglePopup() {
    setPopupVisible(!isPopupVisible);
  }

  function createTask(content) {
    socket.emit("createTask", {
      content: content,
      columnId: column.id,
      boardId: boardId,
    });
  }

  const conditionalProps =
  type === 'Column'
    ? {
        deleteFunc: deleteColumn,
        editFunc: editColumn,
        data: { title: column.title },
      }
    : type === 'Task'
    ? {
        createFunc: createTask,  // Only pass createFunc for 'task'
        deleteFunc: null,               // Set deleteFunc to null for 'task'
        editFunc: null,                 // Set editFunc to null for 'task'
        data: null                      // Set data to null for 'task'
      }
    : {};

  return (
    <>
    <Draggable draggableId={column.id} key={column.id} index={index}>
      {(provided) => (
        <div
          className="m-2 border-2 border-black w-full flex flex-col"
          {...provided.draggableProps}
          ref={provided.innerRef}
        >
          <div className="flex flex-row px-5 p-2 bg-yellow-500 justify-between"
            onMouseEnter={()=>setEditButton(true)}
            onMouseLeave={()=>setEditButton(false)}
          >
            <h2 {...provided.dragHandleProps} className="grow">
              {column.title}
            </h2>

            {editButton && (
              <div onClick={()=>{
                setType('Column')
                setAction('edit')
                togglePopup()
                }} 
                className="hover:cursor-pointer"
              >
                <FontAwesomeIcon
                  icon={faPencil}
                />
              </div>
            )}

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
                    return <Task boardId={boardId} key={task.id} columnId={column.id} task={task} index={index} />;
                  })}
                  {provided.placeholder}
                </div>
                <div className="p-2">
                  <button onClick={()=>{
                    setType("Task")
                    setAction("create")
                    togglePopup()
                  }}>
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

    {isPopupVisible && (
      <Popup 
        type={type}
        action={action}
        togglePopup={togglePopup}
        // deleteFunc={deleteColumn}
        // editFunc={editColumn}
        // data={{
        //   title: column.title,
        // }}
        {...conditionalProps}
        />
    )}
    </>
    
    
  );
}

export default Column;
