import connectDB from "../../../../lib/mongoose";
import User from "../../../../models/userModel";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { name, email } = await request.json();

    await connectDB();

    const newUser = new User({ name, email });
    await newUser.save();

    return NextResponse.json({ message: "User created successfully" }, { status: 201 });
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// GET – Retrieve users
export async function GET() {
  try {
    await connectDB();
    const users = await User.find().sort({ createdAt: -1 }); // Optional: latest first
    return NextResponse.json(users);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

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

