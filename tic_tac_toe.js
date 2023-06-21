import {scene, renderer, camera, interaction} from "./tree_init";
import * as THREE from "three";

const spheres = Array(27).fill(0).map((_, i) => {
    const geometry = new THREE.SphereGeometry(.3, 32, 32);
    const material = new THREE.MeshPhongMaterial({color: 0xff0000});
    const sphere = new THREE.Mesh(geometry, material);
    sphere.cursor = 'pointer';
    sphere.position.set(i%3-1, Math.floor(i/3)%3-1, Math.floor(i/9)-1);
    scene.add(sphere);
    return sphere;
})

spheres.forEach((sphere, i) => {
    sphere.on('click', () => {
        sphere.material.color.setHex(0x00ff00);
    })
})