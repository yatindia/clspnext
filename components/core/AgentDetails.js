import React, { useEffect } from "react";
import style from "../../styles/ViewProperty.module.sass";
import Config from "../lib/Config";
import { user } from "../core/Atoms";
import { useRecoilState } from "recoil";
import Link from "next/link";

export default function AgentDetails({ agent }) {
  const [theUser, setTheUser] = useRecoilState(user);
  console.log(theUser);

  if (theUser.status == "NOLG") {
    return (
      <div className={style.plsLogin}>
        <h2 className={style.plsLoginText}>Please Login</h2>
        <Link href={"/auth/login"}>
          <a className={style.plsLoginText}>To View The details</a>
        </Link>
      </div>
    );
  }

  return (
    <div className={style.fullAgent}>
      <div
        className={style.profile}
        style={{
          backgroundImage: `url(${Config.url.GCP_GC_P_IMG}/${agent.profile})`,
        }}
      ></div>
      <h3 className="text-center">Agent / Owner Details</h3>
      <div className={style.agent}>
        {Object.entries(agent).map((data, index) => {
          if (
            data[0] == "gps" ||
            data[0] == "accountVerified" ||
            data[0] == "mobileVerified" ||
            data[0] == "favouriteProperties" ||
            data[0] == "properties" ||
            data[0] == "status" ||
            data[0] == "profile" ||
            data[0] == "__v" ||
            data[0] == "_id"
          ) {
            return null;
          }
          return (
            <p key={index} className={style.agentInfo}>
              <strong className={style.agentLabel}>
                {data[0].replace("_", " ").toUpperCase()}
              </strong>
              <br />
              {data[1]}
            </p>
          );
        })}
      </div>
    </div>
  );
}
