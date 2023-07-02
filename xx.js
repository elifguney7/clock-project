//Pomodro

let sTime;
let bTime;
let timerInterval;
let isStudyTime = true;

function setSTime() {
  sTime = document.getElementById("studyTime").value;

  if (isNaN(sTime) || sTime < 1 || sTime > 90) {
    alert("Please select between 1 and 90");
  } else {
    let sText = "You'll study for " + sTime + " minutes.";
    document.getElementById("responseText").innerHTML = sText;
  }
}

function setBTime() {
  bTime = document.getElementById("breakTime").value;

  if (isNaN(bTime) || bTime < 1 || bTime > 30) {
    alert("Please select between 1 and 30");
  } else {
    let bText = " After that, you can relax for " + bTime + " minutes.";
    document.getElementById("responseText").innerHTML += bText;
  }
}

const FULL_DASH_ARRAY = 283;

const COLOR_CODES = {
  study: {
    color: "pink"
  },
  break: {
    color: "blue"
  }
};

let remainingPathColor;

document.addEventListener('DOMContentLoaded', function () {
  let timeLeft = 0;

  document.getElementById("app").innerHTML = `
    <div class="pcontainer">
      <button type="button" class="pomodoroButton">Start</button>
      <div class="base-timer">
        <svg class="base-timer__svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <g class="base-timer__circle">
            <circle class="base-timer__path-elapsed" cx="50" cy="50" r="45" />
            <path
              id="base-timer-path-remaining"
              stroke-dasharray="${FULL_DASH_ARRAY}"
              class="base-timer__path-remaining ${remainingPathColor}"
              d="
                M 50, 50
                m -45, 0
                a 45,45 0 1,0 90,0
                a 45,45 0 1,0 -90,0
              "
            ></path>
          </g>
        </svg>
        <span id="base-timer-label" class="base-timer__label">
          ${formatTimeLeft(timeLeft)}
        </span>
      </div>
    </div>
  `;

  const startButton = document.querySelector('.pomodoroButton');
  startButton.addEventListener('click', startPomodoro);

  function startPomodoro() {
    if (isStudyTime) {
      startTimer(sTime * 60, COLOR_CODES.study.color);
    } else {
      startTimer(bTime * 60, COLOR_CODES.break.color);
    }
  }

  function startTimer(timeLimit, color) {
    clearInterval(timerInterval);
    remainingPathColor = color;
    document.getElementById("base-timer-path-remaining").style.stroke = remainingPathColor;

    timeLeft = timeLimit;
    timerInterval = setInterval(() => {
      timeLeft -= 1;
      document.getElementById("base-timer-label").innerHTML = formatTimeLeft(timeLeft);
      setCircleDasharray(timeLimit, timeLeft);

      if (timeLeft === 0) {
        clearInterval(timerInterval);
        onTimesUp();
        if (isStudyTime) {
          isStudyTime = false;
          startPomodoro();
        } else {
          isStudyTime = true;
          startPomodoro();
        }
      }
    }, 1000);
  }

  function formatTimeLeft(time) {
    const minutes = Math.floor(time / 60);
    let seconds = time % 60;
    if (seconds < 10) {
      seconds = `0${seconds}`;
    }
    return `${minutes}:${seconds}`;
  }

  function calculateTimeFraction(timeLimit, timeLeft) {
    const rawTimeFraction = timeLeft / timeLimit;
    return rawTimeFraction - (1 / timeLimit) * (1 - rawTimeFraction);
  }

  function setCircleDasharray(timeLimit, timeLeft) {
    const circleDasharray = `${(calculateTimeFraction(timeLimit, timeLeft) * FULL_DASH_ARRAY).toFixed(0)} ${FULL_DASH_ARRAY}`;
    document.getElementById("base-timer-path-remaining").setAttribute("stroke-dasharray", circleDasharray);
  }

  function onTimesUp() {
    remainingPathColor = isStudyTime ? COLOR_CODES.study.color : COLOR_CODES.break.color;
    document.getElementById("base-timer-path-remaining").style.stroke = remainingPathColor;
  }
});






//Countdown
function createCountdown(){    
    let dayTime = document.getElementById("day").value;    
    let hourTime = document.getElementById("hour").value;
    let minuteTime = document.getElementById("minute").value;
    let secondTime = document.getElementById("second").value;
    secondTime = secondTime < 10 ? "0" + secondTime : secondTime;
    minuteTime = minuteTime < 10 ? "0" + minuteTime : minuteTime;
    hourTime = hourTime < 10 ? "0" + hourTime : hourTime;
    dayTime = dayTime < 10 ? "0" + dayTime : dayTime;

   
    
    pageCountdown.innerHTML = `${dayTime}:${hourTime}:${minuteTime}:${secondTime} `;
    const countDown = setInterval(()=>{
        secondTime--;
        secondTime = secondTime < 10 ? "0" + secondTime : secondTime;
        pageCountdown.innerHTML = `${dayTime}:${hourTime}:${minuteTime}:${secondTime} `;        

       
        if(dayTime==0 && hourTime==0 && minuteTime==0 && secondTime==0){           
            document.getElementById("alertSound").play();           
            pageCountdown.innerHTML = `00:00:00:00 `;            
            clearInterval(countDown);
        }

        if(hourTime == 0 && minuteTime == 0 && secondTime == 0 ){
            dayTime--;
            hourTime=24;
        }

        if(minuteTime == 0 && secondTime == 0 ){
            hourTime--;
            minuteTime=60;
        }
        
        if(secondTime == 0 ){            
            minuteTime--;
            minuteTime = minuteTime < 10 ? "0" + minuteTime : minuteTime;
            secondTime=60;
        }        
    },1000) 
}  


//Stopwatch
let hour = "0" + 0;
let min ="0" + 0;
let sec ="0" + 0;
let ms = "0" + 0;
let number = 0;
let startTimer;

const startBtn = document.querySelector(".start");
const stopBtn = document.querySelector(".stop");
let resetBtn = document.querySelector(".reset");
let saveBtn = document.querySelector(".save");
let deleteBtn = document.querySelector(".delete");

startBtn.addEventListener("click", start);
stopBtn.addEventListener("click", stop);
resetBtn.addEventListener("click", reset);
saveBtn.addEventListener("click", save);
deleteBtn.addEventListener("click", deleteR);

saveBtn.classList.add("active");
deleteBtn.classList.add("active");


function start() {   

    startBtn.classList.add("active");
    stopBtn.classList.remove("stopActive");
    saveBtn.classList.remove("active");
    deleteBtn.classList.remove("active");


    startTimer = setInterval(()=>{ 
        ms++;
        ms = ms < 10 ? "0" + ms : ms;

        if(ms == 100){            
            sec++;
            sec = sec < 10 ? "0" + sec : sec;
            ms = "0" + 0;        
        }

        if(sec == 60){            
            min++;           
            min = min < 10 ? "0" + min : min;
            sec = "0" + 0;            
        }
        if(min == 60){
            hour++;
            hour = hour < 10 ? "0" + hour : hour;
            min = "0" + 0;          
        }
        putValue();
    }, 10);
}

function stop() {
    startBtn.classList.remove("active");
    stopBtn.classList.add("stopActive");    
    clearInterval(startTimer);
}

function reset() {    
    startBtn.classList.remove("active");
    stopBtn.classList.remove("stopActive");
    saveBtn.classList.add("active");    
    clearInterval(startTimer);
    hour = min = sec = ms = "0" + 0;
    putValue();
}


function save (){
    number++;
    console.log(number);
    const saveScreen = document.querySelector(".saveReport");

    const saveLine = document.createElement('div');
    saveLine.setAttribute('id','reportLine');
    

    const listNumber = document.createElement('span');
    listNumber.textContent = number + "- ";

    const savedTime = document.createElement('span');
    savedTime.textContent = hour + ":" + min + ":" + sec + ":" + ms;

    saveLine.appendChild(listNumber);
    saveLine.appendChild(savedTime);    

    saveScreen.appendChild(saveLine);
}

function deleteR() {
    for(i=0 ; i<number; i++){
        const deleted = document.getElementById("reportLine");
        deleted.remove();
    }
    number = 0;
}

function putValue() {
    document.querySelector(".millisecond").innerText = ms;
    document.querySelector(".second").innerText = sec;
    document.querySelector(".minute").innerText = min;
    document.querySelector(".hour").innerText = hour;
}
