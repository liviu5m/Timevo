"use client";

import Loader from "@/components/Loader";
import axios from "axios";
import React, { useEffect, useState } from "react";

export default function Product({ productsColor, product }) {
  const [colors, setColors] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setColors(productsColor.filter((col) => col.product_id == product._id));
  }, []);
  const optimizedImageURL = `https://res.cloudinary.com/dhzp53fkf/image/upload/w_600,h_400,c_fill,q_auto,f_auto/${
    product.image.split("/")[product.image.split("/").length - 1]
  }`;

  return loading ? (
    <Loader />
  ) : (
    colors && (
      <div className="pb-5 rounded-2xl bg-white w-full shadow-lg shadow-gray-500/50">
        <div className="w-full h-80 overflow-hidden rounded-t-2xl cursor-pointer">
          <a href={`/admin/product/details/${product._id}`}>
            <img
              src={optimizedImageURL}
              className="w-full h-full object-cover rounded-t-2xl hover:scale-110"
              alt=""
            />
          </a>
        </div>
        <div className="content px-5 flex items-center justify-center flex-col">
          <h2 className="text-center text-purple font-light mt-5">
            {product.category_id.name}
          </h2>
          <h2 className="text-center mt-2 font-bold text-xl">{product.name}</h2>
          <div className="col flex items-center justify-center gap-2 mt-2">
            {colors.map((color) => {
              return (
                <div
                  className="w-7 h-7 rounded-full"
                  style={{ background: color.color_id.name }}
                ></div>
              );
            })}
          </div>
          <p className="text-center mt-2">
            <span className="text-purple">$</span> {product.price}
          </p>
          <a href={`/admin/product/details/${product._id}`} className="w-full py-4 rounded-lg bg-purple text-white text-center mt-5 hover:shadow-lg hover:shadow-purple-400">See Full Product</a>
        </div>
      </div>
    )
  );
}
