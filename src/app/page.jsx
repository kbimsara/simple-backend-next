"use client";
import { useState,useEffect } from "react";
import Cardtxt from "@/component/Cardtxt/Cardtxt";
import { data } from "autoprefixer";

export default function Home() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [users, setUsers] = useState([]);

  // Fetch users on mount
  useEffect(() => {
    fetchUsers();
  }, [users]);
  
  const fetchUsers = async () => {
    try {
      const res = await fetch("/api/users");
      const data = await res.json();
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };
  // save to database
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email }),
      });

      if (response.ok) {
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
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-3xl font-bold">CRUD</h1>
      <div className="flex flex-col items-center justify-center w-full max-w-4xl px-4 py-6">
        <form className="w-full max-w-sm" onSubmit={handleSubmit}>
          <div>
            <label className="block mb-2 font-bold">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g: Black Leather Wallet"
              className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mt-4">
            <label className="block mb-2 font-bold">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g: user@example.com"
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
      <h1 className="text-3xl font-bold">View</h1>
      <div className="flex flex-col items-center justify-center w-full max-w-4xl px-4 py-6">
        {/* <Cardtxt id={1} name={"Name"} email={"email"} />
        <Cardtxt id={2} name={"Name"} email={"email"} />
        <Cardtxt id={3} name={"Name"} email={"email"} /> */}
        {users.map((user) => (
          <Cardtxt id={user._id} name={user.name} email={user.email} />
        ))}
      </div>
    </div>
  );
}
