import React, { useState } from "react";
import PropertySchema, {
  floorSchema,
} from "../../components/lib/PropertySchema";
import { useJsApiLoader, GoogleMap, MarkerF } from "@react-google-maps/api";
import Config from "../../components/lib/Config";
import axios from "axios";
import {
  TextInput,
  SelectInput,
  TextArrayInput,
} from "../../components/core/inputs/FormInputs";
import FloorInput from "../../components/core/inputs/FloorInput";
import ImageUpload from "../../components/core/inputs/ImageUpload";
import { user } from "../../components/core/Atoms";
import { useRecoilState } from "recoil";
import State from "../../components/lib/USStates";
import style from "../../styles/Post.module.sass";

export default function Post() {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyD1A1aNBxTVVNxtYKRbFWZm9uyWwJVag5E",
  });

  const [theUser, setTheUser] = useRecoilState(user);

  const [property, setProperty] = useState(PropertySchema);

  const handleSubmit = async (e) => {
    if (property.photos.length < 1) {
      alert("The Porperties Photo can't be empty");
      return false;
    } else {
      axios({
        method: "post",
        url: `${Config.url.api}/property/create`,
        headers: {
          Authorization: `<Bearer> ${theUser.token || theUser.data.token}`,
          "Content-Type": "application/json",
        },
        data: { property },
      }).then((res) => {
        if (!res.data.status) {
          if (res.data.errorMessage.includes("ValidationError:", 0)) {
            let message = res.data.errorMessage.match(
              /(?<=`)[^`]+(?=`(?:[^`]*`[^`]*`)*[^`]*$)/g
            );
            let parseError = "";

            message.map((data) => {
              console.log(data);
              parseError += `Please enter:  '${data.replace("_", " ")}' \n`;
            });

            alert(parseError);
          } else {
            alert(res.data.message);
          }
        } else {
          axios({
            method: "post",
            url: `${Config.url.payment}/payment/${res.data.data._id}`,
          }).then((res) => {
            window.location.href = res.data.url;
          });
          alert(res.data.message);
        }
      });
    }
  };

  if (!isLoaded) {
    return <div>loading</div>;
  }

  return (
    <>
      <GoogleMap
        onClick={(e) => {
          setProperty({
            ...property,
            gps: {
              lat: e.latLng.lat(),
              lng: e.latLng.lng(),
            },
          });
        }}
        center={property.gps}
        zoom={5}
        mapContainerStyle={{ width: "100vw", height: "40vh" }}
      >
        <MarkerF
          draggable={true}
          onDragEnd={(e) => {
            setProperty({
              ...property,
              gps: {
                lat: e.latLng.lat(),
                lng: e.latLng.lng(),
              },
            });
          }}
          position={property.gps}
        />
      </GoogleMap>

      <button
        className={style.addFloorButton}
        onClick={() => {
          setProperty({
            ...property,
            photos: [...property.photos, ""],
          });
        }}
      >
        Add Images
      </button>
      <div className="imageContainer">
        {property.photos.map((photo, index) => {
          return (
            <div key={index}>
              <ImageUpload
                value={photo}
                onDelete={() => {
                  let ims = property.photos;
                  ims.splice(index, 1);
                  console.log(ims);
                  setProperty({
                    ...property,
                    photos: ims,
                  });
                }}
                formInput={(value) => {
                  let newProperty = property;
                  property.photos[index] = value;
                  setProperty(() => newProperty);
                }}
              />
            </div>
          );
        })}
      </div>

      <div className={`${style.textInputContainer}`}>
        <TextInput
          placeholder="Property Title"
          value={property.title}
          formInput={(value) => {
            setProperty({ ...property, title: value });
          }}
        />
        <SelectInput
          value={property.type}
          placeholder="Property Type"
          dataArray={["building", "condo", "land"]}
          formInput={(value) => {
            setProperty({ ...property, type: value });
          }}
        />
        <SelectInput
          value={property.space_use}
          placeholder="Property Purpose"
          dataArray={[
            "office",
            "personal",
            "medical",
            "industrial",
            "multipurpose",
          ]}
          formInput={(value) => {
            setProperty({ ...property, space_use: value });
          }}
        />
        <SelectInput
          value={property.for}
          placeholder="Property Is For"
          dataArray={["lease", "sale"]}
          formInput={(value) => {
            setProperty({ ...property, for: value });
          }}
        />
        <TextInput
          placeholder="Youtube Video Link"
          value={property.video}
          formInput={(value) => {
            setProperty({ ...property, video: value });
          }}
        />
        <TextInput
          value={property.address_1}
          placeholder="Address 1"
          formInput={(value) => {
            setProperty({ ...property, address_1: value });
          }}
        />
        <TextInput
          value={property.address_2}
          placeholder="Address 2"
          formInput={(value) => {
            setProperty({ ...property, address_2: value });
          }}
        />

        <SelectInput
          value={property.country}
          placeholder="Country"
          dataArray={["us"]}
          formInput={(value) => {
            setProperty({ ...property, country: value });
          }}
        />
        <SelectInput
          value={property.state}
          placeholder="State"
          dataArray={State}
          formInput={(value) => {
            setProperty({ ...property, state: value });
          }}
        />
        <TextInput
          value={property.city}
          placeholder="City"
          formInput={(value) => {
            setProperty({ ...property, city: value });
          }}
        />
        <TextInput
          value={property.zip_code}
          placeholder="Zip Code"
          formInput={(value) => {
            setProperty({ ...property, zip_code: value });
          }}
        />

        <TextInput
          value={property.year_built}
          placeholder="Year Built"
          formInput={(value) => {
            setProperty({ ...property, year_built: value });
          }}
        />
        <SelectInput
          value={property.renovated}
          placeholder="Is Renovated"
          dataArray={[true, false]}
          formInput={(value) => {
            setProperty({
              ...property,
              renovated: value == "true" ? true : false,
            });
          }}
        />
        {property.renovated ? (
          <TextInput
            value={property.renovated_year}
            placeholder="Year Renovated"
            formInput={(value) => {
              setProperty({ ...property, renovated_year: value });
            }}
          />
        ) : null}
        <TextInput
          value={property.building_size}
          placeholder="Building Size"
          formInput={(value) => {
            setProperty({ ...property, building_size: value });
          }}
        />
        <TextInput
          value={property.lot_size}
          placeholder="Lot Size"
          formInput={(value) => {
            setProperty({ ...property, lot_size: value });
          }}
        />

        <SelectInput
          value={property.construction_type}
          placeholder="Construction Type"
          dataArray={["concrete", "wood", "metal"]}
          formInput={(value) => {
            setProperty({
              ...property,
              construction_type: value,
            });
          }}
        />
        <SelectInput
          value={property.sewer}
          placeholder="Sewer"
          dataArray={["city", "self"]}
          formInput={(value) => {
            setProperty({
              ...property,
              sewer: value,
            });
          }}
        />
        <SelectInput
          value={property.electricity}
          placeholder="Electricity"
          dataArray={["commercial", "domestic"]}
          formInput={(value) => {
            setProperty({
              ...property,
              electricity: value,
            });
          }}
        />
        <TextInput
          value={property.zoning}
          placeholder="Zoning"
          formInput={(value) => {
            setProperty({ ...property, zoning: value });
          }}
        />
      </div>

      <TextArrayInput
        placeholder="Hightlights"
        value={property.highlights}
        formInput={(value) => {
          setProperty({ ...property, highlights: value });
        }}
      />

      <div>
        {property.floors.map(function (floor, index) {
          return (
            <div key={index} className="theFloorContainer">
              <FloorInput
                value={floor}
                arrayIndex={index}
                formInput={(value) => {
                  let floorCollection = property.floors;
                  floorCollection[index] = value;
                  setProperty({ ...property, floors: floorCollection });
                }}
              />
              <button
                className={style.floorRemoveButton}
                onClick={() => {
                  let theProperty = [...property.floors];

                  theProperty.splice(index, 1);
                  console.log(theProperty, index);

                  setProperty((oldProperty) => {
                    return { ...oldProperty, floors: [...theProperty] };
                  });
                }}
              >
                Remove
              </button>
            </div>
          );
        })}
      </div>

      <button
        className={style.addFloorButton}
        onClick={() => {
          setProperty({
            ...property,
            floors: [...property.floors, floorSchema],
          });
        }}
      >
        Add Floors
      </button>

      <div className={style.submitButtons}>
        <button className="btn btn-info" onClick={() => handleSubmit("post")}>
          Submit
        </button>
        <button
          className="btn btn-success"
          onClick={() => handleSubmit("premium")}
        >
          Premium
        </button>
      </div>
    </>
  );
}
