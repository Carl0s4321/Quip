import { useState } from "react";

function TaskPopup({ action, togglePopup, createFunc }) {
  const [content, setContent] = useState("");

  function handleCreate(e) {
    e.preventDefault();
    createFunc(content);
    togglePopup();
  }

  switch(action) {
    case 'create':
      return (
        <form onSubmit={handleCreate}>
          <p className="text-gray-600 mb-1">Enter Task Name</p>
          <input
            type="text"
            value={content}
            required
            onChange={(e) => setContent(e.target.value)}
            className="border border-gray-300 rounded p-2 w-full mb-4"
            placeholder="Task Name"
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
        );
    case 'edit':
      return (
        <>
          {/* <form onSubmit={handleEdit}>
            <p>Title</p>
            <input onChange={(e)=>setTitle(e.target.value)} className="bg-red-200 w-full" value={title}/>

            <div className="flex flex-row w-full justify-end gap-5">
              <button type="submit">Save</button>
              <button onClick={(e)=>{
                e.preventDefault()
                deleteFunc()}}>Delete</button>
            </div>
          </form> */}
        </>
      );
    default:
      return <div>No valid action</div>;
  }}

export default TaskPopup;
