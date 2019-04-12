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

      // move the camera closer
      camera.position.setZ(camera.position.z + 1);

      // lets rotate the shapes each frame
      for (let shape of shapes) {
        shape.rotateX(0.005);
        shape.rotateY(0.005);

        // move each individual shape closer BAD PRACTICE 
        // shape.position.setZ(shape.position.z - 1);
      }
    };

    // start the animation
    animate();

    let hue = 0;

    // lets make a function that creats a shape
    const createShape = function (x, y) {
      const geometries = [
        new THREE.ConeGeometry(10, 20, 30),
        new THREE.BoxGeometry(15, 15, 15),
        new THREE.TorusGeometry(5, 6, 16, 100),
        new THREE.SphereGeometry(5, 32, 32),
      ];

      const randNumber = Math.floor(Math.random() * geometries.length);

      // geometry is the 'shape' of the shape
      const geometry = geometries[randNumber];
      // material is the thing that gets effected by the light

      const emissiveColor = new THREE.Color(`hsl(${hue}, 100%, 50%)`)

      const material = new THREE.MeshLambertMaterial({
        // white
        color: 0xffffff,
        // red
        emissive: emissiveColor
      });

      const shape = new THREE.Mesh(geometry, material);

      // z index of the position makes the shape farther away
      shape.position.set(
        (window.innerWidth / 2) - x, 
        (window.innerHeight / 2) - y,
        // the shapes will always draw in the distance, 500 px from the camera, because the camera is moving towards the shapes, the shapes aren't moving towards the camera
        camera.position.z + 500
      );
      shape.rotateX(0.5);
      shape.rotateZ(0.5);

      // add the shape to the scene and the list of shapes 
      shapes.push(shape);
      scene.add(shape);

      // update the hue that gets passed to the hsl color thingy
      hue += 1;

      console.log(shapes)

    }

    let isMouseDown = false;

    document.addEventListener('mousemove', function(event) {
      // create the shape based on x and y
      if (isMouseDown) {
        createShape(event.pageX, event.pageY);
      }
    })

    document.addEventListener('mousedown', function (event) {
      isMouseDown = true;
    })

    document.addEventListener('mouseup', function (event) {
      isMouseDown = false;
    })

    // for mobile and tablet
    document.addEventListener('touchmove', function (event) {
      if (isMouseDown) {
        createShape(event.pageX, event.pageY);
      }
    })

    document.addEventListener('touchstart', function (event) {
      isMouseDown = true;
    })

    document.addEventListener('touchend', function (event) {
      isMouseDown = false;
    })

    window.addEventListener('resize', function() {
      camera.aspect = window.innerWidth / window.innerHeight;
      // must do when messing with the camera stuff
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight);
    })

  }
  
  render() {
    return (
      <div className="ProjectFour">
        <section id="ProjectFour__section"></section>
      </div>
    );
  }
}

export default ProjectFour;
