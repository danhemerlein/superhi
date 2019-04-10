import React, { Component } from 'react';
import * as THREE from "three";

import './ProjectFour.scss';

class ProjectFour extends Component {

  componentDidMount() {
    // set up a renderer
    const renderer = new THREE.WebGLRenderer({
      // make it crispy
      antialias: true,
    });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    // three colors look like 0x 
    renderer.setClearColor(0x333333, 1);

    // find the element to add the renderer to
    const section = document.getElementById("ProjectFour__section");
    section.appendChild(renderer.domElement);

    // create a scene
    const scene  = new THREE.Scene();

    // create a camera
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 5000);

    camera.position.z = -50;
    camera.lookAt(scene.position);

    // add some lighting
    const light = new THREE.DirectionalLight(0xffffff, 1);

    // overwrite the postioning of the lighting 
    light.position.set(0, 0, -1);

    scene.add(light);

    // hold some data about the shapes being added
    const shapes = [];

    // add in an animation loop
    const animate = function () {
      renderer.render(scene, camera)
      requestAnimationFrame(animate);

      // lets rotate the shapes each frame
      for (let shape of shapes) {
        shape.rotateX(0.005);
        shape.rotateY(0.005);
      }
    };

    // start the animation
    animate();

    // lets make a function that creats a shape
    const createShape = function (x, y) {
      // geometry is the 'shape' of the shape
      const geometry = new THREE.ConeGeometry(10, 15, 32);
      // material is the thing that gets effected by the light
      const material = new THREE.MeshLambertMaterial({
        color: 0xffffff,
        emissive: 0xff0000
      });
      const shape = new THREE.Mesh(geometry, material);
      // z index of the position makes the shape farther away
      shape.position.set((window.innerWidth / 2) - x, (window.innerHeight / 2) - y, 400);
      shape.rotateX(0.5);
      shape.rotateZ(0.5);

      // add the shape to the scene and the list of shapes 
      shapes.push(shape);
      scene.add(shape);
    }

    // lets do things on a click
    document.addEventListener('click', function(event) {
      // creat the shape based on x and y
      createShape(event.pageX, event.pageY);
    })
    createShape(50, 50);

  }
  
  render() {
    return (
      <div className="ProjectFour">
        <section id="ProjectFour__section">



        </section>
      </div>
    );
  }
}

export default ProjectFour;
