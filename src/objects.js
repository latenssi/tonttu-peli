const possibleDirections = [-1, 0, 1];

export class GameObject {
  constructor(props) {
    this.initialPosition = props.initialPosition || [0, 0];
  }

  getPosition() {
    return this.initialPosition;
  }
}

export const MoveableGameObject = ParentClass =>
  class extends ParentClass {
    constructor(props) {
      super(props);
      this.speed = props.speed || [0, 0];
    }

    getPosition() {
      return this.position || this.initialPosition;
    }

    setPosition(position) {
      this.position = position;
    }

    getSpeed() {
      return this.speed;
    }

    setSpeed(speed) {
      this.speed = speed;
    }

    move() {
      const currentPosition = this.getPosition();
      const currentSpeed = this.getSpeed();
      const newPosition = currentPosition.map((p, i) => p + currentSpeed[i]);
      this.setPosition(newPosition);
    }

    calculateMovement() {}
  };

// export class MoveableGameObject extends GameObject {
//   constructor(props) {
//     super(props);
//     this.speed = props.speed || [0, 0];
//   }

//   getPosition() {
//     return this.position || this.initialPosition;
//   }

//   setPosition(position) {
//     this.position = position;
//   }

//   getSpeed() {
//     return this.speed;
//   }

//   setSpeed(speed) {
//     this.speed = speed;
//   }

//   move() {
//     const currentPosition = this.getPosition();
//     const currentSpeed = this.getSpeed();
//     const newPosition = currentPosition.map((p, i) => p + currentSpeed[i]);
//     this.setPosition(newPosition);
//   }

//   calculateMovement() {}
// }

export class GravityGameObject extends MoveableGameObject(GameObject) {
  constructor(props) {
    super(props);
    this.gravity = props.gravity || [0, 1];
  }

  getGravity() {
    return this.gravity;
  }

  calculateGravitySpeed() {
    const [gravX, gravY] = this.getGravity();
    const [speedX, speedY] = this.getSpeed();
    return [speedX + gravX, speedY + gravY];
  }

  calculateMovement() {
    const newSpeed = this.calculateGravitySpeed();
    this.setSpeed(newSpeed);
  }
}

export class FallingRectangle extends GravityGameObject {
  constructor(props) {
    super(props);
    this.color = props.color;
    this.size = props.size;
  }

  draw(ctx) {
    const color = this.getColor();
    const position = this.getPosition();
    const size = this.getSize();

    ctx.fillStyle = color;
    ctx.fillRect(position[0], position[1], size, size);
  }

  getSize() {
    return this.size;
  }

  getColor() {
    return this.color;
  }
}

export class JumpingRectangle extends FallingRectangle {}
