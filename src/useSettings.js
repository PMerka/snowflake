import { useState } from "react";
import Rotation from "./logic/rotation";


export default function useSettings(defaultSettings) {
  const [settings, setSetting] = useState(defaultSettings);

  const uppdateSetting = (index, property, value) => {
    console.log("RUN", typeof(value) )
    
    value = Number(value)
    console.log(value)
    if(value<0){
      value = 0
    }

    const propertyClean = property.toLowerCase()
    if (!(propertyClean in settings[index])) {
      console.error("Given property does not exist.");
      return;
    }
    //creates copy of current state
    let newSettings = settings.map((setting) => {
      return { ...setting };
    });

    if (propertyClean === "angle") {
      if (value > 179){
        value = 179
      }
      newSettings[index].rotationP = new Rotation((Math.PI * 2 * value) / 360);
      newSettings[index].rotationN = new Rotation((-Math.PI * 2 * value) / 360);
      newSettings[index].angle = value;
    } else {
      if (value > 100) {
        value = 99
      }
      newSettings[index][propertyClean] = value;
    }

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
