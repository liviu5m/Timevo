"use client";

import Loader from "@/components/Loader";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Range } from "react-range";

export default function Filter({
  prices,
  setPrices,
  search,
  setSearch,
  category,
  setCategory,
  colorsFilter,
  setColorsFilter,
}) {
  const [categories, setCategories] = useState();
  const [colors, setColors] = useState();
  const [products, setProducts] = useState();
  const [maxValue, setMaxValue] = useState(0);

  useEffect(() => {
    axios
      .get("/api/category")
      .then((res) => {
        setCategories(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    axios
      .get("/api/color")
      .then((res) => {
        setColors(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    axios
      .get("/api/product")
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    if (products) {
      products.forEach((el) => {
        if (el.price > maxValue) setMaxValue(el.price);
      });
    }
    setPrices([0, maxValue]);
  }, [products, maxValue]);

  return categories && colors && maxValue != 0 && products ? (
    <div className="w-1/5 bg-white rounded-3xl p-10">
      <h1 className="text-3xl text-main font-bold mb-5">Filter</h1>
      <div>
        <input
          type="text"
          name="Search"
          placeholder="Search..."
          className="w-full border-2 border-gray-400 rounded-lg py-2 px-3 outline-none select-none mb-10"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div>
        <h3 className="text-xl pb-5">Category</h3>
        <select
          name="category_id"
          className="w-full border-2 border-gray-400 rounded-lg py-2 px-3 outline-none select-none"
          value={category}
          onChange={(e) => {
            setCategory(e.target.value);
          }}
        >
          <option value="" selected>
            All categories
          </option>
          {categories.map((category) => {
            return (
              <option key={category.id} value={category._id}>
                {category.name}
              </option>
            );
          })}
        </select>
      </div>
      <div className="mt-5">
        <h3 className="text-xl pb-5">Colors</h3>
        <div className="colors flex gap-1">
          {colors.map((color) => {
            return (
              <div
                onClick={(e) => {
                  if(colorsFilter && colorsFilter.name == color.name) setColorsFilter();
                  else setColorsFilter({ name: color.name,_id: color._id });
                }}
                className={`${colorsFilter && colorsFilter.name == color.name ? "border border-black" : ""} color w-10 h-10 rounded-full select-none`}
                style={{ background: color.name }}
              ></div>
            );
          })}
        </div>
      </div>
      <div className="mt-5">
        <h3 className="text-xl pb-5">Price</h3>
        <div
          className="colors flex gap-1 items-center justify-center"
          style={{ padding: "12px" }}
        >
          <Range
            step={1}
            min={0}
            max={maxValue}
            values={prices}
            onChange={(val) => setPrices(val)}
            renderTrack={({ props, children }) => (
              <div
                {...props}
                style={{
                  ...props.style,
                  height: "6px",
                  width: "100%",
                  background: "#ccc",
                  transform: "translateY(-50%)",
                }}
              >
                {children}
                <div
                  style={{
                    position: "absolute",
                    height: "100%",
                    background: "#548BF4",
                    left: `${(prices[0] / maxValue) * 100}%`,
                    right: `${100 - (prices[1] / maxValue) * 100}%`,
                  }}
                />
              </div>
            )}
            renderThumb={({ props, isDragged, index }) => (
              <div
                {...props}
                style={{
                  ...props.style,
                  height: "24px",
                  width: "24px",
                  borderRadius: "12px",
                  backgroundColor: "#999",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  boxShadow: "0 2px 6px #AAA",
                  position: "absolute",
                  top: "-50%",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: "30px",
                    color: "#fff",
                    fontWeight: "bold",
                    backgroundColor: "#548BF4",
                    padding: "2px 5px",
                    borderRadius: "4px",
                    whiteSpace: "nowrap",
                  }}
                >
                  ${prices[index]}
                </div>
              </div>
            )}
          />
        </div>
      </div>
    </div>
  ) : (
    <Loader />
  );
}
