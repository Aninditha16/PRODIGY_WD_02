let startTime, updatedTime, difference;
let tInterval;
let running = false;
let lapNumber = 1;

const timeDisplay = document.getElementById('time-display');
const startStopBtn = document.getElementById('start-stop-btn');
const lapList = document.getElementById('laps');

function startStop() {
    if (!running) {
        startTime = new Date().getTime() - (difference || 0);
        tInterval = setInterval(updateTime, 1);
        startStopBtn.innerHTML = 'Pause';
        running = true;
    } else {
        clearInterval(tInterval);
        startStopBtn.innerHTML = 'Start';
        running = false;
    }
}

function updateTime() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;
    
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);
    const milliseconds = Math.floor((difference % 1000));

    timeDisplay.innerHTML = 
        (hours ? (hours > 9 ? hours : "0" + hours) : "00") + ":" +
        (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") + ":" +
        (seconds > 9 ? seconds : "0" + seconds) + "." +
        (milliseconds > 99 ? milliseconds : milliseconds > 9 ? "0" + milliseconds : "00" + milliseconds);
}

function reset() {
    clearInterval(tInterval);
    difference = 0;
    running = false;
    timeDisplay.innerHTML = '00:00:00.000';
    startStopBtn.innerHTML = 'Start';
    lapList.innerHTML = '';
    lapNumber = 1;
}

function recordLap() {
    if (running) {
        const lapTime = timeDisplay.innerHTML;
        const li = document.createElement('li');
        li.textContent = `Lap ${lapNumber++}: ${lapTime}`;
        lapList.appendChild(li);
    }
}
