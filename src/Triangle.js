import React, { useEffect, useState } from 'react';
import * as utils from './utils.js'; 

const Triangle = (props) => {

  const PIXELS_PER_CM = 37.7952755906;    //a constant taken from wikipedia
  const MAXIMAL_DRAWING_SIZE = Math.min(props.height.slice(0, -2), props.width.slice(0, -2)) / PIXELS_PER_CM;

  const [sidesInCm, setSidesInCm] = useState([4, 4, 4]);
  const [tempSides, setTempSides] = useState([4, 4, 4]);  

  root.style.setProperty("--component-height", `${props.height}`);
  root.style.setProperty("--component-width", `${props.width}`);
  //allows us to set component sizes when calling the component,
  //without changing css styles


  useEffect(() => {
    let zoom = MAXIMAL_DRAWING_SIZE / Math.max(...sidesInCm);
    zoom = zoom > 1 ? 1 : zoom;     //we need this to resize shapes if input values are too high to draw
    let sidesInPixels = sidesInCm.map(x => x * PIXELS_PER_CM * zoom);
    //if biggest side if bigger than canvas, it is resized to fit the canvas. 
    //otherwise zoom is 1 and size is not changed (and pixel-cm ratio is untouched)
    let base = utils.getBase(sidesInPixels);
    let height = utils.getHeight(sidesInPixels, base);
    let borders = utils.getBorders(sidesInPixels, base, height)

    if ([...borders, height].some(el => isNaN(el) || el==0)||sidesInCm.some(side=>side<=0)) {
      utils.toggleVisibility('message');
      utils.setMessage('error', 'Triangle does not exist.')
    }
    else{
      utils.toggleVisibility('triangle');
      utils.updateInfo(sidesInCm);
    }
    utils.updateDrawing(borders, height);
  }, [sidesInCm])

  const changeHandler = (e, number) => {
    let __tempSides = [...tempSides]; //needed to force React to rerender
    __tempSides[number] = parseInt(e.target.value) || 0;
    setTempSides(__tempSides);
  }

  const submitHandler = () => {
    if (tempSides.some(e => e == 0)) {
      utils.toggleVisibility('message');
      utils.setMessage('error', 'Please enter all the values!');
    }
    else {
      setSidesInCm(tempSides);
      //could be easily switched, to update on inputChange
      //but while i think it's more convenient it goes
      //against given design
    }
  }

  return (
    <div className="triangle-component">
      <div className="triangle-container">
        <div className="triangle-child" />
      </div>
      <div className="triangle-text" id="triangle-placeholder" />
      <div className="triangle-text" id="triangle-info" />
      <div className="triangle-inputs">
        <div>
          <label>Side A:</label>
          <input
            type="number"
            onChange={(e) => { changeHandler(e, 0) }}
            defaultValue="4"
          />
        </div>
        <div>
          <label>Side B:</label>
          <input
            type="number"
            onChange={(e) => { changeHandler(e, 1) }}
            defaultValue="4"
          />
        </div>
        <div>
          <label>Side C:</label>
          <input
            type="number"
            onChange={(e) => { changeHandler(e, 2) }}
            defaultValue="4"
          />
        </div>
        <button id="triangle-calculate-btn" onClick={() => { submitHandler() }}>Calculate</button>
      </div>
    </div>
  );
};

export default Triangle;


