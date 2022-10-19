import PlayImg from "./play.svg";
import Full from "./fullscrean.svg";
import Download from "./download.svg"
import React from 'react'
import { useRef } from "react";
import { useState } from "react";

export default function Canvas({canvasRef, status, drawNext, settings}) {
  const canvasElementRef = useRef(null)
  const [isFullscreen, setIsFullscreen]  = useState(false)

  const fullScreen = () => {
    console.log(isFullscreen)
    if (!isFullscreen){
          canvasElementRef.current.requestFullscreen();
          setIsFullscreen(true)
          return
    }
    document.webkitExitFullscreen()
    setIsFullscreen(false)
  };  

  const download = () => {
      const link = document.createElement('a');
      link.download = 'snowFlake.png';
      link.href = canvasRef.current.toDataURL()
      link.click();
  }
  
  return (
    <div ref={canvasElementRef} className="canvas-relative">
        <div style={{widht: "100%", display: "flex", justifyContent: "center"}}>
          <canvas ref={canvasRef} id="main-canvas">
          </canvas>
        </div>

        <button id="download" onClick={() => download()}>
          <img style={{ width: 20 }} src={Download} alt="" />
        </button>

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
)
}