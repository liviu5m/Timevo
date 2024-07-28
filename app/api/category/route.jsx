import connectDB from "@/libs/connectDb";
import Category from "@/models/Category";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    await connectDB();
    const {name} = await request.json();
    const category = await Category.create({name});
    return NextResponse.json(category);
  }catch(err) {
    return NextResponse.json(err);
  }
}


export async function GET() {
  try {
    await connectDB();
    const categories = await Category.find({});
    return NextResponse.json(categories);
  }catch(err) {
    return NextResponse.json(err);
  }
}

