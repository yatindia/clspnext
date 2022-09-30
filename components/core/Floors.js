import React, { useState } from "react";

import style from "../../styles/pages/ViewProperty.module.sass";
export default function Floors({ floors }) {
  const [show, setShow] = useState();
  return (
    <div>
      {floors.map((floor, index) => {
        return (
          <div
            className={`card m-0 ${index % 2 == 0 ? "bg-light" : "oddCell"}`}
            key={index}
          >
            <div className="card-header" id={`heading${index}`}>
              <h5 className="mb-0">
                <button
                  className={`btn w-100`}
                  data-bs-bs-toggle="collapse"
                  data-bs-bs-target={`#collapse${index}`}
                  aria-expanded={"true"}
                  aria-controls={`collapse${index}`}
                  onClick={() => {
                    if (index == show) {
                      setShow(null);
                      return false;
                    }

                    setShow(index);
                  }}
                >
                  <span className={`text-danger ${style.mobileIndexTable}`}>
                    <strong>Floor #{floor.floor_number}</strong>
                  </span>
                  <div className={style.table}>
                    <span className="text-danger">
                      <strong>#{floor.floor_number}</strong>
                    </span>

                    <span>
                      <strong>{floor.avaliable}</strong>
                    </span>

                    <span>
                      <strong>{floor.condition}</strong>
                    </span>

                    <span>
                      <strong>{floor.floor_size}</strong>
                    </span>

                    <span>
                      <strong>{floor.period_of_tenure}</strong>
                    </span>

                    <span>
                      <strong>{floor.rate}</strong>
                    </span>

                    <span>
                      <strong>{floor.space_use}</strong>
                    </span>

                    <span>
                      <strong>{floor.term}</strong>
                    </span>

                    <span>
                      <strong className="text-danger">
                        {Array.isArray(floor.amenities) &&
                        floor.amenities.length > 0
                          ? "More"
                          : null}
                      </strong>
                    </span>
                  </div>
                </button>
              </h5>
            </div>

            <div
              id={`collapse${index}`}
              className={parseInt(index) != show ? "collapse" : "collapse show"}
              aria-labelledby={`heading${index}`}
              data-bs-parent="#accordion"
            >
              <div className={`card-body ${style.floor}`}>
                <div className={style.floorDetails}>
                  <p className="color">
                    <strong className={`${style.floorLabel} text-danger`}>
                      Floor No
                    </strong>
                    {floor.floor_number}
                  </p>
                  <p className="color">
                    <strong className={style.floorLabel}>Avaliability</strong>
                    {floor.avaliable ? (
                      <span className="text-success">Yes</span>
                    ) : (
                      <span className="text-danger">No</span>
                    )}
                  </p>
                  <p className="color">
                    <strong className={style.floorLabel}>Condition</strong>
                    {floor.condition}
                  </p>
                  <p className="color">
                    <strong className={style.floorLabel}>Floor Size</strong>
                    {floor.floor_size}
                  </p>
                  <p className="color">
                    <strong className={style.floorLabel}>
                      Period Of Tenure
                    </strong>
                    {floor.period_of_tenure}
                  </p>
                  <p className="color">
                    <strong className={style.floorLabel}>Rate</strong>$
                    {floor.rate}
                  </p>
                  <p className="color">
                    <strong className={style.floorLabel}>Purpose</strong>
                    {floor.space_use}
                  </p>
                  <p className="color">
                    <strong className={style.floorLabel}>Term</strong>
                    {floor.term}
                  </p>
                </div>

                <div
                  style={{ marginBottom: "10px" }}
                  className={style.Amenities}
                >
                  <h3 className="color mt-3 ml-2">Amenities</h3>

                  {Array.isArray(floor.amenities) &&
                  floor.amenities.length > 0 ? (
                    floor.amenities.map((amenity, indexKey) => {
                      return (
                        <p
                          className={`color ${style.floorAmenity}`}
                          key={indexKey}
                        >
                          {indexKey + 1}. {amenity}
                        </p>
                      );
                    })
                  ) : (
                    <p className={`color ${style.floorAmenity}`}>
                      {" "}
                      Non-Mentioned
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
