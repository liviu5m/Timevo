import connectDB from "@/libs/connectDb";
import Color from "@/models/Color";
import { NextResponse } from "next/server";

export async function DELETE(request, { params }) {
  try {
    await connectDB();
    const { id } = params;

    const color = await Color.findByIdAndDelete(id);
    return NextResponse.json(color);
  } catch (err) {
    return NextResponse.json(err);
  }
}

export async function PUT(request, { params }) {
  try {
    await connectDB();
    const { id } = params;
    const { name } = await request.json();

    const color = await Color.findByIdAndUpdate(id, { name });
    return NextResponse.json(color);
  } catch (err) {
    return NextResponse.json(err);
  }
}

export async function GET(request, { params }) {
  try {
    await connectDB();
    const { id } = params;

    const color = await Color.findById(id);
    return NextResponse.json(color);
  } catch (err) {
    return NextResponse.json(err);
  }
}
