import React, { useState, useEffect } from "react";
import axios from "axios";
import { user } from "../../../components/core/Atoms";
import { useRecoilState } from "recoil";
import { useRouter } from "next/router";
import Config from "../../../components/lib/Config";
import style from "../../../styles/ViewProperty.module.sass";
import PropertyDetails from "../../../components/core/PropertyDetails";
import { useJsApiLoader, GoogleMap, MarkerF } from "@react-google-maps/api";
import Floors from "../../../components/core/Floors";

export default function PropertyView() {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyD1A1aNBxTVVNxtYKRbFWZm9uyWwJVag5E",
  });
  const [theUser, setTheUser] = useRecoilState(user);
  const [property, setProperty] = useState({});
  const [images, setImages] = useState([]);
  const [agent, setAgent] = useState({});
  const router = useRouter();

  useEffect(() => {
    if (router.isReady) {
      loadData(router.query.propertyId);
    }
    //

    return () => {};
  }, [theUser, router.isReady]);

  const loadData = async (id) => {
    await axios({
      method: "get",
      url: `${Config.url.api}/property/post/${id}`,
    }).then((res) => {
      setProperty(res.data.data);
      setAgent(res.data.datum);
      let processedImages = res.data.data.photos.map(
        (img) => `${Config.url.GCP_GC_IMG}/${img}`
      );

      setImages(() => processedImages);
    });
  };

  const handleLike = async (propert_id) => {
    console.log(theUser.data.token);
    await axios({
      method: "put",
      url: `${Config.url.api}/property/save/${propert_id}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `<Bearer> ${theUser.data.token}`,
      },
    }).then((res) => {
      window.location.reload();
      console.log(res);
    });
  };
  const handleUnLike = async (propert_id) => {
    console.log(theUser.data.token);
    await axios({
      method: "put",
      url: `${Config.url.api}/property/unsave/${propert_id}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `<Bearer> ${theUser.data.token}`,
      },
    }).then((res) => {
      window.location.reload();
      console.log(res);
    });
  };

  function tokenToId(token) {
    let base64 = token.split(".")[1];

    return JSON.parse(atob(base64)).id;
  }

  if (!isLoaded) {
    return <div>loading</div>;
  }

  return (
    <>
      <div
        className={style.slider}
        style={{
          backgroundImage: `url(/blur.jpg)`,
          backgroundSize: "cover",
          justifyContent: images.length > 1 ? null : "center",
        }}
      >
        {images.length > 1 ? (
          images.map((img, index) => {
            return <img className={style.sliderImage} key={index} src={img} />;
          })
        ) : (
          <img className={style.sliderImage} src={images[0]} />
        )}
      </div>

      <div className={style.data}>
        {typeof property != "undefined" ? (
          <>
            <h1 className="text-center pt-2 text-uppercase">
              {property.title}

              {theUser && theUser.data.token ? (
                Array.isArray(property.liked) &&
                property.liked.includes(tokenToId(theUser.data.token)) ? (
                  <button
                    className="btn btn-danger ml-3"
                    onClick={() => handleUnLike(property._id)}
                  >
                    Unsave
                  </button>
                ) : (
                  <button
                    className="btn btn-primary ml-3"
                    onClick={() => handleLike(property._id)}
                  >
                    Save
                  </button>
                )
              ) : null}
            </h1>
            {Array.isArray(property.highlights) &&
            property.highlights.length > 0 ? (
              <h3 className="text-center">Property Highlights</h3>
            ) : null}
            <div className={style.propertyHighLights}>
              {property &&
              Array.isArray(property.highlights) &&
              property.highlights.length > 0
                ? property.highlights.map((highlight, index) => {
                    return (
                      <p className={style.propertyHighLight} key={index}>
                        {highlight}
                      </p>
                    );
                  })
                : null}
            </div>
            <PropertyDetails property={property} agent={agent} />
            {Array.isArray(property.floors) && property.floors.length > 0 ? (
              <Floors floors={property.floors} />
            ) : null}
            <GoogleMap
              center={property.gps}
              zoom={5}
              mapContainerStyle={{ width: "100vw", height: "40vh" }}
            >
              <MarkerF position={property.gps} />
            </GoogleMap>
          </>
        ) : null}
      </div>
    </>
  );
}
