import React from 'react'
import Download from "assets/download.svg"
import styles from './downloadButton.module.css'

export default function DownloadButton({download}) {
  return (
    <button className={styles.download} onClick={() => download()}>
        <img style={{ width: 20 }} src={Download} alt="" />
    </button>
  )
}