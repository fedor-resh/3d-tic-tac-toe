const startWrapper = document.querySelector('#start_wrapper');
const onlineButton = document.querySelector('#online');
const offlineButton = document.querySelector('#offline');
const score = document.querySelector('#score');
const winner_background = document.querySelector('#winner_background');
const playAgain = document.querySelector('#play_again');
const first = score.querySelector('#first');
const second = score.querySelector('#second');
export class UI{
    static listenRoomIdInURL(joinOnlineGame) {
        const urlParams = new URLSearchParams(window.location.search);
        const roomId = urlParams.get('room');
        if(roomId) {
            joinOnlineGame(roomId)
            startWrapper.style.display = 'none';
            this.showScore()
        }
    }
    static listenOfflineButton(callback) {
        offlineButton.addEventListener('click', ()=>{
            callback()
            startWrapper.style.display = 'none';
            this.showScore()
        } )
    }
    static listenOnlineButton(callback) {
        onlineButton.addEventListener('click', ()=>{
            callback()
            startWrapper.style.display = 'none';
            this.showScore()
        } )
    }
    static showScore() {
        score.style.display = 'grid'
    }
    static updateScore(player1, player2) {
        score.querySelector('#first').innerText = player1;
        score.querySelector('#second').innerText = player2;
    }

    static redWinner() {
        winner_background.className = 'red'
        winner_background.children[0].innerText = 'Red won!'
    }
    static greenWinner() {
        winner_background.className = 'green'
        winner_background.children[0].innerText = 'Green won!'
    }
    static draw() {
        winner_background.className = 'draw'
        winner_background.children[0].innerText = 'Draw!'
    }
    static listenPlayAgain(callback) {
        playAgain.addEventListener('click', ()=>{
            callback()
            winner_background.className = ''
            winner_background.children[0].innerText = ''
        })
    }
    static greenStep() {
        second.className = 'active'
        first.className = ''
    }
    static redStep() {
        first.className = 'active'
        second.className = ''
    }
    static yourTurn(){
        score.className = 'your_turn'
    }
    static notYourTurn(){
        score.className = ''
    }
}
