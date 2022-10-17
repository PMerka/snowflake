import React from "react";
import CloseImg from "./close.svg"
import Add from "./add.svg"

export default function Constrols({
  settings,
  uppdateSetting,
  addSetting,
  removeSetting,
}) {
  return (
    <div id="settings">
      <h3>Settings</h3>
      <div className="option-box-wrapper">
      {settings.map((setting, index) => {
        return (
          <div className="option-box" key={index}>
              
            <h5>Branching {index + 1}</h5>

            <div className="controlElements">
              <div className="controlElement">
                <div>
                  <label>Length</label>
                  <input
                    className="num-setting-input"
                    type="number"
                    value={setting.length}
                    step={1}
                    min={0}
                    max={100}
                    onChange={(e) =>
                      uppdateSetting(index, "length", e.target.value)
                    }
                  />
                  {"%"}
                </div>
                <input
                  value={setting.length}
                  step={1}
                  type="range"
                  min={0}
                  max={100}
                  onChange={(e) =>
                    uppdateSetting(index, "length", e.target.value)
                  }
                />
              </div>

              <div className="controlElement">
                <div>
                  <label>Distance</label>
                  <input
                    className="num-setting-input"
                    type="number"
                    value={setting.distance}
                    step={1}
                    min={0}
                    max={100}
                    onChange={(e) =>
                      uppdateSetting(index, "distance", e.target.value)
                    }
                  />{"%"}
                  
                </div>
                <input
                  value={setting.distance}
                  step={1}
                  type="range"
                  min={0}
                  max={100}
                  onChange={(e) =>
                    uppdateSetting(index, "distance", e.target.value)
                  }
                />
              </div>

              <div className="controlElement">
                <div>
                  <label>Angle</label>
                  <input
                    className="num-setting-input"
                    type="number"
                    value={setting.angle}
                    min={1}
                    max={179}
                    onChange={(e) =>
                      uppdateSetting(index, "angle", e.target.value)
                    }
                  />
                  {"°"}
                </div>
                <input
                  value={setting.angle}
                  type="range"
                  min={1}
                  max={179}
                  onChange={(e) =>
                    uppdateSetting(index, "angle", e.target.value)
                  }
                />
              </div>

              <div>
                <button className="close-button" onClick={() => removeSetting(index)}> 
                  <img style={{width: 20}} src={CloseImg} alt=""/>
                </button> 
                
              </div>
            </div>
          </div>  
          
        );
      })}
      </div>
      
      <button id="add-btn" onClick={() => addSetting()}>
        <img style={{width: 20}} src={Add} alt=""/>
      </button>
      
    </div>
  );
}
