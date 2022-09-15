import React, { useState, useEffect } from "react";
import { user } from "../../components/core/Atoms";
import { useRecoilState } from "recoil";
import axios from "axios";
import Config from "../../components/lib/Config";
import Link from "next/link";
import ProgressBar from "../../components/support/ProgressBar";
import UserInfoPanel from "../../components/core/UserInfoPanel";
export default function MyPosts() {
  const [paginationLimit, setPaginationLimit] = useState(2);
  const [pagination, setPagination] = useState({
    skip: 0,
  });
  const [theUser, setTheUser] = useRecoilState(user);
  const [property, setProperty] = useState([]);
  const [loading, setLoading] = useState(true);
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
        url: `${Config.url.api}/property/singleuserproperty`,
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

  const handleDeletePost = async (post_id) => {
    if (theUser.data) {
      setLoading(true);
      axios({
        method: "delete",
        url: `${Config.url.api}/property/${post_id}`,
        headers: {
          Authorization: `<Bearer> ${theUser.token || theUser.data.token}`,
        },
        data: { property },
      })
        .then((res) => {
          if (res.data.status) {
            handleLoadMyPosts();
          } else {
            alert("Somthing went wrong while deleting the post");
          }
        })
        .finally(() => setLoading(false));
    } else {
      alert("User authentication failed");
    }
  };
  const handlePromotedPost = async (post_id) => {
    if (theUser.data) {
      axios({
        method: "post",
        url: `${Config.url.payment}/payment/${post_id}`,
      })
        .then((res) => {
          window.location.href = res.data.url;
          return false;
        })
        .catch(() => {
          alert("Something went wrong");
        });
    } else {
      alert("User authentication failed for promotion");
    }
  };

  if (loading) {
    return <ProgressBar />;
  }

  return (
    <>
      <UserInfoPanel />
      <div className="propContainer">
        {Array.isArray(property) && property.length == 0 ? (
          <h1 className="text-center pt-5">No Properties Found</h1>
        ) : (
          <h1 className="text-center pt-5">My Properties</h1>
        )}
        <div className="prop-row">
          {Array.isArray(property) && property.length == 0
            ? null
            : property
                .slice(pagination.skip, pagination.skip + paginationLimit)
                .map((theProperty, index) => {
                  return (
                    <div
                      key={index}
                      className="card"
                      style={{ width: "18rem" }}
                    >
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
                        <h5 className="card-title color">
                          {theProperty.title}
                        </h5>
                        <p className="card-text color">
                          {theProperty.address_1}
                          <br />
                          {theProperty.address_2}
                        </p>
                        <Link href={`/user/edit/${theProperty.uid}`}>
                          <a className="btn btn-primary mr-1">
                            <img width={"20px"} src="/icons/editing.png" />
                          </a>
                        </Link>
                        <button
                          onClick={() => handleDeletePost(theProperty._id)}
                          className="btn btn-danger mr-1"
                        >
                          <img width={"20px"} src="/icons/bin.png" />
                        </button>
                        {theProperty.isPro ? (
                          <button disabled className="btn btn-success mr-1">
                            Promoted
                          </button>
                        ) : (
                          <button
                            onClick={() => handlePromotedPost(theProperty._id)}
                            className="btn btn-warning mr-1"
                          >
                            Promote
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
        </div>

        <div className="d-flex">
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

              {Array(Math.ceil(property.length / paginationLimit))
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
                      <a className="page-link" href="#">
                        {index + 1}
                      </a>
                    </li>
                  );
                })}

              {property.length > pagination.skip + paginationLimit ? (
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

              {Array.isArray(property) && property.length != 0 ? (
                <li className="page-item  ml-2">
                  <select
                    onInput={(e) => setPaginationLimit(e.target.value)}
                    className="page-link"
                  >
                    <option value={10}>No.of Results - 2</option>
                    {property.length > 20 * 2 ? (
                      <option value={20}>No.of Results - 5</option>
                    ) : null}
                    {property.lenght > 30 * 2 ? (
                      <option value={30}>No.of Results - 10</option>
                    ) : null}
                  </select>
                </li>
              ) : (
                <Link href="/user/post">
                  <a className="btn btn-danger">+ Add Post</a>
                </Link>
              )}
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
}
