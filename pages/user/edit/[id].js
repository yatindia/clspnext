import React, { useState, useEffect } from "react";
import PropertySchema, {
  floorSchema,
  nearbySchema,
} from "../../../components/lib/PropertySchema";
import { useJsApiLoader, GoogleMap, MarkerF } from "@react-google-maps/api";
import Config from "../../../components/lib/Config";
import axios from "axios";
import {
  TextInput,
  SelectInput,
  TextArrayInput,
  Text2DArrayInput,
} from "../../../components/core/inputs/FormInputs";
import FloorInput from "../../../components/core/inputs/FloorInput";
import NearbyInput from "../../../components/core/inputs/NearbyInput";
import ImageUpload from "../../../components/core/inputs/ImageUpload";
import { user } from "../../../components/core/Atoms";
import { useRecoilState } from "recoil";
import { useRouter } from "next/router";
import State from "../../../components/lib/USStates";
import style from "../../../styles/pages/Post.module.sass";

export default function EditProperty() {
  //check Login
  useEffect(() => {
    let theUser = JSON.parse(localStorage.getItem("user"));
    if (!theUser?.data) {
      window.location.href = "/";
    }
  }, []);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyD1A1aNBxTVVNxtYKRbFWZm9uyWwJVag5E",
  });

  const [theUser, setTheUser] = useRecoilState(user);
  const [property, setProperty] = useState({});
  const router = useRouter();

  useEffect(() => {
    if (theUser.status === true && router.isReady) {
      loadData(theUser.data.token, router.query.id);
    }
    //

    return () => {};
  }, [theUser, router.isReady]);

  const handleSubmit = async () => {
    if (property.photos.length < 1) {
      alert("The Porperties Photo can't be empty");
      return false;
    } else {
      axios({
        method: "put",
        url: `${Config.url.api}/property/${property._id}`,
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
              parseError += `Please enter:  '${data.replace("_", " ")}' \n`;
            });

            alert(parseError);
          } else {
            alert(res.data.message);
          }
        } else {
          alert(res.data.message);
        }
      });
    }
  };

  const loadData = async (token, id) => {
    await axios({
      method: "get",
      url: `${Config.url.api}/property/post/${id}`,
      headers: {
        Authorization: `<Bearer> ${token}`,
      },
    }).then((res) => {
      setProperty({ ...res.data.data });
    });
  };

  if (!isLoaded) {
    return <div>loading</div>;
  }

  if (property == {}) {
    return <div>loading</div>;
  }
  if (property && property.photos) {
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
              <ImageUpload
                key={index}
                value={photo}
                onDelete={() => {
                  let ims = property.photos;
                  ims.splice(index, 1);
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
            );
          })}

          <div className="singleImage">
            <div className="file">
              <button
                style={{
                  height: "30px",
                  aspectRatio: 1,
                  display: "flex",
                  justifyContent: "center",
                  backgroundColor: "#14213D",
                  border: "none",
                  color: "#fff",
                }}
                onClick={() => {
                  setProperty({
                    ...property,
                    photos: [...property.photos, ""],
                  });
                }}
              >
                +
              </button>
            </div>
          </div>
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
            type="number"
            placeholder="Zip Code"
            formInput={(value) => {
              setProperty({ ...property, zip_code: value });
            }}
          />

          <TextInput
            type="number"
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
              type="number"
              value={property.renovated_year}
              placeholder="Year Renovated"
              formInput={(value) => {
                setProperty({ ...property, renovated_year: value });
              }}
            />
          ) : null}
          <TextInput
            value={property.building_size}
            type="number"
            placeholder="Building Size"
            formInput={(value) => {
              setProperty({ ...property, building_size: value });
            }}
          />
          <TextInput
            value={property.lot_size}
            type="number"
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

        <Text2DArrayInput
          placeholder="Hightlights"
          value={property.nearby}
          formInput={(value) => {
            setProperty({ ...property, nearby: value });
          }}
        />

        <div className={style.submitButtons}>
          <button className="btn btn-info" onClick={() => handleSubmit()}>
            Update
          </button>
        </div>
      </>
    );
  }
}
