import React from "react";
import style from "../../styles/pages/PrintProperty.module.sass";
import Config from "../lib/Config";
import Link from "next/link";
import QRCode from "react-qr-code";

export default function AgentDetailsPrint({ agent, propertyId }) {
  return (
    <>
      <div className={style.fullAgent}>
        <div className={style.agent}>
          <div className="d-flex justify-content-center align-items-center">
            {agent.profile && agent.profile != "profile" ? (
              <img
                className={style.agentProfile}
                src={`${Config.url.GCP_GC_P_IMG}/${agent.profile}`}
              />
            ) : (
              <img className={style.agentProfile} src="/user.png" />
            )}

            <div
              style={{
                height: "auto",
                margin: "5%",
                width: "190px",
              }}
            >
              <QRCode
                size={256}
                style={{ height: "auto", width: "100%" }}
                value={`${Config.url.client}/view/property/${propertyId}`}
                viewBox={`0 0 256 256`}
              />
            </div>
          </div>

          <div>
            <h4 className="text-center text-break p-2 pb-0">{agent.name}</h4>
            <h4 className="text-center text-break text-danger">
              {agent.companyName}
            </h4>
          </div>

          <div className="d-flex justify-content-center align-items-center flex-column">
            <Link href={`tel:${agent.phoneNumber}`}>
              <span className={style.agentInfo}>
                <strong>Call: {agent.phoneNumber}</strong>
              </span>
            </Link>
            <Link href={`tel:${agent.email}`}>
              <span className={style.agentInfo}>
                <strong>Emaill: {agent.email}</strong>
              </span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
