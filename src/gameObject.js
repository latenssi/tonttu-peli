export default class GameObject {
  constructor() {
    this.worker = new Worker("./gameObjectPhysicsWorker.js");
    this.worker.onmessage = e => console.log(e.data);
  }

  run(options) {
    this.worker.postMessage({ call: "run", arguments: options });
  }

  test() {
    this.worker.postMessage({
      test: "test"
    });
  }
}
