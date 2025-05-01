import React from "react";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { FaEdit } from "react-icons/fa";

function Cardtxt({ id, name, email }) {
  // function for edit
  const handleEdit = () => {
    alert(`Edit clicked for: ${id}`);
  };

  // function for delete
  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this user?")) {
      try {
        const res = await fetch(`/api/users/${id}`, {
          method: "DELETE",
        });
        if (res.ok) {
          alert("User deleted successfully");
          fetchUsers(); // refresh the list
        } else {
          const err = await res.json();
          alert("Error deleting user: " + err.error);
        }
      } catch (error) {
        console.error("Delete failed:", error);
      }
    }
  };

  return (
    <div className="m-2 flex flex-row items-left justify-between w-full max-w-sm p-4 bg-white border border-gray-300 rounded-md shadow-md text-gray-700">
      <div className="flex flex-col items-left justify-between">
        <p className="text-xl font-bold">{name}</p>
        <span className="text-sm font-thin">{email}</span>
      </div>
      <div className="flex flex-row items-center gap-2">
        <button
          onClick={handleEdit}
          className="bg-green-500 text-white font-bold p-2 border rounded-full"
        >
          <FaEdit />
        </button>
        <button
          onClick={() => handleDelete(id)}
          className="bg-red-500 text-white font-bold p-2 border rounded-full"
        >
          <RiDeleteBin5Fill />
        </button>
      </div>
    </div>
  );
}

export default Cardtxt;
