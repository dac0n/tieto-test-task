import React, { useEffect, useState } from 'react';

const getBase = (sides) => {
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
  let borders = [];
  for (let side of sides) {
    if (side !== base || (sides[0] == sides[1] && sides[0] == sides[2] && borders.length < 2)) borders.push(Math.sqrt(side ** 2 - height ** 2));
  }
  return borders;
}

const updateDrawing = (borders, height) => {
  root.style.setProperty("--border_bottom_width", `${height}px`);
  root.style.setProperty("--left_border", `${borders[0]}px`);
  root.style.setProperty("--right_border", `${borders[1]}px`);
}




const Triangle = (props) => {

  const PIXELS_PER_CM = 37.7952755906;    //a constant taken from wikipedia
  const MAXIMAL_DRAWING_SIZE = Math.max(props.height.slice(0, -2), props.width.slice(0, -2)) / PIXELS_PER_CM;

  const [sidesInCm, setSidesInCm] = useState([4, 4, 4]);
  root.style.setProperty("--component-height", `${props.height}`);
  root.style.setProperty("--component-width", `${props.width}`);



  useEffect(() => {
    let zoom = MAXIMAL_DRAWING_SIZE / Math.max(...sidesInCm);
    zoom = zoom > 1 ? 1 : zoom;     //we need this to resize shapes if input values are too high to draw

    let sidesInPixels = sidesInCm.map(x => x * PIXELS_PER_CM * zoom);
    //if biggest side if bigger than canvas, it is resized to fit the canvas. 
    //otherwise zoom is 1 and size is not changed (and pixel-cm ratio is untouched)

    console.log('useEffect sides:', sidesInCm);
    let base = getBase(sidesInPixels);
    let height = getHeight(sidesInPixels, base);
    let borders = getBorders(sidesInPixels, base, height)
    updateDrawing(borders, height);
    console.log(`borders: ${borders}, Height: ${height}, leftborder: ${borders[0]}, rightborder: ${borders[1]}`)
  }, [sidesInCm])






  const changeHandler = (e, number) => {
    let tempSides = [...sidesInCm]; //we need this to force React into re-rendering after setSides.
    //otherwise it will not rerender, since it will be the same object.
    tempSides[number] = parseInt(e.target.value) || 0;
    console.log('Temp sides after change', tempSides)
    setSidesInCm(tempSides);

  }

  return (
    <div className="triangle-component">
      <div className="triangle-container">
        <div className="triangle-child" />
      </div>
      <div className="triangle-inputs">
        <div>
          <label>Side A:</label>
          <input
            type="number"
            onChange={(e) => { changeHandler(e, 0) }}
          />
        </div>
        <div>
          <label>Side B:</label>
          <input
            type="number"
            onChange={(e) => { changeHandler(e, 1) }}
          />
        </div>
        <div>
          <label>Side C:</label>
          <input
            type="number"
            onChange={(e) => { changeHandler(e, 2) }}
          />
        </div>
      </div>
    </div>
  );
};

export default Triangle;


