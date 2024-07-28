"use client";

import Loader from "@/components/Loader";
import { faCheck, faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";

export default function page() {
  useEffect(() => {
    if (localStorage.getItem("userId")) window.location.pathname = "/";
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .get("/api/user", {
        params: {
          email: e.target.email.value,
          password: e.target.password.value,
          type: "login",
        },
      })
      .then((res) => {
        console.log(res.data);
        if (res.data._id) {
          localStorage.setItem("userId", res.data._id);
          window.location.pathname = "/";
        } else toast("Invalid credentials");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="py-40 flex items-center justify-center">
      <div className="form-container p-10 bg-white w-2/5 rounded-xl">
        <h1 className="text-center font-bold text-5xl">👋 Step into Style !</h1>
        <p className="mt-9 mb-5">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Blanditiis
          impedit sunt, nisi asperiores itaque temporibus.
        </p>
        <form
          className="flex items-center justify-center flex-col"
          onSubmit={(e) => handleSubmit(e)}
        >
          <div className="form-group relative w-full">
            <input
              type="email"
              placeholder="Email"
              className="rounded-3xl px-7 py-5 w-full outline-none border border-gray-300 select-none"
              name="email"
            />
            <div className="checked absolute top-1/2 -translate-y-1/2 right-5">
              <FontAwesomeIcon icon={faCheckCircle} className="text-2xl" />
            </div>
          </div>
          <div className="form-group relative w-full mt-5">
            <input
              type="password"
              placeholder="Password"
              className="rounded-3xl px-7 py-5 w-full outline-none border border-gray-300 select-none"
              name="password"
            />
            <div className="checked absolute top-1/2 -translate-y-1/2 right-5">
              <FontAwesomeIcon icon={faCheckCircle} className="text-2xl" />
            </div>
          </div>
          <p className="flex items-center justify-between mt-5 w-full">
            <span>Don't have an account </span>
            <a href="/signup">Sign Up</a>
          </p>
          <button className="px-10 py-4 rounded-3xl bg-custom mt-5 text-white hover:bg-black ">
            Sign in
          </button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}
