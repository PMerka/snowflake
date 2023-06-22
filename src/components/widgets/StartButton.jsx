import React from "react";
import PlayImg from "assets/play.svg";
import style from './startButton.module.css'

export default function StartButton({ status, drawNext}) {
  if (status) {
    return <div className={style.loader}></div>;
  }
  return (
    <button className={style.startButton} onClick={drawNext}>
      <img style={{ width: 20 }} src={PlayImg} alt="playButton" />
    </button>
  );
}
