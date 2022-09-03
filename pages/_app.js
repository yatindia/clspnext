import "bootstrap/dist/css/bootstrap.min.css";
import "react-multi-carousel/lib/styles.css";
import "../styles/globals.sass";
import MainLayout from "../components/layouts/MainLayout";
import { RecoilRoot } from "recoil";
import React from "react";
//Binding events.

function MyApp({ Component, pageProps }) {
  return (
    <RecoilRoot>
      <MainLayout>
        <Component {...pageProps} />
      </MainLayout>
    </RecoilRoot>
  );
}

export default MyApp;
