import React, { useState, useEffect, useRef } from "react";
import { TextInput } from "./inputs/FormInputs";
import style from "../../styles/UserInfoPanel.module.sass";
import Config from "../lib/Config";
import CheckLogin from "../lib/CheckLogin";
import { user } from "../core/Atoms";
import { useRecoilState } from "recoil";
import axios from "axios";
export default function UserInfoPanel() {
  const [userInfo, setUserInfo] = useState({});
  const [userData, setUserData] = useRecoilState(user);
  let login = CheckLogin();
  let file = useRef(null);

  useEffect(() => {
    if (login.status == "LGIN") {
      handleLoadInfo();
    }
  }, [userData]);

  function tokenToId(token) {
    let base64 = token.split(".")[1];

    return JSON.parse(atob(base64)).id;
  }

  const handleLoadInfo = async () => {
    axios({
      method: "post",
      url: `${Config.url.api}/user/myprofile`,
      headers: {
        Authorization: `<Bearer> ${userData.data.token}`,
      },
    }).then((res) => {
      if (res.status) {
        setUserInfo(res.data.data);
      }
    });
  };

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
      data: userInfo,
    }).then((res) => {
      if (res.status) {
        alert("Profile Picture will take sometime to update");
        window.location.href = `/user`;
      }
    });
  };

  const handlePasswordUpdate = async () => {
    let password, oldPassword;

    password = prompt("Enter New password");
    oldPassword = prompt("Enter Old password");

    await axios({
      method: "post",
      url: `${Config.url.api}/user/passwordupdate`,
      headers: {
        Authorization: `<Bearer> ${userData.data.token}`,
      },
      data: { password, oldPassword },
    }).then((res) => {
      console.log(res);
      if (res.data.status) {
        alert("Password updated");
      } else {
        alert(res.data.message);
      }
    });
  };

  const test = () => {
    file.current.click();
  };

  const handleUpdate = async () => {
    // /profileupdate

    await axios({
      method: "post",
      url: `${Config.url.api}/user//profileupdate`,
      headers: {
        Authorization: `<Bearer> ${userData.data.token}`,
      },
      data: userInfo,
    }).then((res) => {
      if (res.status) {
        alert("Profile Picture will take sometime to update");
      }
    });
  };

  if (Object.entries(userInfo).length > 0) {
    return (
      <div className={style.container}>
        <div className={style.porfileImageContainer}>
          <div
            onClick={() => test()}
            className={style.porfileImage}
            style={{
              backgroundImage: `url(${Config.url.GCP_GC_P_IMG}/${userInfo.profile})`,
            }}
          ></div>
          <h2>Hello, {userInfo.name ? userInfo.name : "..."}</h2>
        </div>
        <div className={style.infoContainer}>
          <div className={style.userInfo}>
            <TextInput
              placeholder="name"
              value={userInfo.name}
              formInput={(value) => {
                setUserInfo({ ...userInfo, name: value });
              }}
            />
            <TextInput
              value={userInfo.email}
              placeholder="email"
              formInput={(value) => {
                setUserInfo({ ...userInfo, email: value });
              }}
            />
            <TextInput
              value={userInfo.phoneNumber}
              placeholder="mobile"
              formInput={(value) => {
                setUserInfo({ ...userInfo, phoneNumber: value });
              }}
            />
            <input
              style={{ display: "none" }}
              ref={file}
              className="fileinput"
              type="file"
              onInput={(e) => {
                uploadImage(e);
              }}
            />
            <div style={{ display: "flex", gap: "10px" }}>
              <button
                onClick={() => {
                  handleUpdate();
                }}
                className={style.UpdateButton}
              >
                Update
              </button>
              <button
                onClick={() => {
                  handlePasswordUpdate();
                }}
                className={`${style.UpdateButton} text-center`}
              >
                Password Update
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return "...";
  }
}
