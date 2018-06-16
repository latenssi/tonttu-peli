const possibleDirections = [-1, 0, 1, 1];

export class GameObject {
  constructor({ startingPosition = [0, 0], size = 4 }) {
    this.size = size;
    this.startingPosition = startingPosition;
    this.position = startingPosition;
    this.queuedPosition = startingPosition;
    this.lastMove = 0;
  }

  draw(ctx) {
    const position = this.getPosition();
    const size = this.getSize();

    ctx.fillStyle = "rgb(0,0,0)";
    ctx.fillRect(position[0], position[1], size, size);
  }

  getSize() {
    return this.size;
  }

  getPosition() {
    return this.position;
  }

  getQueuedPosition() {
    return this.queuedPosition;
  }

  queuePosition(position) {
    this.queuedPosition = position;
  }

  move() {
    this.position = this.getQueuedPosition();
  }

  moveRandom(width, height) {
    const currentPosition = this.getPosition();
    const size = this.getSize();

    const newPosition = currentPosition.map(
      p => p + possibleDirections[Math.floor(Math.random() * 3)] * size
    );

    if (newPosition[0] < 0 || newPosition[0] > width) {
      newPosition[0] = currentPosition[0];
    }

    if (newPosition[1] < 0 || newPosition[1] > height) {
      newPosition[1] = currentPosition[1];
    }

    this.queuePosition(newPosition);
  }
}

export class ColoredGameObject extends GameObject {
  constructor(props) {
    super(props);
    this.color = props.color;
  }

  draw(ctx) {
    const color = this.getColor();
    const position = this.getPosition();
    const size = this.getSize();

    ctx.fillStyle = color;
    ctx.fillRect(position[0], position[1], size, size);
  }

  getColor() {
    return this.color;
  }
}
