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

//Variables for graph one
let graph1;
let labeled1 = false;
let increment1 = 1;
let bars = [];
let myFrameCountProgram1 = 0;
let newProgram = true;
let endTracking = true;
let programIndex = 0;
let programMinute = 0;
let limitGraph1 = 12;

//Variables for graph two
let graph2;
let increment2 = 1;
let barGroups = [];
let label2 = false;
let limitGraph2 = 6;
let originalTime = 0;

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
  rect(30, 540, 637, 220, 2);

  noStroke();
  fill('#707070');
  text('Top Three Most Used Apps', 90, 575);

  textSize(35);
  text('1) ', 35, 630);
  text('2) ', 35, 685);
  text('3) ', 35, 740);

  stroke('#707070');
  line(32, 587, 665, 587);

  line(32, 643.75, 665, 643.75);
  line(32, 700.75, 665, 700.75);

  //To Do
  noFill();
  stroke('#707070')
  rect(689, 540, 1200, 40, 2);

  noStroke();
  fill('#707070');
  text('To-Do:', 694, 575);

  textSize(20);
  text('(Hover over a task for details)', 820, 575);

  graph1 = new Graph(1);
  graph1.yAxisNumbers(increment1, 1);
  labeled1 = true;

  graph2 = new Graph(2);
  graph2.yAxisNumbers(increment2, 2);
  labeled2 = true;
}

function draw(){
  loop();

  if(labeled1 == false){
    graph1.yAxisNumbers(increment1, 1);
    labeled1 = true;
  }

  if(labeled2 == false){
    graph2.yAxisNumbers(increment2, 2);
    labeled2 = true;
  }

  //Idea for separate frameCount variable by Amiral Betasin comment: https://www.khanacademy.org/computer-programming/framecount-processingjs/5893935759097856
  myFrameCount++; //Session Timer
  myFrameCount2++; //Break Timer
  myFrameCountProgram1++; //leftmost graph
  
  sessionTimer();
  breakTimer();

  if(submit){
    newTask(document.getElementById('inputtitle').value, document.getElementById('details').value);
    display(yCord);
    yCord += 51;
    submit = false;

    //Clearing text field credit to reminder on https://www.sitepoint.com/community/t/how-to-reset-all-form-fields-when-reloading-refreshing-page/1822
    document.getElementById('inputtitle').value = '';
    document.getElementById('details').value = '';
  }

  if(endTracking == false){
    if(bars.length > limitGraph1){
      graph1.updateXAxisLength();
      limitGraph1 = limitGraph1 * 2;
    }
    if(myFrameCountProgram1 % 3600 == 0){
      programMinute++;
      bars[programIndex].updateBar(increment1, programMinute);
      if(bars[programIndex].getTime() >= increment1 * 240){
        increment1++;
        bars[programIndex].updateBar(increment1, programMinute);
        labeled1 = false;
      }
    }
  }

  if(bars.length >= 3){
    mostUsed(bars);
  }

}


/* Functions for html buttons */

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

    userTime.remove();
    
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

function addProgram(){
  document.getElementById('program').value = "";
  document.getElementById('programpopup').style.visibility = "visible";
}

function submitProgram(){
  
  document.getElementById('programpopup').style.visibility = "hidden";
  document.getElementById('addprogrambutton').style.visibility = "hidden";
  document.getElementById('endprogrambutton').style.visibility = "visible";

  for(let i = 0; i < bars.length; i++){
    //Getting the value from a text field: https://www.w3schools.com/jsref/tryit.asp?filename=tryjsref_text_get
    let name = bars[i].getName().toLowerCase();
    let temp = document.getElementById('program').value.toLowerCase();

    //Checks if the entered program to track has already been tracked
    if(name === temp){
      newProgram = false;
      programIndex = i;
      originalTime = bars[i].getTime();

      //Sets up lefttmost graph
      myFrameCountProgram1 = bars[i].getFrameCount();
      programMinute = bars[i].getTime();
    }
  }

  //If the entered program hasn't already been tracked
  if(newProgram == true){
    bars.push(new Bar(document.getElementById('program').value, bars.length + 1));
    barGroups.push(new BarGroup(document.getElementById('program').value, barGroups.length +1 ));

    programIndex = bars.length - 1;
    myFrameCountProgram1 = 0;
    programMinute = 0;
    originalTime = 0;
  }

  newProgram = true;
  endTracking = false;
  document.getElementById('program').value = "";
  
}

function endProgram(){
  let instructionsString = " ";

  document.getElementById('endprogrambutton').style.visibility = "hidden";
  document.getElementById('addprogrambutton').style.visibility = "visible";
  endTracking = true;

  bars[programIndex].setFrameCount(myFrameCountProgram1);

  document.getElementById('time').value = '';

  if(originalTime == 0){
    instructionsString = "How much of the last " + bars[programIndex].getTime() + " minutes did you work in " + bars[programIndex].getName() + "?";
  }
  else if(originalTime != 0){
    instructionsString = "How much of the last " + (bars[programIndex].getTime() - originalTime) + " minutes did you work in " + bars[programIndex].getName() + "?";
  }
 
  document.getElementById('workinstructions').innerHTML = instructionsString;

  document.getElementById('worktime').style.visibility = "visible";
}

function submitTime(){
  let newTime = 0;
  let errorString = "Enter a time between 0 and " + bars[programIndex].getTime();
  let enteredWorkTime = Number(document.getElementById('time').value);
  let otherTime = 0;

  if(originalTime != 0){
    errorString = "Enter a time between 0 and " + newTime;
  }  

  if(enteredWorkTime >= 0 && enteredWorkTime <= bars[programIndex].getTime()){
    document.getElementById('error').style.visibility = "hidden";
    document.getElementById('worktime').style.visibility = "hidden";
    document.getElementById('addprogrambutton').style.visibility = "visible";

    if(originalTime != 0){
      newTime = bars[programIndex].getTime() - originalTime;
      otherTime = newTime - enteredWorkTime;
    }
    else if(originalTime == 0){
      otherTime = bars[programIndex].getTime() - enteredWorkTime;
    }

    barGroups[programIndex].updateWorkBar(increment2, enteredWorkTime);
    barGroups[programIndex].updateOtherBar(increment2, otherTime);

    if(barGroups.length > limitGraph2){
      graph2.updateXAxisLength();
      limitGraph2 = limitGraph2 * 2;
    }

    if(barGroups[programIndex].getWorkTime() >= increment2 * 240 || barGroups[programIndex].getOtherTime() >= increment2 * 240 ){
      increment2++;
      labeled2 = false;
    }
  }
  else{
    document.getElementById('error').innerHTML = errorString;
    document.getElementById('error').style.visibility = "visible";
  }
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

//Logic for the session timer
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

//Logic for the break timer
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

//Adds a new task
function newTask(title, detail){
  titles.push(title);
  details.push(detail);
}

//Used to display the to do list
function display(y){
  elementCount++;

  let button = createButton('');
  button.id('check');
  button.position(1, y);
  button.mousePressed(function check(){button.style('background-color', '#66ff66');});
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
  if(details[details.length - 1] == ""){
    details[details.length - 1] = "N/A";
  }
  titleDisplay.attribute('title', details[details.length - 1]);

}

//Finds the 3 most used apps
function mostUsed(apps){
  //Credit for line next line Saket: https://stackoverflow.com/questions/7486085/copy-array-by-value
  let temp = apps.slice();
  let mostUsedApps = [];
  let i = 0;
  let firstProgram = temp[0];
  let secondProgram;
  let thirdProgram;
  let saveIndex = 0;
  //Find the MOST used app
  for(i = 0; i < temp.length; i++){
    if(firstProgram.getTime() < temp[i].getTime()){
      firstProgram = temp[i];
      saveIndex = i;
    }
  }
  temp.splice(saveIndex, 1);
  mostUsedApps.push(firstProgram.getName());

  //Find the second most used app
  if(temp.length != 0){
    secondProgram = temp[0];
    saveIndex = 0;
    for(i = 0; i < temp.length; i++){
      if(secondProgram.getTime() < temp[i].getTime()){
        secondProgram = temp[i];
        saveIndex = i;
      }
    }
    temp.splice(saveIndex, 1);
    mostUsedApps.push(secondProgram.getName());
  }

  //Find the third most used app
  if(temp.length != 0){
    thirdProgram = temp[0];
    saveIndex = 0;
    for(i = 0; i < temp.length; i++){
      if(thirdProgram.getTime() < temp[i].getTime()){
        thirdProgram = temp[i];
        saveIndex = i;
      }
    }
    mostUsedApps.push(thirdProgram.getName());
  }

  displayMostUsed(mostUsedApps)
}

//Displays the three most used apps
function displayMostUsed(apps){
  document.getElementById('first').innerHTML = apps[0];
  document.getElementById('second').innerHTML = apps[1];
  document.getElementById('third').innerHTML = apps[2];   
}
