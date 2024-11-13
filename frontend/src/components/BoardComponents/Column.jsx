import Task from "./Task";
import { Droppable, Draggable } from "@hello-pangea/dnd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faPlus } from "@fortawesome/free-solid-svg-icons";
import socket from "../../utils/socket";
import { useEffect, useState } from "react";

function Column({
  setActiveColumn,
  setActiveElement,
  setColumnFuncs,
  setTaskFuncs,
  column,
  tasks,
  index,
  boardId,
  togglePopup,
  setType,
  setAction,
}) {
  const [editButton, setEditButton] = useState(false);

  useEffect(() => {
    console.log(column)
    console.log(tasks)
    setColumnFuncs((prevFuncs) => ({
      ...prevFuncs,
      [column.id]: {
        edit: editColumn,
        delete: deleteColumn,
        data: { title: column.title },
      },
    }));
  }, [setColumnFuncs, column.id]);

  function deleteColumn() {
    const taskIds = Object.values(tasks).map((task) => task.id);
    socket.emit("deleteColumn", {
      columnId: column.id,
      taskIds: taskIds,
      boardId: boardId,
    });
  }

  function editColumn(newTitle) {
    socket.emit("editColumn", {
      columnId: column.id,
      title: {
        old: column.title,
        new: newTitle.title,
      },
      boardId: boardId,
    });
  }

  return (
    <div className="w-[300px]">
      <Draggable draggableId={column.id} key={column.id} index={index}>
        {(provided) => (
          <div
            className="m-2 rounded-md bg-gray-200 w-full flex flex-col"
            {...provided.draggableProps}
            ref={provided.innerRef}
          >
            <div
              className="flex flex-row px-5 p-2 font-bold justify-between"
              onMouseEnter={() => setEditButton(true)}
              onMouseLeave={() => setEditButton(false)}
            >
              <h2 {...provided.dragHandleProps} className="grow text-black-200">
                {column.title}
              </h2>

              {editButton && (
                <div
                  onClick={() => {
                    setType("Column");
                    setAction("edit");
                    setActiveElement(column.id);
                    togglePopup();
                  }}
                  className="edit-button"
                >
                  <FontAwesomeIcon icon={faPencil} />
                </div>
              )}
            </div>
            <Droppable droppableId={column.id} type="task">
              {(provided, snapshot) => (
                <div className="flex flex-col h-full">
                  <div
                    className={`${
                      snapshot.isDraggingOver ? "bg-lightBlue" : ""
                    } p-2 transition-colors duration-200 ease-in-out flex-grow min-h-28`}
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                  >
                    {tasks.map((task, index) => {
                      return (
                        <Task
                          setTaskFuncs={setTaskFuncs}
                          boardId={boardId}
                          key={task.id}
                          columnId={column.id}
                          task={task}
                          index={index}
                          setAction={setAction}
                          setType={setType}
                          setActiveElement={setActiveElement}
                          togglePopup={togglePopup}
                        />
                      );
                    })}
                    {provided.placeholder}
                  </div>
                  <div className="p-2">
                    <button
                      onClick={() => {
                        setType("Task");
                        setAction("create");
                        setActiveColumn(column.id)
                        togglePopup();
                      }}
                    >
                      <span className="pr-2">
                        <FontAwesomeIcon icon={faPlus} />
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
    </div>
  );
}

export default Column;
