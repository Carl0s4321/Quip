import { useState } from "react";

function ColumnPopup({ isCreate, togglePopup, handleSubmit }) {
  const [name, setName] = useState("");

  function handleCreate(e) {
    e.preventDefault();
    handleSubmit(name);
    togglePopup();
  }

  return (
    <>
      {isCreate ? (
        <form onSubmit={handleCreate}>
          <p className="text-gray-600 mb-1">Enter Column Name</p>
          <input
            type="text"
            value={name}
            required
            onChange={(e) => setName(e.target.value)}
            className="border border-gray-300 rounded p-2 w-full mb-4"
            placeholder="Column Name"
          />
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-500 text-white rounded px-4 py-2"
            >
              Create
            </button>
          </div>
        </form>
      ) : (
        <>
          <p className="text-lg mb-2">
            Are you sure you want to{" "}
            <span className="font-semibold">delete</span> this Column?
          </p>
          <div className="flex w-full justify-evenly">
            <button
              className="p-2 bg-green-500 text-white rounded-md px-6 hover:bg-green-600"
            >
              Yes
            </button>
          </div>
        </>
      )}
    </>
  );
}

export default ColumnPopup;
