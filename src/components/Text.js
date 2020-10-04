import * as THREE from "three";

global.THREE = THREE;
const loadFont = require("load-bmfont");
const parseBmFont = require("parse-bmfont-xml");

const beVietnamRegularFont = require("./BeVietnam-Regular.ttf");
// const beVietnamRegularGlyphs = require("./static/BeVietnamRegular_0.png");

const beVietnamBoldFont = require("./BeVietnam-Bold.ttf");
// const beVietnamBoldGlyphs = require("./static/BeVietnamBold_0.png");
const fonts = [
  {
    name: "regular",
    font: beVietnamRegularFont
  },
  { name: "bold", font: beVietnamBoldFont }
];

let isXML = (string) => {
  return string.substring(0, 5) === "<?xml";
};
export const loadTextAssets = (assets, loader) => {
  // assets.font = font;
  assets.fonts = {};
  fonts.forEach((data) => {
    assets.fonts[data.name] = {
      name: data.name
    };
    if (isXML(data.font)) {
      assets.fonts[data.name].font = parseBmFont(data.font);
    } else {
      loader.begin("font-" + data.name);
      loadFont(data.font, (err, font) => {
        if (err) {
          console.error("Load Failed:", data.font, err);
          return;
        }
        loader.end("font" + data.name);
        assets.fonts[data.name].font = font;
      });
    }
    loader.begin("glyphs-" + data.name);
    var glyphsLoader = new THREE.TextureLoader();
    glyphsLoader.crossOrigin = "";
    glyphsLoader.load(data.glyphs, (glyphs) => {
      assets.fonts[data.name].glyphs = glyphs;
      loader.end("glyphs-" + data.name);
    });
  });
};

export const createTextMaterial = (glyphs, uniforms = {}) => {
  const material = new THREE.ShaderMaterial({
    transparent: true,
    side: THREE.DoubleSide,
    fragmentShader,
    vertexShader,
    // wireframe: true,
    uniforms: {
      uMap: new THREE.Uniform(glyphs),
      uColor: new THREE.Uniform(new THREE.Color(0xfafafa)),
      ...uniforms
    }
  });
  return material;
};
const fragmentShader = `
precision highp float;
uniform vec3 uColor;
uniform sampler2D uMap;
varying vec2 vUv;

void main() {
  vec3 sample = texture2D(uMap, vUv).rgb;
  gl_FragColor = vec4(uColor.xyz, sample.r);
  if (gl_FragColor.a < 0.0001) discard;
}
`;

const vertexShader = `
  uniform vec2 uTranslate;
  uniform vec2 uMouse;
  varying vec2 vUv;
  void main() {
    vUv = uv;
    vec3 pos = position.xyz;
    pos.xy += uTranslate.xy;

    vec2 rel = uMouse- pos.xy ;
    float dis = length(rel);
    float maxDist = 10.;
    if (dis < maxDist) {
      float angle = atan(rel.y, rel.x);
      float reversedSmoothDist = smoothstep(maxDist,0.,dis);
      float amp = 15.;
      pos.zy += vec2(cos(angle)*reversedSmoothDist*amp,sin(angle)*reversedSmoothDist*amp);
    }
    // pos.xy+= uMouse*0.1;
    pos.xy -= uTranslate.xy;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos,1.);
  }
`;
