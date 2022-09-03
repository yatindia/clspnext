import React, { useState } from "react";
import style from "../../../styles/SearchBar.module.sass";
import Link from "next/link";
export default function SearchBar(props) {
  const [search, setSearch] = useState({
    search: "",
    for: "",
  });
  return (
    <div className={style.searchbox}>
      <div className={style.searchOptions}>
        <button
          onClick={() => {
            setSearch({ ...search, for: "lease" });
          }}
          className={style.searchOption}
          style={{ backgroundColor: search.for == "lease" ? "grey" : "#fff" }}
        >
          Lease
        </button>
        <button
          onClick={() => {
            setSearch({ ...search, for: "sale" });
          }}
          className={style.searchOption}
          style={{ backgroundColor: search.for == "sale" ? "grey" : "#fff" }}
        >
          Sale
        </button>
      </div>
      <div className={`${style.searchBar}`}>
        <input
          onInput={(e) => {
            setSearch({ ...search, search: e.target.value });
          }}
          className={`${style.searchInput}`}
          placeholder="search..."
        />
        <Link
          href={{
            pathname: "/search",
            query: { search: search.search, for: search.for },
          }}
        >
          <a className={style.searchButton}>Search</a>
        </Link>
      </div>
    </div>
  );
}
