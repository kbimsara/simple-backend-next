// import connectDB from "../../../../lib/mongoose";
// import User from "../../../../models/userModel";
import { NextResponse } from "next/server";
import User from "../../../../../models/userModel";
import connectDB from "../../../../../lib/mongoose";

export async function DELETE(request, { params }) {
  try {
    await connectDB();
    await User.findByIdAndDelete(params.id);
    return NextResponse.json({ message: "User deleted successfully" });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// PUT /api/users/:id
export async function PUT(request, { params }) {
  const { id } = params;
  const body = await request.json();

  try {
    await connectDB();

    const updatedUser = await User.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });

    if (!updatedUser) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    return NextResponse.json(updatedUser, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}