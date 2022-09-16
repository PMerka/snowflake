import { useState } from "react";
import {Rotation} from "./logic/snowflakeGenerator"

export default function useSettings(defaultSettings){
    const [settings, setSetting] = useState(defaultSettings)

    const uppdateSetting = (index, property, value) => {  
        if(! (property in settings[index])){
          console.error("Given property is not key of object.")
          return;
        }
        let newSettings = settings.map(setting => {
          return {...setting}
        })
        console.log(newSettings, index, newSettings[index])
        
        if(property === "angle"){
          newSettings[index].rotationP = new Rotation(Math.PI * 2 * value/360)
          newSettings[index].rotationN = new Rotation(-Math.PI * 2 * value/360)
        }
        else{
            if (value<0){
                newSettings[index][property] = 0
                return
            }
            if (value>100){
                newSettings[index][property] = 100
                return
                console.log("BIG")
            }
            newSettings[index][property] = value
        }
        
        console.log(newSettings)
        setSetting(newSettings)
      }
    
      const addSetting = () => {
        const defaultSetting = {
          angle: 360 / 6,
          rotationP: new Rotation(Math.PI * 2 / 6),
          rotationN: new Rotation(-Math.PI * 2 / 6),
          distance: 1/6,
          length: 4/6
        }
        let newSettings = settings.map(setting => {
          return {...setting}
        })
        newSettings.push(defaultSetting)
        console.log(newSettings)
        setSetting(newSettings)
      }
    
      const removeSetting = (index) => {
        let newSettings = settings.map(setting => {
          return {...setting}
        })
        newSettings.splice(index, 1)
        setSetting(newSettings)
      }
   
      return [settings, uppdateSetting, addSetting, removeSetting]
}