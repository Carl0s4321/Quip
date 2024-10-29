import { useState } from "react";

const BoardPopup = ({ type, onClick, onSubmit, onClose }) => {
  const [boardName, setBoardName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (boardName.trim()) {
      onSubmit(boardName);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-xl p-4 shadow-md w-80">
        {type === "create" ? (
          <>
            <h2 className="text-lg font-semibold mb-4">Enter Board Name</h2>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                value={boardName}
                onChange={(e) => setBoardName(e.target.value)}
                className="border border-gray-300 rounded p-2 w-full mb-4"
                placeholder="Board Name"
              />
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-blue-500 text-white rounded px-4 py-2 mr-2"
                >
                  Create
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="bg-gray-500 text-white rounded px-4 py-2"
                >
                  Cancel
                </button>
              </div>
            </form>
          </>
        ) : (
          <>
            <p className="text-lg mb-2">
              Are you sure you want to{" "}
              <span className="font-semibold">delete</span> this board?
            </p>
            <div className="flex w-full justify-evenly">
              <button
                className="p-2 bg-green-500 text-white rounded-md px-6 hover:bg-green-600"
                onClick={onClick}
              >
                Yes
              </button>
              <button
                className="p-2 bg-red-500 text-white rounded-md px-6 hover:bg-red-600"
                onClick={onClose}
              >
                No
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default BoardPopup;
