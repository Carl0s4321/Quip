const TaskCard = (props) => {
    const task = props.task;
    const innerRef = props.innerRef;
    const draggableProps = props.draggableProps;
    const dragHandleProps = props.dragHandleProps;
    return(
        <div 
            className="bg-white rounded-md space-y-2 drop-shadow-md"
            {...draggableProps}
            {...dragHandleProps}
            ref={innerRef}
        >
            <p>{task.taskTitle}</p>
            <p>{task.taskDesc}</p>
            
        </div>
    )
}

export default TaskCard;