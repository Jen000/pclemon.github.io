//Javascript using the p5.js library

//Global variables
//Variables for session timer
let userTime = 0;
let timeStartSession = false;
let set = false;
let userHour = 0;
let userMinute = 0;
let userSecond = 0;
let myFrameCount = 0;
let tempFrameCount = 0;
//Variables for break timer
let pause = false;
let timeStartBreak = false;
let hour = 0;
let minute = 0;
let second = 0;
let myFrameCount2 = 0;

function setup() {
  noLoop();
  noErase();
  createCanvas(1920, windowHeight);
  background('white');

  //Page header
  fill('#707070');
  noStroke();
  rect(0, 0, 1920, 90);
  //Page title
  fill('white');
  textSize(40);
  text('Dashboard', 873, 60);

  //Outlines
  strokeWeight(3);
  stroke('#707070');
  fill('white');

  //Graphs
  rect(30, 110, 637, 392, 2);
  rect(689, 110, 637, 392, 2);

  //Timers
  rect(1339, 150, 551, 105, 2);
  rect(1339, 340, 551, 105, 2);

  //Session timer label
  noStroke();
  fill('#707070');
  text('Session Timer', 1339, 145);

  //Break label
  noStroke();
  fill('#707070');
  text('Time Since Last Break', 1339, 335);

  //Outlines
  strokeWeight(3);
  stroke('#707070');
  fill('white');
  //Top 3
  rect(30, 540, 637, 230, 2);

  //To Do
  //rect(689, 540, 1200, 383, 2);
  rect(689, 540, 1200, 40, 2);

  noStroke();
  fill('#707070');
  text('To-Do: ', 694, 575);

}

function draw(){
  loop();
  //Idea for separate frameCount variable by Amiral Betasin comment: https://www.khanacademy.org/computer-programming/framecount-processingjs/5893935759097856
  myFrameCount++; //Session Timer
  myFrameCount2++; //Break Timer
  
  sessionTimer();
  breakTimer();
}


/* Functions for html buttons */

function menu(){
  //When the menu button is clicked show menu, hide the menu button, and show the close button
  document.getElementById('menu').style.visibility = "visible"
  document.getElementById('menubutton').style.visibility = "hidden";
  document.getElementById('menuclose').style.visibility = "visible";
}
function closeMenu(){
  document.getElementById('menuclose').style.visibility = "hidden";
  document.getElementById('menubutton').style.visibility = "visible";
  document.getElementById('menu').style.visibility = "hidden";
}

function startSession(){
  let errorMessage = "Please Enter Time"
  if(userTime.value().length == 8){
    //Get rid of possible error message
    fill('white');
    stroke('white');
    textSize(30);
    text(errorMessage, 1600, 145);
    fill('white');

    //Hide the popup and button to initially set the time;
    document.getElementById('settime').style.visibility = "hidden";
    document.getElementById('timer').style.visibility = "hidden";

    removeElements();
    
    document.getElementById('displaytime').style.visibility = "visible";
    timeStartSession = true;
    pause = false;
  }
  else{
    errorMessage = "Please Enter Time";
    fill('red');
    textSize(30);
    noStroke();
    text(errorMessage, 1600, 145);
  }
  
}

function pauseTimer(){
  tempFrameCount = myFrameCount;
  pause = true;
}

function startBreak(){
  // document.getElementById('displaytimebreak').style.visibility = "visible";
  timeStartBreak = true;
}

function resetTimer(){
  timeStartBreak = false;
  myFrameCount2 = 0;
  hour = 0;
  minute = 0;
  second = 0;
  document.getElementById('displaytimebreak').innerHTML = "00:00:00"; 
}

function setTime(){
  document.getElementById('settime').style.visibility = "visible";
  document.getElementById('timer').style.visibility = "hidden";

  userTime = createInput();
  userTime.position(1400, 200);
}

//Helper functions

//Displays time for timers
function displayTime(name){
  if(name === "session"){
    let countDown = "";
    if(userHour < 10){
      countDown += "0" + userHour + ":"; 
    }
    else{
      countDown += userHour + ":"; 
    }

    if(userMinute < 10){
      countDown += "0" + userMinute + ":";
    }
    else{
      countDown += userMinute + ":";
    }

    if(userSecond < 10){
      countDown += "0" + userSecond;
    }
    else{
      countDown += userSecond;
    }
    document.getElementById('displaytime').innerHTML = countDown; 
  }
  else if(name === "break"){
    let countUp = "";
    if(hour < 10){
      countUp += "0" + hour + ":"; 
    }
    else{
      countUp += hour + ":"; 
    }

    if(minute < 10){
      countUp += "0" + minute + ":";
    }
    else{
      countUp += minute + ":";
    }

    if(second < 10){
      countUp += "0" + second;
    }
    else{
      countUp += second;
    }
    document.getElementById('displaytimebreak').innerHTML = countUp; 

  }
}

function sessionTimer(){
  //Ideas for timer from the following: https://editor.p5js.org/allison.parrish/sketches/H1__vQxiW and https://www.youtube.com/watch?v=MLtAMg9_Svw 
  if(timeStartSession == true && pause == false){
    if(!set){
      const time = userTime.value();

      userHour = parseInt(time.substring(0, 2));
      userMinute = parseInt(time.substring(3, 5));
      userSecond = parseInt(time.substring(6, 8));

      displayTime();

      set = true;
    }

    if(pause == true){
      myFrameCount = tempFrameCount;
    }

    if(myFrameCount % 60 == 0){
      if(userSecond != 0 || userMinute != 0 || userHour != 0){
        if(userSecond == 0){
          userSecond = 59;
          if(userMinute != 0){
            userMinute--;
          }
          else{
            if(userHour != 0){
              userMinute = 59;
              userHour--;
            }
          }
        }
        else{
          userSecond--;
        }
      }
      else if(userSecond == 0 && userMinute == 0 && userHour == 0){
        document.getElementById('timer').style.visibility = "visible";
        document.getElementById('displaytime').style.visibility = "hidden";
        timeStartSession = false;
        set = false;
        myFrameCount = 0;
      }
      displayTime("session");
    }
  }
}

function breakTimer(){
  //Ideas for timer from the following: https://editor.p5js.org/allison.parrish/sketches/H1__vQxiW and https://www.youtube.com/watch?v=MLtAMg9_Svw 
  if(timeStartBreak == true){
    if(myFrameCount2 % 60 == 0){
      if(second != 60 || minute != 60 || hour != 60){
        if(second == 59){
          second = 0;
          if(minute != 59){
            minute++;
          }
          else{
            minute = 0;
            hour++;
          }
        }
        else{
          second++;
        }
      }
      displayTime("break");
    }
  }
}
