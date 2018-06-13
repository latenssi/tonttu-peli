import "./index.css";
import { GameObject } from "./objects";

let width;
let height;

const rootEl = document.querySelector("#root");
const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");

const objects = [];

rootEl.appendChild(canvas);

window.addEventListener("resize", onResize);

document.addEventListener("DOMContentLoaded", () => {
  onResize();
  setup();
  window.requestAnimationFrame(draw);
});

function onResize() {
  width = window.innerWidth;
  height = window.innerHeight;
  canvas.width = width;
  canvas.height = height;
}

function setup() {
  objects.push(new GameObject("rgb(200, 0, 200)"));
  objects.push(new GameObject("rgb(0, 200, 200)"));
  objects.push(new GameObject("rgb(0, 0, 200)"));
  objects.push(new GameObject("rgb(200, 200, 0)"));
}

function draw() {
  for (let o of objects) {
    o.moveRandom(width, height);
    o.draw(ctx);
  }

  window.requestAnimationFrame(draw);
}
