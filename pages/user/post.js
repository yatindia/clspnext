import React, { useState, useEffect } from "react";
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
import style from "../../styles/pages/Post.module.sass";
import ProgressBar from "../../components/support/ProgressBar";

export default function Post() {
  //check Login
  const [theUser, setTheUser] = useRecoilState(user);

  useEffect(() => {
    handleCheckVerified();
    let theUserl = JSON.parse(localStorage.getItem("user"));
    if (!theUserl?.data) {
      window.location.href = "/";
    }
  }, []);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyD1A1aNBxTVVNxtYKRbFWZm9uyWwJVag5E",
  });

  const [property, setProperty] = useState(PropertySchema);

  const handleSubmit = async (e) => {
    if (Array.isArray(property.highlights) && property.highlights < 2) {
      alert("please add at least 2 property high lights");
      return false;
    }
    let photoCheck = property.photos.filter((photo) => {
      if (photo !== undefined) {
        return photo;
      }
    });

    if (photoCheck < 1) {
      alert("The Properties Photo can't be empty");
      return false;
    } else {
      setProperty({ ...property, photos: photoCheck });

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
              parseError += `Please enter:  '${data.replace("_", " ")}' \n`;
            });

            alert(parseError);
          } else {
            alert(res.data.message);
          }
        } else {
          if (e == "premium") {
            axios({
              method: "post",
              url: `${Config.url.payment}/payment/${res.data.data._id}`,
            }).then((res) => {
              window.location.href = res.data.url;
            });
            alert(res.data.message);
          } else {
            alert(res.data.message);
            window.location.href = "/user/myposts";
          }
        }
      });
    }
  };

  const handleCheckVerified = async () => {
    await axios({
      method: "post",
      url: `${Config.url.api}/user/myprofile`,
      headers: {
        Authorization: `<Bearer> ${theUser.data.token}`,
      },
    }).then((res) => {
      console.log(res.data.data.accountVerified);
      if (!res.data.data.accountVerified) {
        alert(
          "Your Account is not verified yet, Only verified accounts are allowed to make post"
        );
        window.location.href = "/user";

        if (confirm("Do you want us to send a reverification link") == true) {
          axios({
            url: `${Config.url.api}/auth/reverification`,
            method: "post",
            headers: { "Content-Type": "application/json" },
            data: { email: datau.email },
          }).then((res) => {
            if (res.data.status) {
              alert("reverification send");
            } else {
              alert("reverification failed to send ");
            }
          });

          window.location.href = "/user";
        } else {
          window.location.href = "/user";
        }
      }
    });
  };

  if (!isLoaded) {
    return <ProgressBar />;
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
      <br />
      <div>
        <p className="text-center bg-color w-50 d-block m-auto text-white pt-2 pb-2">
          Click and drag the red marker in the map to locate your property
        </p>
      </div>
      <br />
      <div className="imageContainer">
        {property.photos.map((photo, index) => {
          return (
            <div key={index}>
              <ImageUpload
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
            </div>
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
            "retail",
            "restaurant",
            "shopping Center",
            "multifamily",
            "health Care",
            "land",
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
          placeholder="Property Video Link (optional)"
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
          type="number"
          formInput={(value) => {
            setProperty({ ...property, zip_code: value });
          }}
        />

        <TextInput
          value={property.year_built}
          placeholder="Year Built"
          type="number"
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
            type="number"
            formInput={(value) => {
              setProperty({ ...property, renovated_year: value });
            }}
          />
        ) : null}
        <TextInput
          value={property.building_size}
          placeholder="Building Size Sq.ft"
          type="number"
          formInput={(value) => {
            setProperty({ ...property, building_size: value });
          }}
        />
        <TextInput
          value={property.lot_size}
          placeholder="Lot Size Sq.ft"
          type="number"
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
        <TextInput
          value={property.price}
          placeholder="$ Price"
          type="number"
          formInput={(value) => {
            setProperty({ ...property, price: value });
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

      <div className={style.submitButtons}>
        <button className="btn btn-info" onClick={() => handleSubmit("post")}>
          Submit Free
        </button>
        <button
          className="btn btn-success"
          onClick={() => handleSubmit("premium")}
        >
          Submit Premium
        </button>
      </div>
    </>
  );
}
