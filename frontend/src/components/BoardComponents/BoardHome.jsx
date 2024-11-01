import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { createColumn, getBoard } from "../../api";
import Column from "./Column";
import { DragDropContext, Droppable } from "@hello-pangea/dnd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import BoardPopup from "./BoardPopup";
import socket from "../../utils/socket";

function BoardHome() {
  const { boardId } = useParams();
  const [fetchTrigger, setFetchTrigger] = useState(false);
  const [isPopupVisible, setPopupVisible] = useState(false);

  const [columns, setColumns] = useState([]);
  const [tasks, setTasks] = useState([]);

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

  useEffect(() => {
    socket.connect();
    console.log("client connected");
    socket.emit("userConnected", { boardId });

    socket.on("initialBoardData", (boardData) => {
      // console.log(boardData)
      setInitData(boardData);
    });

    // listen for real time updates
    socket.on("columnCreated", (response) => {
      if (response.success) {
        console.log(response.message);
      } else {
        console.error(response.message);
      }
    });

    socket.on('deleteColumnResponse', (response) => {
      if (response.success) {
        console.log(response.message);
      } else {
        console.error(response.message);
      }
    })

    socket.on('updateColumnPosResponse', (response) => {
      if (response.success) {
        console.log(response.message);
      } else {
        console.error(response.message);
      }
    })    

    socket.on("refreshBoardData", (boardData) => {
      console.log(boardData)
      setInitData(boardData);
  });


    // Cleanup event listeners on component unmount
    return () => {
      socket.off("initialBoardData");
      socket.off("columnCreated");
      socket.off("refreshBoardData");
      socket.off("deleteColumnResponse");
      socket.off("updateColumnPosResponse");
      console.log("client disconnected");
      socket.disconnect();
    };
  }, [boardId]);

  function handleMoveColumn(newInitData){
    // console.log(initData)
    socket.emit('updateColumnPosition', {
      boardId: newInitData._id,
      columnOrder: newInitData.columnOrder,
    })
  }

  function onDragEnd(result) {
    const { destination, source, draggableId, type } = result;

    console.log(result);

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
  }

  async function handleCreateColumn(columnName) {
    console.log(initData);
    socket.emit("createColumn", {
      columnName: columnName,
      boardData: initData,
    });
    // console.log(initData)
    // const response = await createColumn(columnName, initData);
    // if (response.success) {
    //   setFetchTrigger(!fetchTrigger);
    //   console.log("nice");
    // }
    setPopupVisible(!isPopupVisible);
  }

  return (
    <>
      <h1 className="text-2xl font-semibold">{initData.name}</h1>
      <div className="flex flex-row">
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable
            droppableId="all-columns"
            direction="horizontal"
            type="column"
          >
            {(provided) => (
              <div
                className="flex flex-row grow"
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
                      key={column.columnId}
                      column={column}
                      tasks={tasks}
                      index={index}
                      boardId={boardId}
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
            onClick={() => setPopupVisible(!isPopupVisible)}
            icon={faPlus}
            className="p-5 rounded-lg hover:bg-gray-500 hover:cursor-pointer bg-gray-500/50 text-white text-3xl"
          />
        </div>
      </div>

      {/* POPUP FOR BOARD CREATION */}
      {isPopupVisible && (
        <BoardPopup
          type="create"
          onSubmit={handleCreateColumn}
          onClose={() => setPopupVisible(false)}
        />
      )}
    </>
  );
}

export default BoardHome;
