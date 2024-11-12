import { faCheck, faX, faPencil } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Draggable } from "@hello-pangea/dnd";
import { useEffect, useState } from "react";
import socket from "../../utils/socket";

function Task({
  setTaskFuncs,
  setActiveElement,
  setAction,
  setType,
  togglePopup,
  task,
  index,
  columnId,
  boardId,
}) {
  const [editButton, setEditButton] = useState(false);

  function editTask(newTitle) {
    socket.emit("editTask", {
      content: { new: newTitle, old: task.content },
      taskId: task.id,
      boardId: boardId,
    });
  }

  function deleteTask() {
    socket.emit("deleteTask", {
      taskId: task.id,
      columnId: columnId,
      boardId: boardId,
    });
  }

  // function createTask(content) {
  //   socket.emit("createTask", {
  //     content: content,
  //     columnId: columnId,
  //     boardId: boardId,
  //   });
  // }

  useEffect(() => {
    setTaskFuncs((prevFuncs) => ({
      ...prevFuncs,
      [task.id]: {
        edit: editTask,
        delete: deleteTask,
        data: { title: task.content },
      },
    }));
  }, [setTaskFuncs, task]);

  return (
    <>
      <Draggable draggableId={task.id} key={task.id} index={index}>
        {(provided, snapshot) => (
          <div
            className={`${
              snapshot.isDragging ? "bg-blue-400" : ""
            } border-2 border-black mb-2`}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
          >
            <div
              className="p-2 flex w-full h-full flex-row justify-between px-5 bg-red-500"
              onMouseEnter={() => setEditButton(true)}
              onMouseLeave={() => setEditButton(false)}
            >
              <h2>{task.content}</h2>

              {editButton ? (
                <div
                  onClick={() => {
                    setType("Task");
                    setAction("edit");
                    setActiveElement(task.id)
                    togglePopup();
                  }}
                  className="hover:cursor-pointer"
                >
                  <FontAwesomeIcon icon={faPencil} />
                </div>
              ) : (
                <></>
              )}
            </div>
          </div>
        )}
      </Draggable>

      {/* {isPopupVisible && (
        <Popup
          type={type}
          action={action}
          togglePopup={togglePopup}
          editFunc={editTask}
          deleteFunc={deleteTask}
          data={{ title: task.content }}
        />
      )} */}
    </>
  );
}

export default Task;
