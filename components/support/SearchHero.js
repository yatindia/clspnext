import React, { useState } from "react";
import style from "../../styles/SearchHero.module.sass";
import States from "../lib/USStates";
import Link from "next/link";
export default function SearchHero() {
  const [search, setSearch] = useState({
    search: "",
    for: "sale",
    state: "",
    type: "office",
  });

  const propertPurpose = [
    "office",
    "personal",
    "medical",
    "industrial",
    "retail",
    "restaurant",
    "shopping Center",
    "multifamily",
    "health Care",
    "land",
    "multipurpose",
  ];

  return (
    <div className={style.container}>
      <div className={style.gradientContainer}>
        <div className={style.searchContainer}>
          <div className={style.searchTypes}>
            <button
              className={`${style.searchType} ${
                search.for == "sale" ? style.active : null
              }`}
              onClick={() => {
                setSearch({ ...search, for: "sale" });
              }}
            >
              Sale
            </button>
            <button
              className={`${style.searchType} ${
                search.for == "lease" ? style.active : null
              }`}
              onClick={() => {
                setSearch({ ...search, for: "lease" });
              }}
            >
              Lease
            </button>
          </div>
          <div className={style.searchBar}>
            <div className={style.state}>
              <p className="text-white">Select State</p>
              <select
                onInput={({ target }) => {
                  setSearch({ ...search, state: target.value });
                }}
                className={style.stateSelect}
              >
                <option value="">Select a state</option>
                {States.map((state, index) => {
                  return (
                    <option key={index} value={state}>
                      {state}
                    </option>
                  );
                })}
              </select>
            </div>

            <div className={style.state}>
              <p className="text-white">Type</p>
              <select
                onInput={({ target }) => {
                  setSearch({ ...search, type: target.value });
                }}
                className={style.stateSelect}
              >
                {propertPurpose.map((purpose, index) => {
                  return (
                    <option key={index} value={purpose}>
                      {purpose.toUpperCase()}
                    </option>
                  );
                })}
              </select>
            </div>

            <div className={style.inputCity}>
              <p className="text-white">City / Address</p>
              <input
                type="text"
                className={style.city}
                placeholder="Enter City or Address"
                onInput={({ target }) => {
                  setSearch({ ...search, search: target.value });
                }}
              />
            </div>

            {/* <div className={style.inputZipcode}>
              <input
                type="tel"
                pattern="[0-9]{0,5}"
                onInput={(e) => {
                  if (e.target.value.length < 7) {
                    setSearch({
                      ...search,
                      zipcode: parseInt(e.target.value.replace("e", "")),
                    });
                  }
                }}
                value={search.zipcode}
                className={style.zipcode}
                id="mobile"
                placeholder="Mobile Number"
              />
            </div> */}
          </div>
          <div className={style.searchButton}>
            <Link href={{ pathname: "/search", query: { ...search } }}>
              <a className={style.button}>Search</a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
