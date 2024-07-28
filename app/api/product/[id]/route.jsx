import connectDB from "@/libs/connectDb";
import Product from "@/models/Product";
import { NextResponse } from "next/server";

export async function DELETE(request, { params }) {
  try {
    await connectDB();
    const { id } = params;

    const product = await Product.findByIdAndDelete(id);
    return NextResponse.json(product);
  } catch (err) {
    return NextResponse.json(err);
  }
}

export async function PUT(request, { params }) {
  try {
    await connectDB();
    const { id } = params;
    const { name, price, image, category_id, description } =
      await request.json();
    const product = await Product.findByIdAndUpdate(id, {
      name,
      price,
      image,
      category_id,
      description,
    });
    return NextResponse.json(product);
  } catch (err) {
    return NextResponse.json(err);
  }
}

export async function GET(request, { params }) {
  try {
    await connectDB();
    const { id } = params;

    const product = await Product.findById(id).populate("category_id");
    return NextResponse.json(product);
  } catch (err) {
    return NextResponse.json(err);
  }
}
