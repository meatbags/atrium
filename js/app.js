/** App */

import Camera from './modules/camera';
import Controls from './modules/controls';
import Loop from './modules/loop';
import Materials from './modules/materials';
import Scene from './modules/scene';
import Renderer from './modules/renderer';

class App {
  constructor() {
    this.modules = {
      camera: new Camera(),
      controls: new Controls(),
      loop: new Loop(),
      materials: new Materials(),
      scene: new Scene(),
      renderer: new Renderer(),
    };

    // bind modules
    Object.keys(this.modules).forEach(key => {
      if (typeof this.modules[key].bind === 'function') {
        this.modules[key].bind(this);
      }
    });

    // start main loop
    this.modules.loop.start();
  }
}

window.addEventListener('load', () => {
  const app = new App();
});
