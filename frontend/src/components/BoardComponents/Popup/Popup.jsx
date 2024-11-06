import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import ColumnPopup from "./ColumnPopup";
import TaskPopup from "./TaskPopup"

const Popup = ({ type, isCreate, togglePopup, handleSubmit }) => {
  function renderContent() {
    switch (type) {
      case "Board":
        return <p className="text-gray-600 mb-4">board</p>;
      case "Column":
        return <ColumnPopup isCreate={isCreate} togglePopup={togglePopup} handleSubmit={handleSubmit}/>;
      case "Task":
        return <TaskPopup isCreate={isCreate} togglePopup={togglePopup} handleSubmit={handleSubmit}/>;
      default:
        return <p className="text-gray-600 mb-4">Invalid type specified.</p>;
    }
  }

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
          <h2 className="text-lg font-semibold mb-4">Create a {type}</h2>

          {renderContent()}

          {/* <button
            onClick={() => setIsOpen(!isOpen)}
            className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
        >
            Close Modal
        </button> */}
        </div>
      </div>
    </div>
  );
};

export default Popup;
