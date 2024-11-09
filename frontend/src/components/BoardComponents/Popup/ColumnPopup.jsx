import { useEffect, useState } from "react";

function ColumnPopup({ action, togglePopup, createFunc, deleteFunc, editFunc, data }) {
  const [name, setName] = useState("");
  const [title, setTitle] = useState(data?.title || "");

  function handleCreate(e) {
    e.preventDefault();
    createFunc(name);
    togglePopup();
  }

  function handleEdit(e){
    e.preventDefault();
    editFunc(title)
    togglePopup();
  }

  switch(action) {
    case 'create':
      return (
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
        );
    case 'edit':
      return (
        <>
          <form onSubmit={handleEdit}>
            <p>Title</p>
            <input onChange={(e)=>setTitle(e.target.value)} className="bg-red-200 w-full" value={title}/>

            <div className="flex flex-row w-full justify-end gap-5">
              <button type="submit">Save</button>
              <button onClick={(e)=>{
                e.preventDefault()
                deleteFunc()}}>Delete</button>
            </div>
          </form>
        </>
      );
    default:
      return <div>No valid action</div>;
  }
}

export default ColumnPopup;
