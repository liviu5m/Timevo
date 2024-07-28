import connectDB from "@/libs/connectDb";
import Category from "@/models/Category";
import { NextResponse } from "next/server";

export async function DELETE(request, { params }) {
  try {
    await connectDB();
    const { id } = params;

    const category = await Category.findByIdAndDelete(id);
    return NextResponse.json(category);
  } catch (err) {
    return NextResponse.json(err);
  }
}

export async function PUT(request, { params }) {
  try {
    await connectDB();
    const { id } = params;
    const { name } = await request.json();

    const category = await Category.findByIdAndUpdate(id, { name });
    return NextResponse.json(category);
  } catch (err) {
    return NextResponse.json(err);
  }
}

export async function GET(request, { params }) {
  try {
    await connectDB();
    const { id } = params;

    const category = await Category.findById(id);
    return NextResponse.json(category);
  } catch (err) {
    return NextResponse.json(err);
  }
}
