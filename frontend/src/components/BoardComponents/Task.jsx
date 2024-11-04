import { faCheck, faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Draggable } from "@hello-pangea/dnd";
import { useState } from "react";
import socket from "../../utils/socket";

function Task({ task, index, boardId}) {
  const [readOnly, setReadOnly] = useState(true);
  const [title, setTitle] = useState(task.content)

  function handleTaskEdit(e){
    e.preventDefault()
    console.log('submit', title)
    socket.emit("editTask", {
      content: title,
      taskId: task.id,
      boardId: boardId,
    });
    setReadOnly(!readOnly)
  }

  return (
    <Draggable draggableId={task.id} key={task.id} index={index}>
      {(provided, snapshot) => (
        <div
          className={`${snapshot.isDragging? "bg-blue-400" : ""} border-2 border-black p-2 mb-2`}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref = {provided.innerRef}
        >
          <form onSubmit={(e)=>handleTaskEdit(e)}>
            <div className="flex flex-row">
              <input value={title} readOnly={readOnly} 
                onChange={(e)=>setTitle(e.target.value)}
              onDoubleClick={()=>{
                setReadOnly(!readOnly)
                }} className={`${readOnly? "cursor-pointer" : "cursor-text"} border-none outline-none bg-transparent`} />    
              {!readOnly? 
                <div className="flex flex-row gap-5">
                  <FontAwesomeIcon icon={faCheck}/>
                  <FontAwesomeIcon icon={faX}/>
                </div>
                :
                <></>
              }

            </div>
          </form>

        </div>
      )}
    </Draggable>
  );
}

export default Task;
