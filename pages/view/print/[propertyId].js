import React, { useState, useEffect } from "react";
import axios from "axios";
import { user } from "../../../components/core/Atoms";
import { useRecoilState } from "recoil";
import { useRouter } from "next/router";
import Config from "../../../components/lib/Config";
import style from "../../../styles/pages/PrintProperty.module.sass";
import PropertyDetails from "../../../components/core/PropertyDetailsPrint";
import ProgressBar from "../../../components/support/ProgressBar";

export default function PropertyView() {
  const [loading, setLoading] = useState(true);
  const [theUser, setTheUser] = useRecoilState(user);
  const [property, setProperty] = useState({});
  const [images, setImages] = useState([]);
  const [agent, setAgent] = useState({});
  const router = useRouter();

  useEffect(() => {
    if (router.isReady) {
      loadData(router.query.propertyId);
    }
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

  if (loading) {
    return <ProgressBar />;
  }

  return (
    <div className={style.all}>
      <div className={style.logo}>
        <img width="100%" src="/logo-print.png" />
      </div>

      <div className={style.slider}>
        <img className={style.sliderImage} src={images[0]} />
      </div>

      <div className={style.data}>
        {typeof property != "undefined" ? (
          <>
            <h1 className="text-center pt-2 text-uppercase">
              {property.title}
            </h1>
            <h4 className="text-center text-danger">
              {property.address_1}, {property.address_2}, {property.city},{" "}
              {property.state}, {property.zip_code}
            </h4>

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
                        {highlight.slice(0, 100)}
                        {highlight.length > 100 ? "..." : null}
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
