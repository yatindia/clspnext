import React, { useState, useEffect, useRef } from "react";
import style from "../../styles/UserInfoPanel.module.sass";
import Config from "../lib/Config";
import CheckLogin from "../lib/CheckLogin";
import { user } from "../core/Atoms";
import { useRecoilState } from "recoil";
import axios from "axios";
import Swal from "sweetalert2";
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

  const handleLoadInfo = async () => {
    axios({
      method: "post",
      url: `${Config.url.api}/user/myprofile`,
      headers: {
        Authorization: `<Bearer> ${userData.data.token}`,
      },
    }).then((res) => {
      if (res.status) {
        if (
          res.data.data?.areYouBuyer == "empty" ||
          !res.data.data?.areYouBuyer
        ) {
          Swal.fire({
            title: "Are you a",
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: "Buyer",
            denyButtonText: `Seller`,
          }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
              handleYouAreA("buyer");
              Swal.fire("Thank you!", "", "success");
            } else if (result.isDenied) {
              handleYouAreA("seller");
              Swal.fire("Thank you!", "", "success");
            }
          });
        }

        setUserInfo(res.data.data);
      }
    });
  };

  const handleYouAreA = async (status) => {
    //areYouBuyer

    axios({
      method: "post",
      url: `${Config.url.api}/user/areYouBuyer`,
      headers: {
        Authorization: `<Bearer> ${userData.data.token}`,
      },
      data: { areYouBuyer: status },
    });
  };

  return (
    <div className={style.container}>
      <h2 className="text-center color">
        Hello, {userInfo.name ? userInfo.name : "..."}
      </h2>
    </div>
  );
}
