import {scene, renderer, camera, interaction, spheres} from "./three_init";
import * as THREE from "three";
import {Firebase} from "./firebase";
import {UI} from "./ui";
import {countScore} from "./count_score";

const colors = {
    neutral: 0x444444,
    player1: 0xff0000,
    player2: 0x00ff00
}


let isFirstPlayer = true;
let firebase = null
let isOnlineGame = true;

let map = Array(27).fill(0);
UI.redStep()
UI.listenOfflineButton(startOfflineGame)
UI.listenOnlineButton(startOnlineGame)
UI.listenRoomIdInURL(joinOnlineGame)
UI.listenPlayAgain(()=>{
    isFirstPlayer = !isFirstPlayer
    map = Array(27).fill(0)
    handleMove()
})
spheres.forEach((sphere, i) => {
    sphere.on('click', () => {
        if (map[i] !== 0) return;
        if (isFirstPlayerMove() !== isFirstPlayer && isOnlineGame) return;
        map[i] = isFirstPlayerMove() ? 1 : -1;
        if (isOnlineGame) firebase.setMap(map);
        handleMove()
    })
})

function handleMove() {
    const {first, second} = countScore(map);
    UI.updateScore(first, second);
    updateColors(map);
    isFirstPlayerMove() ? UI.redStep() : UI.greenStep();
    if (!map.includes(0)) handleEnd(first, second);
}

function handleEnd(first, second) {
    if (first > second) {
        UI.redWinner()
    } else if (first < second) {
        UI.greenWinner()
    } else {
        UI.draw()
    }
}
function updateColors(map) {
    map.forEach((value, i) => {
        const obj = {
            '-1': 'player2',
            '0': 'neutral',
            '1': 'player1'
        }
        spheres[i].material.color.set(colors[obj[value]]);
    })
}

function isFirstPlayerMove() {
    return map.reduce((a, b) => a + b, 0) === 0
}
export function startOnlineGame() {
    firebase = new Firebase()
    firebase.mapListener(
        (newMap) => {
            map = newMap;
            handleMove()
        }
    )
    window.history.pushState({}, null, `?room=${firebase.roomId}`);
    alert(`Share your link: ${window.location.href}`)
}

export function joinOnlineGame(roomId) {
    firebase = new Firebase(roomId)
    firebase.mapListener(
        (newMap) => {
            map = newMap;
            handleMove()
        }
    )
    isFirstPlayer = false;
}

export function startOfflineGame() {
    isOnlineGame = false;
}

