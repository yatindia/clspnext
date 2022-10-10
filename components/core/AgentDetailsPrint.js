import React from "react";
import style from "../../styles/pages/PrintProperty.module.sass";
import Config from "../lib/Config";
import QRCode from "react-qr-code";

export default function AgentDetailsPrint({ agent, propertyId }) {
  return (
    <div className={style.agentContainer}>
      <div className={style.agentQR}>
        <h2>Scan QR</h2>
        <div
          style={{
            height: "auto",
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
      <div className={style.agentPhoto}>
        {agent.profile && agent.profile != "profile" ? (
          <img
            className={style.agentProfile}
            src={`${Config.url.GCP_GC_P_IMG}/${agent.profile}`}
          />
        ) : (
          <img className={style.agentProfile} src="/user.png" />
        )}
      </div>
      <div className={style.agentDetails}>
        <h3>Contact</h3>
        <h4>{agent.name}</h4>
        <h3>{agent.companyName}</h3>

        <p className={style.agentContact}>{agent.phoneNumber}</p>

        <p className={style.agentContact}>{agent.email}</p>
      </div>
    </div>
  );
}
