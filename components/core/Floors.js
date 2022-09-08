import React from "react";

import style from "../../styles/ViewProperty.module.sass";
export default function Floors({ floors }) {
  return (
    <div className={style.floors}>
      {floors.map((floor, key) => {
        return (
          <div className={style.floor} key={key}>
            <div className={style.floorDetails}>
              <p className="color">
                <strong className={style.floorLabel}>Floor No.</strong>
                {floor.floor_number}
              </p>
              <p className="color">
                <strong className={style.floorLabel}>Avaliability</strong>
                {floor.avaliable}
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
                <strong className={style.floorLabel}>Period Of Tenure</strong>
                {floor.period_of_tenure}
              </p>
              <p className="color">
                <strong className={style.floorLabel}>Rate</strong>${floor.rate}
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
            <div style={{ marginBottom: "10px" }} className={style.Amenities}>
              <h3 className="color">Floor Amenities</h3>

              {Array.isArray(floor.amenities) && floor.amenities.length > 0 ? (
                floor.amenities.map((amenity, indexKey) => {
                  return (
                    <p className="color" key={indexKey}>
                      {indexKey + 1}. {amenity}
                    </p>
                  );
                })
              ) : (
                <p className="color"> Non-Mentioned</p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
