import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import ColumnPopup from "./ColumnPopup";
import TaskPopup from "./TaskPopup"
/**
 * General handler to show Popup
 * @param {string} type "Board", "Column", "Task"
 * @param {string} action "create", "delete", "edit"
 * @returns 
 */
const Popup = ({ type, action, togglePopup, createFunc, editFunc, deleteFunc, data }) => {
  function renderContent() {
    switch (type) {
      case "Board":
        return <p className="text-gray-600 mb-4">board</p>;
      case "Column":
        return <ColumnPopup action={action} togglePopup={togglePopup} createFunc={createFunc} editFunc={editFunc} deleteFunc={deleteFunc} data={data}/>;
      case "Task":
        return <TaskPopup action={action} togglePopup={togglePopup} createFunc={createFunc} editFunc={editFunc} deleteFunc={deleteFunc} data={data}/>;
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
          <h2 className="text-lg font-semibold mb-4">{type}</h2>

          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default Popup;
