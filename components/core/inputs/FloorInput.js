import React, { useState, useEffect } from "react";
import { SelectInput, TextArrayInput, TextInput } from "../inputs/FormInputs";
import style from "../../../styles/FloorInput.module.sass";

export default function FloorInput(props) {
  const [floor, setFloor] = useState(props.value);

  useEffect(() => {
    props.formInput(floor);
  }, [floor]);
  return (
    <div className={style.floorContainer}>
      <TextInput
        placeholder="Floor Number"
        value={floor.floor_number}
        formInput={(value) => {
          setFloor({ ...floor, floor_number: value });
        }}
      />
      <TextInput
        type="number"
        placeholder="Floor Size Sq.ft"
        value={floor.floor_size}
        formInput={(value) => {
          setFloor({ ...floor, floor_size: value });
        }}
      />
      <SelectInput
        value={floor.term}
        placeholder="Term"
        dataArray={["negotiable", "non-negotiable"]}
        formInput={(value) => {
          setFloor({
            ...floor,
            term: value,
          });
        }}
      />
      <TextInput
        type="number"
        placeholder="Rate"
        value={floor.rate}
        formInput={(value) => {
          setFloor({ ...floor, rate: value });
        }}
      />

      <SelectInput
        value={floor.space_use}
        placeholder="Purpose"
        dataArray={[
          "office",
          "personal",
          "medical",
          "industrial",
          "multipurpose",
        ]}
        formInput={(value) => {
          setFloor({ ...floor, space_use: value });
        }}
      />
      <SelectInput
        value={floor.condition}
        placeholder="Condition"
        dataArray={[
          "partially built",
          "needs renovation",
          "under renovation",
          "ready to use",
        ]}
        formInput={(value) => {
          setFloor({ setFloor, condition: value });
        }}
      />

      <TextInput
        type="number"
        placeholder="Period Of Tenure"
        value={floor.period_of_tenure}
        formInput={(value) => {
          setFloor({ ...floor, period_of_tenure: value });
        }}
      />

      <SelectInput
        value={floor.avaliable}
        placeholder="Avaliable"
        dataArray={[true, false]}
        formInput={(value) => {
          setFloor({
            ...floor,
            avaliable: value,
          });
        }}
      />

      <TextArrayInput
        placeholder="Amenities"
        value={floor.amenities}
        formInput={(value) => {
          setFloor({ ...floor, amenities: value });
        }}
      />
    </div>
  );
}
