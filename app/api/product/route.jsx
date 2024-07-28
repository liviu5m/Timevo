import connectDB from "@/libs/connectDb";
import Category from "@/models/Category";
import Product from "@/models/Product";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    await connectDB();
    const { name, price, image, category_id, description } = await request.json();
    const product = await Product.create({ name, price, image, category_id,description });
    return NextResponse.json(product);
  } catch (err) {
    return NextResponse.json(err);
  }
}

export async function GET() {
  try {
    await connectDB();
    const products = await Product.find({}).populate('category_id');
    return NextResponse.json(products);
  } catch (err) {
    return NextResponse.json(err);
  }
}
