import React from "react";
import CloseImg from "assets/close.svg"
import ControlElement from "./ControlElement";
import styles from './branchingSettings.module.css'

export default function BranchingSettings({index, setting, uppdateSetting, removeSetting}) {
  return (
    <div className={styles.optionBox} key={index}>
      <h5 className={styles.title}>Branching {index + 1}</h5>
      
      
      <div className={styles.controlElements}>

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

      </div>
                
      <button className="close-button" onClick={() => removeSetting(index)}>
        <img style={{ width: 20 }} src={CloseImg} alt="" />
      </button>
    </div>
  );
}
