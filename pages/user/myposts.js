import React, { useState, useEffect } from "react";
import { user } from "../../components/core/Atoms";
import { useRecoilState } from "recoil";
import axios from "axios";
import Config from "../../components/lib/Config";
import Link from "next/link";
export default function MyPosts() {
  const [theUser, setTheUser] = useRecoilState(user);

  const [property, setProperty] = useState([]);

  useEffect(() => {
    handleLoadMyPosts();
  }, [theUser]);

  const handleLoadMyPosts = async () => {
    if (theUser.data) {
      axios({
        method: "get",
        url: `${Config.url.api}/property/singleuserproperty`,
        headers: {
          Authorization: `<Bearer> ${theUser.token || theUser.data.token}`,
        },
        data: { property },
      }).then((res) => {
        setProperty(res.data.data);
        console.log(res.data.data.length);
      });
    }
  };

  const handleDeletePost = async (post_id) => {
    if (theUser.data) {
      axios({
        method: "delete",
        url: `${Config.url.api}/property/${post_id}`,
        headers: {
          Authorization: `<Bearer> ${theUser.token || theUser.data.token}`,
        },
        data: { property },
      }).then((res) => {
        if (res.data.status) {
          handleLoadMyPosts();
        } else {
          alert("Somthing went wrong while deleting the post");
        }
      });
    } else {
      alert("User authentication failed");
    }
  };

  return (
    <div className="propContainer">
      {property == [] || property.length == 0 ? (
        <h1 className="text-center">No Properties Found</h1>
      ) : (
        <h1 className="text-center">My Properties</h1>
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
                    <h5 className="card-title">{theProperty.title}</h5>
                    <p className="card-text">
                      {theProperty.address_1}
                      <br />
                      {theProperty.address_2}
                    </p>
                    <Link href={`/user/edit/${theProperty.uid}`}>
                      <a className="btn btn-primary mr-1">Edit</a>
                    </Link>
                    <button
                      onClick={() => handleDeletePost(theProperty._id)}
                      className="btn btn-danger mr-1"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              );
            })}
      </div>
    </div>
  );
}
