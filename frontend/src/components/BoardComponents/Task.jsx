import {
  faCheck,
  faX,
  faPencil,
  faClock,
} from "@fortawesome/free-solid-svg-icons";
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
  const [daysLeft, setDaysLeft] = useState(0);

  function editTask(newData) {
    socket.emit("editTask", {
      title: newData.title,
      content: newData.content,
      dueDate: newData.dueDate,
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

  function countDaysLeft(currDate, dueDate) {
    // console.log(currDate, "to", dueDate);
    return Math.round((dueDate - currDate) / (1000 * 60 * 60 * 24));
  }

  useEffect(() => {
    // console.log(task.dueDate , typeof task.dueDate)
    setDaysLeft(countDaysLeft(new Date(), new Date(task.dueDate)));

    setTaskFuncs((prevFuncs) => ({
      ...prevFuncs,
      [task.id]: {
        edit: editTask,
        delete: deleteTask,
        data: {
          title: task.title,
          content: task.content,
          dueDate: task.dueDate,
        },
      },
    }));
  }, [setTaskFuncs, task]);

  return (
    <div>
      <Draggable draggableId={task.id} key={task.id} index={index}>
        {(provided, snapshot) => (
          <div
            className={`${
              snapshot.isDragging ? "bg-gray-400" : "bg-white-100"
            } rounded-md mb-2`}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
          >
            <div
              className="p-2 flex flex-row justify-between px-5 "
              onMouseEnter={() => setEditButton(true)}
              onMouseLeave={() => setEditButton(false)}
            >
              <div className="flex flex-col gap-1 overflow-hidden">
                <h2 className="font-semibold">{task.title}</h2>
                <p className="break-words">{task.content}</p>
                {task.dueDate && (
                  <div
                    className={`${
                      daysLeft < 5
                        ? daysLeft < 3
                          ? "bg-red-800"
                          : "bg-yellow-600"
                        : "bg-green-800"
                    } text-xs text-white flex flex-row gap-2 items-center w-fit p-2 rounded-md`}
                  >
                    <FontAwesomeIcon icon={faClock} />
                    <p>
                      {daysLeft >= 0 ? (
                        <span>
                          {daysLeft} {daysLeft > 1 ? "Days" : "Day"}
                        </span>
                      ) : (
                        "Past Due Date!"
                      )}
                    </p>
                  </div>
                )}
              </div>

              {editButton ? (
                <div
                  onClick={() => {
                    setType("Task");
                    setAction("edit");
                    setActiveElement(task.id);
                    togglePopup();
                  }}
                  className="edit-button"
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
    </div>
  );
}

export default Task;
