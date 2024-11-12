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
        new: newTitle,
      },
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
            <div
              className="flex flex-row px-5 p-2 bg-yellow-500 justify-between"
              onMouseEnter={() => setEditButton(true)}
              onMouseLeave={() => setEditButton(false)}
            >
              <h2 {...provided.dragHandleProps} className="grow">
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
                  className="hover:cursor-pointer"
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
                      snapshot.isDraggingOver ? "bg-green-400" : ""
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
    </>
  );
}

export default Column;
