"use client";

import axios from "axios";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function page() {
  const [name, setName] = useState();

  const createCOlor = (e) => {
    e.preventDefault();

    if (name.trim()) {
      axios
        .post("/api/color", {
          name: e.target.name.value,
        })
        .then((res) => {
          console.log(res.data);
          toast("Color created !");
          setName("");
        })
        .catch((err) => {
          console.log(err);
        });
    } else toast("You must fill the field !");
  };

  return (
    <div className="flex items-center justify-center w-full">
      <form className="w-4/12 mt-28" onSubmit={(e) => createCOlor(e)}>
        <h1 className="mb-10 text-3xl font-bold text-center">
          Create Color
        </h1>
        <input
          type="color"
          className="rounded-3xl h-20 px-2 py-1 w-full outline-none border border-gray-300 select-none"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button className="mt-10 w-full py-5 text-center border border-black bg-black text-white hover:bg-white hover:text-black rounded-3xl">
          Submit
        </button>
      </form>
      <ToastContainer />
    </div>
  );
}
