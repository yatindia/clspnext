import React from "react";
import style from "../../styles/SkeletonLoading.module.sass";

export default function Skloading() {
  return (
    <div className={style.main}>
      <div className={style.skeleton}>
        <div className={style.img}></div>
        <div className={style.first}></div>
        <div className={style.second}></div>
        <div className="third"></div>
      </div>

      <div className={style.skeleton}>
        <div className={style.img}></div>
        <div className={style.first}></div>
        <div className={style.second}></div>
        <div className="third"></div>
      </div>

      <div className={style.skeleton}>
        <div className={style.img}></div>
        <div className={style.first}></div>
        <div className={style.second}></div>
        <div className="third"></div>
      </div>
    </div>
  );
}
