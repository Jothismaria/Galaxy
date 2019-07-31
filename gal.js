'use strict';

let canvas;
let ctx;
let interval;

const S = Math.sin;
const C = Math.cos;
const T = Math.tan;
const AS = Math.asinh;

const mathFuncs = [S, C, T, AS];

//const R = (r, g, b, a) => `rgba(${r}, ${g}, ${b}, ${a})`;
const randVal = (min, max) => Math.floor(Math.random() * (max - min) + min);

const R = (...args) => `rgba(${args})`;

const settings = {
    angle: 2,
    speed: 300,
    particleSize: 9,
    centerSize: 9,
    diameter: 2000,
    direction: 1
};

const zoomSettings = {
    w: 1920,
    h: 1080
};

const funcMap = {
    "black-hole": {
        func: blackHole,
        source: "https://www.dwitter.net/d/13326"
    },
    "galaxy": {
        func: galaxy,
        source: "https://www.dwitter.net/d/13325"
    },
    "cone": {
        func: cone,
        source: null
    },
    "surprise": {
        func: surprise,
        source: null
    }
}

function setup(){
    canvas = document.getElementById("canvas");
    canvas.width = zoomSettings.w;
    canvas.height = zoomSettings.h;
    ctx = canvas.getContext("2d");
    
    change("black-hole");
}

function change(type){
    clear(type);
    const code = funcMap[type];
    run(code.func);
    const source = document.getElementById("source");
    
    if(!source){
        return;
    }
    source.innerHTML = code.source;
    source.href = code.source;
}

function changeSettings(name, value){
    settings[name] = value;
    const label = document.getElementById(`${name}-label`);
    label.innerHTML = Math.round(value * 100 + Number.EPSILON ) / 100;
    // console.log(`${name} - ${value}`);
}

function zoom(value){
    canvas.width = value;
    canvas.height = value;
    // console.log(`width - ${canvas.width}, height - ${canvas.height}`);
}

function clear(type){
    ctx.clearRect(0, canvas.width, 0, canvas.height);
    cancelAnimationFrame(interval);
    const radios = document.getElementsByClassName("radio");
    for(let el of radios){
        if(el.name === type){
            el.checked = true;
        }
        else{
            el.checked = false;
        }
    }
}

function run(func){
    let i = 0;

    const funcs = [];
    for(let i = 0; i < 4; i++){
        funcs.push(mathFuncs[randVal(0, mathFuncs.length)]);
    }
    
    const loop = () => {
        interval = requestAnimationFrame(loop);
        func(i, funcs[0], funcs[1], funcs[2], funcs[3]);
        i += 0.05;
    }
    interval = requestAnimationFrame(loop);
}

function blackHole(t){
    let K, F;
    for(let i=0;i<settings.diameter;ctx.fillRect(i?canvas.width/2+i*S(F=settings.speed*(t+9)/i+S(i*i)):0,i?canvas.height/2+settings.direction*.2*(settings.angle*i*C(F)+2e4/i):0,K=i++?S(i)*settings.particleSize:canvas.width,K))ctx.fillStyle=R(99*i,2*i,i,i?1:.4);
}

function galaxy(t){
    let K, F, z;
    for(let i=0;i<settings.diameter;ctx.fillRect(i?canvas.width/2+i*S(F=settings.speed*t/i+i+S(z)/9):0,i?canvas.height/2+settings.direction*.2*(settings.angle*i*C(F)):0,K=i++?S(i)*settings.particleSize:canvas.width,K))ctx.fillStyle=R(z=i*i,z%498,z%499,.2+i);
}

function cone(t){
    let K, F, z;
    for(let i=0;i<settings.diameter;ctx.fillRect(i?canvas.width/2+i*S(F=settings.speed*t/i+i+S(z)/9):0,i?canvas.height/2+settings.direction*.2*(settings.angle*i*AS(F)):0,K=i++?S(i)*settings.particleSize:canvas.width,K))ctx.fillStyle=R(z=i*i,z%498,z%499,.2+i);
}

function surprise(t, f1, f2, f3, f4){
    let K, F, z;
    for(let i=0;i<settings.diameter;ctx.fillRect(i?canvas.width/2+i*f1(F=settings.speed*t/i+i+f2(z)/9):0,i?canvas.height/2+settings.direction*.2*(settings.angle*i*f3(F)):0,K=i++?f4(i)*settings.particleSize:canvas.width,K))ctx.fillStyle=R(z=i*i,z%498,z%499,.2+i);
}




window.onload = setup;