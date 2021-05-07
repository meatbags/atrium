/** Set up and update world */

import * as THREE from 'three';
import Loader from '../loader/loader';
import ColliderSystem from '../collider/collider_system';
import Tree from './tree';

class Scene {
  constructor() {
    this.scene = new THREE.Scene();
    this.loader = new Loader('./assets/');
    this.colliderSystem = new ColliderSystem();
    this.room = {};
  }

  bind(root) {
    this.ref = {};
    this.ref.camera = root.modules.camera;
    this.ref.materials = root.modules.materials;

    // add some lights
    this.lights = {};
    //this.lights.d1 = new THREE.DirectionalLight(0xffffff, 0.5),
    this.lights.a1 = new THREE.AmbientLight(0xffffff, 0.05);
    this.lights.h1 = new THREE.HemisphereLight(0xffffbb, 0x080820, 0.5),
    this.lights.p1 = new THREE.PointLight(0xffffff, 0.5, 100, 2);
    this.lights.p1.position.set(0, 5, 0);

    for (const key in this.lights) {
      this.scene.add(this.lights[key]);
      if (this.lights[key].target) {
        this.scene.add(this.lights[key].target);
      }
    }

    // create scene
    const mat = new THREE.MeshStandardMaterial({color: 0x888888, metalness: 0.5, roughness: 0.25});
    const geo = new THREE.BoxBufferGeometry(10, 1, 10);
    const mesh = new THREE.Mesh(geo, mat);
    mesh.position.y = -0.5;
    this.scene.add(mesh);

    // create foliage from geometry
    const boxGeo = new THREE.SphereBufferGeometry(1, 32, 32);
    boxGeo.translate(0, 2, 0);

    // get leaf models
    const leafMeshes = ['leaf2', 'leaf3', 'leaf4'].map(name => {
      const plane = new THREE.PlaneBufferGeometry(0.75, 0.75);
      const mat = new THREE.MeshStandardMaterial({color: 0xffffff, metalness: 0.5, roughness: 0.25});
      mat.side = THREE.DoubleSide;
      mat.alphaTest = 0.5;
      mat.transparent = true;
      //mat.depthWrite = false;
      mat.map = new THREE.TextureLoader().load(`img/${name}_texture.jpg`);
      mat.normalMap = new THREE.TextureLoader().load(`img/${name}_normal.jpg`);
      mat.alphaMap = new THREE.TextureLoader().load(`img/${name}_alpha.jpg`);
      return new THREE.Mesh(plane, mat);
    });

    const tree = new Tree({
      geometry: boxGeo,
      mesh: leafMeshes,
      randomiseRotation: Math.PI / 12,
    });
    this.scene.add(tree.getGroup());
    this.foliage = [];
    this.foliage.push(tree);
  }

  getScene() {
    return this.scene;
  }

  getColliderSystem() {
    return this.colliderSystem;
  }

  update(d) {
    this.foliage.forEach(obj => { obj.update(d); });
  }
}

export default Scene;
