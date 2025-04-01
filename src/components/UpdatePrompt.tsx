import React from "react";

interface UpdatePromptProps {
  onUpdate: () => void;
}

const UpdatePrompt: React.FC<UpdatePromptProps> = ({ onUpdate }) => (
  <div className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-4 z-50 bg-gray-800 text-white px-4 py-3 rounded-lg shadow-lg flex justify-between items-center">
    <span className="text-sm">🔄 New version available</span>
    <button
      onClick={onUpdate}
      className="ml-4 px-3 py-1 text-sm bg-blue-500 hover:bg-blue-600 rounded"
    >
      Update
    </button>
  </div>
);

export default UpdatePrompt;
