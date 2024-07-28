"use client";

import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import Loader from "./Loader";
import { useAppContext } from "@/libs/AppContext";

export default function CartItem({
  quantity,
  cartId,
  ProductColorId,
  changeQuantity,
  deleteFromCart,
  total,
  setTotal,
}) {
  const { items, setItems } = useAppContext();

  const [product, setProduct] = useState();
  const [color, setColor] = useState();
  const [category, setCategory] = useState();

  useEffect(() => {
    axios
      .get("/api/products-color/" + ProductColorId)
      .then((res) => {
        setProduct(res.data.product_id);
        setColor(res.data.color_id);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    if (product) {
      setTotal(prevTotal => prevTotal + product.price * quantity/2);

      axios
        .get("/api/category/" + product.category_id)
        .then((res) => {
          setCategory(res.data.name);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [product]);

  useEffect(() => {
    if (color && color.length > 7) {
      axios
        .get("/api/color/" + color)
        .then((res) => {
          setColor(res.data.name);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [color]);

  return product && color.length == 7 && category ? (
    <div className="product-cart mt-10 px-5 flex items-center justify-center">
      <img
        src={`${`https://res.cloudinary.com/dhzp53fkf/image/upload/w_600,h_400,c_fill,q_auto,f_auto/${
          product.image.split("/")[product.image.split("/").length - 1]
        }`}`}
        className="w-32 h-32 rounded-lg object-cover"
      />
      <div className="content h-32 w-full flex items-start justify-between flex-col px-4">
        <h4 className="text-label">{category}</h4>
        <div className="flex items-center justify-center gap-5">
          <h1 className="text-xl font-bold mt-2">{product.name}</h1>
          <FontAwesomeIcon
            className="text-xl"
            icon={faTrash}
            onClick={(e) => deleteFromCart(e, cartId, product.price, quantity)}
          />
        </div>
        <div className="flex items-center justify-center gap-5">
          <div
            className="w-10 h-10 rounded-lg"
            style={{ background: color }}
          ></div>
          <p>
            <span className="text-purple product-price">$</span> {product.price}
          </p>
          <div className="quantity w-36 h-10 rounded-3xl border border-black flex items-center justify-between">
            <div
              className="icon w-1/4 hover:text-white hover:bg-black h-10 flex items-center justify-center rounded-l-3xl"
              onClick={(e) => changeQuantity(e, "-", cartId,product.price)}
            >
              <FontAwesomeIcon icon={faMinus} />
            </div>
            <span className="flex items-center product-quantity justify-center h-10">
              {quantity}
            </span>
            <div
              className="icon w-1/3 hover:text-white hover:bg-black h-10 flex items-center justify-center rounded-r-3xl"
              onClick={(e) => changeQuantity(e, "+", cartId,product.price)}
            >
              <FontAwesomeIcon icon={faPlus} />
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <Loader />
  );
}
