import { Draggable, Droppable } from "@hello-pangea/dnd";
import TaskCard from "./TaskCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import useBoardStore from "../store/boardStore";

const Column = (props) => {
    const index = props.index;
    const tasks = props.tasks;
    const id = props.id;
    const {searchString} = useBoardStore();
    return(
        <Draggable draggableId={id} index={index}>
            {(provided)=>(
                <div 
                    ref={provided.innerRef} 
                    {...provided.draggableProps} 
                    {...provided.dragHandleProps}
                >
                    <Droppable droppableId={index.toString()} type="card">
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
                                    {tasks.map((task, index) => {
                                        if(searchString && !task.taskTitle.toLowerCase().includes(searchString.toLowerCase())){
                                            return null;
                                        }

                                        return(
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
                                        )
                                    }
                                    )}

                                    <div className="flex items-end justify-end p-2">
                                        <button className="text-green-500 hover:text-green-600">
                                            <FontAwesomeIcon className="h-10 w-10" icon={faCirclePlus}/>
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