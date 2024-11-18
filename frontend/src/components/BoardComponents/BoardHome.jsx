import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Column from "./Column";
import { DragDropContext, Droppable } from "@hello-pangea/dnd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faStar as faStarFilled, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { faStar as faStarRegular } from "@fortawesome/free-regular-svg-icons";
import socket from "../../utils/socket";
import Popup from "./Popup/Popup";

function BoardHome() {
  const { boardId } = useParams();
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [type, setType] = useState("");
  const [action, setAction] = useState("");
  const [activeColumn, setActiveColumn] = useState(null);

  // need this cause if no, the last element rendered will replace all prev element's functions
  const [activeElement, setActiveElement] = useState(null);

  // function references
  const [columnFuncs, setColumnFuncs] = useState({});
  const [taskFuncs, setTaskFuncs] = useState({});

  const conditionalProps =
    type === "Column"
      ? {
          createFunc: (title) => handleAction("create", title),
          deleteFunc: () => handleAction("delete"),
          editFunc: (newTitle) => handleAction("edit", newTitle),
          data: columnFuncs[activeElement]?.data,
        }
      : type === "Task"
      ? {
          createFunc: (title) => handleAction("create", title),
          deleteFunc: () => handleAction("delete"),
          editFunc: (data) => handleAction("edit", data),
          data: taskFuncs[activeElement]?.data,
        }
      : {};

  function handleAction(actionType, arg) {
    if (actionType === "create") {
      if (type === "Column") {
        createColumn(arg);
      } else if (type === "Task") {
        createTask(activeColumn, arg);
      }
    } else {
      const func =
        type === "Column"
          ? columnFuncs[activeElement]
          : taskFuncs[activeElement];

      if (func[actionType]) {
        if (actionType === "edit") {
          console.log(arg, "arg");
          func.edit(arg);
        } else if (actionType === "delete") {
          func.delete();
        }
      }
    }
  }

  function createTask(columnId, title) {
    socket.emit("createTask", {
      title: title,
      columnId: columnId,
      boardId: boardId,
    });
  }

  function createColumn(columnName) {
    socket.emit("createColumn", {
      columnName: columnName,
      boardId: boardId,
    });
  }

  //   const [initData, setInitData] = useState({
  //     tasks: {
  //       "task-1": { id: "task-1", content: "Take out garbage" },
  //       "task-2": { id: "task-2", content: "Watch show" },
  //       "task-3": { id: "task-3", content: "Charge phone" },
  //       "task-4": { id: "task-4", content: "Cook dinner" },
  //     },
  //     columns: {
  //       "column-1": {
  //         id: "column-1",
  //         title: "To Do",
  //         taskIds: ["task-1", "task-2", "task-3", "task-4"],
  //       },
  //       "column-2": {
  //         id: "column-2",
  //         title: "In Progress",
  //         taskIds: [],
  //       },
  //       "column-3": {
  //         id: "column-3",
  //         title: "Done",
  //         taskIds: [],
  //       },
  //     },

  //     columnOrder: ["column-1", "column-2", "column-3"],
  //   });

  const [initData, setInitData] = useState({
    tasks: {},
    columns: {},
    columnOrder: [],
  });

  function togglePopup() {
    setPopupVisible(!isPopupVisible);
  }

  useEffect(() => {
    socket.connect();

    socket.on('connect', () => {console.log('client connected: ', socket.id)});
    socket.emit("userConnected", { boardId });

    socket.on("refreshBoardData", (boardData) => {
      setInitData(boardData);
    });

    socket.on("response", (response) => {
      if (response.success) {
        console.log(response.message);
      } else {
        console.error(response.message);
      }
    });

    // Cleanup event listeners on component unmount
    return () => {
      console.log("client disconnected: ", socket.id);
      socket.removeAllListeners();
      socket.disconnect();
    };
  }, [boardId]);

  /**
   * Handles the task move
   * @param {object} newInitData updated board data
   * @param {boolean} sameColumn true : task was moved in same column, else false
   */
  function handleMoveTask(newInitData, start, finish, movedTaskId) {
    socket.emit("updateTaskPosition", {
      boardId: newInitData._id,
      columns: newInitData.columns,
      start: start,
      finish: finish,
      movedTaskId: movedTaskId,
    });
  }

  function handleMoveColumn(newInitData) {
    // console.log(newInitData);
    socket.emit("updateColumnPosition", {
      boardId: newInitData._id,
      columnOrder: newInitData.columnOrder,
    });
  }

  function onDragEnd(result) {
    const { destination, source, draggableId, type } = result;

    // console.log(result);

    // dragged outside the droppable
    if (!destination) {
      return;
    }

    // dragged but not moved
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    // moving column
    if (type === "column") {
      const newColumnOrder = Array.from(initData.columnOrder);
      newColumnOrder.splice(source.index, 1);
      newColumnOrder.splice(destination.index, 0, draggableId);

      const newInitData = {
        ...initData,
        columnOrder: newColumnOrder,
      };

      setInitData(newInitData);
      handleMoveColumn(newInitData);
      return;
    }

    const start = initData.columns[source.droppableId];
    const finish = initData.columns[destination.droppableId];

    // console.log(start, '->', finish)

    // dropped in same column
    if (start === finish) {
      const newTaskIds = Array.from(start.taskIds);
      // remove 1 item at source.index from newTaskIds
      newTaskIds.splice(source.index, 1);
      // remove 0 item & insert draggableId at destination.index in newTaskIds
      newTaskIds.splice(destination.index, 0, draggableId);

      const newColumn = {
        ...start,
        taskIds: newTaskIds,
      };

      const newInitData = {
        ...initData,
        columns: {
          ...initData.columns,
          [newColumn.id]: newColumn,
        },
      };

      setInitData(newInitData);
      handleMoveTask(newInitData, start, finish, draggableId);
      return;
    }

    // move from one column to another
    const startTaskIds = Array.from(start.taskIds);
    startTaskIds.splice(source.index, 1);
    const newStart = {
      ...start,
      taskIds: startTaskIds,
    };

    const finishTaskIds = Array.from(finish.taskIds);
    finishTaskIds.splice(destination.index, 0, draggableId);
    const newFinish = {
      ...finish,
      taskIds: finishTaskIds,
    };

    const newInitData = {
      ...initData,
      columns: {
        ...initData.columns,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish,
      },
    };

    setInitData(newInitData);
    handleMoveTask(newInitData, start, finish, draggableId);
  }

  return (
    <>
      <div className="flex flex-row gap-5 items-center mb-3">
        <h1 className="text-2xl font-semibold">{initData.name}</h1>
        <button className="custom-button">
          <FontAwesomeIcon className="text-xl" icon={faStarRegular} />
        </button>
        <button className="custom-button">
          <FontAwesomeIcon icon={faUserPlus} className="mr-3" />
          Share
        </button>
      </div>

      <div className="flex flex-row gap-5">
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable
            droppableId="all-columns"
            direction="horizontal"
            type="column"
          >
            {(provided) => (
              <div
                className="flex flex-row gap-5 shrink max-w-full overflow-x-scroll custom-scrollbar"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {initData.columnOrder.map((columnId, index) => {
                  const column = initData.columns[columnId];
                  const tasks = column.taskIds.map((taskId) => {
                    return initData.tasks[taskId];
                  });

                  return (
                    <Column
                      setActiveColumn={setActiveColumn}
                      setActiveElement={setActiveElement}
                      setColumnFuncs={setColumnFuncs}
                      setTaskFuncs={setTaskFuncs}
                      setType={setType}
                      setAction={setAction}
                      togglePopup={togglePopup}
                      boardId={boardId}
                      key={column.columnId}
                      column={column}
                      tasks={tasks}
                      index={index}
                    />
                  );
                })}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>

        <div className="flex items-center">
          <FontAwesomeIcon
            onClick={() => {
              setType("Column");
              setAction("create");
              togglePopup();
            }}
            icon={faPlus}
            className="p-5 rounded-lg hover:bg-gray-500 hover:cursor-pointer bg-gray-500/50 text-white text-3xl"
          />
        </div>
      </div>

      {isPopupVisible && (
        <Popup
          type={type}
          action={action}
          togglePopup={togglePopup}
          {...conditionalProps}
        />
      )}
    </>
  );
}

export default BoardHome;
