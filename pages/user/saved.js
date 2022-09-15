import React, { useState, useEffect } from "react";
import { user } from "../../components/core/Atoms";
import { useRecoilState } from "recoil";
import axios from "axios";
import Config from "../../components/lib/Config";
import Link from "next/link";
import ProgressBar from "../../components/support/ProgressBar";
export default function MyPosts() {
  const [loading, setLoading] = useState(true);
  const [theUser, setTheUser] = useRecoilState(user);
  const [property, setProperty] = useState([]);

  //check Login
  useEffect(() => {
    let theUser = JSON.parse(localStorage.getItem("user"));
    if (!theUser?.data) {
      window.location.href = "/";
    }
  }, []);
  useEffect(() => {
    handleLoadMyPosts();
  }, [theUser]);

  const handleLoadMyPosts = async () => {
    if (theUser.data) {
      setLoading(true);
      axios({
        method: "get",
        url: `${Config.url.api}/property/mysavedproperty`,
        headers: {
          Authorization: `<Bearer> ${theUser.token || theUser.data.token}`,
        },
        data: { property },
      })
        .then((res) => {
          setProperty(res.data.data);
        })
        .finally(() => setLoading(false));
    }
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
      })
      .finally(() => setLoading(false));
  };

  const handleUnLike = async (propert_id) => {
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
      })
      .finally(() => setLoading(false));
  };

  function tokenToId(token) {
    let base64 = token.split(".")[1];

    return JSON.parse(atob(base64)).id;
  }

  if (loading) {
    return <ProgressBar />;
  }

  return (
    <div className="propContainer">
      {property == [] || property.length == 0 ? (
        <h1 className="text-center mt-5">No Saved Properties Found</h1>
      ) : (
        <h1 className="text-center mt-2">Saved Properties</h1>
      )}
      <div className="prop-row">
        {property == [] || property.length == 0
          ? null
          : property.map((theProperty, index) => {
              return (
                <div key={index} className="card" style={{ width: "18rem" }}>
                  <div
                    style={{
                      width: "100%",
                      height: "unset",
                      aspectRatio: 1.5,
                      backgroundSize: "cover",
                      backgroundImage: `url(${Config.url.GCP_GC_IMG}/${theProperty.photos[0]}`,
                    }}
                  ></div>

                  <div className="card-body">
                    <h5 className="card-title color">{theProperty.title}</h5>
                    <p className="card-text color">
                      {theProperty.address_1}
                      <br />
                      {theProperty.address_2}
                    </p>
                    <Link href={`/view/property/${theProperty.uid}`}>
                      <a className="btn btn-primary mr-1">
                        <img width={"20px"} src="/icons/view.png" />
                      </a>
                    </Link>
                    {theUser && theUser.data.token ? (
                      Array.isArray(theProperty.liked) &&
                      theProperty.liked.includes(
                        tokenToId(theUser.data.token)
                      ) ? (
                        <button
                          className="btn btn-danger ml-3"
                          onClick={() => handleUnLike(theProperty._id)}
                        >
                          <img width={"20px"} src="/icons/td.png" />
                        </button>
                      ) : (
                        <button
                          className="btn btn-primary ml-3"
                          onClick={() => handleLike(theProperty._id)}
                        >
                          <img width={"20px"} src="/icons/tu.png" />
                        </button>
                      )
                    ) : null}
                  </div>
                </div>
              );
            })}
      </div>
    </div>
  );
}
