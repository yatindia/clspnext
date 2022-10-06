import React, { useState, useEffect } from "react";
import axios from "axios";
import { user } from "../../../components/core/Atoms";
import { useRecoilState } from "recoil";
import { useRouter } from "next/router";
import Config from "../../../components/lib/Config";
import style from "../../../styles/pages/PrintProperty.module.sass";
import PropertyDetails from "../../../components/core/PropertyDetailsPrint";
import { useJsApiLoader, GoogleMap, MarkerF } from "@react-google-maps/api";
import ImageSlider from "../../../components/support/ImageSlider";
import ProgressBar from "../../../components/support/ProgressBar";

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
      .finally(() => {
        setLoading(false);
        setTimeout(() => {
          window.print();
          window.close();
        }, 1000);
      });
  };

  if (!isLoaded) {
    return <ProgressBar />;
  }
  if (loading) {
    return <ProgressBar />;
  }

  return (
    <div className={style.all}>
      <img width="350px" src="/logo.svg" />
      {showSlider && images.length > 1 ? (
        <ImageSlider
          onPress={() => {
            setShowSlider(false);
          }}
          images={images[0]}
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
                    if (index >= 6) {
                      return "";
                    }
                    return (
                      <li className={style.propertyHighLight} key={index}>
                        {highlight.slice(0, 150)}
                        {highlight.length > 150 ? "..." : null}
                      </li>
                    );
                  })
                : null}
            </ul>

            <PropertyDetails property={property} agent={agent} />
          </>
        ) : null}
      </div>
    </div>
  );
}
