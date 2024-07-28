import connectDB from "@/libs/connectDb";
import { v2 as cloudinary } from "cloudinary";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    await connectDB();
    const { img } = await request.json();

    cloudinary.config({
      cloud_name: "dhzp53fkf",
      api_key: "249592638693558",
      api_secret: "u979BZxN5atjQybAaq7WNbBlYBY",
    });
    const uploadResponse = await cloudinary.uploader.upload(img, {
      upload_preset: 'ml_default',
    });

    return NextResponse.json(uploadResponse);
  } catch (err) {
    return NextResponse.json(err);
  }
}
