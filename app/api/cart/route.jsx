import connectDB from "@/libs/connectDb";
import Cart from "@/models/Cart";
import Category from "@/models/Category";
import Product from "@/models/Product";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    await connectDB();
    const { quantity, product_color_id, user_id } = await request.json();
    
    const cart = await Cart.create({ quantity, product_color_id, user_id });
    return NextResponse.json(cart);
  } catch (err) {
    return NextResponse.json(err);
  }
}

export async function GET() {
  try {
    await connectDB();
    const cart = await Cart.find({});
    return NextResponse.json(cart);
  } catch (err) {
    return NextResponse.json(err);
  }
}
