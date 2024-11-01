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
      try {
        const boardData = await getBoard(boardId);
        // console.log(boardData)
        socket.emit('initialBoardData', boardData);
      } catch (error) {
        console.error("Error fetching board data:", error);
      }
    });


    socket.on('createColumn', async ({columnName, boardData }) => {
        try {
            const result = await createColumn(columnName, boardData);
    
            if (result.success) {
                // notify all clients to refresh the board data
                const updatedBoardData = await getBoard(boardData._id);

                io.emit('refreshBoardData', updatedBoardData);
                socket.emit('columnCreated', {
                    success: true,
                    message: 'Column created successfully',
                });
            } else {
                socket.emit('columnCreated', {
                    success: false,
                    message: result.message,
                });
            }
        } catch (error) {
            console.error("Error handling createColumn event:", error);
            socket.emit('columnCreated', {
                success: false,
                message: 'Internal server error',
            });
        }
    });

    socket.on('deleteColumn', async({columnId, taskIds, boardId}) => {
        try {
            const result = await deleteColumn(columnId, taskIds);
    
            if (result.success) {
                // notify all clients to refresh the board data
                const updatedBoardData = await getBoard(boardId);

                io.emit('refreshBoardData', updatedBoardData);
                socket.emit('deleteColumnResponse', {
                    success: true,
                    message: 'Column succesfully deleted',
                });
            } else {
                socket.emit('deleteColumnResponse', {
                    success: false,
                    message: result.message,
                });
            }
        } catch (error) {
            console.error("Error handling deleteColumn event:", error);
            socket.emit('deleteColumnResponse', {
                success: false,
                message: 'Internal server error',
            });
        }
    })

    socket.on('updateColumnPosition', async({boardId, columnOrder}) => {
        try{
            const result = await updateColumnPosition(boardId, columnOrder)
            if(result.success){
                // notify all clients to refresh the board data
                const updatedBoardData = await getBoard(boardId);

                io.emit('refreshBoardData', updatedBoardData);
                socket.emit('updateColumnPosResponse', {
                    success: true,
                    message: 'Column succesfully updated',
                });
            } else {
                socket.emit('updateColumnPosResponse', {
                    success: false,
                    message: 'Column update failed',
                }); 
            }

        }catch(error){
            console.error("Error handling updateColumnPosition event:", error);
        }
    })
    
  
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
