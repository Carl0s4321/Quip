// socket.js
const { Server } = require("socket.io");
const { ObjectId } = require('mongodb');
const database = require('./connect');

const BOARD_COLLECTION_NAME = 'boards';
const COLUMN_COLLECTION_NAME = 'columns';
const TASK_COLLECTION_NAME = 'tasks';

let io;

const initializeSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: "*",
    },
  });

  io.on('connection', (socket) => {
    socket.on('userConnected', async ({ boardId }) => {
        const boardData = await getBoard(boardId);
        socket.emit('refreshBoardData', boardData);
    });

    socket.on('createColumn', (data)=>{
        handleSocketEvent('createColumn', socket, data)
    });

    socket.on('deleteColumn', (data)=>{
        handleSocketEvent('deleteColumn', socket, data)
    });

    socket.on('updateColumnPosition', (data)=>{
        handleSocketEvent('updateColumnPosition', socket, data)
    });

    /**
     * General event handler for sockets
     * @param {string} eventType
     * @param {socket} socket
     * @param {*} data object of datas given in param
     * @returns updated boardData object and the event response
     */
    async function handleSocketEvent(eventType, socket, data){
        let result={};
        let board_id="";
        switch(eventType){
            case 'createColumn':{
                const {columnName, boardData} = data
                board_id = boardData._id
                result = await createColumn(columnName, boardData)
            }
                break

            case 'deleteColumn':{
                const {columnId, taskIds, boardId} = data
                board_id = boardId
                result = await deleteColumn(columnId, taskIds);
            }
                break

            case 'updateColumnPosition':{
                const {boardId, columnOrder} = data
                board_id = boardId
                result = await updateColumnPosition(boardId, columnOrder)
            }
                break
    
            

            // eventType doesnt match with known ones
            default:
                // HANDLE ERROR
                break
        }

        if(result.success){
            const updatedBoardData = await getBoard(board_id)
            io.emit('refreshBoardData', updatedBoardData)
            socket.emit(eventType, {
                success: true,
                message: `${eventType} is successful`,
            })
        }else{
            socket.emit('response', {
                success: false,
                message: `${eventType} failed!`,
            });
        }
    }
  });
};

const getIo = () => {
  if (!io) {
    throw new Error("Socket.io not initialized!");
  }
  return io;
};

async function updateColumnPosition(boardId, columnOrder) {
    let db = database.getDb();

    try{
        await db.collection(BOARD_COLLECTION_NAME).updateOne(
            {_id: new ObjectId(boardId)},
            {$set : {columnOrder: columnOrder}}
        )

        return {success: true}
    } catch(error){
        throw error
    }
}

async function deleteColumn(columnId, taskIds){
    let db = database.getDb();
    // console.log('taskIds', taskIds)
    const objectIds = taskIds.map(id => new ObjectId(id));

    try{
        await db.collection(TASK_COLLECTION_NAME).deleteMany({ _id: { $in: objectIds } });
        // if(taskIds){
        // }
        const result = await db.collection(COLUMN_COLLECTION_NAME).deleteOne({ _id: new ObjectId(columnId) });

        if (result.deletedCount > 0) {
            await db.collection(BOARD_COLLECTION_NAME).updateOne(
                { columnOrder: columnId }, 
                { $pull: { columnOrder: columnId } }
            );

            return { success: true};
            
        } else {

            return { success: false, message: 'Failed to delete column or column not found.' };
        }
        
    }catch(error){
        throw error
    }
}

/**
 * Gets the board data formatted into a boardData object
 * @param {*} boardId string
 * @returns boardData object
 */
async function getBoard(boardId) {
    try {
      const db = database.getDb();
  
      // Fetch the board by its ID
      const board = await db.collection(BOARD_COLLECTION_NAME).findOne({ _id: new ObjectId(boardId) });
      if (!board) {
        throw new Error("Board not found");
      }
  
      // Fetch columns associated with the board
      const columns = await db.collection(COLUMN_COLLECTION_NAME).find({ boardId: board._id.toString() }).toArray();
      const columnsObject = {};
  
      columns.forEach(column => {
        columnsObject[column._id] = {
          id: column._id.toString(),
          title: column.title,
          taskIds: column.taskIds || [],
        };
      });
  
      // Fetch tasks related to each column
      const tasks = await db.collection(TASK_COLLECTION_NAME).find({ columnId: { $in: Object.keys(columnsObject) } }).toArray();
      const tasksObject = {};
  
      tasks.forEach(task => {
        tasksObject[task._id] = {
          id: task._id.toString(),
          content: task.content,
        };
      });
  
      // Structure and return the board data
      return {
        _id: board._id.toString(),
        name: board.boardName,
        creatorId: board.creatorId,
        invitedUsers: board.invitedUsers || [],
        tasks: tasksObject,
        columns: columnsObject,
        columnOrder: board.columnOrder,
      };
    } catch (error) {
      console.error("Error fetching board data:", error);
      throw error;
    }
  }
  
async function createColumn(columnName, boardData){
    let db = database.getDb();

    const newColumn = {
        _id: new ObjectId(),
        boardId: boardData._id,
        title: columnName,
        taskIds: [],
    };

    try{
        let data = await db.collection(BOARD_COLLECTION_NAME).updateOne({_id: new ObjectId(boardData._id)}, {$addToSet: {columnOrder: newColumn._id.toString()}})
        
        if (data.modifiedCount > 0) {
            await db.collection(COLUMN_COLLECTION_NAME).insertOne(newColumn)

            const updatedBoardData = {
                ...boardData,
                columns: {
                    ...boardData.columns,
                    [newColumn._id.toString()]: {
                        id: newColumn._id.toString(), // change _id to id for damn react dnd
                        boardId: newColumn.boardId,
                        title: newColumn.title,
                        taskIds: newColumn.taskIds,
                    },
                },
                columnOrder: [...boardData.columnOrder, newColumn._id.toString()],
            };

            return { success: true, updatedBoardData };

        } else {
            return { success: false, message: 'Failed to add column to board or board not found' };
        }

    }catch(error){
        console.error("Error creating column:", error);
        throw error; 
    }


}

module.exports = { initializeSocket, getIo };
