import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";

/**
 * General handler to show Popup
 * @param {string} type "Board", "Column", "Task"
 * @param {string} action "create", "edit"
 * @returns
 */
const Popup = ({
  type,
  action,
  togglePopup,
  createFunc,
  editFunc,
  deleteFunc,
  data,
}) => {
  const [formData, setFormData] = useState({
    title: "",
    content:"",
    dueDate: "",
    image: "",
  });

  useEffect(() => {
    if (action === "edit" && data) {
      setFormData({
        title: data.title || "",
        content: data.content || "",
        dueDate: data.dueDate || "",
        image: data.image || "",
      });
    }
  }, [action, data]);

  function handleInputChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    console.log("input change", formData);
  }

  function handleSubmit(e) {
    e.preventDefault();

    const trimmedData = {
      ...formData,
      title: formData.title.trim(),
      content: formData.content.trim(),
    };

    if (action === "create") {
      createFunc(trimmedData.title);
    } else if (action === "edit") {
      editFunc(trimmedData);
    }
    togglePopup();
  }

  function handleDelete(e) {
    e.preventDefault();
    deleteFunc();
    togglePopup();
  }

  // dynamic field config based on type and action
  const fieldsConfig = {
    Column: {
      createFields: [
        {
          label: "Column Name",
          name: "title",
          placeholder: "Enter Column Name",
        },
      ],
      editFields: [
        { label: "Column Name", name: "title", placeholder: "Column Name" },
      ],
    },
    Task: {
      createFields: [
        { label: "Task Name", name: "title", placeholder: "Enter Task Name" },
      ],
      editFields: [
        { label: "Task Name", name: "title", placeholder: "Task Name" },
        {
          label: "Content",
          name: "content",
          placeholder: "Type something here...",
        },
        { label: "Due Date", name: "dueDate", placeholder: "Due Date" },
        { label: "Image URL", name: "image", placeholder: "Image URL" },
      ],
    },
  };

  const fieldsToRender =
    action === "create"
      ? fieldsConfig[type].createFields
      : fieldsConfig[type].editFields;

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div className="relative bg-white rounded-lg shadow-lg p-6 w-80">
          <button
            className="absolute top-3 right-5 text-gray-500 hover:text-gray-700"
            onClick={togglePopup}
          >
            <FontAwesomeIcon icon={faX} />
          </button>
          <h2 className="text-lg font-semibold mb-4">{`${
            action === "create" ? "Create" : "Edit"
          } ${type}`}</h2>

          <form onSubmit={handleSubmit}>
            {fieldsToRender.map((field, index) => (
              <div key={index} className="mb-4">
                <label className="text-gray-600">{field.label}</label>
                {field.name === "content" ? (
                  <textarea
                    name={field.name}
                    value={formData[field.name] || ""}
                    onChange={handleInputChange}
                    className="border border-gray-300 rounded p-2 w-full"
                    placeholder={field.placeholder}
                    required={action === "create" && field.name === "name"}
                  />
                ) : (
                  <input
                    type="text"
                    name={field.name}
                    value={formData[field.name] || ""}
                    onChange={handleInputChange}
                    className="border border-gray-300 rounded p-2 w-full"
                    placeholder={field.placeholder}
                    required={action === "create" && field.name === "name"}
                  />
                )}
              </div>
            ))}

            <div className="flex flex-row w-full justify-end gap-5">
              <button
                type="submit"
                className="bg-blue-500 text-white rounded px-4 py-2"
              >
                {action === "create" ? "Create" : "Save"}
              </button>
              {action === "edit" && (
                <button onClick={handleDelete} className="text-red-500">
                  Delete
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Popup;
