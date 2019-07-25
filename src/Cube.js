import React, { Component } from 'react';
import * as THREE from "three";
import * as OrbitControls from "three-orbitcontrols";
import DragControls from "three-dragcontrols";

export class Cube extends Component {
  componentDidMount() {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(120, window.innerWidth/window.innerHeight, 0.1, 10000);
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(this.renderer.domElement);

    const controls = new OrbitControls(this.camera);
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshNormalMaterial();
    const distance = 0.1;
    let rotation = true;
    let group = new THREE.Group();
    let objects = [];

    for (let depth = 0; depth > -3; depth--) {
      for (let col = 0; col > -3; col--) {
        for (let row = 0; row > -3; row--) {
          let cube = new THREE.Mesh(geometry, material);
          cube.position.set(col + col*distance, row + row*distance, depth + depth*distance);
          objects.push(cube);
          group.add(cube);
        }
      }
      this.scene.add(group);
    }

    let dragControls = new DragControls( objects, this.camera, this.renderer.domElement );
		dragControls.addEventListener('dragstart', function () {
      rotation = false;
    } );
		dragControls.addEventListener('dragend', function () {
      rotation = true;
    });

    this.camera.position.z = 5;

    const animate = () => {
      requestAnimationFrame( animate );

      if (rotation == false) {
        controls.enabled = false;
      } else {
        controls.enabled = true;
      }

      this.renderer.render(this.scene, this.camera);

    };

    animate();
  }

  render() {
    return (
      <div />
    )
  }
}
