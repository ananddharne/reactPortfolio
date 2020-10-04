import React, { Component } from 'react'
import * as THREE from "three";
import { loadTextAssets, createTextMaterial } from "./Text";

global.THREE = THREE;
const createGeometry = require("three-bmfont-text");
let creditsJSON = require("./TheShiningCast.json");
creditsJSON = creditsJSON.slice(1);

class Loader {
  constructor() {
    this.items = [];
    this.loaded = [];
  }
  begin(name) {
    this.items.push(name);
  }
  end(name) {
    this.loaded.push(name);
    if (this.loaded.length === this.items.length) {
      this.onComplete();
    }
  }
  onComplete() {}
}

class Scene extends Component {
  constructor(props) {
    super(props)

  }

  componentDidMount() {
    this.renderer = new THREE.WebGLRenderer({
        antialias: true
      });
      this.renderer.setSize(window.innerWidth, window.innerHeight);
      this.renderer.setPixelRatio(window.devicePixelRatio);
  
      document.body.append(this.renderer.domElement);
  
      this.camera = new THREE.PerspectiveCamera(
        45,
        window.innerWidth / window.innerHeight,
        0.1,
        10000
      );
      this.camera.position.z = 50;
      this.scene = new THREE.Scene();
      this.scene.background = new THREE.Color(0x0d0d18);
  
      this.uMouse = new THREE.Uniform(new THREE.Vector2(0, 0));
      this.uTranslate = new THREE.Uniform(new THREE.Vector2(0, 0));
  
      this.clock = new THREE.Clock();
  
      this.assets = {};
  
      this.creditsGroup = new THREE.Group();
      this.initialY = 0;
  
      this.totalTriangles = 0;
  
      this.tick = this.tick.bind(this);
      this.onResize = this.onResize.bind(this);
      this.init = this.init.bind(this);
      this.loader = new Loader();
      this.onMouseMove = this.onMouseMove.bind(this);
      this.onTouchMove = this.onTouchMove.bind(this);
      this.loadAssets().then(this.init);
    // this.start()
  }

  loadAssets() {
    const loader = this.loader;
    const assets = this.assets;
    console.log(assets);
    return new Promise((resolve, reject) => {
      loadTextAssets(assets, loader);

      loader.onComplete = () => {
        resolve();
      };
    });
  }
  createTextMesh(textOptions, material) {
    const geometry = createGeometry({
      font: this.assets.font,
      ...textOptions
    });

    return new THREE.Mesh(geometry, material);
  }
  setScaleAndPosition(mesh, scale, position, debug = false) {
    if (false) {
      mesh.scale.x = -scale;
      mesh.scale.y = scale;
      mesh.position.y = position.y;
      mesh.position.x = position.x;
    } else {
      let geometry = mesh.geometry;
      for (let i = 0; i < geometry.attributes.position.count; i++) {
        geometry.attributes.position.array[i * 2 + 0] =
          geometry.attributes.position.array[i * 2 + 0] * -scale + position.x;
        geometry.attributes.position.array[i * 2 + 1] =
          geometry.attributes.position.array[i * 2 + 1] * scale + position.y;
      }
    }
  }
  createTitle(height) {
    const viewSize = this.getViewSize();

    let marginBottom = viewSize.height / 4;
    let titleMarginBottom = 0.5;
    let titlePixelSize = 95;
    let subtitlePixelSize = 25;

    let titleFontAssets = this.assets.fonts["bold"];
    let titleGlyphsFontSize = titleFontAssets.font.info.size;
    let titleGlyphsPixelsSize =
      (titleGlyphsFontSize / viewSize.height) * window.innerHeight;
    let titleScale = titlePixelSize / titleGlyphsPixelsSize;
    titleScale =
      ((titlePixelSize / window.innerHeight) * viewSize.height) /
      titleGlyphsFontSize;

    let subtitleFontAssets = this.assets.fonts["regular"];

    let subtitleGlyphsFontSize = subtitleFontAssets.font.info.size;
    let subtitleGlyphsPixelsSize =
      (subtitleGlyphsFontSize / viewSize.height) * window.innerHeight;
    let subtitleScale = subtitlePixelSize / subtitleGlyphsPixelsSize;

    let titleMaterial = this.textMaterials[titleFontAssets.name];
    let titleMesh = this.createTextMesh(
      {
        text: "THE SHINING",
        align: "center",
        font: titleFontAssets.font,
        letterSpacing: (25 / 1000) * Math.abs(titleGlyphsFontSize)
      },
      titleMaterial
    );

    this.setScaleAndPosition(
      titleMesh,
      titleScale,
      {
        x: (titleMesh.geometry.layout.width / 2) * titleScale,
        y: titleMesh.geometry.layout.capHeight * titleScale
      },
      true
    );

    this.creditsGroup.add(titleMesh);
    let titleHeight = -titleMesh.geometry.layout.capHeight * titleScale;

    height += titleHeight + titleMarginBottom;

    let subtitleMaterial = this.textMaterials[subtitleFontAssets.name];
    let subtitleMesh = this.createTextMesh(
      {
        text: "A STANLEYs KUBRICK FILM",
        align: "center",
        font: subtitleFontAssets.font,
        letterSpacing: (75 / 1000) * Math.abs(subtitleGlyphsFontSize)
      },
      subtitleMaterial
    );

    this.setScaleAndPosition(subtitleMesh, subtitleScale, {
      x: (subtitleMesh.geometry.layout.width / 2) * subtitleScale,
      y: -height + subtitleMesh.geometry.layout.height * subtitleScale
    });
    this.creditsGroup.add(subtitleMesh);
  }
  createCredits(creditData) {
    let height = 0;

    height = this.createTitle(height);
    // return;
    creditData.forEach((job) => {
      let title = job[0];
      let people = job[1];
      let itemHeight = 0;
      if (people.length < 4) {
        itemHeight = this.createStandaloneCredit(title, people, height);
      } else itemHeight = this.createListCredit(title, people, height);
      height = itemHeight;
      return;
      // return;
    });
    this.height = height;
  }
  createMaterials() {
    const textMaterials = {};
    let fontKeys = Object.keys(this.assets.fonts);
    for (let i = 0; i < fontKeys.length; i++) {
      let key = fontKeys[i];
      textMaterials[key] = createTextMaterial(this.assets.fonts[key].glyphs, {
        uMouse: this.uMouse,
        uTranslate: this.uTranslate
      });
    }
    this.textMaterials = textMaterials;
  }
  init() {
    const viewSize = this.getViewSize();
    this.createMaterials();
    this.createCredits(creditsJSON);
    this.initialY = -viewSize.height / 2 - 5;

    this.scene.add(this.creditsGroup);

    this.tick();

    window.addEventListener("resize", this.onResize);

    window.addEventListener("mousemove", this.onMouseMove);
    window.addEventListener("touchmove", this.onTouchMove);
  }
  getViewSize() {
    const fovInRadians = (this.camera.fov * Math.PI) / 180;
    const height = Math.abs(
      this.camera.position.z * Math.tan(fovInRadians / 2) * 2
    );

    return { width: height * this.camera.aspect, height };
  }
  onMouseMove(ev) {
    const viewSize = this.getViewSize();
    let mouse = {
      x: (ev.clientX / window.innerWidth - 0.5) * viewSize.width,
      y: -(ev.clientY / window.innerHeight - 0.5) * viewSize.height
    };

    this.uMouse.value.set(mouse.x, mouse.y);
  }
  onTouchMove(ev) {
    this.onMouseMove(ev.touches[0]);
  }
  dispose() {
    this.disposed = true;
    window.removeEventListener("resize", this.onResize);
    window.removeEventListener("mousemove", this.onMouseMove);
    window.removeEventListener("touchmove", this.onTouchMove);
  }

  tick() {
    if (this.disposed) return;
    this.render();
    requestAnimationFrame(this.tick);
  }
  onResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

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
    this.renderer.render(this.scene, this.camera)
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