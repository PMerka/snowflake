import React, { useEffect, useRef, useState } from "react";
import "./App.css";
import Canvas from "./components/Canvas";
import useSettings from "./useSettings";
import Constrols from "./components/Constrols";
import PlayImg from "./components/play.svg";
import Full from "./components/fullscrean.svg";
import { Drawing } from "./logic/snowflakeGenerator";
import { defaultSettings } from "./default_setting";

export default function Home() {
  const canvasRef = useRef(null);
  const draw = useRef(true);
  const [settings, uppdateSetting, addSetting, removeSetting] =
    useSettings(defaultSettings);
  const [status, setStatus] = useState(false);

  const drawNext = async (settings) => {
    await draw.current.update(settings);
  };

  const fullScreen = () => {
    canvasRef.current.requestFullscreen();
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    canvasRef.current.width = 8000;
    canvasRef.current.height = 8000;
    const ctx = canvasRef.current.getContext("2d");
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.strokeStyle = "rgba(240, 240, 240, 0.1)";
    ctx.lineWidth = 40;
    draw.current = new Drawing(ctx, 1600, setStatus);
  }, []);

  return (
    <div>
      <h1>Fractal snowflakes</h1>
      <div id="description">
        <p>
          {" "}
          Click to the <img style={{ width: 12 }} src={PlayImg} alt="" /> button
          several times and generate snowflake.{" "}
        </p>
        <p>Change the settings and create a unique snowflake. </p>
      </div>

      <div className="main">
        <div className="canvas-relative">
          <Canvas canvasRef={canvasRef}></Canvas>

          <button id="fullscrean" onClick={() => fullScreen()}>
            <img style={{ width: 20 }} src={Full} alt="" />
          </button>

          {!status ? (
            <button id="start" onClick={() => drawNext(settings)}>
              <img style={{ width: 20 }} src={PlayImg} alt="" />
            </button>
          ) : (
            <div className="loader"></div>
          )}
        </div>

        <Constrols
          settings={settings}
          uppdateSetting={uppdateSetting}
          addSetting={addSetting}
          removeSetting={removeSetting}
        />
      </div>
    </div>
  );
}
