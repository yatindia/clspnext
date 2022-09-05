import React from "react";
import AgentDetails from "./AgentDetails";
import style from "../../styles/ViewProperty.module.sass";

export default function PropertyDetails({ property, agent }) {
  return (
    <div className={style.fullDetail}>
      <div className={style.property}>
        {Object.entries(property).map((data, index) => {
          if (
            data[0] == "gps" ||
            data[0] == "photos" ||
            data[0] == "__v" ||
            data[0] == "isPro" ||
            data[0] == "owner" ||
            data[0] == "floors" ||
            data[0] == "highlights" ||
            data[0] == "featured" ||
            data[0] == "importance" ||
            data[0] == "video" ||
            data[0] == "creationDate" ||
            data[0] == "renovated" ||
            data[0] == "_id"
          ) {
            return null;
          }

          if (data[0] == "renovated_year") {
            if (property.renovated) {
              return (
                <p key={index} className={style.info}>
                  <strong className={style.label}>
                    {data[0].replace("_", " ").toUpperCase()}
                  </strong>
                  <br />
                  {data[1]}
                </p>
              );
            } else {
              return null;
            }
          }
          return (
            <p key={index} className={style.info}>
              <strong className={style.label}>
                {data[0].replace("_", " ").toUpperCase()}
              </strong>
              <br />
              {data[1]}
            </p>
          );
        })}
      </div>
      <AgentDetails agent={agent} />
    </div>
  );
}