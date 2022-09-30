import React, { useState, useRef } from "react";
import axios from "axios";
import Config from "../../lib/Config";
export default function ImageUpload(props) {
  const [image, setImage] = useState(props.value);
  const [hover, setHover] = useState(false);

  const uploadImage = async (e) => {
    const img = e.target.files[0];
    let form = new FormData();
    form.append("avatar", img);
    await axios.post(`${Config.url.api}/propertyImage`, form).then((res) => {
      if (res.status) {
        setImage(res.data.data);
        props.formInput(res.data.data);
      }
    });
  };

  const inputRef = useRef(null);

  return (
    <div className="singleImage">
      {image != "" ? (
        <div
          onClick={() => {
            props.onDelete();
          }}
          style={{ backgroundImage: `url(${Config.url.GCP_GC_IMG}/${image})` }}
          className="propertyImageHolder"
        >
          <div
            style={{
              backgroundColor: "#000",
              width: "100%",
              height: "unset",
              aspectRatio: 1,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              opacity: hover ? 1 : 0.5,
            }}
            onMouseOver={() => {
              setHover(true);
            }}
            onMouseLeave={() => {
              setHover(false);
            }}
          >
            <h3 style={{ color: "#fff", textAlign: "center" }}>
              Click to Remove
            </h3>
          </div>
        </div>
      ) : (
        <div className="file">
          <input
            ref={inputRef}
            className="fileinput d-none"
            type="file"
            onInput={(e) => {
              uploadImage(e);
            }}
          />
          <button
            onClick={() => {
              inputRef.current.click();
            }}
            className="btn-main text-center"
          >
            Upload Property Photo
          </button>
          <button
            onClick={() => {
              props.onDelete();
            }}
            className="btn-red text-center"
          >
            Remove
          </button>
        </div>
      )}
    </div>
  );
}
