"use client";

import React, { useEffect, useRef, useState } from "react";
import Dropdown from "./Dropdown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBagShopping,
  faMinus,
  faPlus,
  faSearch,
  faTrash,
  faUser,
  faX,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import Loader from "./Loader";
import { useAppContext } from "@/libs/AppContext";
import Cart from "./cart/Cart";

export default function Header({ show, app }) {
  const [user, setUser] = useState();
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState();
  const [loading, setLoading] = useState(false);
  const [showCart, setShowCart] = useState(false);

  const { items, setItems } = useAppContext();


  // useEffect(() => {
  //   if (localStorage.getItem("userId")) {
  //     setLoading(true);
  //     axios
  //       .get("/api/user/" + localStorage.getItem("userId"))
  //       .then((res) => {
  //         setUser(res.data);
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //     axios
  //       .get("/api/cart")
  //       .then((res) => {
  //         setItems(res.data.length);
  //         setProducts(
  //           res.data
  //             .filter((el) => el.user_id == localStorage.getItem("userId"))
  //             .map(async (el, index) => {
  //               const res2 = await axios.get(
  //                 "/api/products-color/" + el.product_color_id
  //               );
  //               const product = await res2.data.product_id;
  //               const res3 = await axios.get(
  //                 "/api/color/" + res2.data.color_id
  //               );
  //               const color = await res3.data;
  //               const res4 = await axios.get(
  //                 "/api/category/" + product.category_id
  //               );
  //               const category = await res4.data.name;

  //               return (
  //                 <div className="product-cart mt-10 px-5 flex items-center justify-center">
  //                   <img
  //                     src={`${`https://res.cloudinary.com/dhzp53fkf/image/upload/w_600,h_400,c_fill,q_auto,f_auto/${
  //                       product.image.split("/")[
  //                         product.image.split("/").length - 1
  //                       ]
  //                     }`}`}
  //                     className="w-32 h-32 rounded-lg object-cover"
  //                   />
  //                   <div className="content h-32 w-full flex items-start justify-between flex-col px-4">
  //                     <h4 className="text-label">{category}</h4>
  //                     <div className="flex items-center justify-center gap-5">
  //                       <h1 className="text-xl font-bold mt-2">
  //                         {product.name}
  //                       </h1>
  //                       <FontAwesomeIcon
  //                         className="text-xl"
  //                         icon={faTrash}
  //                         onClick={(e) => deleteFromCart(e, el._id, index)}
  //                       />
  //                     </div>
  //                     <div className="flex items-center justify-center gap-5">
  //                       <div
  //                         className="w-10 h-10 rounded-lg"
  //                         style={{ background: color.name }}
  //                       ></div>
  //                       <p>
  //                         <span className="text-purple product-price">$</span>{" "}
  //                         {product.price}
  //                       </p>
  //                       <div className="quantity w-36 h-10 rounded-3xl border border-black flex items-center justify-between">
  //                         <div
  //                           className="icon w-1/4 hover:text-white hover:bg-black h-10 flex items-center justify-center rounded-l-3xl"
  //                           onClick={(e) => changeQuantity(e, "-", el._id)}
  //                         >
  //                           <FontAwesomeIcon icon={faMinus} />
  //                         </div>
  //                         <span className="flex items-center product-quantity justify-center h-10">
  //                           {el.quantity}
  //                         </span>
  //                         <div
  //                           className="icon w-1/3 hover:text-white hover:bg-black h-10 flex items-center justify-center rounded-r-3xl"
  //                           onClick={(e) => changeQuantity(e, "+", el._id)}
  //                         >
  //                           <FontAwesomeIcon icon={faPlus} />
  //                         </div>
  //                       </div>
  //                     </div>
  //                   </div>
  //                 </div>
  //               );
  //             })
  //         );
  //         setLoading(false);
  //       })
  //       .catch((err) => {
  //         setLoading(false);
  //         console.log(err);
  //       });
  //   }
  // }, [items]);

  useEffect(() => {
    axios
      .get("/api/cart")
      .then((res) => {
        setCart(
          res.data.filter((el) => el.user_id == localStorage.getItem("userId"))
        );
        setItems(res.data.filter((el) => el.user_id == localStorage.getItem("userId")).length);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [items, showCart]);

  return !loading && (
    <>
      <header
        className={`flex items-center justify-between text-white rounded-3xl py-5 px-16 ${
          show ? `${app ? "" : "bg-black"}` : "hidden"
        }`}
      >
        <nav>
          <ul className="flex items-center justify-center gap-7">
            <li>
              <a
                href="/"
                className={`font-bold link-a relative ${
                  window.location.pathname == "/" ? "active" : ""
                }`}
              >
                Home
              </a>
            </li>
            <li>
              <a href="/shop" className={`font-bold link-a relative`}>
                Shop
              </a>
            </li>
            <li>
              <a href="" className={`font-bold link-a relative`}>
                About
              </a>
            </li>
            <li>
              <Dropdown />
            </li>
            {user && user.role == "admin" && (
              <li>
                <a
                  href="/admin"
                  className={`font-bold link-a relative ${
                    window.location.pathname == "/admin" ? "active" : ""
                  }`}
                >
                  Admin Dashboard
                </a>
              </li>
            )}
          </ul>
        </nav>
        <div className="logo">
          <a href="/">
            <img src={"/imgs/logo.svg"} className="w-3/4" alt="" />
          </a>
        </div>
        <div className="tools flex items-center justify-center gap-7">
          <FontAwesomeIcon
            icon={faSearch}
            className="w-5 cursor-pointer icon-i"
          />
          <div className="cart relative p-2">
            <FontAwesomeIcon
              icon={faBagShopping}
              className="w-5 cursor-pointer icon-i"
              onClick={(e) => setShowCart(!showCart)}
            />
            <div
              id="countCart"
              className="absolute -top-0 -right-0 bg-purple text-white rounded-full w-5 h-5 flex items-center justify-center text-sm border-2 border-white"
            >
              {items}
            </div>
          </div>
          <a href={user ? "/account" : "/login"}>
            <FontAwesomeIcon
              icon={faUser}
              className="w-5 cursor-pointer icon-i"
            />
          </a>
        </div>
      </header>
      {showCart && <Cart cart={cart} setShowCart={setShowCart} />}
    </>
  )
}
