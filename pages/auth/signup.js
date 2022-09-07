import React, { useState, useEffect } from "react";
import style from "../../styles/auth/Signup.module.sass";
import { user } from "../../components/core/Atoms";
import { useRecoilState } from "recoil";
import axios from "axios";
import Config from "../../components/lib/Config";
export default function Signup() {
  const nameLength = 50;
  const passwordLength = 70;
  const [datum, setDatum] = useRecoilState(user);
  const [data, setData] = useState({
    name: "",
    phoneNumber: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [inputType, setInputType] = useState(true);

  const handleSubmit = async () => {
    //error check
    let errors = [];
    data.name.length > nameLength
      ? errors.push("Name Has More than 50 Characters")
      : null;
    data.password.length > passwordLength
      ? errors.push(
          "We apperciate your conscious on online security, but currently we allow only 70 Characters passowrd"
        )
      : null;
    data.password != data.confirmPassword
      ? errors.push("Passwords should be same")
      : null;

    if (errors.length > 0) {
      let errorString = "";
      for (let index = 0; index < errors.length; index++) {
        errorString += `${errors[index]}\n`;
      }
      alert(errorString);
      return false;
    }

    await axios
      .post(`${Config.url.api}/auth/register`, data)
      .then(({ data }) => {
        console.log(data);

        if (data.status) {
        } else {
          alert(data.message);
        }
      });
  };

  return (
    <div className={style.main}>
      <div className={style.form}>
        <div className={style.container}>
          <h1 className={style.title}>Sign Up</h1>
          <p className="text-center color">
            Hi, hello. We are so happy to see you join us.
          </p>
        </div>

        <div className={style.container}>
          <label className={style.label}>
            Full Name <small>(Max 50 characters)</small>
          </label>
          <input
            onInput={(e) => {
              setData({ ...data, name: e.target.value });
            }}
            className={style.input}
            id="name"
            placeholder="Full Name"
            maxLength={nameLength}
          />
          <div
            style={{ width: `${(data.name.length / nameLength) * 100}%` }}
            className={style.size}
          ></div>
        </div>

        <div className={style.container}>
          <label className={style.label}>
            Mobile Number <small>(Ex: 2025886500)</small>
          </label>
          <input
            onInput={(e) => {
              setData({ ...data, phoneNumber: e.target.value });
            }}
            className={style.input}
            id="mobile"
            placeholder="Mobile Number"
            maxLength={11}
          />
        </div>

        <div className={style.container}>
          <label className={style.label}>Your Email Id</label>
          <input
            onInput={(e) => {
              setData({ ...data, email: e.target.value });
            }}
            className={style.input}
            id="email"
            placeholder="Your Email Id"
          />
        </div>

        <div className={style.container}>
          <label className={style.label}>
            Type Password <small>(Max 70 characters)</small>
          </label>
          <input
            className={style.input}
            id="password"
            placeholder="Type Password"
            maxLength={passwordLength}
            onInput={(e) => {
              setData({ ...data, password: e.target.value });
            }}
            type={inputType ? "password" : "text"}
          />

          <div
            style={{
              width: `${(data.password.length / passwordLength) * 100}%`,
            }}
            className={style.size}
          ></div>
          <p
            onClick={() => setInputType(!inputType)}
            className="color pt-2 text-decoration-underline"
          >
            {inputType ? "Show" : "Hide"} Password
          </p>
        </div>

        <div className={style.container}>
          <p className={data.password.length > 6 ? style.green : style.red}>
            Should contain more than 6 characters
          </p>
          <p
            className={
              data.password.match(/[!@#$%^&*(),.?":{}|<>]/g)
                ? style.green
                : style.red
            }
          >
            Should contain a special character
          </p>
          <p
            className={data.password.match(/[0-9]/g) ? style.green : style.red}
          >
            Should contain a number
          </p>
        </div>

        <div className={style.container}>
          <label className={style.label}>Re-Type Password</label>
          <input
            onInput={(e) => {
              setData({ ...data, confirmPassword: e.target.value });
            }}
            className={style.input}
            id="rePassword"
            placeholder="Re-Type Password"
            type={inputType ? "password" : "text"}
          />
          {data.confirmPassword && data.password != data.confirmPassword ? (
            <p className={style.red}>The passwords should match</p>
          ) : null}
        </div>

        <div className={style.container}>
          <button onClick={() => handleSubmit()} className={style.button}>
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
}
