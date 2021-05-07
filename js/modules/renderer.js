/** Three.js/ webgl renderer. */

import * as THREE from 'three';

class Renderer {
  constructor() {
    this.renderer = new THREE.WebGLRenderer({antialias: true});
    this.renderer.outputEncoding = THREE.GammaEncoding;
    this.renderer.gammaFactor = 2.2;
    this.renderer.setClearColor(0x88ffdd, 1);

    // add to doc
    this.renderer.domElement.classList.add('canvas--3d');
    document.querySelector('#canvas-target').appendChild(this.renderer.domElement);
  }

  bind(root) {
    this.ref = {};
    this.ref.scene = root.modules.scene.getScene();
    this.ref.camera = root.modules.camera.getCamera();

    // events
    window.addEventListener('resize', () => { this.resize(); });

    // set size
    this.resize();
  }

  resize() {
    const dpr = window.devicePixelRatio || 1;
    const w = window.innerWidth * dpr;
    const h = window.innerHeight * dpr;
    this.renderer.setSize(w, h);
  }

  render(delta) {
    this.renderer.render(this.ref.scene, this.ref.camera);
  }
}

export default Renderer;
