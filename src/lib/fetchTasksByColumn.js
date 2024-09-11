import { Query } from "appwrite";
import { DATABASE_ID, databases, TASKS_ID } from "./appwrite"

import useBoardStore from "../store/boardStore";

export const fetchTasksByColumn = async () => {
    const boardInfo = useBoardStore.getState().board.boardInfo;
    // console.log("boardInfo: ",boardInfo)
    const currentBoardId = boardInfo.$id;
    // console.log("board id: ",currentBoardId)

    if (!currentBoardId) {
        console.warn("No currentBoardId set.");
        return null;
    }

    try {
        const data = await databases.listDocuments(
            DATABASE_ID,
            TASKS_ID,
            [Query.equal('boardId', currentBoardId)]
        );

        const tasks = data.documents;
        
        const columns = tasks.reduce((acc, task) => {
            // check for existing column w task.status in the map
            if (!acc.has(task.status)) {
                // create new column: {status, tasks[]}
                acc.set(task.status, {
                    id: task.status,
                    tasks: [],
                });
            }
            
            // push the task to the map
            acc.get(task.status).tasks.push({
                $id: task.$id,
                $createdAt: task.$createdAt,
                taskTitle: task.taskTitle,
                status: task.status,
                ...(task.taskDesc && {taskDesc: task.taskDesc}),
                ...(task.image && {image: JSON.parse(task.image)}),
                ...(task.dueDate && {dueDate: task.dueDate}),
            });
            
            return acc;
        }, new Map());


        // if no tasks in any columns, we make empty columns
        const columnTypes = ['todo', 'inprogress', 'done'];
        for(const columnType of columnTypes){
            //columnType not in columns, push it in columns
            if(!columns.get(columnType)){
                columns.set(columnType, {
                    id: columnType,
                    tasks: [],
                })
            }
        }

        return columns;
    } catch (error) {
        console.error("Error fetching tasks by column:", error);
        return null;
    }
};