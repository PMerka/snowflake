import React from "react";
import styles from './controlElement.module.css'

export default function ControlElement({index, min, max, symbol, label, setting, uppdateSetting}) {
  const settingKey = label.toLowerCase()
    return (
    <div className={styles.controlElement}>
      <div>
        <label> {label} </label>
        <input
          className={styles.numberInput}
          type="number"
          value={setting[settingKey]}
          step={1}
          min={min}
          max={max}
          onFocus={(e) => e.target.select()}
          onChange={(e) => uppdateSetting(index, label, e.target.value)}
        />
        {symbol}
      </div>
      <input
        value={setting[settingKey]}
        step={1}
        type="range"
        min={min}
        max={max}
        onChange={(e) => uppdateSetting(index, label, e.target.value)}
      />
    </div>
    );
}
