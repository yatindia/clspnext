import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Config from "../components/lib/Config";
import { useJsApiLoader, GoogleMap, MarkerF } from "@react-google-maps/api";
import style from "../styles/SearchPage.module.sass";
import Link from "next/link";
import { SelectInput } from "../components/core/inputs/FormInputs";
import States from "../components/lib/USStates";
export default function Search() {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyD1A1aNBxTVVNxtYKRbFWZm9uyWwJVag5E",
  });
  const [results, setResults] = useState([]);
  const [searchQuery, setsearchQuery] = useState(" ");
  const [state, setState] = useState("");
  const [propertFor, setPropertFor] = useState("");
  const router = useRouter();

  useEffect(() => {
    handleLoadSearch();
    if (router.query) {
      router.query.search ? setsearchQuery(router.query.search) : null;
      router.query.for ? setPropertFor(router.query.for) : null;
    }
  }, []);

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
    }).then((res) => {
      setResults(() => res.data.data[0]);
    });
  };

  if (!isLoaded) {
    return <div>loading</div>;
  }

  return (
    <>
      <GoogleMap
        center={{
          lat: 37.6,
          lng: -95.665,
        }}
        zoom={5}
        mapContainerStyle={{ width: "100vw", height: "40vh" }}
      >
        {typeof results !== "undefined" && results.length > 0
          ? results.map((result, index) => {
              return (
                <MarkerF
                  clickable={true}
                  key={index}
                  draggable={false}
                  position={result.gps}
                />
              );
            })
          : null}
      </GoogleMap>
      <div className={style.searchBar}>
        <input
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
          placeholder="Select Property"
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
      </div>
      <div className={style.results}>
        {results.map((result, index) => {
          return (
            <div className={style.result} key={index}>
              <div
                style={{
                  backgroundImage: `url(${Config.url.GCP_GC_IMG}/${result.photos[0]})`,
                }}
                className={style.resultImage}
              ></div>
              <div className={style.resultDetail}>
                <h2>{result.title}</h2>
                <h3>
                  {result.type.toUpperCase()} | For - {result.for.toUpperCase()}{" "}
                </h3>
                <p>
                  {result.address_1} | {result.address_2}
                  <br />
                  {result.city} | {result.zip_code}
                </p>
                <Link href={`/view/property/${result.uid}`}>
                  <a className={style.resultBtn}>Check Property</a>
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
