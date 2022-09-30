import React, { useState, useEffect } from "react";
import { SelectInput, TextInput } from "../inputs/FormInputs";
import style from "../../../styles/FloorInput.module.sass";

export default function NearbyInput(props) {
  const [amenity, setAmenity] = useState(props.value);

  useEffect(() => {
    props.formInput(amenity);
  }, [amenity]);
  return (
    <>
      <h3>Nearby Amenity #{props.arrayIndex + 1}</h3>
      <div className={style.floorContainer}>
        <TextInput
          dataList={[
            "school",
            "hospital",
            "park",
            "grocery store",
            "mall",
            "milk booth",
            "railway station",
            "railway stop",
            "bus stand",
            "bus terminal",
            "kinder garden",
            "amusement park",
            "resturant",
          ]}
          value={amenity.amenity}
          placeholder="Select Amenity"
          formInput={(value) => {
            setAmenity({
              ...amenity,
              amenity: value,
            });
          }}
        />

        <TextInput
          type="number"
          placeholder="distancein (Miles)"
          value={amenity.distance}
          formInput={(value) => {
            setAmenity({ ...amenity, distance: value });
          }}
        />
      </div>
    </>
  );
}

"school",
  "hospital",
  "park",
  "grocery store",
  "mall",
  "milk booth",
  "railway station",
  "railway stop",
  "bus stand",
  "bus terminal",
  "kinder garden",
  "amusement park",
  "resturant";
