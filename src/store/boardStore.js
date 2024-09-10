import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { fetchTasksByColumn } from '../lib/fetchTasksByColumn';

const useBoardStore = create(
  persist(
    (set) => ({
        board: {
            columns: new Map(), // init columns as an empty map
            boardInfo: {
                $id: null,
                boardName: null,
                creatorId: null,
                invitedUsers: [],
            },
        },

        clearBoardInfo: () => set({
            board: {
                columns: new Map(), // init columns as an empty map
                boardInfo: {
                    $id: null,
                    boardName: null,
                    creatorId: null,
                    invitedUsers: [],
                },
            },
          }),

        // function to set boardInfo within board
        setBoardInfo: (boardInfo) => set((state) => ({
            board: {
                ...state.board, // keep existing board state (columns)
                boardInfo: {
                    $id: boardInfo.$id,
                    boardName: boardInfo.boardName,
                    creatorId: boardInfo.userId,
                    invitedUsers: boardInfo.invitedUsers,
                },
            },
        })),

        getBoard: async () => {
            const columns = await fetchTasksByColumn();

            set((state) => ({
                board: {
                ...state.board, // keep existing board state (boardInfo)
                columns: columns,
                },
            }));
        },
        }),
    {
      name: 'board-storage',  // name of the item in the storage (must be unique)
      //local storage is used for storage
    }
  )
);

export default useBoardStore;
