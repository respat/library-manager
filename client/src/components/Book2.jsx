//ez a komponens csak egy prototípus/teszt

import { useState } from "react";

const Book2 = () => {
  const [expanded, setExpanded] = useState(false);
  return (
    <div
      className={`flex p-4 m-4 border rounded-md bg-white shadow-sm ${
        expanded ? "h-80" : "bg-red-50"
      }`}
    >
      <div className="flex flex-col w-full ">
        <div className="bg-red-300 gap-5 w-full h-40 p-4 flex items-center">
          <div className={`w-28 h-32 bg-green-200 rounded-md border`}></div>
          <div className="flex h-full p-2 w-full bg-blue-300">
            <h1>asd</h1>
            <div className="flex gap-3">
              <button
                onClick={() => setExpanded(!expanded)}
                className="w-9 h-9 border hover:bg-yellow-200 hover:border-yellow-300 hover:shadow-yellow-300 hover:shadow-md rounded-md flex justify-center items-center shadow-sm"
              ></button>
              <button className="w-9 h-9 border hover:bg-red-300 hover:border-red-400 hover:shadow-red-300 hover:shadow-md rounded-md flex justify-center items-center shadow-sm"></button>
            </div>
          </div>
        </div>
        <div className="flex flex-col w-full bg-blue-400">teszt</div>
      </div>
    </div>
  );
};

export default Book2;
