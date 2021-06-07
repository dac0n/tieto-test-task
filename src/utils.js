//HELPER_FUNCTIONS
/* these functions are abstracted from main code
to increase readability and make things easier
to maintain and debug */


export function isEquilateral(sides){
    return sides[0] == sides[1] && sides[0] == sides[2];
}

export function isScalene(sides){
    return sides[0] !== sides[1] && sides[0] !== sides[2] && sides[1] !== sides[2];
}

export function getBase(sides){
    //returns the side which will be the lowest (and from which height of a triangle is calculated)
    let uniqueAmount = (new Set(sides)).size;
    let base = uniqueAmount !== 2 ? Math.max(...sides) : sides.find((x)=>{ return sides.indexOf(x) === sides.lastIndexOf(x); });
    return base;
}

export function getHeight(sides, base){
    let [AB, BC, CD] = sides;
    let p = (AB + BC + CD) / 2;
    let height = 2 * Math.sqrt(p * (p - AB) * (p - BC) * (p - CD)) / base;    //dividing calculated area by base
    return height;
}

export function getBorders(sides, base, height){
    //in this project triangle is drawn by using css borders
    // the apex of the triangle perpendicular to the base is located between two borders
    let borders = [];
    for (let side of sides) {
        if (side !== base || (isEquilateral(sides) && borders.length < 2)) borders.push(Math.sqrt(side ** 2 - height ** 2));
    }
    return borders;
}

export function updateDrawing(borders, height){
    // as canvas was not used, this is the way to implement dynamic styling
    root.style.setProperty("--border_bottom_width", `${height}px`);
    root.style.setProperty("--left_border", `${borders[0]}px`);
    root.style.setProperty("--right_border", `${borders[1]}px`);
}

export function setMessage(type, text){
    let elId = type == 'info' ? 'triangle-info' : 'triangle-placeholder';
    document.getElementById(elId).innerHTML = text;
}

export function updateInfo(sides){
    let triangleInfo = isEquilateral(sides) ? 'Equilateral Triangle' : isScalene(sides) ? 'Scalene Triangle' : 'Isosceles Triangle';
    setMessage('info', triangleInfo);
}

export function toggleVisibility(type){  //we need this to display messages and triangle correctly
    document.getElementById('triangle-placeholder').style.display = type == 'message' ? 'block' : 'none';
    document.getElementsByClassName('triangle-child')[0].style.display = type == 'triangle' ? 'block' : 'none';
    if (type == 'message') setMessage('info', '');
}