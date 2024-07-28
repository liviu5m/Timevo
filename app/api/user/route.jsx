import connectDB from "@/libs/connectDb";
import User from "@/models/User";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function POST(request) {
  try {
    let { firstName, lastName, email, password } = await request.json();
    await connectDB();
    password = await bcrypt.hash(password, 10);

    let userExists = await User.findOne({ email });

    if (userExists)
      return NextResponse.json({ message: "Email must be unique" });
    const newUser = await User.create({ firstName, lastName, email, password });

    return NextResponse.json(newUser);
  } catch (err) {
    console.log(err);
    return NextResponse.json(err);
  }
}

export async function GET(request) {
  await connectDB();
  try {
    const url = new URL(request.url);

    const type = url.searchParams.get("type");
    if (type == "login") {
      const email = url.searchParams.get("email");
      const password = url.searchParams.get("password");
      const user = await User.findOne({ email });
      if (await bcrypt.compare(password, user.password)) {
        return NextResponse.json(user);
      } else return NextResponse.json({ message: "Invalid credentials" });
    }
  } catch (e) {
    return NextResponse.json(e);
  }
}
