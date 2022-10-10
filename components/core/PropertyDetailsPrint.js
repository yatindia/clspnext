import React from "react";
import AgentDetails from "./AgentDetailsPrint";
import style from "../../styles/pages/PrintProperty.module.sass";

export default function PropertyDetails({ property, agent }) {
  return (
    <div className={style.fullDetail}>
      <div>
        <h3>Property Facts</h3>
        <div className={style.property}>
          {Object.entries(property).map((data, index) => {
            if (
              data[0] == "gps" ||
              data[0] == "uid" ||
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
              data[0] == "liked" ||
              data[0] == "status" ||
              data[0] == "nearby" ||
              data[0] == "address_1" ||
              data[0] == "address_2" ||
              data[0] == "city" ||
              data[0] == "_id"
            ) {
              return null;
            }

            if (data[1] == "") {
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
                {data[0] == "price" ? "$" : null}
                {data[1]}
              </p>
            );
          })}
        </div>
      </div>
      <AgentDetails propertyId={property.uid} agent={agent} />
    </div>
  );
}
