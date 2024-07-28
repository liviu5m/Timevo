import axios from "axios";
import React, { useEffect, useState } from "react";

export function checkLoader() {
  // const [loader, setLoader] = useState();
  // useEffect(() => {
  //   setLoader(true);
  //   axios.get("/" + window.location.pathname).then((res) => {
  //     setLoader(false);
  //   })
  //   .catch((err) => {
  //     setLoader(false);
  //   })
  // },[]);
  return false;
}
