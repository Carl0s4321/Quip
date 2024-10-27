import Task from "./Task";
import { Droppable, Draggable } from "@hello-pangea/dnd";

function Column({ column, tasks, index }) {

console.log('column', column)
console.log('tasks', tasks)

  return (
    <Draggable draggableId={column.id} key={column.id} index={index}>
      {(provided) => (
        <div
          className="m-2 border-2 border-black w-full flex flex-col"
          {...provided.draggableProps}
          ref={provided.innerRef}
        >
          <h2 className="p-2" {...provided.dragHandleProps}>
            {column.title}
          </h2>
          <Droppable droppableId={column.id} type="task">
            {(provided, snapshot) => (
              <div
                className={`${
                  snapshot.isDraggingOver ? "bg-green-400" : ""
                } p-2 transition-colors duration-200 ease-in-out flex-grow min-h-28`}
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {tasks.map((task, index) => {
                  return <Task key={task.id} task={task} index={index} />;
                })}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
      )}
    </Draggable>
  );
}

export default Column;
