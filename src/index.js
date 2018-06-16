import "./index.css";
import { GameObject, ColoredGameObject } from "./objects";

let width;
let height;

const rootEl = document.querySelector("#root");
const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");
const physicsFPS = 25;
const objects = [];

rootEl.appendChild(canvas);

window.addEventListener("resize", onResize);

document.addEventListener("DOMContentLoaded", () => {
  onResize();
  setup();

  setInterval(physicsTick, 1000 / physicsFPS);
  window.requestAnimationFrame(draw);
});

function onResize() {
  width = window.innerWidth;
  height = window.innerHeight;
  canvas.width = width;
  canvas.height = height;
}

function setup() {
  const size = 4;
  const numOfObjects = 1000;

  const startingPosition = [
    Math.floor(Math.floor(width / size) / 2) * size,
    Math.floor(Math.floor(height / size) / 2) * size
  ];

  for (let i = 0; i < numOfObjects; i++) {
    objects.push(
      new ColoredGameObject({
        color: `rgb(${Math.random() * 256}, ${Math.random() *
          256}, ${Math.random() * 256})`,
        startingPosition,
        size
      })
    );
  }
}

function physicsTick() {
  objects.forEach(o => o.moveRandom(width, height));
  objects.forEach(o => o.move());
}

function draw() {
  // ctx.clearRect(0, 0, width, height);

  objects.forEach(o => o.draw(ctx));

  window.requestAnimationFrame(draw);
}
