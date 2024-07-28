import connectDB from "@/libs/connectDb";
import Cart from "@/models/Cart";
import { NextResponse } from "next/server";

export async function DELETE(request, { params }) {
  try {
    await connectDB();
    const { id } = params;

    const cart = await Cart.findByIdAndDelete(id);
    return NextResponse.json(cart);
  } catch (err) {
    return NextResponse.json(err);
  }
}

export async function PUT(request, { params }) {
  try {
    await connectDB();
    const { id } = params;
    const { quantity } = await request.json();
    const cart = await Cart.findByIdAndUpdate(id, { quantity });
    return NextResponse.json(cart);
  } catch (err) {
    return NextResponse.json(err);
  }
}
