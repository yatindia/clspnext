import React, { useEffect } from "react";

export default function failed() {
  useEffect(() => {
    alert("Payment Failed");
    window.location.href = "/";
  }, []);
  return <div></div>;
}
