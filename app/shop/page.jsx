"use client"

import React, { useState } from "react";
import Filter from "./components/Filter";
import Products from "./components/Products";

export default function page() {

  const [search, setSearch] = useState();
  const [category, setCategory] = useState();
  const [colorsFilter, setColorsFilter] = useState([]);
  const [prices, setPrices] = useState([0,0]);

  return (
    <div>
      <h1 className="uppercase text-center text-5xl text-main font-bold mt-20">
        Products
      </h1>
      <div className="product-container my-20 flex items-start justify-center">
        <Filter prices={prices} setPrices={setPrices} search={search} setSearch={setSearch} category={category} setCategory={setCategory} setColorsFilter={setColorsFilter} colorsFilter={colorsFilter} />
        <Products prices={prices} search={search} category={category} colorsFilter={colorsFilter} />
      </div>
    </div>
  );
}
