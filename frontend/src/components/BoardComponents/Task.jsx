import { Draggable } from "@hello-pangea/dnd";

function Task({ task, index }) {
  return (
    <Draggable draggableId={task.id} key={task.id} index={index}>
      {(provided, snapshot) => (
        <div
          className={`${snapshot.isDragging? "bg-blue-400" : ""} border-2 border-black p-2 mb-2`}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref = {provided.innerRef}
        >
          {task.content}
        </div>
      )}
    </Draggable>
  );
}

export default Task;
