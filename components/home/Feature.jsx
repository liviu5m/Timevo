import { faBattery, faDroplet, faLink, faMicrophone, faMusic } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

export default function Feature({size,title, desc, icon, position}) {
  return (
    <div className={`feature flex gap-5 mb-5 items-start w-72 ${position ? "justify-between w-64" : ""} ${size ? "scale-90" : ""} `}>
      {!position && <div className="icon w-10 flex items-start justify-center">
        <FontAwesomeIcon icon={icon} className="icon-feature " size="2xl" />
      </div>}
      <div className="info">
        <h3 className="font-bold text-lg">{title}</h3>
        <p className="mt-1">{desc}</p>
      </div>
      {position && <div className="icon w-10 flex items-center justify-between">
        <FontAwesomeIcon icon={icon} className="icon-feature " size="2xl" />
      </div>}
    </div>
  );
}
