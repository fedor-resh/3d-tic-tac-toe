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
document.addEventListener('touchmove', e => onDocumentMouseMove(e.touches[0], true), false)
document.addEventListener('mousedown', onDocumentMouseDown, false);
document.addEventListener('mouseup', onDocumentMouseUp, false);
document.addEventListener('wheel', onDocumentMouseWheel, false);

let isMouseDown = false;
const mouse = {x: 0, y: 0, prevX: 0, prevY: 0};
const cameraPosition = {dist: 5, xRotate: 10, yRotate: 10};
// view on cube
function onDocumentMouseMove(e, isTouch=false) {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
    const deltaX = mouse.x - mouse.prevX
    const deltaY = mouse.y - mouse.prevY
    if (-50<deltaX&&deltaX<50&&-50<deltaY&&deltaY<50&&(isMouseDown||isTouch)) {
        cameraPosition.xRotate -= deltaX * 0.01;
        cameraPosition.yRotate -= deltaY * 0.01;
        setCamera(cameraPosition)
    }
    mouse.prevX = mouse.x
    mouse.prevY = mouse.y
}
function setCamera(cameraPosition) {
    camera.position.x = cameraPosition.dist * Math.sin(cameraPosition.xRotate);
    camera.position.y = cameraPosition.dist * Math.sin(cameraPosition.yRotate);
    camera.position.z = cameraPosition.dist * Math.cos(cameraPosition.xRotate);
    camera.lookAt(0, 0, 0);
}
setCamera(cameraPosition)

function onDocumentMouseDown() {
    isMouseDown = true;
}

function onDocumentMouseUp() {
    isMouseDown = false;
}
function onDocumentMouseWheel(e) {
    cameraPosition.dist += e.deltaY * 0.01;
    setCamera(cameraPosition)
}
// add light
const spotLight = new THREE.SpotLight(0xeeeece);
spotLight.position.set(1000, 1000, 1000);
scene.add(spotLight);

const spotLight2 = new THREE.SpotLight(0xffffff);
spotLight2.position.set(-200, -200, 0);
scene.add(spotLight2);

export const spheres = Array(27).fill(0).map((_, i) => {
    const geometry = new THREE.SphereGeometry(.3, 32, 32);
    const material = new THREE.MeshPhongMaterial({color: 0x444444});
    const sphere = new THREE.Mesh(geometry, material);
    sphere.cursor = 'pointer';
    sphere.position.set(i%3-1, Math.floor(i/3)%3-1, Math.floor(i/9)-1);
    scene.add(sphere);
    return sphere;
})
