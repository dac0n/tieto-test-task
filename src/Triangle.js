import React, { useEffect, useState } from 'react';


//HELPER_FUNCTIONS
/* these functions are abstracted from main code
to increase readability and make things easier
to maintain and debug */

const isEquilateral = (sides) => {
  return sides[0] == sides[1] && sides[0] == sides[2];
}

const isScalene = (sides) => {
  return sides[0] !== sides[1] && sides[0] !== sides[2] && sides[1] !== sides[2];
}



const getBase = (sides) => {    
  //returns the side which will be the lowest (and from which height of a triangle is calculated)
  let uniqueAmount = (new Set(sides)).size;
  let base = uniqueAmount !== 2 ? Math.max(...sides) : sides.find((x) => { return sides.indexOf(x) === sides.lastIndexOf(x); });
  return base;
}

const getHeight = (sides, base) => {
  let [AB, BC, CD] = sides;
  let p = (AB + BC + CD) / 2;
  let height = 2 * Math.sqrt(p * (p - AB) * (p - BC) * (p - CD)) / base;    //dividing calculated area by base
  return height;
}

const getBorders = (sides, base, height) => {
  //in this project triangle is drawn by using css borders
  // the apex of the triangle perpendicular to the base is located between two borders
  let borders = [];
  for (let side of sides) {
    if (side !== base || ( isEquilateral(sides) && borders.length < 2)) borders.push(Math.sqrt(side ** 2 - height ** 2));
  }
  return borders;
}

const updateDrawing = (borders, height) => {
  // as canvas was not used, this is the way to implement dynamic styling
  root.style.setProperty("--border_bottom_width", `${height}px`);
  root.style.setProperty("--left_border", `${borders[0]}px`);
  root.style.setProperty("--right_border", `${borders[1]}px`);
}

const setMessage = (type, text) => {
  const elId = type == 'info' ? 'triangle-info' : 'triangle-placeholder';
  document.getElementById(elId).innerHTML = text;
}

const updateInfo = (sides) => {
  let triangleInfo = isEquilateral(sides) ? 'Equilateral Triangle' : isScalene(sides) ? 'Scalene Triangle' : 'Isosceles Triangle';
  setMessage('info', triangleInfo);
}

const toggleVisibility = (type) => {  //we need this to display messages and triangle correctly
  document.getElementById('triangle-placeholder').style.display = type == 'message' ? 'block' : 'none';
  document.getElementsByClassName('triangle-child')[0].style.display = type == 'triangle' ? 'block' : 'none';
}


////////////////////////////////////////

const Triangle = (props) => {

  const PIXELS_PER_CM = 37.7952755906;    //a constant taken from wikipedia
  console.log(PIXELS_PER_CM);
  const MAXIMAL_DRAWING_SIZE = Math.min(props.height.slice(0, -2), props.width.slice(0, -2)) / PIXELS_PER_CM;

  const [sidesInCm, setSidesInCm] = useState([4, 4, 4]);
  const [tempSides, setTempSides] = useState([4, 4, 4]);


  root.style.setProperty("--component-height", `${props.height}`);
  //allows us to set component sizes when calling the component,
  //without changing css styles
  root.style.setProperty("--component-width", `${props.width}`);


  useEffect(() => {
    let zoom = MAXIMAL_DRAWING_SIZE / Math.max(...sidesInCm);
    zoom = zoom > 1 ? 1 : zoom;     //we need this to resize shapes if input values are too high to draw

    let sidesInPixels = sidesInCm.map(x => x * PIXELS_PER_CM * zoom);
    //if biggest side if bigger than canvas, it is resized to fit the canvas. 
    //otherwise zoom is 1 and size is not changed (and pixel-cm ratio is untouched)
    let base = getBase(sidesInPixels);
    let height = getHeight(sidesInPixels, base);
    let borders = getBorders(sidesInPixels, base, height)

    if ([...borders, height].some(el => isNaN(el))) {
      toggleVisibility('message');
      setMessage('info', '');
      setMessage('error', 'Triangle does not exist.')
    }
    else{
      toggleVisibility('triangle');
      updateInfo(sidesInCm);
    }

    updateDrawing(borders, height);
  }, [sidesInCm])




  const changeHandler = (e, number) => {
    console.log(tempSides);
    let __tempSides = [...tempSides]; //needed to force React to rerender
    __tempSides[number] = parseInt(e.target.value) || 0;
    setTempSides(__tempSides);

  }

  const submitHandler = () => {

    if (tempSides.some(e => e == 0)) {
      toggleVisibility('message');
      setMessage('info', '');
      setMessage('error', 'Please enter all the values!');
    }
    else {
      setSidesInCm(tempSides);
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


