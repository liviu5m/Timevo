import connectDB from "@/libs/connectDb";
import Color from "@/models/Color";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    await connectDB();
    const {name} = await request.json();
    const color = await Color.create({name});
    return NextResponse.json(color);
  }catch(err) {
    return NextResponse.json(err);
  }
}


export async function GET() {
  try {
    await connectDB();
    const colors = await Color.find({});
    return NextResponse.json(colors);
  }catch(err) {
    return NextResponse.json(err);
  }
}

