export class GameObject {
  constructor(color, size = 50, speed = 50) {
    this.color = color;
    this.size = size;
    this.speed = speed;
    this.position = [0, 0];
  }

  draw(ctx) {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.position[0], this.position[1], this.size, this.size);
  }

  moveRandom(width, height) {
    this.position = this.position.map(
      p => p + (Math.random() > 0.5 ? 1 : -1) * this.speed
    );

    if (this.position[0] > width) {
      this.position[0] = width;
    } else if (this.position[0] < 0) {
      this.position[0] = 0;
    }

    if (this.position[1] > height) {
      this.position[1] = height;
    } else if (this.position[1] < 0) {
      this.position[1] = 0;
    }
  }
}
