import Full from "assets/fullscrean.svg";
import Download from "assets/download.svg"
import React from 'react'
import { useRef } from "react";
import { useState } from "react";
import StartButton from "./widgets/StartButton";
import DownloadButton from "./widgets/DownloadButton";
import FullscreanButton from "./widgets/FullscreenButton";
import styles from './canvas.module.css'
import CanvasMenu from "./widgets/CanvasMenu";

export default function Canvas({canvasRef, status, drawNext, settings}) {
  const canvasElementRef = useRef(null)
  const [isFullscreen, setIsFullscreen]  = useState(false)

  const fullScreen = () => {
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
    <div ref={canvasElementRef} className={styles.canvasWrapper}>
        
        <canvas ref={canvasRef} className={styles.mainCanvas}> 
        </canvas>

        <CanvasMenu>
          <DownloadButton download={download}/>

          <FullscreanButton fullScreen={fullScreen}/>

          <StartButton status={status} drawNext={() => drawNext(settings)}/>
        </CanvasMenu>

{/*
        <button id="download" onClick={() => download()}>
          <img style={{ width: 20 }} src={Download} alt="" />
        </button>

        <button id="fullscrean" onClick={() => fullScreen()}>
          <img style={{ width: 20 }} src={Full} alt="" />
        </button>

        <StartButton status={status} drawNext={() => drawNext(settings)}/>
*/}  

  </div>
)
}