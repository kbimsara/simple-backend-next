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
