import React, { useEffect } from "react";

export default function failed() {
  useEffect(() => {
    alert("Payment Success, Post Boosted");
    window.location.href = "/";
  }, []);
  return <div></div>;
}
