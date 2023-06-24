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

UI.listenOfflineButton(startOfflineGame)
UI.listenOnlineButton(startOnlineGame)
UI.listenRoomIdInURL(joinOnlineGame)
spheres.forEach((sphere, i) => {
    sphere.on('click', () => {
        if(map[i] !== 0) return;
        const isFirstPlayerMove = map.reduce((a, b) => a+b, 0) === 0
        if(isFirstPlayerMove !== isFirstPlayer&&isOnlineGame) return;
        map[i] = isFirstPlayerMove?1:-1;
        if(isOnlineGame) firebase.setMap(map);
        handleMove()
    })
})
function handleMove() {
    const {first, second} = countScore(map);
    UI.updateScore(first, second);
    if(!map.includes(0)){
        if(first > second){
            UI.redWinner()
        }else if(first < second){
            UI.greenWinner()
        }else{
            UI.draw()
        }
    }
    updateColors(map);
}

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



export function startOnlineGame() {
    firebase = new Firebase()
    firebase.mapListener(
        (newMap) => {
            map = newMap;
            handleMove()
        }
    )
    window.history.pushState({}, null, `?room=${firebase.roomId}`);
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

