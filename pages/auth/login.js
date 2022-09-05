import React, { useState, useEffect } from "react";
import style from "../../styles/auth/Login.module.sass";
import CheckLogin from "../../components/lib/CheckLogin";
import axios from "axios";
import { user } from "../../components/core/Atoms";
import { useRecoilState } from "recoil";
import Config from "../../components/lib/Config";
import Link from "next/link";
export default function Login() {
  const [userData, setUserData] = useRecoilState(user);
  const [datau, setData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async () => {
    if (datau.email == "") {
      alert("Please Enter Email");
      return false;
    }
    if (datau.password == "") {
      alert("Please Enter Password");
      return false;
    }

    await axios.post(`${Config.url.api}/auth/login`, datau).then(({ data }) => {
      if (!data.status) {
        if (data.message == "please verify your account") {
          if (
            confirm(
              "Your account is not yet verified, Want to send reverification link"
            ) == true
          ) {
            axios({
              url: `${Config.url.api}/auth/reverification`,
              method: "post",
              headers: { "Content-Type": "application/json" },
              data: { email: datau.email },
            }).then((res) => {
              if (res.data.status) {
                alert("reverification send");
              } else {
                alert("reverification failed to send ");
              }
            });
          }
        } else {
          alert(data.message);
        }
      } else {
        localStorage.setItem("user", JSON.stringify(data));
        setUserData({
          status: "LGIN",
          token: data.token,
        });

        window.location.href = "/user";
      }
    });
  };

  const handleForgotPassword = async () => {
    let email = prompt("Fill Email");

    axios({
      url: `${Config.url.api}/auth/resetpassword`,
      method: "post",
      headers: { "Content-Type": "application/json" },
      data: { email: email },
    }).then((res) => {
      if (res.data.status) {
        alert("Please check you email");
      } else {
        alert("Password Recovery Failed");
      }
    });
  };

  let { status, token } = CheckLogin();
  if (status != "LODG" && status == "NOLG") {
    //action if not loggedIn
  } else if (status == "LGIN") {
    //action if loggedIn
    // window.location.href = "/user";
  }

  return (
    <div className={style.main}>
      <div className={style.form}>
        <div className={style.container}>
          <h1 className={style.title}>LogIn</h1>
          <p className="text-center color">
            It&#39;s always happy to see you back.
          </p>
        </div>

        <div className={style.container}>
          <label className={style.label}>Your Email Id</label>
          <input
            className={style.input}
            id="email"
            placeholder="Your Email Id"
            value={datau.email}
            onInput={(e) => {
              setData({ ...datau, email: e.target.value });
            }}
          />
        </div>

        <div className={style.container}>
          <label className={style.label}>Type Password</label>
          <input
            className={style.input}
            id="password"
            placeholder="Type Password"
            value={datau.password}
            onInput={(e) => {
              setData({ ...datau, password: e.target.value });
            }}
          />
        </div>

        <div className={style.container}>
          <div className={style.linkContainer}>
            <button
              onClick={() => handleForgotPassword()}
              className={`${style.text} color btn`}
            >
              Forgot Password?
            </button>

            <Link href="/auth/signup">
              <a className={style.text}>Don&apos;t Have an account? Signup</a>
            </Link>
          </div>
        </div>

        <div className={style.container}>
          <button
            onClick={() => {
              handleSubmit();
            }}
            className={style.button}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
}
