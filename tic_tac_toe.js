import {scene, renderer, camera, interaction, spheres} from "./three_init";
import * as THREE from "three";
import {Firebase} from "./firebase";

const colors = {
    neutral: 0x444444,
    player1: 0xff0000,
    player2: 0x00ff00
}

// var urlParams = new URLSearchParams(window.location.search);
// var roomId = urlParams.get('room');
let isFirstPlayer = true;
let firebase = null
let isOnlineGame = true;
export function startOnlineGame() {
    firebase = new Firebase()
    firebase.mapListener(
        (newMap) => {
            map = newMap;
            updateColors(map);
        }
    )
    window.history.pushState({}, null, `?room=${firebase.roomId}`);
}
export function joinOnlineGame(roomId) {
    firebase = new Firebase(roomId)
    firebase.mapListener(
        (newMap) => {
            map = newMap;
            updateColors(map);
        }
    )
    isFirstPlayer = false;
}

export function startOfflineGame() {
    isOnlineGame = false;
    return {isFirstPlayer: true}
}

let map = Array(27).fill(0);
spheres.forEach((sphere, i) => {
    sphere.on('click', () => {
        if(map[i] !== 0) return;
        const isFirstPlayerMove = map.reduce((a, b) => a+b, 0) === 0
        if(isFirstPlayerMove !== isFirstPlayer&&isOnlineGame) return;
        map[i] = isFirstPlayerMove?1:-1;
        if(isOnlineGame) firebase.setMap(map);
        updateColors(map);
    })
})

function updateColors(map){
    map.forEach((value, i) => {
        const obj = {
            '-1':'player2',
            '0': 'neitral',
            '1': 'player1'
        }
        spheres?.[i]?.material.color.set(colors[obj[value]]);
    })
}

