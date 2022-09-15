import React, { useState, useEffect, useRef } from "react";
import Config from "../../components/lib/Config";
import CheckLogin from "../../components/lib/CheckLogin";
import { user } from "../../components/core/Atoms";
import { useRecoilState } from "recoil";
import axios from "axios";
import ProfileImage from "../../components/support/components/ProfileImage";
import UserInfoUpdate from "../../components/support/components/UserInfoUpdate";
import style from "../../styles/pages/Settings.module.sass";
export default function Settings() {
  const [refresh, setRefresh] = useState(0);
  const [userInfo, setUserInfo] = useState({});
  const [userData, setUserData] = useRecoilState(user);
  let login = CheckLogin();
  let file = useRef(null);

  useEffect(() => {
    if (login.status == "LGIN") {
      handleLoadInfo();
    }
  }, [userData, refresh]);

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
      data: form,
    }).then((res) => {
      if (res.status) {
        handleLoadInfo();
        alert("Profile Picture might take sometime to update");
      } else {
        alert("Something went wrong while updating.. please try later");
      }
    });
  };

  const clickFile = () => {
    file.current.click();
  };

  return (
    <div className={style.container}>
      <div className={style.profileContainer}>
        <ProfileImage userInfo={userInfo} setRefresh={setRefresh} />
      </div>
      <div className={style.infoContainer}>
        {Object.entries(userInfo).length > 0 ? (
          <UserInfoUpdate
            userInfo={userInfo}
            setRefresh={setRefresh}
            userData={userData}
          />
        ) : null}
      </div>
    </div>
  );
}
