// draw cube with three js
import * as THREE from 'three';
import {Interaction} from 'three.interaction';

export const scene = new THREE.Scene();
export const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);
export const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth-5, window.innerHeight-5);
export const interaction = new Interaction(renderer, scene, camera);
document.body.appendChild(renderer.domElement);


const animate = function () {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

animate();

document.addEventListener('mousemove', onDocumentMouseMove, false);
document.addEventListener('mousedown', onDocumentMouseDown, false);
document.addEventListener('mouseup', onDocumentMouseUp, false);
document.addEventListener('wheel', onDocumentMouseWheel, false);

let isMouseDown = false;
const mouse = {x: 0, y: 0};
const cameraPosition = {dist: 5, xRotate: 0, yRotate: 0};
// view on cube
function onDocumentMouseMove(e) {


    e.preventDefault();
    mouse.x = e.clientX;
    mouse.y = e.clientY;
    const deltaX = e.movementX
    const deltaY = e.movementY
    if (-50<deltaX&&deltaX<50&&-50<deltaY&&deltaY<50&&isMouseDown) {
        cameraPosition.xRotate += deltaX * 0.01;
        cameraPosition.yRotate += deltaY * 0.01;
        camera.position.x = cameraPosition.dist * Math.sin(cameraPosition.xRotate);
        camera.position.y = cameraPosition.dist * Math.sin(cameraPosition.yRotate);
        camera.position.z = cameraPosition.dist * Math.cos(cameraPosition.xRotate);
        camera.lookAt(0, 0, 0);
    }
}

function onDocumentMouseDown() {
    isMouseDown = true;
}

function onDocumentMouseUp() {
    isMouseDown = false;
}
function onDocumentMouseWheel(e) {
    cameraPosition.dist += e.deltaY * 0.01;
    camera.position.x = cameraPosition.dist * Math.sin(cameraPosition.xRotate);
    camera.position.y = cameraPosition.dist * Math.sin(cameraPosition.yRotate);
    camera.position.z = cameraPosition.dist * Math.cos(cameraPosition.xRotate);
    camera.lookAt(0, 0, 0);
}
// add light
const spotLight = new THREE.SpotLight(0xeeeece);
const spotLight2 = new THREE.SpotLight(0xffffff);
spotLight.position.set(1000, 1000, 1000);
spotLight2.position.set(-200, -200, 0);
scene.add(spotLight);
scene.add(spotLight2);
