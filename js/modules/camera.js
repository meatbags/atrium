/** First-person camera. */

import * as THREE from 'three';

class Camera {
  constructor() {
    this.domTarget = document.querySelector('#canvas-target');

    // camera
    this.camera = new THREE.PerspectiveCamera(70, 1, 0.1, 2000000);
    this.camera.up = new THREE.Vector3(0, 1, 0);
    this.camera.rotation.order = 'YXZ';
    this.camera.fov = 70;
    this.camera.updateProjectionMatrix();
    this.camera.rotation.x = Math.PI / 32;
    this.camera.rotation.y = 0;

    // start position
    /// this.camera.position.set(100, 0, 4);

    // audio listener
    this.listener = new THREE.AudioListener();
    this.camera.add(this.listener);
  }

  bind(root) {
    // events
    window.addEventListener('resize', () => { this.resize(); });
    this.resize();
  }

  resize() {
    this.size = {x: window.innerWidth, y: window.innerHeight};
    this.camera.aspect = this.size.x / this.size.y;
    this.camera.updateProjectionMatrix();
  }

  getCamera() {
    return this.camera;
  }
}

export default Camera;
