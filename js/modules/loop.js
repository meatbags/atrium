/** Main loop */

class Loop {
  constructor() {
    this.active = false;
    this.time = {now: 0, deltaMax: 0.1};
  }

  bind(root) {
    this.ref = {};
    this.ref.update = [];
    this.ref.render = [];

    // get update / render targets
    Object.keys(root.modules).forEach(key => {
      if (typeof root.modules[key].update === 'function') {
        this.ref.update.push(root.modules[key]);
      }
      if (typeof root.modules[key].render === 'function') {
        this.ref.render.push(root.modules[key]);
      }
    });

    this._loop();
  }

  start() {
    this.time.now = performance.now();
    this.active = true;
  }

  stop() {
    this.active = false;
  }

  _loop() {
    requestAnimationFrame(() => {
      this._loop();
    });

    if (this.active) {
      const now = performance.now();
      const dt = Math.min(this.time.deltaMax, (now - this.time.now) / 1000);
      this.time.now = now;
      this.ref.update.forEach(obj => { obj.update(dt); });
      this.ref.render.forEach(obj => { obj.render(dt); });
    }
  }
}

export default Loop;
