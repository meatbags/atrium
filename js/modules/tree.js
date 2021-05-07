/** Tree */

import * as THREE from 'three';

class Tree {
  constructor(params) {
    this.group = new THREE.Group();

    // create leaves
    let isArray = Array.isArray(params.mesh);
    let rp = params.randomisePosition || 0.125;
    let rr = params.randomiseRotation || Math.PI * 0.125;
    let rs = params.randomiseScale || 0.5;
    let v = params.geometry.attributes.position.array;
    let n = params.geometry.attributes.normal.array;
    for (let i=0; i<v.length; i+=3) {
      let mesh;
      if (isArray) {
        let index = Math.floor(Math.random() * params.mesh.length);
        mesh = params.mesh[index].clone();
      } else {
        mesh = params.mesh.clone();
      }
      mesh.position.set(v[i], v[i+1], v[i+2]);
      mesh.lookAt(v[i] + n[i], v[i+1] + n[i+1], v[i+2] + n[i+2]);
      this.scramble(mesh.position, rp);
      this.scramble(mesh.rotation, rr);
      this.scramble(mesh.scale, rs);
      this.group.add(mesh);
    }

    this.time = {age: 0};

    // dev
    console.log('[Tree] created nodes:', this.group.children.length);
  }

  scramble(vec, amt) {
    vec.x += (Math.random() * 2 - 1) * amt;
    vec.y += (Math.random() * 2 - 1) * amt;
    vec.z += (Math.random() * 2 - 1) * amt;
  }

  getGroup() {
    return this.group;
  }

  update(d) {
    this.time.age += d;
  }
}

export default Tree;
