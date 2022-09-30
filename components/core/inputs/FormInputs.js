import React, { useState, useEffect } from "react";
import { v4 } from "uuid";
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
  dataList = [],
}) {
  const [id, setid] = useState(v4());
  return (
    <div className="formInputContainer">
      <label className="formLabel color" htmlFor="">
        {placeholder}
      </label>
      <input
        autocomplete="off"
        list={id}
        disabled={disabled}
        type={type}
        value={value}
        className="formInput color"
        onInput={(e) => {
          formInput(e.target.value);
        }}
        placeholder={placeholder}
      />

      {Array.isArray(dataList) && dataList.length > 0 ? (
        <datalist id={id}>
          {dataList.map((data, index) => {
            return (
              <option key={index} value={data}>
                {data}
              </option>
            );
          })}
        </datalist>
      ) : null}
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

export function Text2DArrayInput(props) {
  const [arrayData, setArrayData] = useState(props.value);
  const [value, setValue] = useState({ amenity: "", distance: 0 });

  const handleRemove = (currentPos) => {
    const datum = arrayData;
    arrayData.splice(currentPos, 1);
    console.log(datum);
    setArrayData([...datum]);
  };

  useEffect(() => {
    props.formInput(arrayData);
  }, [arrayData]);

  const handleAddAmenity = () => {
    if (value.amenity == "") {
      alert("Amenity Field Can't Be Empty");
      return false;
    }
    if (value.distance == "") {
      alert("Distance Field Can't Be Empty");
      return false;
    }

    setArrayData([...arrayData, value]);
    setValue({ amenity: "", distance: 0 });
  };
  return (
    <div className="form2DArrayInput">
      <div className="form2DArrayOutput">
        {Array.isArray(arrayData) && arrayData.length > 0
          ? arrayData.map((data, index) => {
              return (
                <div
                  title="Click To remove"
                  className="form2DArrayInputContainer"
                >
                  <p className="f2damenity">{data.amenity}</p>
                  <p className="f2ddistance">{data.distance}</p>

                  <div
                    onClick={() => handleRemove(index)}
                    className="clickToRemove"
                  >
                    <p className="p-1 m-0 text-white">Click To Remove</p>
                  </div>
                </div>
              );
            })
          : null}

        <div className="form2DArrayInputControlContainer mt-5">
          <div className="form2DArrayInputControlContainerInputContainer">
            <label>
              <strong>The Amenity</strong>
            </label>
            <input
              className="form2DArrayInputControlContainerInput"
              value={value.amenity}
              onInput={(e) => {
                setValue({ ...value, amenity: e.target.value });
              }}
            />
          </div>

          <div className="form2DArrayInputControlContainerInputContainer">
            <label>
              <strong>Distance</strong>
            </label>
            <input
              className="form2DArrayInputControlContainerInput"
              value={value.distance}
              type="number"
              onInput={(e) => {
                setValue({ ...value, distance: e.target.value });
              }}
            />
          </div>

          <button
            className="form2DArrayInputControlContainerButton"
            onClick={handleAddAmenity}
          >
            Add Nearby Ammenity
          </button>
        </div>
      </div>
    </div>
  );
}
