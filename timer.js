export class Timer {
    timer = null;
    constructor() {
        this.start = Date.now();
    }
    startTimer() {

    }
    stopTimer() {

    }
    everySecond(callback) {
        callback(this.timer)
    }
}