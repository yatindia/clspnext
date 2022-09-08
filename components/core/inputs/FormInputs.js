import React, { useState, useEffect } from "react";

export function SelectInput(props) {
  return (
    <div className="formSelectInputContainer">
      <label className="formLabel color" htmlFor="">
        {props.placeholder}
      </label>

      <select
        value={props.value}
        className="formSelectInput"
        onInput={(e) => {
          props.formInput(e.target.value);
        }}
      >
        {typeof props.dataArray[0] != "boolean" ? (
          <option value={""}>Select a {props.placeholder}</option>
        ) : null}

        {props.dataArray.map((info, index) => {
          return (
            <option key={index} value={info}>
              {typeof info == "boolean"
                ? info
                  ? "Yes"
                  : "No"
                : info.toUpperCase()}
            </option>
          );
        })}
      </select>
    </div>
  );
}

export function TextInput({
  placeholder,
  value,
  formInput,
  type = "text",
  disabled = false,
}) {
  return (
    <div className="formInputContainer">
      <label className="formLabel color" htmlFor="">
        {placeholder}
      </label>
      <input
        disabled={disabled}
        type={type}
        value={value}
        className="formInput color"
        onInput={(e) => {
          formInput(e.target.value);
        }}
        placeholder={placeholder}
      />
    </div>
  );
}
export function TextArrayInput(props) {
  const [arrayData, setArrayData] = useState(props.value);
  const [value, setValue] = useState("");
  const handleRemove = (currentPos) => {
    const datum = arrayData;
    arrayData.splice(currentPos, 1);
    console.log(datum);
    setArrayData([...datum]);
  };

  useEffect(() => {
    props.formInput(arrayData);
  }, [arrayData]);
  return (
    <div className="formArrayInputContainer">
      <div className="hightlightsContainer">
        <label className="formLabel color" htmlFor="">
          {props.placeholder}
        </label>
        {arrayData.map((hl, index) => {
          return (
            <div className="hightlights" key={index}>
              <p className="hightlight color">{hl}</p>
              <button
                className="hightlightRemove"
                onClick={() => {
                  handleRemove(index);
                }}
              >
                Remove
              </button>
            </div>
          );
        })}
      </div>

      <div className="controlContainer">
        <input
          value={value}
          className="formArrayInput color"
          placeholder={props.placeholder}
          onInput={(e) => {
            setValue(e.target.value);
          }}
        />
        <button
          className="addButton"
          onClick={() => {
            if (value != "") {
              setArrayData([...arrayData, value]);
              setValue("");
            }
          }}
        >
          Add
        </button>
      </div>
    </div>
  );
}
