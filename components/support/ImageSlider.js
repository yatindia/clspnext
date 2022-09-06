import React from "react";
import SimpleImageSlider from "react-simple-image-slider";
import style from "../../styles/ImageSlider.module.sass";
export default function ImageSlider({ images, onPress }) {
  return (
    <div className={style.imageSliderContainer}>
      <SimpleImageSlider
        width={window.screen.width > 900 ? "60vw" : "40vh"}
        height={window.screen.width > 900 ? "60vh" : "40vh"}
        images={images}
        showBullets={true}
        showNavs={true}
      />
      <button
        onClick={() => onPress()}
        className="btn btn-danger pr-5 pl-5 m-2"
      >
        Close
      </button>
    </div>
  );
}
