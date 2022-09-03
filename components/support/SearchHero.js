import React from "react";
import style from "../../styles/SearchHero.module.sass";
import SearchBar from "./components/SearchBar";

export default function SearchHero() {
  return (
    <div className={style.contain}>
      <div className={style.containCover}>
        <div className={style.searchContainer}>
          <img className={style.logo} src="logo.svg" />
          <p className={style.pharase}>
            Your real estate online destination to search, Buy, Sell and Rent
            <br />
            <strong>Property anywhere in U.S.A</strong>
          </p>
          <SearchBar />
        </div>
      </div>
    </div>
  );
}
