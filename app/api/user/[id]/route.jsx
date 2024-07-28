import connectDB from "@/libs/connectDb";
import User from "@/models/User";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function GET(req, { params }) {
  const { id } = params;

  try {
    await connectDB();

    const user = await User.findById(id);
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function PUT(req, { params }) {
  const { id } = params;
  const data = await req.json();

  await connectDB();

  try {
    if (data.type == "data") {
      const user = await User.findByIdAndUpdate(id, data, { new: true });
      if (!user) {
        return NextResponse.json(
          { message: "User not found" },
          { status: 405 }
        );
      }

      return NextResponse.json(user);
    } else {
      const user = await User.findById(id);
      if (await bcrypt.compare(data.currentPassword, user.password)) {
        const user = await User.findByIdAndUpdate(
          id,
          { password: data.password },
          { new: true }
        );
        return NextResponse.json(user);
      } else NextResponse.json("Something went wrong");
    }
  } catch (error) {
    console.error("Error updating user:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
