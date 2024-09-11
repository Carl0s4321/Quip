import { Draggable, Droppable } from "@hello-pangea/dnd";
import TaskCard from "./TaskCard";

const Column = (props) => {
    const index = props.index;
    const tasks = props.tasks;
    const id = props.id;
    return(
        <Draggable draggableId={id} index={index}>
            {(provided)=>(
                <div 
                    ref={provided.innerRef} 
                    {...provided.draggableProps} 
                    {...provided.dragHandleProps}
                >
                    <Droppable droppableId={`droppable-` + index} type="card">
                        {(provided, snapshot) => (
                            <div
                                {...provided.droppableProps} 
                                ref={provided.innerRef}
                                className={`p-2 rounded-2xl shadow-sm ${snapshot.isDraggingOver? "bg-green-200" : "bg-white/50"}`}
                            >

                                <h2 className="flex justify-between font-semibold text-xl p-2">
                                    {id}
                                    <span className="text-gray-500 bg-gray-200 rounded-full px-2 py-1 text-sm font-normal">
                                        {tasks.length}
                                    </span>
                                </h2>

                                <div className="space-y-2">
                                    {tasks.map((task, index) => (
                                        <Draggable
                                            key={task.$id}
                                            draggableId={task.$id}
                                            index={index}
                                        >
                                            {(provided) => (
                                                <TaskCard 
                                                    // key={id}
                                                    task={task} 
                                                    index={index}
                                                    innerRef={provided.innerRef}
                                                    draggableProps={provided.draggableProps}
                                                    dragHandleProps={provided.dragHandleProps}  
                                                />
                                            )}
                                        </Draggable>
                                    ))}

                                    <div>
                                        <button>
                                            +
                                        </button>
                                    </div>
                                </div>


                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </div>
            )}
        </Draggable>
    )
  }

  export default Column;