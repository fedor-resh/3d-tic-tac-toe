export class Timer {
    seconds = 120
    interval = null
    constructor(callback) {
        callback(Timer.getClock(this.seconds))
        this.interval = setInterval(()=>{
            callback(Timer.getClock(this.seconds))
            this.seconds--
        }, 1000)
    }
    stopTimer() {
        clearInterval(this.interval)
    }
    static getClock(seconds) {
        let minutes = Math.floor(seconds / 60)
        let seconds_ = seconds % 60
        if (seconds_ < 10)
            seconds_ = '0' + seconds_
        return `${minutes}:${seconds_}`
    }
}