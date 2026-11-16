const {test}=require('node:test');const assert=require('node:assert/strict');const C=require('../dist/core.js');
test('H2O: правильный состав и угол',()=>assert.equal(C.validateWater(2,1,104.5).ok,true));
test('Неверный состав: полный перебор допустимых счетчиков',()=>{for(let h=0;h<=4;h++)for(let o=0;o<=4;o++)assert.equal(C.validateWater(h,o,104.5).ok,h===2&&o===1);});
test('Неверная геометрия и границы допуска',()=>{for(const angle of [60,100,107,120,180])assert.equal(C.validateWater(2,1,angle).ok,false);for(const angle of [102.5,104.5,106.5])assert.equal(C.validateWater(2,1,angle).ok,true);});
test('Из координат получается заданный угол H–O–H',()=>{for(const angle of [60,104.5,180]){const [,a,b]=C.waterPositions(angle);const dot=a.reduce((s,v,i)=>s+v*b[i],0);assert.ok(Math.abs(Math.acos(dot/(Math.hypot(...a)*Math.hypot(...b)))*180/Math.PI-angle)<1e-5);}});
test('Поворот сохраняет расстояние до центра',()=>{const p=[1,2,3],q=C.rotate(p,.7,-.3);assert.ok(Math.abs(Math.hypot(...p)-Math.hypot(...q))<1e-12);});
test('Маятник: период и закон квадратного корня',()=>{assert.ok(Math.abs(C.period(1)-2.00606668)<1e-7);assert.equal(C.period(2)/C.period(.5),2);});
test('Маятник: недопустимые параметры отклоняются',()=>{for(const n of [0,-1,NaN,Infinity])assert.throws(()=>C.period(n),RangeError);assert.throws(()=>C.period(1,0),RangeError);});
