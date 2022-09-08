import React, { useState, useEffect } from "react";
import Link from "next/link";
import style from "../../styles/Navigation.module.sass";
import CheckLogin from "../lib/CheckLogin";
import Config from "../lib/Config";
import { user } from "../core/Atoms";
import { useRecoilState } from "recoil";
import axios from "axios";
export default function Navigation() {
  const [authenticated, setAuthenticated] = useState(false);
  const [loginState, setloginState] = useState(CheckLogin());
  const [userData, setUserData] = useRecoilState(user);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [profileImage, setProfileImage] = useState("/user.png");
  let login = CheckLogin();

  useEffect(() => {
    login.status == "LGIN" ? setAuthenticated(true) : null;
    // if (login.status == "LGIN") {
    //   axios({
    //     method: "post",
    //     url: `${Config.url.api}/user/myprofileimage`,
    //     headers: {
    //       Authorization: `<Bearer> ${userData.data.token}`,
    //     },
    //   }).then((res) => {
    //     if (res.status) {
    //       setProfileImage(
    //         `${Config.url.GCP_GC_P_IMG}/${res.data.data.profile}`
    //       );
    //     }
    //   });
    // }
  }, [login]);

  const logout = () => {
    setUserData({ status: "NOLG" });
    localStorage.clear();
    window.location.href = "/";
  };

  const LoggedInOptions = () => {
    return (
      <div className={`${style.nav}form-inline ms-auto`}>
        <ul className="navbar-nav mr-auto">
          {/* <li className="nav-item dropdown">
            <button
              className="nav-link btn"
              id="navbarDropdown"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <img className={style.userImg} src={profileImage} />
            </button>

            <div
              className="dropdown-menu"
              aria-labelledby="navbarDropdown"
            ></div>
          </li> */}

          <li className="nav-item">
            <Link href="/user">
              <a className={`${style.navLink} nav-link`}>Account</a>
            </Link>
          </li>
          <li className="nav-item">
            <Link href="/user/myposts">
              <a className={`${style.navLink} nav-link`}>My Posts</a>
            </Link>
          </li>
          <li className="nav-item">
            <Link href="/user/saved">
              <a className={`${style.navLink} nav-link`}>Saved Posts</a>
            </Link>
          </li>
          <li className="nav-item">
            <Link href="/search">
              <a className={`${style.navLink} nav-link`}>Search</a>
            </Link>
          </li>
          <li className="nav-item">
            <Link href="/user/post">
              <a className={`${style.navLink} nav-link`}>Post</a>
            </Link>
          </li>

          <li className="nav-item">
            <Link href="/about">
              <a
                onClick={(e) => {
                  e.preventDefault();
                  logout();
                }}
                className={`${style.navLink} ${style.logout} nav-link btn`}
              >
                Logout
              </a>
            </Link>
          </li>
        </ul>
      </div>
    );
  };

  const LoggedOutOptions = () => {
    return (
      <div className="form-inline ms-auto">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link href="/auth/login">
              <a className={`${style.navLink} nav-link`}>Login</a>
            </Link>
          </li>

          <li className="nav-item">
            <Link href="/auth/signup">
              <a className={`${style.navLink} ${style.logout} nav-link btn`}>
                Signup
              </a>
            </Link>
          </li>
        </ul>
      </div>
    );
  };

  const MobileNav = () => {
    return (
      <div className={style.topnav}>
        <div className={style.mainContainer}>
          <div className={style.theLogo}>
            <Link href="/">
              <a className="active">
                <img className={style.logo} src="/logo.svg" />
              </a>
            </Link>
          </div>
          <div className={style.theButton}>
            <button
              className={`btn ${style.logout}`}
              onClick={() => {
                setMobileNavOpen(!mobileNavOpen);
              }}
            >
              Menu
            </button>
          </div>
        </div>
        <div
          className={style.myLinks}
          style={{ display: mobileNavOpen ? "block" : "none" }}
        >
          {authenticated ? (
            <>
              <Link href="/">
                <a className={style.a}>Home</a>
              </Link>
              <Link href="/about">
                <a className={style.a}>About</a>
              </Link>
              <Link href="/user">
                <a onClick={() => setMobileNavOpen(false)} className={style.a}>
                  Account
                </a>
              </Link>

              <Link href="/user/myposts">
                <a onClick={() => setMobileNavOpen(false)} className={style.a}>
                  My Posts
                </a>
              </Link>

              <Link href="/user/saved">
                <a onClick={() => setMobileNavOpen(false)} className={style.a}>
                  Saved Posts
                </a>
              </Link>

              <Link href="/search">
                <a onClick={() => setMobileNavOpen(false)} className={style.a}>
                  Search
                </a>
              </Link>

              <Link href="/user/post">
                <a onClick={() => setMobileNavOpen(false)} className={style.a}>
                  Make Post
                </a>
              </Link>

              <button
                onClick={() => {
                  logout();
                  setMobileNavOpen(false);
                }}
                className={`btn ${style.logout}`}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/">
                <a className={style.a}>Home</a>
              </Link>
              <Link href="/about">
                <a className={style.a}>About</a>
              </Link>
              <Link href="/auth/login">
                <a className={`${style.navLink} nav-link`}>Login</a>
              </Link>

              <Link href="/auth/signup">
                <a className={`${style.navLink} ${style.logout} nav-link btn`}>
                  Signup
                </a>
              </Link>
            </>
          )}
        </div>
      </div>
    );
  };

  return (
    <>
      <MobileNav />
      <nav className={`${style.nav} navbar navbar-expand-lg p-2`}>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className={`${style.navDropBg} collapse navbar-collapse`}
          id="navbarSupportedContent"
        >
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link href="/">
                <a className="navbar-brand">
                  <img className={style.logo} src="/logo.svg" />
                </a>
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/">
                <a className={`${style.navLink} nav-link`}>Home</a>
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/about">
                <a className={`${style.navLink} nav-link`}>About</a>
              </Link>
            </li>
          </ul>

          {authenticated ? <LoggedInOptions /> : <LoggedOutOptions />}
        </div>
      </nav>
    </>
  );
}
