import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark, faClock } from "@fortawesome/free-solid-svg-icons";

const TaskCard = (props) => {
    const task = props.task;
    const innerRef = props.innerRef;
    const draggableProps = props.draggableProps;
    const dragHandleProps = props.dragHandleProps;
    return(
        <div 
            className="bg-white p-5 rounded-md space-y-2 drop-shadow-md"
            {...draggableProps}
            {...dragHandleProps}
            ref={innerRef}
        >

            <h1 className="font-semibold text-lg">{task.taskTitle}</h1>
            <p>{task.taskDesc}</p>
            {task.dueDate && 
                <div>
                    <FontAwesomeIcon icon={faClock}/>
                    <p>{task.dueDate}</p>
                </div>
            }

            <div className="flex items-end justify-end p-2">
                <button  className="text-red-500 hover:text-red-600">
                    <FontAwesomeIcon icon={faCircleXmark} className="h-10 w-10"/>
                </button>
            </div>

            
        </div>
    )
}

export default TaskCard;