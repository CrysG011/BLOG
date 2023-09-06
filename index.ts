import * as BABYLON from 'babylonjs';

const canvas: HTMLCanvasElement = document.getElementById("canvas") as HTMLCanvasElement;
const engine: BABYLON.Engine = new BABYLON.Engine(canvas, true);

const scene: BABYLON.Scene = new BABYLON.Scene(engine);
scene.clearColor = new BABYLON.Color4(0.2, 0.2, 0.3, 1.0);
const camera: BABYLON.ArcRotateCamera = new BABYLON.ArcRotateCamera("camera", -Math.PI / 2, Math.PI / 2, 5, BABYLON.Vector3.Zero(), scene);
camera.attachControl(canvas, true);

const light: BABYLON.PointLight = new BABYLON.PointLight("light", new BABYLON.Vector3(0, 1, 0), scene);
// Crear una malla (Mesh) y configurar su geometría
const box: BABYLON.Mesh = BABYLON.MeshBuilder.CreateBox("box", { size: 1 }, scene);
box.position = new BABYLON.Vector3(-1, 0, 0);
const sphere: BABYLON.Mesh = BABYLON.MeshBuilder.CreateSphere("sphere", { diameter: 1 }, scene);
sphere.position = new BABYLON.Vector3(0, 0, 0);
export { sphere }; 
const triangle: BABYLON.Mesh = BABYLON.MeshBuilder.CreatePolyhedron("triangle", { type: 1, size: 1 }, scene);
triangle.position = new BABYLON.Vector3(1, 0, 0);

let currentMesh: BABYLON.Mesh = box;
canvas.addEventListener("click", function () {
    morphToSphere();
});

function morphToSphere(): void {
    const sphereClone: BABYLON.Mesh = sphere.clone("sphereClone");
    const morphTargetManager: BABYLON.MorphTargetManager = new BABYLON.MorphTargetManager();
    morphTargetManager.addTarget(new BABYLON.MorphTarget("box", 1));
    morphTargetManager.addTarget(new BABYLON.MorphTarget("sphere", 0));
    morphTargetManager.addTarget(new BABYLON.MorphTarget("sphereClone", 0));
    box.morphTargetManager = morphTargetManager;
    currentMesh = sphereClone;
}

const rotationSpeed: number = 0.01;
engine.runRenderLoop(function () {
    box.rotation.y += rotationSpeed;
    sphere.rotation.y += rotationSpeed;
    triangle.rotation.y += rotationSpeed;
    scene.render();
});

window.addEventListener("resize", function () {
    engine.resize();
});
