"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sphere = void 0;
const BABYLON = __importStar(require("babylonjs"));
const canvas = document.getElementById("canvas");
const engine = new BABYLON.Engine(canvas, true);
const scene = new BABYLON.Scene(engine);
scene.clearColor = new BABYLON.Color4(0.2, 0.2, 0.3, 1.0);
const camera = new BABYLON.ArcRotateCamera("camera", -Math.PI / 2, Math.PI / 2, 5, BABYLON.Vector3.Zero(), scene);
camera.attachControl(canvas, true);
const light = new BABYLON.PointLight("light", new BABYLON.Vector3(0, 1, 0), scene);
// Crear una malla (Mesh) y configurar su geometría
const box = BABYLON.MeshBuilder.CreateBox("box", { size: 1 }, scene);
box.position = new BABYLON.Vector3(-1, 0, 0);
const sphere = BABYLON.MeshBuilder.CreateSphere("sphere", { diameter: 1 }, scene);
exports.sphere = sphere;
sphere.position = new BABYLON.Vector3(0, 0, 0);
const triangle = BABYLON.MeshBuilder.CreatePolyhedron("triangle", { type: 1, size: 1 }, scene);
triangle.position = new BABYLON.Vector3(1, 0, 0);
let currentMesh = box;
canvas.addEventListener("click", function () {
    morphToSphere();
});
function morphToSphere() {
    const sphereClone = sphere.clone("sphereClone");
    const morphTargetManager = new BABYLON.MorphTargetManager();
    morphTargetManager.addTarget(new BABYLON.MorphTarget("box", 1));
    morphTargetManager.addTarget(new BABYLON.MorphTarget("sphere", 0));
    morphTargetManager.addTarget(new BABYLON.MorphTarget("sphereClone", 0));
    box.morphTargetManager = morphTargetManager;
    currentMesh = sphereClone;
}
const rotationSpeed = 0.01;
engine.runRenderLoop(function () {
    box.rotation.y += rotationSpeed;
    sphere.rotation.y += rotationSpeed;
    triangle.rotation.y += rotationSpeed;
    scene.render();
});
window.addEventListener("resize", function () {
    engine.resize();
});
