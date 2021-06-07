import * as utils from './utils.js'; 

test('should return true', ()=>{
    const result = utils.isEquilateral([200,200,200]);
    expect(result).toBe(true);
});
test('should return false', ()=>{
    const result = utils.isEquilateral([200,-400,200]);
    expect(result).toBe(false);
});
test('should return true', ()=>{
    const result = utils.isEquilateral([0,0,0]);
    expect(result).toBe(true);
});
test('should return false', ()=>{
    const result = utils.isEquilateral([5,6,7]);
    expect(result).toBe(false);
});
//i'm not testing for strings, because you cannot enter a string into input
test('should return true', ()=>{
    const result = utils.isScalene([5,6,7]);
    expect(result).toBe(true);
});
test('should return false', ()=>{
    const result = utils.isScalene([200,200,100]);
    expect(result).toBe(false);
});
test('should return false', ()=>{
    const result = utils.isScalene([0,0,0]);
    expect(result).toBe(false);
});
test('should return true', ()=>{
    const result = utils.isScalene([-14,6,7]);
    //not everything is logical from a mathematical way
    //but below you see more validation logic
    //so while temporarily message is assigned to Scalene even if triangle is not
    //it gets deleted before shown
    expect(result).toBe(true);
});

const trgDontExist = (sides) => {
    let base = utils.getBase(sides);
    let height = utils.getHeight(sides, base);
    let borders = utils.getBorders(sides, base, height);
    const PIXELS_PER_CM = 37.7952755906;
    let sidesInCm = sides.map(side=>side/PIXELS_PER_CM);
    return ([...borders, height].some(el => isNaN(el) || el==0)||sidesInCm.some(side=>side<=0));
    //copied from the source code
}

test('should return false', ()=>{
    const result = trgDontExist([200, 300, 400])
    expect(result).toBe(false);
});

test('should return false', ()=>{
    const result = trgDontExist([500, 500, 400])
    expect(result).toBe(false);
});

test('should return true', ()=>{
    const result = trgDontExist([100, 200, 0])
    expect(result).toBe(true);
});

test('should return true', ()=>{
    const result = trgDontExist([-100, -150, -200])
    expect(result).toBe(true);
});

test('should return true', ()=>{
    const result = trgDontExist([0, 0, 0])
    expect(result).toBe(true);
});