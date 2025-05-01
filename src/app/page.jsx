"use client";
import { useState, FormEvent } from "react";
import Cardtxt from "@/component/Cardtxt/Cardtxt";

export default function Home() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  // save data
  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Data saved successfully!\nName: ${name}\nEmail: ${email}`);
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
        <Cardtxt id={1} name={"Name"} email={"email"} />
        <Cardtxt id={2} name={"Name"} email={"email"} />
        <Cardtxt id={3} name={"Name"} email={"email"} />
      </div>
    </div>
  );
}
