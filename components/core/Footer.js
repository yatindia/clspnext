import React from "react";
import style from "../../styles/Footer.module.sass";
import Link from "next/link";

export default function Footer() {
  return (
    <div className={`${style.footer} container`}>
      <footer className="py-3 my-4">
        <ul className="nav justify-content-center border-bottom pb-3 mb-3">
          <li className="nav-item">
            <Link href="/">
              <a className="nav-link px-2 text-muted">Home</a>
            </Link>
          </li>
          <li className="nav-item">
            <Link href="/about">
              <a className="nav-link px-2 text-muted">About</a>
            </Link>
          </li>
          <li className="nav-item">
            <Link href="/termsofuse">
              <a className="nav-link px-2 text-muted">Terms of Use</a>
            </Link>
          </li>
          <li className="nav-item">
            <Link href="/privacypolicy">
              <a className="nav-link px-2 text-muted">Privacy Policy</a>
            </Link>
          </li>
        </ul>
        <p className="text-center">
          <small>&copy; Copyright 2022, ITPROZ Corporation LLC</small>
        </p>
      </footer>
    </div>
  );
}
