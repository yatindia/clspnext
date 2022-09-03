import React, { useEffect } from "react";
import Navigation from "../core/Navigation";
import Footer from "../core/Footer";
import Head from "next/head";
import Script from "next/script";
import { user } from "../core/Atoms";
import { useRecoilState } from "recoil";

export default function MainLayout({ children }) {
  const [userState, setUserState] = useRecoilState(user);

  useEffect(() => {
    let userInfo = localStorage.getItem("user");

    if (userInfo !== null) {
      setUserState(JSON.parse(localStorage.getItem("user")));
    } else {
      setUserState({ status: "NOLG" });
    }

    return () => {};
  }, []);

  return (
    <div>
      <Head>
        <title>Commerical Listings Pro</title>
        <link rel="icon" href="/favicon.png" />
      </Head>

      <Navigation />
      <div className="main">{children}</div>
      <Footer />
      <Script
        src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-ygbV9kiqUc6oa4msXn9868pTtWMgiQaeYH7/t7LECLbyPA2x65Kgf80OJFdroafW"
        crossOrigin="anonymous"
      />
    </div>
  );
}
