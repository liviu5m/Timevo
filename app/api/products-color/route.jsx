import connectDB from "@/libs/connectDb";
import ProductsColor from "@/models/ProductsColor";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    await connectDB();
    const { color_id, quantity, product_id } = await request.json();
    const productsColor = await ProductsColor.create({
      quantity,
      product_id,
      color_id,
    });
    return NextResponse.json(productsColor);
  } catch (err) {
    return NextResponse.json(err);
  }
}

export async function GET() {
  try {
    await connectDB();
    const colors = await ProductsColor.find({}).populate("color_id");
    return NextResponse.json(colors);
  } catch (err) {
    return NextResponse.json(err);
  }
}

export async function DELETE(request, { params }) {
  try {
    await connectDB();
    const url = new URL(request.url);
    const product_id = url.searchParams.get('product_id');

    const result = await ProductsColor.deleteMany({ product_id });

    if (result.deletedCount === 0) {
      return NextResponse.json({ message: 'Product color not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Product color deleted successfully' }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ message: 'Internal Server Error', error: err.message }, { status: 500 });
  }
}

