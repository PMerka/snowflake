import { useState } from "react";
import { Rotation } from "./logic/snowflakeGenerator";

export default function useSettings(defaultSettings) {
  const [settings, setSetting] = useState(defaultSettings);

  const uppdateSetting = (index, property, value) => {
    if (!(property in settings[index])) {
      console.error("Given property does not exist.");
      return;
    }
    //creates copy of current state
    let newSettings = settings.map((setting) => {
      return { ...setting };
    });

    console.log(newSettings, index, newSettings[index]);

    if (property === "angle") {
      newSettings[index].rotationP = new Rotation((Math.PI * 2 * value) / 360);
      newSettings[index].rotationN = new Rotation((-Math.PI * 2 * value) / 360);
      newSettings[index].angle = value;
    } else {
      if (value < 0) {
        newSettings[index][property] = 0;
        return;
      }
      if (value > 100) {
        newSettings[index][property] = 100;
        return;
      }
      newSettings[index][property] = value;
    }

    console.log(newSettings);
    setSetting(newSettings);
  };

  const addSetting = () => {
    let angle = 180 * Math.random();
    let distance = 100 * Math.random();
    let length = 100 * Math.random();
    const defaultSetting = {
      angle: angle,
      rotationP: new Rotation(angle),
      rotationN: new Rotation(-angle),
      distance: distance,
      length: length,
    };
    let newSettings = settings.map((setting) => {
      return { ...setting };
    });
    newSettings.push(defaultSetting);
    console.log(newSettings);
    setSetting(newSettings);
  };

  const removeSetting = (index) => {
    let newSettings = settings.map((setting) => {
      return { ...setting };
    });
    newSettings.splice(index, 1);
    setSetting(newSettings);
  };

  return [settings, uppdateSetting, addSetting, removeSetting];
}
