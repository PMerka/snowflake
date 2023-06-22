import React, { useEffect, useRef, useState } from "react";
import "./App.css";
import Canvas from "./components/Canvas";
import useSettings from "./useSettings";
import Constrols from "./components/Controls";
import { Drawing } from "./logic/snowflakeGenerator";
import { defaultSettings } from "./default_setting";
import Header from "./components/Header";

export default function Home() {
  const canvasRef = useRef(null);
  const draw = useRef(true);
  const [settings, uppdateSetting, addSetting, removeSetting] =
    useSettings(defaultSettings);
  const [status, setStatus] = useState(false);

  const drawNext = async (settings) => {
    await draw.current.update(settings);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    canvasRef.current.width = 8000;
    canvasRef.current.height = 8000;
    const ctx = canvasRef.current.getContext("2d");
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.strokeStyle = "rgba(240, 240, 240, 0.1)";
    ctx.lineWidth = 20;
    draw.current = new Drawing(ctx, 2000, setStatus);
  }, []);

  return (
    <div className="mainApp">
      <Header/>

      <main className="main">
        <Canvas 
          canvasRef={canvasRef} 
          status={status} 
          drawNext={drawNext} 
          settings={settings}
        />

        <Constrols
          settings={settings}
          uppdateSetting={uppdateSetting}
          addSetting={addSetting}
          removeSetting={removeSetting}
        />
        
      </main>
    </div>
  );
}
