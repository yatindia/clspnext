import React, { useState } from "react";
import axios from "axios";
import Config from "../../lib/Config";
import style from "../../../styles/components/UserInfoUpdate.module.sass";
export default function UserInfoUpdate({ userInfo, userData }) {
  const [data, setData] = useState(userInfo);
  const [passwordUpdate, setPasswordUpdate] = useState({
    oldPassword: "",
    password: "",
  });

  const [email, setEmail] = useState(userInfo.email);

  const handleUpdate = async () => {
    // /profileupdate
    await axios({
      method: "post",
      url: `${Config.url.api}/user/profileupdate`,
      headers: {
        Authorization: `<Bearer> ${userData.data.token}`,
      },
      data: data,
    }).then((res) => {
      if (res.status) {
        alert("Profile updated");
      }
    });
  };

  const handlePasswordUpdate = async () => {
    if (passwordUpdate.oldPassword == "") {
      alert("Please enter the old password");
      return false;
    }

    if (passwordUpdate.password == "") {
      alert("Please enter the new password");
      return false;
    }

    await axios({
      method: "post",
      url: `${Config.url.api}/user/passwordupdate`,
      headers: {
        Authorization: `<Bearer> ${userData.data.token}`,
      },
      data: passwordUpdate,
    }).then((res) => {
      console.log(res);
      if (res.data.status) {
        alert("Password updated");
        setPasswordUpdate({
          oldPassword: "",
          password: "",
        });
      } else {
        alert(res.data.message);
      }
    });
  };

  const handleEmailUpdate = async () => {
    if (email == "") {
      alert("Please enter a email");
      return false;
    }

    await axios({
      method: "post",
      url: `${Config.url.api}/user/emailupdate`,
      headers: {
        Authorization: `<Bearer> ${userData.data.token}`,
      },
      data: { email },
    }).then((res) => {
      console.log(res);
      if (res.data.status) {
        alert("Email updated");
        setPasswordUpdate({
          oldPassword: "",
          password: "",
        });
      } else {
        alert(res.data.message);
      }
    });
  };

  if (!userInfo) {
    return null;
  }

  return (
    <>
      <div className={style.container}>
        <div className={style.subContainer}>
          <div className={style.inputContainer}>
            <label className={style.label}>Name</label>
            <input
              maxLength={70}
              type={"text"}
              className={style.input}
              placeholder="Name"
              value={data.name}
              onInput={(e) => {
                setData((oldData) => ({ ...oldData, name: e.target.value }));
              }}
            />
          </div>
          <div className={style.inputContainer}>
            <label className={style.label}>Mobile</label>
            <input
              type="tel"
              pattern="[0-9]{0,5}"
              onInput={(e) => {
                if (e.target.value < 10000000000) {
                  setData({ ...data, phoneNumber: e.target.value });
                }
              }}
              value={data.phoneNumber}
              className={style.input}
              placeholder="Name"
            />
          </div>

          <div className={style.inputContainer}>
            <label className={style.label}>Company Name</label>
            <input
              type={"text"}
              className={style.input}
              placeholder="Name"
              onInput={(e) => {
                setData({ ...data, companyName: e.target.value });
              }}
              value={data.companyName}
            />
          </div>
          <div className={style.inputContainer}>
            <label className={style.label}>Company website</label>
            <input
              type={"text"}
              className={style.input}
              placeholder="Name"
              onInput={(e) => {
                setData({ ...data, website: e.target.value });
              }}
              value={data.website}
            />
          </div>
        </div>

        <div className={style.inputContainer2}>
          <label className={style.label}>Company Description</label>
          <textarea
            type={"text"}
            className={style.textInput}
            placeholder="Name"
            onInput={(e) => {
              setData({ ...data, companyDescription: e.target.value });
            }}
            value={data.companyDescription}
          />
        </div>

        <button
          onClick={() => handleUpdate()}
          className={`btn btn-danger ${style.button}`}
        >
          Update Profile
        </button>
      </div>

      <div className={style.container}>
        <div className={style.inputContainer}>
          <label className={style.label}>Old Password</label>
          <input
            onInput={(e) =>
              setPasswordUpdate({
                ...passwordUpdate,
                oldPassword: e.target.value,
              })
            }
            value={passwordUpdate.oldPassword}
            type={"text"}
            className={style.input}
            placeholder="Old Password"
          />
        </div>
        <div className={style.inputContainer}>
          <label className={style.label}>New Password</label>
          <input
            onInput={(e) =>
              setPasswordUpdate({
                ...passwordUpdate,
                password: e.target.value,
              })
            }
            value={passwordUpdate.password}
            type={"text"}
            className={style.input}
            placeholder="New Password"
          />
        </div>

        <button
          onClick={() => handlePasswordUpdate()}
          className={`btn btn-danger ${style.button}`}
        >
          Update Password
        </button>
      </div>

      <div className={style.container}>
        <div
          style={{ gridColumnEnd: "span 2 " }}
          className={style.inputContainer}
        >
          <label className={style.label}>Email</label>
          <input
            style={{ gridColumnEnd: "span 2 " }}
            type={"text"}
            className={style.input}
            placeholder="Name"
            onInput={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>

        <button
          onClick={() => {
            handleEmailUpdate();
          }}
          className={`btn btn-danger ${style.button}`}
        >
          Update Email
        </button>
      </div>
    </>
  );
}
