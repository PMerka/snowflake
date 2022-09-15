import React, { useEffect, useRef, useState } from "react"
import './App.css'
import Canvas from "./components/Canvas"
import {Drawing, Rotation} from "./logic/snowflakeGenerator"

export default function Home() {
  const canvasRef = useRef(null);
  const draw = useRef(true); 
  const [computing, setComputing] = useState(0)
  const [settings, setSetting] = useState([
    {
      angle: 360 / 6,
      rotationP: new Rotation(Math.PI * 2 / 6),
      rotationN: new Rotation(-Math.PI * 2 / 6),
      distance: 1/6,
      length: 4/6
    },
    {
      angle: 360 / 20,
      rotationP: new Rotation(Math.PI * 2 / 20),
      rotationN: new Rotation(-Math.PI * 2 / 20),
      distance: 6/6,
      length: 1/5
    },
    {
      angle: 360 / 20,
      rotationP: new Rotation(Math.PI * 2 / 25),
      rotationN: new Rotation(-Math.PI * 2 / 25),
      distance: 4/6,
      length: 2/6
    }
  ])
  const [active, setActive] = useState(1)

  const drawNext = (settings) => {
    if (active){
      setActive(0)
      const t1 = performance.now()
      const resp = draw.current.update(settings)
      const t2 = performance.now()
      console.log(resp)
      setComputing(t2-t1)
    }
    setActive(1)
  }

  const fullScreen = () => {
 
    canvasRef.current.requestFullscreen();
  };
  
  //index, newAngle, newDistance, newLength
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
    newSettings[index][property] = value
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

  useEffect(() => {
    const canvas = canvasRef.current
    canvasRef.current.width = 2000;
    canvasRef.current.height = 2000;
    const ctx = canvasRef.current.getContext('2d');
    ctx.translate(canvas.width/2, canvas.height/2)
    ctx.strokeStyle = "rgba(240, 240, 240, 0.1)";
    ctx.lineWidth = 10;
    draw.current = new Drawing(ctx, 400);
    draw.current.update(settings)

  }, [])
  return (
  <div  className="main">
    <div onClick={() => drawNext(settings)}>
      <Canvas canvasRef={canvasRef}></Canvas>
      <button id="fullscrean" onClick={() => fullScreen()}>full</button>
    </div>
    
    
    <div id="settings">
      {active} <br />
      {computing}
      {settings.map((setting, index) => {
        return(
          <div >
            {index}
            <input value={setting.length} step={0.01} type="range" min={0} max={1} onChange={(e) => uppdateSetting(index, "length", e.target.value)} />
            <input value={setting.distance} step={0.01} type="range" min={0} max={1} onChange={(e) => uppdateSetting(index, "distance", e.target.value)} />
            <input value={setting.angle} type="range" min={1} max={179} onChange={(e) => uppdateSetting(index, "angle", e.target.value)} />
            <button onClick={() => removeSetting(index)}>-</button>
          </div>) 
      })}
      <button onClick={() => addSetting()}>+</button>
    </div>
  </div>)
}
