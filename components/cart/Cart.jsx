"use client";

import { useAppContext } from "@/libs/AppContext";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useEffect, useState } from "react";
import CartItem from "../CartItem";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Cart({ cart, setShowCart }) {
  const { items, setItems } = useAppContext();
  console.log(cart);
  const [total, setTotal] = useState(0);

  const changeQuantity = (e, type, id, price) => {
    if (
      type == "-" &&
      e.target.closest(".quantity").querySelector("span").innerText != 1
    ) {
      e.target.closest(".quantity").querySelector("span").innerText =
        Number(e.target.closest(".quantity").querySelector("span").innerText) -
        1;
      setTotal((prevTotal) => prevTotal - price);
    } else if (type == "+") {
      e.target.closest(".quantity").querySelector("span").innerText =
        Number(e.target.closest(".quantity").querySelector("span").innerText) +
        1;
      setTotal((prevTotal) => prevTotal + price);
    }

    axios
      .put("/api/cart/" + id, {
        quantity: e.target.closest(".quantity").querySelector("span").innerText,
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteFromCart = (e, id, price, quantity) => {
    setTotal((prevTotal) => prevTotal - price * quantity);
    console.log(id);
    axios
      .delete("/api/cart/" + id)
      .then((res) => {
        console.log(res.data);
        setItems(items - 1);
        setShowCart(false);
        setTimeout(() => {
          setShowCart(true);
        }, 100);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const checkout = (e) => {
    cart.forEach((el) => {
      deleteFromCart(e, el._id);
    });
    cart = [];
    setItems(0);
    toast("Successful checkout");
  };

  return (
    <div className="cart fixed w-screen max-h-screen top-0 z-30 overflow-y-scroll  left-0">
      <div className="flex w-full h-full">
        <div
          className="w-3/4 min-h-screen bg-black opacity-60"
          onClick={() => setShowCart(false)}
        ></div>
        <div className="w-1/4 bg-whitee min-h-screen text-black">
          <div className="px-5 py-8 flex items-center justify-between border-b border-gray-400">
            <h1 className="text-3xl font-bold">Your Cart ({items})</h1>
            <FontAwesomeIcon
              icon={faX}
              className="hover:text-red-500 text-xl mr-5 "
              onClick={() => setShowCart(false)}
            />
          </div>
          {cart.length == 0 ? (
            <h1 className="text-center text-xl font-bold mt-10">No Products</h1>
          ) : (
            <div>
              <div className="px-5">
                <div className="products h-full pb-5">
                  {cart.map((el) => {
                    console.log(el);
                    return (
                      <CartItem
                        cartId={el._id}
                        setTotal={setTotal}
                        total={total}
                        ProductColorId={el.product_color_id}
                        quantity={el.quantity}
                        changeQuantity={changeQuantity}
                        deleteFromCart={deleteFromCart}
                      />
                    );
                  })}
                </div>
                <h1>
                  Total Price: <span className="text-purple">$</span> {total}
                </h1>
                <button
                  className={`rounded-3xl w-full  h-16 mt-10  hover:bg-black text-purple bg-white`}
                  onClick={(e) => checkout(e)}
                >
                  Checkout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
