import React from "react";

const Console: React.FC = () => {
  return (
    <div id="console_fasztudja" className="console">
      <h3>Console</h3>
      <pre className="bg-gray-900 text-green-400 p-4 rounded-lg">
        {`
alma
banán
körte
szilva
        `}
      </pre>
    </div>
  );
};

export default Console;
