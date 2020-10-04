import React, { Component } from 'react'
// import earth from "images/earth.jpg"
// import moon from "images/moon.jpg"

// // Ensure ThreeJS is in global scope for the 'examples/'
// global.THREE = require("three");

// // Include any additional ThreeJS examples below
// require("three/examples/js/controls/OrbitControls");

// class Scene extends Component {
//   constructor(props) {
//     super(props)

//     this.start = this.start.bind(this)
//     this.stop = this.stop.bind(this)
//     this.animate = this.animate.bind(this)
//     this.earth = earth
//     this.moon = moon
//   }

//   componentDidMount() {
//     const width = this.mount.clientWidth
//     const height = this.mount.clientHeight

// const renderer = new THREE.WebGLRenderer({ antialias: true })
// renderer.setSize( 500, 500 );
// document.body.appendChild( renderer.domElement );
    
//       // WebGL background color
//       renderer.setClearColor("#000", 1);
    
//       // Setup a camera
//       const camera = new THREE.PerspectiveCamera(50, 1, 0.01, 100);
//       camera.position.set(4, 4, -4);
//       camera.lookAt(new THREE.Vector3());
    
//       // Setup camera controller
//       const controls = new THREE.OrbitControls(camera,renderer.domElement);
    
//       // Setup your scene
//       const scene = new THREE.Scene();
    
//       // Setup a geometry
//       const geometry = new THREE.SphereGeometry(1, 32, 16);
    
//       // Setup a loader for textures
//       const loader = new THREE.TextureLoader();
//       const earthMap = loader.load(this.earth);
//       const moonMap = loader.load(this.moon);
    
//       // Setup a material
//       const material = new THREE.MeshStandardMaterial({
//         map: earthMap,
//         metalness: 0,
//         roughness: 1
//       });
    
//       const group = new THREE.Group();
    
//       // Setup a mesh with geometry + material
//       const earth = new THREE.Mesh(geometry, material);
//       group.add(earth);
    
//       const moonMaterial = new THREE.MeshStandardMaterial({
//         map: moonMap,
//         metalness: 0,
//         roughness: 1
//       });
    
//       const moonAnchor = new THREE.Group();
//       const moon = new THREE.Mesh(geometry, moonMaterial);
//       moonAnchor.add(moon);
//       moon.position.x = -2;
//       moon.position.y = 0.5;
//       moon.scale.setScalar(0.25);
    
//       group.add(moonAnchor);
    
//       const light = new THREE.PointLight("white", 1);
//       light.position.set(2, 2, 2);
//       scene.add(light);
    
//       // scene.add(new THREE.PointLightHelper(light, 0.15));
    
//       scene.add(group);
//       this.earth = earth
//       this.moon = moon
//       this.group = group
//       this.scene = scene
//       this.camera = camera
//       this.renderer = renderer
//       this.material = material
//       this.controls = controls

//     this.mount.appendChild(this.renderer.domElement)
//     this.start()
//   }

//   componentWillUnmount() {
//     this.stop()
//     this.mount.removeChild(this.renderer.domElement)
//   }

//   start() {
//     if (!this.frameId) {
//       this.frameId = requestAnimationFrame(this.animate)
//     }
//   }

//   stop() {
//     cancelAnimationFrame(this.frameId)
//   }

//   animate() {
//     // this.cube.rotation.x += 0.01
//     // this.cube.rotation.y += 0.01
//     this.earth.rotation.y += 0.01;
//     this.moon.rotation.y +=  0.01;
//     this.group.rotation.y += 0.01;
//     // this.controls.update()
//     this.renderScene()
//     this.frameId = window.requestAnimationFrame(this.animate)
//   }

  renderScene() {
    this.renderer.render(this.scene, this.camera);
  }

  render() {
    return (
      <div
        style={{ width: '500px', height: '600px' }}
        ref={(mount) => { this.mount = mount }}
      />
    )
  }
}

export default Scene