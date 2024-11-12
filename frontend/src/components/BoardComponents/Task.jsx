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

  function editTask(newData) {
    console.log(newData, 'newData in editTask')
    socket.emit("editTask", {
      title: newData.title,
      content: newData.content,
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

  // function createTask(title) {
  //   socket.emit("createTask", {
  //     title: title,
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
        data: { title: task.title, content: task.content},
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
              <div className="flex flex-col">
                <h2 className="font-semibold">{task.title}</h2>
                <p className="text-justify">{task.content}</p>
              </div>

              {editButton ? (
                <div
                  onClick={() => {
                    setType("Task");
                    setAction("edit");
                    setActiveElement(task.id);
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
          data={{ title: task.title }}
        />
      )} */}
    </>
  );
}

export default Task;
