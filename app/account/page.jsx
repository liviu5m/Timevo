"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";

export default function page() {
  const [user, setUser] = useState();

  useEffect(() => {
    axios
      .get("/api/user/" + localStorage.getItem("userId"))
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const updateData = (e) => {
    e.preventDefault();
    axios
      .put("/api/user/" + localStorage.getItem("userId"), {
        firstName: e.target.firstName.value,
        lastName: e.target.lastName.value,
        email: e.target.email.value,
        type: "data"
      })
      .then((res) => {
        console.log(res.data);
        toast("Data updated successfully");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const updatePassword = (e) => {
    e.preventDefault();
    axios
      .put("/api/user/" + localStorage.getItem("userId"), {
        currentPassword: e.target.currentPassword.value,
        password: e.target.password.value,
        passwordConfirmation: e.target.passwordConfirmation.value,
        type: "password"
      })
      .then((res) => {
        console.log(res.data);
        toast("Password updated successfully");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    user && (
      <div className=" flex items-center justify-center flex-col">
        <div className="update-profile flex w-full">
          <form
            className="flex flex-col p-5 w-1/2 items-center"
            onSubmit={(e) => updateData(e)}
          >
            <h1 className="text-2xl my-5">Update Profile Data</h1>
            <input
              className="w-1/2 mb-5 py-2 px-4 rounded-xl outline-none"
              type="text"
              placeholder="First Name"
              name="firstName"
              defaultValue={user.firstName}
            />
            <input
              className="w-1/2 mb-5 py-2 px-4 rounded-xl outline-none"
              type="text"
              placeholder="Last Name"
              name="lastName"
              defaultValue={user.lastName}
            />
            <input
              className="w-1/2 mb-5 py-2 px-4 rounded-xl outline-none"
              type="email"
              placeholder="Email"
              name="email"
              defaultValue={user.email}
            />
            <button className="w-1/2 bg-black text-white text-lg rounded-xl py-3 border border-black hover:bg-white hover:text-black">
              Update
            </button>
          </form>
          <form
            className="flex flex-col p-5 w-1/2 items-center"
            onSubmit={(e) => updatePassword(e)}
          >
            <h1 className="text-2xl my-5">Update Password</h1>
            <input
              className="w-1/2 mb-5 py-2 px-4 rounded-xl outline-none"
              type="password"
              placeholder="Current Password"
              name="currentPassword"
            />
            <input
              className="w-1/2 mb-5 py-2 px-4 rounded-xl outline-none"
              type="password"
              placeholder="New Password"
              name="password"
            />
            <input
              className="w-1/2 mb-5 py-2 px-4 rounded-xl outline-none"
              type="password"
              placeholder="Password Confirmation"
              name="passwordConfirmation"
            />
            <button className="w-1/2 bg-black text-white text-lg rounded-xl py-3 border border-black hover:bg-white hover:text-black">
              Update
            </button>
          </form>
        </div>
        <button
          className="mt-10 w-1/4 bg-black text-white text-lg rounded-xl py-3 border border-black hover:bg-white hover:text-black"
          onClick={(e) => {
            localStorage.removeItem("userId");
            window.location.pathname = "/";
          }}
        >
          Log out
        </button>
      </div>
    )
  );
}
