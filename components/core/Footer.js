import React from "react";
import style from "../../styles/Footer.module.sass";

export default function Footer() {
  return (
    <div className={`${style.footer} container`}>
      <footer className="py-3 my-4">
        <ul className="nav justify-content-center border-bottom pb-3 mb-3">
          <li className="nav-item">
            <a href="#" className="nav-link px-2 text-muted">
              Home
            </a>
          </li>
          <li className="nav-item">
            <a href="#" className="nav-link px-2 text-muted">
              About
            </a>
          </li>
          <li className="nav-item">
            <a href="#" className="nav-link px-2 text-muted">
              Terms of Use
            </a>
          </li>
          <li className="nav-item">
            <a href="#" className="nav-link px-2 text-muted">
              Privacy Policy
            </a>
          </li>
        </ul>
        <p className="text-center">
          <small>&copy; Copyright 2022, ITPROZ Corporation LLC</small>
        </p>
      </footer>
    </div>
  );
}
