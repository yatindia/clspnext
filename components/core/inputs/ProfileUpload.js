import React, { useState } from "react";
import axios from "axios";
import Config from "../../lib/Config";
export default function ProfileUpload(props) {
  const [image, setImage] = useState(props.value);
  const [hover, setHover] = useState(false);

  const uploadImage = async (e) => {
    const img = e.target.files[0];
    let form = new FormData();
    form.append("avatar", img);
    await axios.post(`${Config.url.api}/profileImage`, form).then((res) => {
      if (res.status) {
        setImage(res.data.data);
        props.formInput(res.data.data);
      }
    });
  };

  return (
    <div className="singleImage">
      {image != "" ? (
        <div
          onClick={() => {
            props.onDelete();
          }}
          style={{
            backgroundImage: `url(${Config.url.GCP_GC_P_IMG}/${image})`,
          }}
          className="propertyImageHolder"
        >
          <div
            style={{
              backgroundColor: "red",
              width: "100%",
              height: "unset",
              aspectRatio: 1,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              opacity: hover ? 1 : 0,
            }}
            onMouseOver={() => {
              setHover(true);
            }}
            onMouseLeave={() => {
              setHover(false);
            }}
          >
            <h3 style={{ color: "#fff" }}>update</h3>
          </div>
        </div>
      ) : (
        <div className="file btn btn-lg btn-primary">
          <input
            className="fileinput"
            type="file"
            onInput={(e) => {
              uploadImage(e);
            }}
          />
        </div>
      )}
    </div>
  );
}
