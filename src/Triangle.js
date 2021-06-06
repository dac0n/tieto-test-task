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



const Triangle = () => {
  const [sides, setSides] = useState([200, 200, 200]);



  useEffect(() => {
    console.log('useEffect sides:', sides); 
    let base = getBase(sides);
    let height = getHeight(sides, base);
    let borders = getBorders(sides, base, height)
    updateDrawing(borders, height);
    console.log(`borders: ${borders}, Height: ${height}, leftborder: ${borders[0]}, rightborder: ${borders[1]}`)
  }, [sides])






  const changeHandler = (e, number) => {
    let tempSides = [...sides]; //we need this to force React into re-rendering after setSides.
    //otherwise it will not rerender, since it will be the same object.
    console.log('tempSides:',tempSides);
    console.log('sides:', sides);
    tempSides[number] = parseFloat(e.target.value);
    console.log('Temp sides after change', tempSides)
    setSides(tempSides);

  }

  return (
    <div className="triangle-component">
      <div className="triangle-container">
        <div className="triangle-child" />
      </div>
      <div className="triangle-inputs">
        <input
          type="number"
          onChange={(e) => { changeHandler(e, 0) }}
          value={sides[0]}
        />
        <input
          type="number"
          onChange={(e) => { changeHandler(e, 1) }}
          value={sides[1]}
        />
        <input
          type="number"
          onChange={(e) => { changeHandler(e, 2) }}
          value={sides[2]}
        />
      </div>
    </div>
  );
};

export default Triangle;


