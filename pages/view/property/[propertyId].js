import React, { useState, useEffect } from "react";
import axios from "axios";
import { user } from "../../../components/core/Atoms";
import { useRecoilState } from "recoil";
import { useRouter } from "next/router";
import Config from "../../../components/lib/Config";
import style from "../../../styles/pages/ViewProperty.module.sass";
import PropertyDetails from "../../../components/core/PropertyDetails";
import { useJsApiLoader, GoogleMap, MarkerF } from "@react-google-maps/api";
import Floors from "../../../components/core/Floors";
import ImageSlider from "../../../components/support/ImageSlider";
import ProgressBar from "../../../components/support/ProgressBar";
import { RWebShare } from "react-web-share";

export default function PropertyView() {
  const [loading, setLoading] = useState(true);
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyD1A1aNBxTVVNxtYKRbFWZm9uyWwJVag5E",
  });
  const [theUser, setTheUser] = useRecoilState(user);
  const [property, setProperty] = useState({});
  const [images, setImages] = useState([]);
  const [agent, setAgent] = useState({});
  const [showSlider, setShowSlider] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (router.isReady) {
      loadData(router.query.propertyId);
    }
    //

    return () => {};
  }, [theUser, router.isReady]);

  const loadData = async (id) => {
    setLoading(true);
    await axios({
      method: "get",
      url: `${Config.url.api}/property/post/${id}`,
    })
      .then((res) => {
        setProperty(res.data.data);
        setAgent(res.data.datum);
        let processedImages = res.data.data.photos.map(
          (img) => `${Config.url.GCP_GC_IMG}/${img}`
        );

        setImages(() => processedImages);
      })
      .finally(() => setLoading(false));
  };

  const handleLike = async (propert_id) => {
    setLoading(true);
    await axios({
      method: "put",
      url: `${Config.url.api}/property/save/${propert_id}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `<Bearer> ${theUser.data.token}`,
      },
    })
      .then((res) => {
        window.location.reload();
        console.log(res);
      })
      .finally(() => setLoading(false));
  };
  const handleUnLike = async (propert_id) => {
    setLoading(true);
    await axios({
      method: "put",
      url: `${Config.url.api}/property/unsave/${propert_id}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `<Bearer> ${theUser.data.token}`,
      },
    })
      .then((res) => {
        window.location.reload();
        console.log(res);
      })
      .finally(() => setLoading(false));
  };

  function tokenToId(token) {
    let base64 = token.split(".")[1];

    return JSON.parse(atob(base64)).id;
  }

  if (!isLoaded) {
    return <ProgressBar />;
  }
  if (loading) {
    return <ProgressBar />;
  }

  return (
    <>
      {showSlider && images.length > 1 ? (
        <ImageSlider
          onPress={() => {
            setShowSlider(false);
          }}
          images={images}
        />
      ) : (
        ""
      )}
      <div
        className={style.slider}
        onClick={() => setShowSlider(true)}
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

              {theUser && theUser.data ? (
                Array.isArray(property.liked) &&
                property.liked.includes(tokenToId(theUser.data.token)) ? (
                  <button
                    title="Click to un-save this post"
                    className="btn btn-danger ml-3"
                    onClick={() => handleUnLike(property._id)}
                  >
                    <img width={"20px"} src="/icons/td.png" />
                  </button>
                ) : (
                  <button
                    title="Click to save this post"
                    className="btn btn-primary ml-3"
                    onClick={() => handleLike(property._id)}
                  >
                    <img width={"20px"} src="/icons/tu.png" />
                  </button>
                )
              ) : null}

              <div>
                <RWebShare
                  sites={[
                    "facebook",
                    "twitter",
                    "whatsapp",
                    "linkedin",
                    "reddit",
                    "mail",
                    "copy",
                  ]}
                  data={{
                    text: `${property.title} - Commercial Listings Pro`,
                    url: `${Config.url.client}/view/property/${property.uid}`,
                    title: `${property.title} - Commercial Listings Pro`,
                  }}
                  onClick={() => console.log("shared successfully!")}
                >
                  <button title="Click To Share" className="btn btn-dark ">
                    Share ????
                  </button>
                </RWebShare>
                <button
                  title="Click to Print Property Details "
                  className="btn btn-danger ml-2"
                  onClick={() =>
                    window.open(
                      `${Config.url.client}/view/print/${property.uid}`,
                      "_blank"
                    )
                  }
                >
                  Print
                </button>
              </div>
            </h1>

            {Array.isArray(property.highlights) &&
            property.highlights.length > 0 ? (
              <h3 className="text-center">Property Highlights</h3>
            ) : null}
            <ul className={style.propertyHighLights}>
              {property &&
              Array.isArray(property.highlights) &&
              property.highlights.length > 0
                ? property.highlights.map((highlight, index) => {
                    return (
                      <li className={style.propertyHighLight} key={index}>
                        {highlight}
                      </li>
                    );
                  })
                : null}
            </ul>
            <PropertyDetails property={property} agent={agent} />

            {Array.isArray(property.floors) && property.floors.length > 0 ? (
              <>
                <h3 style={{ marginLeft: "5%" }} className="pb-2 ">
                  Floor Details
                </h3>
                <div
                  style={{ width: "90%", margin: "auto", marginBottom: "3%" }}
                  id="accordion"
                >
                  <div>
                    <div className="card m-0">
                      <div className="card-header" id={`headingHeading`}>
                        <h5 className="mb-0">
                          <button
                            className="btn w-100"
                            data-bs-bs-toggle="collapse"
                            data-bs-bs-target={`#collapseHeading`}
                            aria-expanded={"true"}
                            aria-controls={`collapseHeading`}
                          >
                            <span
                              className={`text-danger text-center ${style.mobileIndexTable}`}
                            >
                              <strong className="text-center w-100 d-block">
                                Individual Floor Details
                              </strong>
                            </span>
                            <div className={style.table}>
                              <span className="text-danger">
                                <strong>Floor#</strong>
                              </span>
                              <span>
                                <strong>Avaliability</strong>
                              </span>
                              <span>
                                <strong>Condition</strong>
                              </span>
                              <span>
                                <strong>Floor Size</strong>
                              </span>
                              <span>
                                <strong>Period Of Tenure</strong>
                              </span>
                              <span>
                                <strong>Rate</strong>
                              </span>
                              <span>
                                <strong>Purpose</strong>
                              </span>
                              <span>
                                <strong>Term</strong>
                              </span>
                            </div>
                          </button>
                        </h5>
                      </div>
                    </div>
                  </div>
                  <Floors floors={property.floors} />
                </div>
              </>
            ) : null}

            <div style={{ width: "90%", margin: "auto", marginBottom: "3%" }}>
              <h3 className="pb-2">Near By Amenities </h3>
              <div style={{ display: "flex", gap: "2%", flexWrap: "wrap" }}>
                {property.nearby.map((data, index) => {
                  if (data[1] == "") {
                    return null;
                  }

                  return (
                    <p
                      key={index}
                      className={style.info}
                      style={{
                        border: "none",
                        boxShadow: "0px 0px 10px rgba(0,0,0,0.1)",
                        padding: "1%",
                        minWidth: "15%",
                        borderTop: "1px solid #14213D",
                      }}
                    >
                      <strong className={style.label}>
                        {data.amenity.toUpperCase()}
                      </strong>
                      <br />
                      {data.distance} mi
                    </p>
                  );
                })}
              </div>
            </div>

            <GoogleMap
              center={property.gps}
              zoom={16}
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
