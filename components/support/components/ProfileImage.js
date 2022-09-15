import React, { useState, useEffect, useRef } from "react";
import { user } from "../../core/Atoms";
import { useRecoilState } from "recoil";
import Config from "../../lib/Config";
import axios from "axios";

//style
import style from "../../../styles/components/ProfileImage.module.sass";

export default function ProfileImage({ userInfo, setRefresh }) {
  const file = useRef(null);
  const [userData, setUserData] = useRecoilState(user);

  function tokenToId(token) {
    let base64 = token.split(".")[1];
    return JSON.parse(atob(base64)).id;
  }
  const uploadImage = async (e) => {
    const img = e.target.files[0];
    let form = new FormData();
    form.append("avatar", img);
    form.append("_id", tokenToId(userData.data.token));
    await axios({
      method: "post",
      url: `${Config.url.api}/UserImage`,
      headers: {
        Authorization: `<Bearer> ${userData.data.token}`,
      },
      data: form,
    }).then((res) => {
      if (res.status) {
        alert("Profile Picture might take sometime to update");
        setRefresh((refresh) => refresh + 1);
      } else {
        alert("Something went wrong while updating.. please try later");
      }
    });
  };

  return (
    <div className={style.profileContainer}>
      <div
        className={style.profile}
        onClick={() => file.current.click()}
        style={{
          backgroundImage:
            userInfo?.profile && userInfo.profile != "profile"
              ? `url(${Config.url.GCP_GC_P_IMG}/${userInfo.profile})`
              : "url(/user.png)",
        }}
      >
        <div className={style.profileUploadMessage}>
          <img className={style.icon} src="/icons/upload.png" />
          <p style={{ textAlign: "center", color: "#fff" }}>
            Click to <br />
            Update Image
          </p>
          <input
            style={{ display: "none" }}
            ref={file}
            className="fileinput"
            type="file"
            onInput={(e) => {
              uploadImage(e);
            }}
          />
        </div>
      </div>
    </div>
  );
}
