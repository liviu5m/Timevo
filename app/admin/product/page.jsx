"use client";

import Loader from "@/components/Loader";
import {
  faMinus,
  faMinusCircle,
  faPlus,
  faPlusCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { loadGetInitialProps } from "next/dist/shared/lib/utils";
import React, { useEffect, useRef, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Color from "./components/Color";

export default function page() {
  const [categories, setCategories] = useState();
  const [colors, setColors] = useState();
  const [img, setImg] = useState();
  const [file, setFile] = useState();
  const [loader, setLoader] = useState(false);
  const formRef = useRef();

  useEffect(() => {
    axios
      .get("/api/category")
      .then((res) => setCategories(res.data))
      .catch((err) => {
        console.log(err);
      });

    axios
      .get("/api/color")
      .then((res) => {
        setColors(
          res.data.map((color) => {
            return { ...color, active: false, quantity: 1 };
          })
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setFile(file);
    if (file) {
      const url = URL.createObjectURL(file);
      setImg(url);
    }
  };

  const createProduct = (e) => {
    e.preventDefault();
    if (!file) {
      toast("Please select a image");
      return;
    }
    if (colors.filter((col) => col.active).length == 0) {
      toast("Please select colors of products");
      return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      try {
        setLoader(true);
        axios
          .post("/api/product/image", {
            img: reader.result,
          })
          .then((res) => {
            axios
              .post("/api/product", {
                name: e.target.name.value,
                price: e.target.price.value,
                description: e.target.description.value,
                image: res.data.url,
                category_id: e.target.category_id.value,
              })
              .then((res) => {
                colors
                  .filter((col) => col.active)
                  .forEach((color) => {
                    axios
                      .post("/api/products-color", {
                        color_id: color._id,
                        quantity: color.quantity,
                        product_id: res.data._id,
                      })
                      .then((res) => {
                        console.log(res.data);
                      })
                      .catch((err) => {
                        console.log(err);
                      });
                  });

                setImg();
                e.target.name.value = "";
                e.target.price.value = "";
                e.target.category_id.value = "";
                setColors(
                  colors.map((col) => {
                    if (col.active) {
                      return {
                        _id: col._id,
                        name: col.name,
                        active: false,
                      };
                    } else return col;
                  })
                );
                toast("Product Create Successfully");
                setLoader(false);
              })
              .catch((err) => {
                console.log(err);
                setLoader(false);
              });
          })
          .catch((err) => {
            console.log(err);
          });
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    };
  };

  const getTextColor = (hexColor) => {
    const hexToRgb = (hex) => {
      hex = hex.replace(/^#/, "");

      let bigint = parseInt(hex, 16);
      let r = (bigint >> 16) & 255;
      let g = (bigint >> 8) & 255;
      let b = bigint & 255;

      return [r, g, b];
    };

    const luminance = (color) => {
      const [r, g, b] = color.map((c) => c / 255);
      const a = [r, g, b].map((v) =>
        v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4)
      );
      return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
    };

    const bgColor = hexToRgb(hexColor);
    const bgLuminance = luminance(bgColor);

    return bgLuminance < 0.5 ? "white" : "black";
  };

  const handleColors = (id, active) => {
    setColors(
      colors.map((col) => {
        if (col._id == id) {
          return { ...col, active: !active, quantity:1 };
        } else return col;
      })
    );
  };

  return !loader ? (
    categories && colors ? (
      <div className="flex items-center justify-center w-full">
        <form
          className="w-1/2 mt-28"
          onSubmit={(e) => createProduct(e)}
          ref={formRef}
        >
          <h1 className="mb-10 text-3xl font-bold text-center">
            Create Product
          </h1>
          <div className="flex items-start justify-center gap-20 w-full">
            <div className="w-1/2">
              <div className="w-full">
                <input
                  type="text"
                  placeholder="Name"
                  className="rounded-3xl px-7 py-5 w-full outline-none border border-gray-300 select-none"
                  name="name"
                />
                <input
                  type="number"
                  step={0.01}
                  placeholder="Price"
                  className="rounded-3xl mt-4 px-7 py-5 w-full outline-none border border-gray-300 select-none"
                  name="price"
                />
                <textarea
                  placeholder="Description"
                  className="rounded-3xl resize-none mt-4 px-7 py-5 w-full outline-none border border-gray-300 select-none"
                  name="description"
                ></textarea>
                <select
                  name="category_id"
                  className="rounded-3xl mt-4 px-7 py-5 w-full outline-none border border-gray-300 select-none"
                >
                  <option value="" disabled selected>
                    {img ? "Change Image" : "Select a Category"}
                  </option>
                  {categories.map((category) => {
                    return (
                      <option value={category._id}>{category.name}</option>
                    );
                  })}
                </select>
              </div>
              <div
                className="bg-black rounded-full mt-4 w-80 h-80 mx-auto cursor-pointer"
                style={{
                  backgroundImage: `url(${img})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <label
                  htmlFor="image"
                  className="text-white flex items-center justify-center "
                >
                  <span className="w-80 h-80 flex items-center justify-center">
                    Select A Image
                  </span>
                  <input
                    type="file"
                    id="image"
                    className="hidden"
                    name="image"
                    onChange={(e) => handleFileChange(e)}
                  />
                </label>
              </div>
            </div>
            <div className="w-1/2">
              <div className="search-panel h-60 overflow-scroll w-full border border-black">
                <h2 className="text-xl p-2">Select Colors</h2>
                {colors.map((color) => {
                  return (
                    <Color
                      color={color}
                      colors={colors}
                      handleColors={handleColors}
                      getTextColor={getTextColor}
                    />
                  );
                })}
              </div>

              <div className="colors">
                {colors &&
                  colors
                    .filter((col) => col.active)
                    .map((el) => {
                      return (
                        <div className="flex justify-between items-center gap-5 mt-5">
                          <div className="flex items-center justify-center gap-5">
                            <span>Color: </span>
                            <div
                              className={`w-32 text-center py-1 text-${getTextColor(
                                el.name
                              )}`}
                              style={{ background: el.name }}
                            >
                              {el.name}
                            </div>
                          </div>
                          <div className="flex items-center justify-center gap-5">
                            <span>Quantity: </span>
                            <input
                              type="number"
                              value={el.quantity}
                              className="w-16 text-center outline-none"
                              onChange={(e) => {
                                if (e.target.value[0] == "0") {
                                  e.target.value = e.target.value.substring(1);
                                }
                                setColors(
                                  colors.map((color) => {
                                    if (color._id == el._id) {
                                      return {
                                        ...color,
                                        quantity: Number(e.target.value),
                                      };
                                    } else return color;
                                  })
                                );
                              }}
                            />
                          </div>
                          <div>
                            <FontAwesomeIcon
                              className="text-red-500 text-xl"
                              icon={faMinusCircle}
                              onClick={(e) => handleColors(el._id, 1)}
                            />
                          </div>
                        </div>
                      );
                    })}
              </div>
            </div>
          </div>
          <button className="mt-10 w-full py-5 text-center border border-black bg-black text-white hover:bg-white hover:text-black rounded-3xl">
            Submit
          </button>
        </form>
        <ToastContainer />
      </div>
    ) : (
      <Loader />
    )
  ) : (
    <Loader />
  );
}
