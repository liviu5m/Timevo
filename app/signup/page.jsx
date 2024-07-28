"use client";

import Loader from "@/components/Loader";
import { faCheck, faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function page() {
  const [firstNameValidated, setFirstNameValidated] = useState(false);
  const [lastNameValidated, setLastNameValidated] = useState(false);
  const [emailValidated, setEmailValidated] = useState(false);
  const [passwordValidated, setPasswordValidated] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("userId")) window.location.pathname = "/";
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      firstNameValidated &&
      lastNameValidated &&
      emailValidated &&
      passwordValidated
    ) {
      await axios
        .post("/api/user", {
          firstName: e.target.firstName.value,
          lastName: e.target.lastName.value,
          email: e.target.email.value,
          password: e.target.password.value,
        })
        .then((res) => {
          console.log(res.data);
          if (res.data.message) {
            toast(res.data.message);
            e.target.email.value = "";
            return;
          }
          e.target.firstName.value = "";
          e.target.lastName.value = "";
          e.target.email.value = "";
          e.target.password.value = "";
          setFirstNameValidated(false);
          setLastNameValidated(false);
          setEmailValidated(false);
          setPasswordValidated(false);
          window.location.pathname="/login";
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <div className="py-28 flex items-center justify-center">
      <div className="form-container p-10 bg-white w-2/5 rounded-xl">
        <h1 className="text-center font-bold text-5xl mb-5">
          👋 Sign Up for a Stylish Journey
        </h1>
        <form
          className="flex items-center justify-center flex-col"
          onSubmit={(e) => handleSubmit(e)}
        >
          <div className="form-group relative w-full">
            <input
              type="text"
              placeholder="First Name"
              name="firstName"
              className="rounded-3xl px-7 py-5 w-full outline-none border border-gray-300 select-none"
              onChange={(e) => {
                if (e.target.value.length > 0) setFirstNameValidated(true);
                else setFirstNameValidated(false);
              }}
            />
            <div className="checked absolute top-1/2 -translate-y-1/2 right-5">
              <FontAwesomeIcon
                icon={faCheckCircle}
                className={`text-2xl ${
                  firstNameValidated ? "text-green-600" : ""
                }`}
              />
            </div>
          </div>
          <div className="form-group relative w-full mt-5">
            <input
              type="text"
              placeholder="Last Name"
              className="rounded-3xl px-7 py-5 w-full outline-none border border-gray-300 select-none"
              name="lastName"
              onChange={(e) => {
                if (e.target.value.length > 0) setLastNameValidated(true);
                else setLastNameValidated(false);
              }}
            />
            <div className="checked absolute top-1/2 -translate-y-1/2 right-5">
              <FontAwesomeIcon
                icon={faCheckCircle}
                className={`text-2xl ${
                  lastNameValidated ? "text-green-600" : ""
                }`}
              />
            </div>
          </div>
          <div className="form-group relative w-full mt-5">
            <input
              type="email"
              placeholder="Email"
              className="rounded-3xl px-7 py-5 w-full outline-none border border-gray-300 select-none"
              name="email"
              onChange={(e) => {
                const pattern =
                  /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
                setEmailValidated(pattern.test(e.target.value));
              }}
            />
            <div className="checked absolute top-1/2 -translate-y-1/2 right-5">
              <FontAwesomeIcon
                icon={faCheckCircle}
                className={`text-2xl ${emailValidated ? "text-green-600" : ""}`}
              />
            </div>
          </div>

          <div className="form-group relative w-full mt-5">
            <input
              type="password"
              placeholder="Password"
              className="rounded-3xl px-7 py-5 w-full outline-none border border-gray-300 select-none"
              name="password"
              onChange={(e) => {
                const pattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
                setPasswordValidated(pattern.test(e.target.value));
              }}
            />
            <div className="checked absolute top-1/2 -translate-y-1/2 right-5">
              <FontAwesomeIcon
                icon={faCheckCircle}
                className={`text-2xl ${
                  passwordValidated ? "text-green-600" : ""
                }`}
              />
            </div>
          </div>
          <p className="flex items-center justify-between mt-5 w-full">
            <span>Already have an account </span>
            <a href="/login">Log in</a>
          </p>
          <button className="px-10 py-4 rounded-3xl bg-custom mt-5 text-white hover:bg-black ">
            Sign Up
          </button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}
