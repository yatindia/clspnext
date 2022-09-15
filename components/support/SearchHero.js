import React, { useState } from "react";
import style from "../../styles/SearchHero.module.sass";
import States from "../lib/USStates";
import Link from "next/link";
export default function SearchHero() {
  const [search, setSearch] = useState({
    search: "",
    for: "lease",
    state: "Alabama",
  });

  const handleSearch = () => {
    console.log(search);
  };
  return (
    <div className={style.index}>
      <section className={style.index__header}>
        <div className={style.index__logo}></div>
        <ul className={style.index__nav}>
          <li
            onClick={() => {
              setSearch({ ...search, for: "sale" });
            }}
            className={search.for == "sale" ? style.index__active : null}
          >
            <a style={{ cursor: "pointer" }}>Sale</a>
          </li>
          <li
            onClick={() => {
              setSearch({ ...search, for: "lease" });
            }}
            className={search.for == "lease" ? style.index__active : null}
          >
            <a style={{ cursor: "pointer" }}>Lease</a>
          </li>
          {/* <li>
            <a href="##">Videos</a>
          </li>
          <li>
            <a href="##">News</a>
          </li> */}
        </ul>
        <div className={style.index__search}>
          <div className={style.index__form}>
            <div>
              <input
                type="search"
                className={style.index__query}
                maxlength="512"
                autocomplete="off"
                title="Search"
                aria-label="Search"
                dir="ltr"
                spellcheck="false"
                onInput={(e) => {
                  setSearch({ ...search, search: e.target.value });
                }}
                value={search.search}
              />
            </div>
            <Link href={{ pathname: "/search", query: { ...search } }}>
              <a
                onClick={handleSearch}
                className={style.index__button}
                aria-label="Search"
              >
                <div className={style.index__ico}></div>
              </a>
            </Link>
          </div>
        </div>
        <div className={style.selectContainer}>
          <img
            className={style.selectImage}
            height="10vw"
            src="/icons/target.png"
          />
          <select
            onInput={(e) => {
              setSearch({ ...search, state: e.target.value });
            }}
            className={style.select}
          >
            {States.map((state, key) => {
              return (
                <option key={key} value={state}>
                  {state}
                </option>
              );
            })}
          </select>
        </div>
      </section>
    </div>
  );
}
