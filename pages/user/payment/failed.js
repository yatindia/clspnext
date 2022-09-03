import React, { useEffect } from "react";

export default function Failed() {
  useEffect(() => {
    alert("Payment Failed");
    window.location.href = "/";
  }, []);
  return <div></div>;
}
