import React, { useEffect } from "react";

export default function Failed() {
  useEffect(() => {
    alert("Payment Failed");
    window.location.href = "/user";
  }, []);
  return <div></div>;
}
