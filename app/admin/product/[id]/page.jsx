"use client";

import axios from "axios";
import { loadGetInitialProps } from "next/dist/shared/lib/utils";
import React, { useEffect, useRef, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Color from "../components/Color";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinusCircle, faPlusCircle } from "@fortawesome/free-solid-svg-icons";

export default function page(context) {
  const [categories, setCategories] = useState();
  const [img, setImg] = useState();
  const [productsColor, setProductsColor] = useState();
  const [colors, setColors] = useState();
  const [product, setProduct] = useState();
  const [file, setFile] = useState();
  const formRef = useRef();
  const { id } = context.params;

  const handleColors = (id, active) => {
    setColors(
      colors.map((col) => {
        if (col._id == id) {
          return { ...col, active: !active, quantity: 1 };
        } else return col;
      })
    );
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

  useEffect(() => {
    axios
      .get("/api/product/" + id)
      .then((res) => {
        setProduct(res.data);
        setImg(res.data.image);
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .get("/api/category")
      .then((res) => setCategories(res.data))
      .catch((err) => {
        console.log(err);
      });
    axios
      .get("/api/color")
      .then((res) => {
        setColors(res.data);
        axios
          .get("/api/products-color")
          .then((res2) => {
            setColors(
              res.data.map((color) => {
                let ok = false;
                res2.data
                  .filter((col) => col.product_id == id)
                  .forEach((col) => {
                    if (col.color_id.name == color.name) {
                      ok = {
                        name: color.name,
                        active: true,
                        quantity: col.quantity,
                        _id: color._id,
                      };
                      return;
                    }
                  });
                if (ok) return ok;
                else return color;
              })
            );
          })
          .catch((err) => {
            console.log(err);
          });
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
  const updateProduct = (e) => {
    e.preventDefault();

    if (!img) {
      toast("Please select a image");
      return;
    }
    if (!colors.filter((el) => el.product_id == id)) {
      toast("Please select colors");
      return;
    }

    axios
      .delete(`/api/products-color?product_id=${id}`)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

    colors
      .filter((col) => col.active)
      .forEach((color) => {
        axios
          .post("/api/products-color", {
            color_id: color._id,
            quantity: color.quantity,
            product_id: id,
          })
          .then((res) => {
            console.log(res.data);
          })
          .catch((err) => {
            console.log(err);
          });
      });

    if (!file && img) { 
      axios
        .put("/api/product/" + id, {
          name: e.target.name.value,
          price: e.target.price.value,
          description: e.target.description.value,
          category_id: e.target.category_id.value,
        })
        .then((res) => {
          console.log(res.data);
          window.location = "/admin";
          toast("Product updated !")
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        try {
          axios
            .post("/api/product/image", {
              img: reader.result,
            })
            .then((res) => {
              axios
                .put("/api/product/" + id, {
                  name: e.target.name.value,
                  price: e.target.price.value,
                  image: res.data.url,
                  description: e.target.description.value,
                  category_id: e.target.category_id.value,
                })
                .then((res) => {
                  console.log(res.data);
                  window.location = "/admin";
                })
                .catch((err) => {
                  console.log(err);
                });
            })
            .catch((err) => {
              console.log(err);
            });
        } catch (error) {
          console.error("Error uploading file:", error);
        }
      };
    }
  };

  return (
    categories &&
    product &&
    colors && (
      <div className="flex items-center justify-center w-full">
        <form
          className="w-1/2 mt-28"
          onSubmit={(e) => updateProduct(e)}
          ref={formRef}
        >
          <h1 className="mb-10 text-3xl font-bold text-center">
            Update Product
          </h1>
          <div className="flex items-start justify-center gap-20 w-full">
            <div className="w-1/2">
              <div className="w-full">
                <input
                  type="text"
                  placeholder="Name"
                  className="rounded-3xl px-7 py-5 w-full outline-none border border-gray-300 select-none"
                  name="name"
                  defaultValue={product.name}
                />
                <input
                  type="number"
                  step={0.01}
                  placeholder="Price"
                  className="rounded-3xl mt-4 px-7 py-5 w-full outline-none border border-gray-300 select-none"
                  name="price"
                  defaultValue={product.price}
                />
                <textarea
                  placeholder="Description"
                  className="rounded-3xl resize-none mt-4 px-7 py-5 w-full outline-none border border-gray-300 select-none"
                  name="description"
                  defaultValue={product.description}
                ></textarea>
                <select
                  name="category_id"
                  className="rounded-3xl mt-4 px-7 py-5 w-full outline-none border border-gray-300 select-none"
                >
                  <option value="" disabled>
                    {img ? "Change Image" : "Select a Category"}
                  </option>
                  {categories.map((category) => {
                    return (
                      <option
                        value={category._id}
                        isSelected={category._id == product.category_id._id}
                      >
                        {category.name}
                      </option>
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
    )
  );
}
