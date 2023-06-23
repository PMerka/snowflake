import React from 'react'
import Full from "assets/fullscrean.svg";
import styles from './fullscreenButton.module.css'

export default function FullscreanButton({fullScreen}) {
  return (
    <button className={styles.fullscreen} onClick={() => fullScreen()}>
        <img style={{ width: 20 }} src={Full} alt="" />
    </button>
  )
}
