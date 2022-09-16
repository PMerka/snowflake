import React, { useEffect, useRef, useState } from "react"
import './App.css'
import Canvas from "./components/Canvas"
import useSettings from "./useSettings"
import {Drawing, Rotation} from "./logic/snowflakeGenerator"

const defaultSettings = [
    {
      angle: 360 / 6,
      rotationP: new Rotation(Math.PI * 2 / 6),
      rotationN: new Rotation(-Math.PI * 2 / 6),
      distance: 12,
      length: 66
    },
    {
      angle: 360 / 20,
      rotationP: new Rotation(Math.PI * 2 / 20),
      rotationN: new Rotation(-Math.PI * 2 / 20),
      distance: 100,
      length: 20
    },
    {
      angle: 360 / 20,
      rotationP: new Rotation(Math.PI * 2 / 25),
      rotationN: new Rotation(-Math.PI * 2 / 25),
      distance: 66,
      length: 33
    }
  ]

export default function Home() {
  const canvasRef = useRef(null);
  const draw = useRef(true); 
  const [settings, uppdateSetting, addSetting, removeSetting] = useSettings(defaultSettings)
  const [status, setStatus] = useState(0)

  const drawNext = async (settings) => {
      const resp = await draw.current.update(settings)
  }

  const fullScreen = () => {
    canvasRef.current.requestFullscreen();
  };

  useEffect(() => {
    const canvas = canvasRef.current
    canvasRef.current.width = 8000;
    canvasRef.current.height = 8000;
    const ctx = canvasRef.current.getContext('2d');
    ctx.translate(canvas.width/2, canvas.height/2)
    ctx.strokeStyle = "rgba(240, 240, 240, 0.1)";
    ctx.lineWidth = 10;
    draw.current = new Drawing(ctx, 1600, setStatus);
    draw.current.update(settings)
  }, [])

  return (
  <div  className="main">
    <div onClick={() => drawNext(settings)}>
      <Canvas canvasRef={canvasRef}></Canvas>
      <button id="fullscrean" onClick={() => fullScreen()}>full</button>
    </div>
    
    
    <div id="settings">
      {String(status)} <br />
      {settings.map((setting, index) => {
        return(
          <div >
            {index}
            <label>Length</label>
            <input value={setting.length} step={1} type="range" min={0} max={100} onChange={(e) => uppdateSetting(index, "length", e.target.value)} />
            <input type="number" value={setting.length} step={1} min={0} max={100} onChange={(e) => uppdateSetting(index, "length", e.target.value)}/>
            
            <label>Distance</label>
            <input value={setting.distance} step={1} type="range" min={0} max={100} onChange={(e) => uppdateSetting(index, "distance", e.target.value)}/>
            <input type="number" value={setting.distance} step={1} min={0} max={100} onChange={(e) => uppdateSetting(index, "distance", e.target.value)}/>

            <input value={setting.angle} type="range" min={1} max={179} onChange={(e) => uppdateSetting(index, "angle", e.target.value)} />
            <button onClick={() => removeSetting(index)}>-</button>
          </div>) 
      })}
      <button onClick={() => addSetting()}>+</button>
    </div>
  </div>)
}
