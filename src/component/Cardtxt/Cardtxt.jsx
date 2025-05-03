import React from "react";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { FaEdit } from "react-icons/fa";

function Cardtxt({ id, name, email, onDelete, onEdit }) {

  return (
    <div className="m-2 flex flex-row items-left justify-between w-full max-w-sm p-4 bg-white border border-gray-300 rounded-md shadow-md text-gray-700">
      <div className="flex flex-col items-left justify-between">
        <p className="text-xl font-bold">{name}</p>
        <span className="text-sm font-thin">{email}</span>
      </div>
      <div className="flex flex-row items-center gap-2">
        <button
          onClick={() => onEdit(id)}
          className="bg-green-500 text-white font-bold p-2 border rounded-full"
        >
          <FaEdit />
        </button>
        <button
          onClick={() => onDelete(id)} // call parent function
          className="bg-red-500 text-white font-bold p-2 border rounded-full"
        >
          <RiDeleteBin5Fill />
        </button>
      </div>
    </div>
  );
}

export default Cardtxt;
