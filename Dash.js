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

//Variables for To Do
let titles = [];
let details = [];
let yCord = 1; 
let submit = false;
let yAxis = 1;
let elementCount = 0;

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
  text('Productivity Tracker', 800, 60);

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

  if(submit){
    newTask(document.getElementById('inputtitle').value, document.getElementById('details').value);
    display(yCord);
    yCord += 51;
    submit = false;

    document.getElementById('inputtitle').value = '';
    document.getElementById('details').value = '';

  }
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

function addTask(){
  document.getElementById('newtodo').style.visibility = "visible";
}

function submitTask(){
  submit = true;

  document.getElementById('newtodo').style.visibility = "hidden";
}

function clearAll(){
  //Reset everything
  let i = 0;
  
  for(i = 0; i < titles.length; i++){
    titles.pop();
  }

  for(i = 0; i < details.length; i++){
    details.pop();
  }

  while(elementCount > 0){
    document.getElementById('check').remove();
    document.getElementById('displaytitle').remove();
    elementCount--;
  }

  yCord = 1; 
  yAxis = 1;

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

function newTask(title, detail){
  titles.push(title);
  details.push(detail);
}

function display(y){
  elementCount++;

  let button = createButton('');
  button.id('check');
  button.position(1, y);
  button.mousePressed(function check(){button.style('background-color', 'limegreen');});
  button.parent(document.getElementById('todo'));

  button.style('position', 'absolute');
  button.style('height', '49px');
  button.style('width', '49px');
  button.style('background-color', 'white');
  button.style('border', 'solid');
  button.style('border-color', '#707070');
  button.style('border-radius', '2px');

  let titleDisplay = createDiv(titles[titles.length - 1]);
  titleDisplay.id('displaytitle');
  titleDisplay.parent(document.getElementById('todo'));

  titleDisplay.style('position', 'absolute');
  titleDisplay.style('height', '43px');
  titleDisplay.style('width', '1139px');
  titleDisplay.style('margin-left', '51px');
  let pos = yAxis + "px";
  titleDisplay.style('margin-top', pos);
  yAxis += 51;
  titleDisplay.style('background-color', 'white');
  titleDisplay.style('border', 'solid');
  titleDisplay.style('border-color', '#707070');
  titleDisplay.style('border-radius', '2px');
  titleDisplay.style('font-family', 'Arial, Helvetica, sans-serif');
  titleDisplay.style('font-size', '25px');
  titleDisplay.style('color', '#707070');
  titleDisplay.style('text-align', 'center');
  //Credit (next 2 lines): https://stackoverflow.com/questions/5703552/css-center-text-horizontally-and-vertically-inside-a-div-block
  titleDisplay.style('vertical-align', 'middle');
  titleDisplay.style('line-height', '43px');

  //Credit goes to Samich for the tooltip: https://stackoverflow.com/questions/7503183/what-is-the-easiest-way-to-create-an-html-mouse-over-tool-tip
  titleDisplay.style('cursor', 'pointer');
  titleDisplay.attribute('title', details[details.length - 1]);

}
