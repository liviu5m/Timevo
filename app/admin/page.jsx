"use client";

import Loader from "@/components/Loader";
import Pagination from "@/components/Pagination";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { CldImage } from "next-cloudinary";
import React, { useEffect, useState, useMemo, useCallback } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Page = () => {
  const [item, setItem] = useState(localStorage.getItem("item") ?localStorage.getItem("item") : "");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [paginateData, setPaginateData] = useState([]);
  const [currentPage, setCurrentPage] = useState(
    localStorage.getItem("currentPage") ? localStorage.getItem("currentPage") : 1
  );
  const pageSize = 10;

  useEffect(() => {
    localStorage.setItem("item", item);
  }, [item]);

  useEffect(() => {
    localStorage.setItem("currentPage", currentPage);
  }, [currentPage]);

  const paginate = useCallback(
    (items, pageNumber) => {
      const startIndex = (pageNumber - 1) * pageSize;
      return items.slice(startIndex, startIndex + pageSize);
    },
    [pageSize]
  );

  const onPageChange = useCallback(
    (page) => {
      setCurrentPage(page);
      setPaginateData(paginate(data, page));
    },
    [paginate, data, item]
  );

  const handleItem = useCallback((value) => {
    setCurrentPage(1);
    setItem(value);
    setLoading(true);
  }, []);

  useEffect(() => {
    if (data.length > 0) {
      setPaginateData(paginate(data, currentPage));
    }
  }, [data, currentPage, paginate]);

  useEffect(() => {
    if (item) {
      setLoading(true);
      axios
        .get("/api/" + item)
        .then((res) => {
          setData(res.data);
          setLoading(false);
          if(res.data.length == 0) setPaginateData([]);
        })
        .catch((err) => {
          console.error(err);
          setLoading(false);
        });
    }
  }, [item]);

  const deleteItem = useCallback(
    (id) => {
      axios
        .delete(`/api/${item}/${id}`)
        .then((res) => {
          toast("Item removed successfully");            
          if(data.length == 1) {
            setData([]);
            setPaginateData([]);
            console.log(data);
            return;
          }
          else setData(data.filter((el) => el._id !== id));
          console.log(data);
        })
        .catch((err) => {
          console.error(err);
        });
    },
    [item, data]
  );

  const updateItem = useCallback(
    (id) => {
      localStorage.setItem("currentPage", currentPage);
      localStorage.setItem("item", item);
      window.location.pathname = `/admin/${item}/${id}`;
    },
    [currentPage, item]
  );

  const memoizedTableHeaders = useMemo(() => {
    if (paginateData.length === 0) return null;
    return (
      <thead>
        <tr className="border border-slate-600">
          {Object.keys(paginateData[0]).map((key, i) => {
            if (key === "description") return null;
            return (
              key !== "__v" && (
                <th key={i} className="p-3 border border-slate-600">
                  {key.slice(-3) === "_id" && key.length > 3
                    ? key.slice(0, -3)
                    : key}
                </th>
              )
            );
          })}
          <th>Actions</th>
        </tr>
      </thead>
    );
  }, [paginateData]);

  const memoizedTableBody = useMemo(() => {
    return paginateData.map((el, i) => (
      <tr key={i} className="border border-slate-600 h-full">
        {Object.keys(el).map((val, index) => {
          if (val === "category_id") {
            return (
              <td key={index} className="p-3 border border-slate-600">
                {el[val].name}
              </td>
            );
          } else if (val === "image") {
            return (
              <td key={index} className="p-3 border border-slate-600">
                <img
                  className="w-20 h-20 object-cover"
                  src={`https://res.cloudinary.com/dhzp53fkf/image/upload/w_600,h_400,c_fill,q_auto,f_auto/${el[
                    val
                  ]
                    .split("/")
                    .pop()}`}
                />
              </td>
            );
          } else if (val === "name" && item === "color") {
            return (
              <td
                key={index}
                style={{ background: el[val] }}
                className="border border-slate-600"
              ></td>
            );
          } else if (val === "description") return null;
          return (
            val !== "__v" && (
              <td key={index} className="p-3 border border-slate-600">
                {el[val]}
              </td>
            )
          );
        })}
        <td className="h-full">
          <a
            className="rounded-3xl text-white bg-blue-500 px-5 py-2 ml-2 mr-1 cursor-pointer"
            onClick={() => updateItem(el._id)}
          >
            Update
          </a>
          <a
            className="bg-red-500 rounded-3xl text-white px-5 py-2 ml-1 mr-2 cursor-pointer"
            onClick={() => deleteItem(el._id)}
          >
            Delete
          </a>
          {item === "product" && (
            <a
              className="bg-green-500 rounded-3xl text-white px-5 py-2 ml-1 mr-2 cursor-pointer"
              href={`/admin/product/details/${el._id}`}
            >
              Show Full
            </a>
          )}
        </td>
      </tr>
    ));
  }, [paginateData, updateItem, deleteItem, item]);
  return loading ? (
    <Loader />
  ) : (
    <div className="flex items-start w-full h-custom-full mt-10">
      <div className="inner-container w-1/4 h-full rounded-3xl bg-black ">
        <ul className="flex items-center justify-center flex-col gap-10 h-full px-10">
          <li
            className={`w-full text-center py-2 rounded-xl cursor-pointer select-none ${
              item === "category"
                ? "border border-white text-white bg-black"
                : "bg-white text-black border border-black"
            }`}
            onClick={() => handleItem("category")}
          >
            Category
          </li>
          <li
            className={`w-full text-center py-2 rounded-xl cursor-pointer select-none ${
              item === "product"
                ? "border border-white text-white bg-black"
                : "bg-white text-black border border-black"
            }`}
            onClick={() => handleItem("product")}
          >
            Product
          </li>
          <li
            className={`w-full text-center py-2 rounded-xl cursor-pointer select-none ${
              item === "color"
                ? "border border-white text-white bg-black"
                : "bg-white text-black border border-black"
            }`}
            onClick={() => handleItem("color")}
          >
            Color
          </li>
        </ul>
      </div>
      <div className="relative table w-3/4 mx-10 h-full 0">
        {item ? (
          <>
            <a
              href={`/admin/${item}`}
              className="w-40 absolute py-3 px-8 bg-black text-white rounded-3xl capitalize flex items-center justify-center gap-5 mb-8 border border-black hover:bg-white hover:text-black"
            >
              <FontAwesomeIcon icon={faPlus} /> {item}
            </a>
            <div className="flex flex-col items-start justify-between h-full">
              {paginateData.length !== 0 ? (
                <>
                  <table className="table-fixed mt-24 mb-10 overflow-x-scroll">
                    {memoizedTableHeaders}
                    <tbody>{memoizedTableBody}</tbody>
                  </table>
                  <Pagination
                    items={data.length}
                    currentPage={currentPage}
                    pageSize={pageSize}
                    onPageChange={onPageChange}
                  />
                </>
              ) : (
                <p className="mt-16">No Data</p>
              )}
            </div>
          </>
        ) : (
          <p>Please Select a Tab</p>
        )}
      </div>
      <ToastContainer />
    </div>
  )
};

export default React.memo(Page);
