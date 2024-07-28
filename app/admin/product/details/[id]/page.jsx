"use client";

import Loader from "@/components/Loader";
import { useAppContext } from "@/libs/AppContext";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function page(context) {


  const [product, setProduct] = useState();
  const [selectedColor, setSelectedColor] = useState();
  const [inCart, setInCart] = useState(false);
  const [colors, setColors] = useState();
  const [quantity, setQuantity] = useState(1);
  const { id } = context.params;

  const {items, setItems} = useAppContext();

  const addToCart = (e) => {
    if (inCart) {
      toast("Product already in cart");
      return;
    }
    if (!localStorage.getItem("userId")) window.location.pathname = "/login";
    console.log(selectedColor._id);
    axios
      .post("/api/cart", {
        product_color_id: selectedColor._id,
        quantity,
        user_id: localStorage.getItem("userId"),
      })
      .then((res) => {
        console.log(res.data);
        toast("Product Added successful in cart");
        setQuantity(1);
        setInCart(true);
        setItems(items+1);
        // document.getElementById("countCart").textContent = Number(document.getElementById("countCart").textContent)+1;
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    axios
      .get("/api/product/" + id)
      .then((res) => {
        setProduct(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    axios
      .get("/api/products-color")
      .then((res) => {
        setColors(res.data.filter((el) => el.product_id == id));
        setSelectedColor(res.data.filter((el) => el.product_id == id)[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  useEffect(() => {
    axios
      .get("/api/cart")
      .then((res) => {
        if (
          res.data.filter(
            (el) =>
              el.user_id == localStorage.getItem("userId") &&
              el.product_color_id == selectedColor._id
          ).length > 0
        )
          setInCart(true);
        else setInCart(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [selectedColor, items]);
  const optimizedImageURL =
    product &&
    `https://res.cloudinary.com/dhzp53fkf/image/upload/w_600,h_400,c_fill,q_auto,f_auto/${
      product.image.split("/")[product.image.split("/").length - 1]
    }`;
  return product && colors ? (
    <div className="content">
      <h1 className="my-20 text-6xl font-bold uppercase text-center ">
        {product.name}
      </h1>
      <div className="flex">
        <div className="w-1/2 flex items-center justify-center">
          <img
            src={optimizedImageURL}
            className="custom-image-size rounded-lg"
            alt=""
          />
        </div>
        <div className="w-1/2">
          <h2 className="text-2xl">{product.name}</h2>
          <h4>{product.category_id.name}</h4>
          <p className="mt-5 text-label">{product.description}</p>
          <h4 className="text-xl mt-10">
            <span className="text-purple">$</span> {product.price}
          </h4>
          <div className="colors mt-10 flex gap-3 items-center">
            {colors.map((color) => {
              return (
                <div
                  key={color.id}
                  className={`color w-10 h-10 cursor-pointer select-none rounded-full ${
                    color._id == selectedColor._id
                      ? "border scale-110 border-black "
                      : ""
                  }`}
                  style={{ backgroundColor: color.color_id.name }}
                  onClick={(e) => setSelectedColor(color)}
                />
              );
            })}
          </div>
          <div className="flex items-center gap-5">
            <div className="quantity  w-52 mt-10 h-16 rounded-3xl border border-black flex items-center justify-between">
              <div
                className="icon w-1/3 hover:text-white hover:bg-black h-16 flex items-center justify-center rounded-l-3xl"
                onClick={(e) => setQuantity(quantity == 1 ? 1 : quantity - 1)}
              >
                <FontAwesomeIcon icon={faMinus} />
              </div>
              <span className="flex items-center justify-center h-16">
                {quantity}
              </span>
              <div
                className="icon w-1/3 hover:text-white hover:bg-black h-16 flex items-center justify-center rounded-r-3xl"
                onClick={(e) => setQuantity(quantity + 1)}
              >
                <FontAwesomeIcon icon={faPlus} />
              </div>
            </div>
            <button
              className={`rounded-3xl w-80 h-16 mt-10  hover:bg-black ${
                inCart ? "text-purple bg-white hover:bg-white" : "text-white bg-purple"
              }`}
              onClick={(e) => addToCart(e)}
            >
              {inCart ? "Already In Cart" : "Add To Cart"}
            </button>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  ) : (
    <Loader />
  );
}
