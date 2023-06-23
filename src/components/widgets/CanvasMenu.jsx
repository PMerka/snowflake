import React from 'react'
import styles from './canvasMenu.module.css'

export default function CanvasMenu({children}) {
  return (
    <div className={styles.canvasMenu}>
      {children}
    </div>
  )
}
