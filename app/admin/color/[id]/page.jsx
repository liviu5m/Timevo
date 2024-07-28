"use client";

import Loader from "@/components/Loader";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function page(context) {
  const [color, setColor] = useState();
  const [loader, setLoader] = useState();
  const { id } = context.params;

  useEffect(() => {
    setLoader(true);
    axios
      .get(`/api/color/${id}`)
      .then((res) => {
        console.log(res.data);
        setColor(res.data.name);
        setLoader(false);
      })
      .catch((err) => {
        console.log(err);
        setLoader(false);
      });
  }, []);

  const updateColor = (e) => {
    e.preventDefault();
    if (e.target.name) {
      axios
        .put("/api/color/" + id, {
          name: e.target.name.value,
        })
        .then((res) => {
          console.log(res.data);
          window.location = "/admin";
        })
        .catch((err) => {
          console.log(err);
        });
    } else toast("Please fill the field");
  };

  return loader ? (
    <Loader />
  ) : (
    color && (
      <div className="flex items-center justify-center w-full">
        <form className="w-4/12 mt-28" onSubmit={(e) => updateColor(e)}>
          <h1 className="mb-10 text-3xl font-bold text-center">
            Update Color
          </h1>
          <input
            type="color"
            className="rounded-3xl px-2 py-1 h-20 w-full outline-none border border-gray-300 select-none"
            name="name"
            defaultValue={color}
          />
          <button className="mt-10 w-full py-5 text-center border border-black bg-black text-white hover:bg-white hover:text-black rounded-3xl">
            Submit
          </button>
        </form>
        <ToastContainer />
      </div>
    )
  );
}
