import React from "react";
import Add from "assets/add.svg";
import BranchingSettings from "./BranchingSettings";

export default function Controls({
  settings,
  uppdateSetting,
  addSetting,
  removeSetting,
}) {
  return (
    <div id="settings">
      <h3>Settings</h3>
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
