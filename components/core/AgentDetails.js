import React, { useEffect } from "react";
import style from "../../styles/pages/ViewProperty.module.sass";
import Config from "../lib/Config";
import { user } from "../core/Atoms";
import { useRecoilState } from "recoil";
import Link from "next/link";

export default function AgentDetails({ agent }) {
  const [theUser, setTheUser] = useRecoilState(user);

  console.log(agent.profile);
  // if (theUser.status == "NOLG") {
  //   return (
  //     <div className={style.plsLogin}>
  //       <h2 className={style.plsLoginText}>Please Login</h2>
  //       <Link href={"/auth/login"}>
  //         <a className={style.plsLoginText}>To View The details</a>
  //       </Link>
  //     </div>
  //   );
  // } avatar-1.jpeg

  return (
    <div className={style.fullAgent}>
      <div
        className={style.agentProfile}
        style={{
          backgroundImage:
            agent.profile && agent.profile != "profile"
              ? `url(${Config.url.GCP_GC_P_IMG}/${agent.profile})`
              : "url(/user.png)",
        }}
      ></div>
      <h3 className="text-center text-break p-2">{agent.name}</h3>
      <div className={style.agent}>
        <Link href={`tel:${agent.phoneNumber}`}>
          <a className={style.agentInfo}>
            <img className={style.agentBtnIcon} src="/icons/telephone.png" />
            <strong>{agent.phoneNumber}</strong>
          </a>
        </Link>
        <Link href={`tel:${agent.email}`}>
          <a className={style.agentInfo}>
            <img className={style.agentBtnIcon} src="/icons/email.png" />
            <strong>{agent.email}</strong>
          </a>
        </Link>
      </div>
    </div>
  );
}
