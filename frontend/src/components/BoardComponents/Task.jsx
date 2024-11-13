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
                {task.dueDate && (
                  <div className="flex flex-row gap-2 items-center">
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
