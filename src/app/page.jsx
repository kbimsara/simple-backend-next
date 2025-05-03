"use client";
import { useState, useEffect } from "react";
import Cardtxt from "@/component/Cardtxt/Cardtxt";

export default function Home() {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [users, setUsers] = useState([]);

  // Fetch users on component mount
  useEffect(() => {
    fetchUsers();
  }, []);

  // Fetch all users from the server
  const fetchUsers = async () => {
    try {
      const res = await fetch("/api/users");
      const data = await res.json();
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  // Save new user to database
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!id) {
      try {
        const response = await fetch("/api/users", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, email }),
        });

        if (response.ok) {
          fetchUsers(); // refresh list
          alert("Data saved successfully!");
          setName("");
          setEmail("");
        } else {
          const err = await response.json();
          alert("Error saving data: " + err.error);
        }
      } catch (error) {
        console.error("Request failed:", error);
        alert("Failed to send request");
      }
    } else {
      try {
        const response = await fetch(`/api/users/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, email }),
        });

        if (response.ok) {
          fetchUsers(); // refresh list
          alert("Data updated successfully!");
          setName("");
          setEmail("");
          setId("");
        } else {
          const err = await response.json();
          alert("Error updating data: " + err.error);
        }
      } catch (error) {
        console.error("Request failed:", error);
        alert("Failed to send request");
      }
    }
  };

  // Delete user
  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this user?")) {
      try {
        const res = await fetch(`/api/users/${id}`, {
          method: "DELETE",
        });
        if (res.ok) {
          alert("User deleted successfully");
          fetchUsers(); // refresh list after deletion
        } else {
          const err = await res.json();
          alert("Error deleting user: " + err.error);
        }
      } catch (error) {
        console.error("Delete failed:", error);
        alert("Request failed");
      }
    }
  };

  // Edit user
  const handleEdit = async (id) => {
    setId(id);
    const user = users.find((user) => user._id === id);
    setName(user.name);
    setEmail(user.email);
    // console.log(users.find((user) => user._id === id));
    // alert(`Edit clicked for: ${id}`);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-3xl font-bold">CRUD</h1>

      {/* Form */}
      <div className="flex flex-col items-center justify-center w-full max-w-4xl px-4 py-6">
        <form className="w-full max-w-sm" onSubmit={handleSubmit}>
          <div>
            <label className="block mb-2 font-bold">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g: John Doe"
              className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mt-4">
            <label className="block mb-2 font-bold">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g: john@example.com"
              className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex items-center justify-between mt-4">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded"
            >
              Save
            </button>
          </div>
        </form>
      </div>

      {/* View List */}
      <h1 className="text-3xl font-bold">View</h1>
      <div className="flex flex-col items-center justify-center w-full max-w-4xl px-4 py-6">
        {users.length === 0 ? (
          <p className="text-gray-500">No users found</p>
        ) : (
          users.map((user) => (
            <Cardtxt
              key={user._id}
              id={user._id}
              name={user.name}
              email={user.email}
              onDelete={handleDelete}
              onEdit={handleEdit}
            />
          ))
        )}
      </div>
    </div>
  );
}
