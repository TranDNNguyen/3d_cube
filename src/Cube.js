import React, { Component } from 'react';
import * as THREE from "three";
import {default as OrbitControls} from "three-orbitcontrols";
import DragControls from "three-dragcontrols";


export class Cube extends Component {
  componentDidMount() {
    // add scene
    this.scene = new THREE.Scene();

    // add camera
    this.camera = new THREE.PerspectiveCamera(
      120,
      window.innerWidth/window.innerHeight,
      0.1,
      10000
    );
    this.camera.position.z = 5;

    // add renderer
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.antialias = true;
    this.mount.appendChild(this.renderer.domElement)

    // add controls
    this.controls = new OrbitControls(this.camera);
    this.rotation = true;

    // cube properties
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshNormalMaterial();
    const distance = 0.1;
    let group = new THREE.Group();
    let objects = [];

    // add groups of cubes to scene
    for (let depth = 0; depth > -3; depth--) {
      for (let col = 0; col > -3; col--) {
        for (let row = 0; row > -3; row--) {
          let cube = new THREE.Mesh(geometry, material);
          cube.position.set(
            col + col*distance,
            row + row*distance,
            depth + depth*distance
          );
          objects.push(cube);
          group.add(cube);
        }
      }
      this.scene.add(group);
    }

    // add drag controls and event listeners
    let dragControls = new DragControls(
      objects,
      this.camera,
      this.renderer.domElement
    );
		dragControls.addEventListener('dragstart', () => {
      this.rotation = false;
    } );
		dragControls.addEventListener('dragend', () => {
      this.rotation = true;
    });

    this.animate();
  }

  animate = () => {
    requestAnimationFrame(this.animate);

    if (this.rotation === false) {
      this.controls.enabled = false;
    } else {
      this.controls.enabled = true;
    }

    this.renderer.render(this.scene, this.camera);
  }

  render() {
    return (
      <div
        ref={(mount) => {this.mount = mount}}
      />
    )
  }
}
