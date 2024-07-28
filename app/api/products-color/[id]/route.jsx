import connectDB from "@/libs/connectDb";
import Product from "@/models/Product";
import ProductsColor from "@/models/ProductsColor";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  try {
    await connectDB();
    const { id } = params;

    const product = await ProductsColor.findById(id).populate("product_id");
    return NextResponse.json(product);
  } catch (err) {
    return NextResponse.json(err);
  }
}
