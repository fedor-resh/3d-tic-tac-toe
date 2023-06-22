import {scene, renderer, camera, interaction} from "./tree_init";
import * as THREE from "three";
const colors = {
    neitral: 0x444444,
    player1: 0xff0000,
    player2: 0x00ff00
}
const spheres = Array(27).fill(0).map((_, i) => {
    const geometry = new THREE.SphereGeometry(.3, 32, 32);
    const material = new THREE.MeshPhongMaterial({color: colors.neitral});
    const sphere = new THREE.Mesh(geometry, material);
    sphere.cursor = 'pointer';
    sphere.position.set(i%3-1, Math.floor(i/3)%3-1, Math.floor(i/9)-1);
    scene.add(sphere);
    return sphere;
})
const Map = Array(27).fill(0);
spheres.forEach((sphere, i) => {
    sphere.on('click', () => {
        if(Map.reduce((a, b) => a+b, 0) === 0) {
            sphere.material.color.set(colors.player1);
            Map[i] = 1;
        }else{
            sphere.material.color.set(colors.player2);
            Map[i] = -1;
        }
    })
})