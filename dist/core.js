(function(root){
'use strict';
const api={
 validateWater(h,o,angle){if(h!==2||o!==1)return {ok:false,message:'Для H₂O нужны ровно 2 атома H и 1 атом O. Измените состав.'};if(Math.abs(angle-104.5)>2)return {ok:false,message:'Состав верный. Установите угол около 104,5° (допуск ±2°).'};return {ok:true,message:'Молекула собрана: H₂O, две связи O–H, угловая геометрия.'};},
 period(length,g=9.81){if(!Number.isFinite(length)||length<=0||!Number.isFinite(g)||g<=0)throw new RangeError('Положительные L и g обязательны');return 2*Math.PI*Math.sqrt(length/g);},
 waterPositions(angle){const a=angle*Math.PI/360;return [[0,0,0],[-Math.sin(a)*1.5,Math.cos(a)*1.5,0],[Math.sin(a)*1.5,Math.cos(a)*1.5,0]];},
 rotate([x,y,z],yaw,pitch){const xx=x*Math.cos(yaw)+z*Math.sin(yaw),zz=-x*Math.sin(yaw)+z*Math.cos(yaw);return [xx,y*Math.cos(pitch)-zz*Math.sin(pitch),y*Math.sin(pitch)+zz*Math.cos(pitch)];}
};if(typeof module!=='undefined')module.exports=api;else root.LabCore=api;
})(globalThis);
