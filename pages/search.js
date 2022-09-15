import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Config from "../components/lib/Config";
import { useJsApiLoader, GoogleMap, MarkerF } from "@react-google-maps/api";
import style from "../styles/pages/SearchPage.module.sass";
import Link from "next/link";
import { SelectInput, TextInput } from "../components/core/inputs/FormInputs";
import States from "../components/lib/USStates";
import ProgressBar from "../components/support/ProgressBar";
export default function Search() {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyD1A1aNBxTVVNxtYKRbFWZm9uyWwJVag5E",
  });
  const [results, setResults] = useState([]);
  const [searchQuery, setsearchQuery] = useState("");
  const [state, setState] = useState("");
  const [propertFor, setPropertFor] = useState("");
  const router = useRouter();
  const [loader, setLoader] = useState(true);

  const [paginationLimit, setPaginationLimit] = useState(5);
  const [pagination, setPagination] = useState({
    skip: 0,
  });

  const [sizeSearch, setSizeSearch] = useState({
    min: 0,
    max: 0,
  });

  useEffect(() => {
    handleLoadSearch();
    if (router.query) {
      console.log(router.query);
      router.query.search ? setsearchQuery(router.query.search) : null;
      router.query.for ? setPropertFor(router.query.for) : null;
      router.query.state ? setState(router.query.state) : null;
    }
  }, []);
  useEffect(() => {
    handleLoadSearch();
  }, [sizeSearch, state, propertFor]);

  const handleLoadSearch = async () => {
    let sendData = {
      skip: 0,
      limit: 20,
      search: searchQuery == "" ? " " : searchQuery,
    };

    state != "" ? (sendData.state = state) : null;
    propertFor != "" ? (sendData.for = propertFor) : null;

    axios({
      method: "post",
      url: `${Config.url.api}/property/search`,
      data: {
        ...sendData,
      },
    })
      .then((res) => {
        setResults(() => res.data.data[0]);
      })
      .finally(() => {
        setLoader(false);
      });
  };

  if (!isLoaded) {
    return <ProgressBar />;
  }
  if (loader) {
    return <ProgressBar />;
  }

  return (
    <>
      <GoogleMap
        center={{
          lat: 37.6,
          lng: -95.665,
        }}
        zoom={4}
        mapContainerStyle={{ width: "100vw", height: "40vh" }}
      >
        {typeof results !== "undefined" && results.length > 0
          ? results
              .slice(pagination.skip, pagination.skip + paginationLimit)
              .map((result, index) => {
                return (
                  <MarkerF
                    clickable={true}
                    key={index}
                    draggable={false}
                    position={result.gps}
                    onClick={() =>
                      document.getElementById(result.uid).scrollIntoView()
                    }
                  />
                );
              })
          : null}
      </GoogleMap>

      <div className={style.searchBar}>
        <input
          type="search"
          value={searchQuery}
          placeholder="Search...."
          onInput={(e) => setsearchQuery(e.target.value)}
          className={style.searchInput}
        />
        <button
          className={style.searchButton}
          onClick={() => {
            handleLoadSearch();
          }}
        >
          Search
        </button>
      </div>
      <div className={style.searchBar}>
        <SelectInput
          value={propertFor}
          placeholder="Property Type"
          dataArray={["sale", "lease"]}
          formInput={(value) => {
            setPropertFor(value);
          }}
        />

        <SelectInput
          placeholder="State"
          dataArray={States}
          formInput={(value) => {
            setState(value);
          }}
        />
        <TextInput
          placeholder="Min Sq.ft"
          type="number"
          formInput={(value) => {
            setSizeSearch({ ...sizeSearch, min: value });
          }}
        />
        <TextInput
          placeholder="Max Sq.ft"
          type="number"
          formInput={(value) => {
            setSizeSearch({ ...sizeSearch, max: value });
          }}
        />
      </div>
      <div className={style.results}>
        {results
          .slice(pagination.skip, pagination.skip + paginationLimit)
          .map((result, index) => {
            return (
              <div id={result.uid} className={style.result} key={index}>
                <div
                  style={{
                    backgroundImage: `url(${Config.url.GCP_GC_IMG}/${result.photos[0]})`,
                  }}
                  className={style.resultImage}
                ></div>
                <div className={style.resultDetail}>
                  <h3>{result.title}</h3>
                  <p>
                    <strong>
                      {" "}
                      {result.type.toUpperCase()} - {result.for.toUpperCase()}
                    </strong>
                  </p>
                  <p>
                    {result.address_1} | {result.address_2}
                    <br />
                    {result.city} | {result.zip_code}
                  </p>
                  <Link href={`/view/property/${result.uid}`}>
                    <a target="_blank" className={style.resultBtn}>
                      Check Property
                    </a>
                  </Link>
                </div>
              </div>
            );
          })}

        {typeof results === "undefined" || results.length == 0 ? (
          <h1 className="text-center p-5">No Results</h1>
        ) : (
          ""
        )}
      </div>
      <div className="d-flex mt-5">
        <nav className="d-block m-auto" aria-label="Page navigation example">
          <ul className="pagination ">
            {pagination.skip - paginationLimit >= 0 ? (
              <li className="page-item">
                <p
                  className="page-link"
                  onClick={() => {
                    setPagination({
                      ...pagination,
                      skip: pagination.skip - paginationLimit,
                    });
                  }}
                >
                  Previous
                </p>
              </li>
            ) : null}

            {Array(Math.ceil(results.length / paginationLimit))
              .fill(1)
              .map((page, index) => {
                return (
                  <li
                    key={index}
                    className={`page-item ${
                      pagination.skip / paginationLimit == index
                        ? "active"
                        : null
                    }`}
                    onClick={() =>
                      setPagination({
                        ...pagination,
                        skip: paginationLimit * index,
                      })
                    }
                  >
                    <p className="page-link">{index + 1}</p>
                  </li>
                );
              })}

            {results.length > pagination.skip + paginationLimit ? (
              <li className="page-item">
                <p
                  className="page-link"
                  onClick={() => {
                    setPagination({
                      ...pagination,
                      skip: pagination.skip + paginationLimit,
                    });
                  }}
                >
                  Next
                </p>
              </li>
            ) : null}

            <li className="page-item  ml-2">
              <select
                onInput={(e) => setPaginationLimit(e.target.value)}
                className="page-link"
              >
                <option value={10}>No.of Results - 10</option>
                {results.length > 20 * 2 ? (
                  <option value={20}>No.of Results - 20</option>
                ) : null}
                {results.lenght > 30 * 2 ? (
                  <option value={30}>No.of Results - 30</option>
                ) : null}
              </select>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
}
