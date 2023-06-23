import {startOnlineGame, joinOnlineGame, startOfflineGame} from './tic_tac_toe'
const startWrapper = document.querySelector('#start_wrapper');
const onlineButton = document.querySelector('#online');
const offlineButton = document.querySelector('#offline');

onlineButton.addEventListener('click', ()=>{
    startOnlineGame()
    startWrapper.style.display = 'none';
} )
offlineButton.addEventListener('click', ()=>{
    startOfflineGame()
    startWrapper.style.display = 'none';
})

const urlParams = new URLSearchParams(window.location.search);
const roomId = urlParams.get('room');
if(roomId) {
    joinOnlineGame(roomId)
    startWrapper.style.display = 'none';
}