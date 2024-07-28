"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import Product from "./Product";
import Pagination from "@/components/Pagination";

export default function Products({ prices, search, category, colorsFilter }) {
  const [originalProducts, setOriginalProducts] = useState();
  const [products, setProducts] = useState();
  const [productsData, setProductsData] = useState();
  const [productsColor, setProductsColor] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 8;

  useEffect(() => {
    if (originalProducts) {
      console.log("----------------------------");
      setProducts(
        originalProducts.filter((prod) => {
          if (
            search &&
            !prod.name.toLowerCase().includes(search.toLowerCase())
          ) {
            return false;
          }

          if (
            prices[1] != 0 &&
            !(prod.price >= prices[0] && prod.price <= prices[1])
          )
            return false;

          if (category && prod.category_id._id != category) return false;
          let go = true;

          if (colorsFilter && colorsFilter._id) {
            go = false;

            productsColor
              .filter((color) => color.product_id == prod._id)
              .forEach((p) => {
                if (p.color_id.name == colorsFilter.name) {
                  go = true;
                  return;
                }
              });
          }
          if (go) return prod;
        })
      );

      setCurrentPage(1);
    }
  }, [prices, search, category, colorsFilter, currentPage]);

  const onPageChange = (page) => {
    setCurrentPage(page);
    setProductsData(paginate(products, currentPage));
  };
  const paginate = (items, pageNumber) => {
    const startIndex = (pageNumber - 1) * pageSize;
    return items.slice(startIndex, startIndex + pageSize);
  };

  useEffect(() => {
    if (products) onPageChange(currentPage);
  }, [products, currentPage]);

  useEffect(() => {
    axios
      .get("/api/product")
      .then((res) => {
        setOriginalProducts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    axios
      .get("/api/products-color")
      .then((res) => {
        setProductsColor(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    productsData && (
      <div className="flex flex-col w-4/5">
        <div className="mx-10 w-full grid grid-cols-4 gap-10">
          {productsData.map((product) => (
            <Product product={product} productsColor={productsColor} />
          ))}
        </div>
        <div className="mx-10 mt-10">
          {productsData.length > 0 ? (
            <Pagination
              items={products.length}
              currentPage={currentPage}
              pageSize={pageSize}
              onPageChange={onPageChange}
            />
          ) : (
            <p className="text-xl">No Products</p>
          )}
        </div>
      </div>
    )
  );
}
