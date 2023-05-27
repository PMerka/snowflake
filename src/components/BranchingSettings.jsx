import React from "react";
import CloseImg from "./close.svg"
import ControlElement from "./ControlElement";

export default function BranchingSettings({index, setting, uppdateSetting, removeSetting}) {
  return (
    <div className="option-box" key={index}>
      <h5>Branching {index + 1}</h5>
      
      
      <div className="controlElements">

      <ControlElement
      index={index} 
      min={0} 
      max={100} 
      symbol={"%"} 
      label={"Length"} 
      setting={setting} 
      uppdateSetting={uppdateSetting}
      />

      <ControlElement
      index={index} 
      min={0} 
      max={100} 
      symbol={"%"} 
      label={"Distance"} 
      setting={setting} 
      uppdateSetting={uppdateSetting}
      />

      <ControlElement
      index={index} 
      min={0} 
      max={179} 
      symbol={"°"} 
      label={"Angle"} 
      setting={setting} 
      uppdateSetting={uppdateSetting}
      />
        <div>
          <button className="close-button" onClick={() => removeSetting(index)}>
            <img style={{ width: 20 }} src={CloseImg} alt="" />
          </button>
        </div>
      </div>
      
    </div>
  );
}
