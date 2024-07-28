"use client";

import { faMinusCircle, faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";

export default function Color({
  color,
  handleColors,
  colors,
  getTextColor,
}) {

  return (
    <div className="w-full flex items-center justify-between bg-white border border-t-gray-700 py-1 pr-2">
      <div
        style={{ background: color.name }}
        className={`w-4/5 h-full text-${getTextColor(color.name)}`}
      >
        {color.name}
      </div>
      <span
        className="text-green-500 text-xl"
        onClick={(e) => {
          handleColors(color._id, color.active);
        }}
      >
        <FontAwesomeIcon
          className={`${color.active ? "text-red-500" : "text-green-500"}`}
          icon={color.active ? faMinusCircle : faPlusCircle}
        />
      </span>
    </div>
  );
}
