import React from "react";

import style from "../../styles/ViewProperty.module.sass";
export default function Floors({ floors }) {
  return (
    <div className={style.floors}>
      {floors.map((floor, key) => {
        return (
          <div className={style.floor} key={key}>
            <div className={style.floorDetails}>
              <p>
                <strong className={style.floorLabel}>Floor No.</strong>
                {floor.floor_number}
              </p>
              <p>
                <strong className={style.floorLabel}>Avaliability</strong>
                {floor.avaliable}
              </p>
              <p>
                <strong className={style.floorLabel}>Condition</strong>
                {floor.condition}
              </p>
              <p>
                <strong className={style.floorLabel}>Floor Size</strong>
                {floor.floor_size}
              </p>
              <p>
                <strong className={style.floorLabel}>Period Of Tenure</strong>
                {floor.period_of_tenure}
              </p>
              <p>
                <strong className={style.floorLabel}>Rate</strong>${floor.rate}
              </p>
              <p>
                <strong className={style.floorLabel}>Purpose</strong>
                {floor.space_use}
              </p>
              <p>
                <strong className={style.floorLabel}>Term</strong>
                {floor.term}
              </p>
            </div>
            <div className={style.Amenities}>
              <h3>Floor Amenities</h3>

              {Array.isArray(floor.amenities) && floor.amenities.length > 0 ? (
                floor.amenities.map((amenity, indexKey) => {
                  return (
                    <p key={indexKey}>
                      {indexKey + 1}. {amenity}
                    </p>
                  );
                })
              ) : (
                <p> Non-Mentioned</p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
