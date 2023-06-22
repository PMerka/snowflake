import React from "react";
import Add from "assets/add.svg";
import BranchingSettings from "./BranchingSettings";
import styles from './controls.module.css'

export default function Controls({
  settings,
  uppdateSetting,
  addSetting,
  removeSetting,
}) {
  return (
    <div className={styles.mainControls}>
      <h3 className={styles.title}>Settings</h3>
      <div className="option-box-wrapper">
        {settings.map((setting, index) => (
          <BranchingSettings
            key={index}
            index={index}
            setting={setting}
            removeSetting={removeSetting}
            uppdateSetting={uppdateSetting}
          />
        ))}
      </div>

      <button id="add-btn" onClick={() => addSetting()}>
        <img style={{ width: 20 }} src={Add} alt="" />
      </button>
    </div>
  );
}
