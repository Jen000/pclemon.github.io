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

//This function is part of p5.js and runs once
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
  text('Top Three Most Used Programs', 60, 575);

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

  //Creates the two graphs
  graph1 = new Graph(1); //Time in app
  graph1.yAxisNumbers(increment1, 1);
  labeled1 = true;

  graph2 = new Graph(2); //How you spend your time
  graph2.yAxisNumbers(increment2, 2);
  labeled2 = true;
}

//This function is part of p5.js and continuously runs
function draw(){
  loop();

  //If the increment of time on the y-axis changes then set update the y-axis labels (numbers)
  if(labeled1 == false){ //Time in app
    graph1.yAxisNumbers(increment1, 1);
    labeled1 = true;
  }

  if(labeled2 == false){ //How you spend your time
    graph2.yAxisNumbers(increment2, 2);
    labeled2 = true;
  }

  /* Idea for separate frameCount variable by Amiral Betasin comment: https://www.khanacademy.org/computer-programming/framecount-processingjs/5893935759097856 */
  //Individual framecounts for all elements that track the passage of time
  myFrameCount++; //Session Timer
  myFrameCount2++; //Break Timer
  myFrameCountProgram1++; //leftmost graph

  //Displays and calculates time for the session timer and break timer respectfully
  sessionTimer();
  breakTimer();

  //If a new task has been added to the to do list then create the task and display it
  if(submit){
    newTask(document.getElementById('inputtitle').value, document.getElementById('details').value);
    display(yCord);
    yCord += 51;
    submit = false;

    /* Clearing text field credit to reminder on https://www.sitepoint.com/community/t/how-to-reset-all-form-fields-when-reloading-refreshing-page/1822 */
    //Clears the text entry fields for the to do list
    document.getElementById('inputtitle').value = '';
    document.getElementById('details').value = '';
  }

  //Continues tracking the time spent in a program until the user ends tracking that program
  if(endTracking == false){
    //If the number of bars exceeds the length of the x-axis the extend the x-axis
    if(bars.length > limitGraph1){
      graph1.updateXAxisLength();
      limitGraph1 = limitGraph1 * 2;
    }
    //Checks to see if a minute passes (60 fps) * 60 seconds = 3600 frames per minute
    if(myFrameCountProgram1 % 3600 == 0){
      //Increases the counter and updates the bar
      programMinute++;
      bars[programIndex].updateBar(increment1, programMinute);
      //Checks to see if the bar exceeds the maximum amount of time on the y-axis and updates it if it does
      if(bars[programIndex].getTime() >= increment1 * 240){
        increment1++;
        bars[programIndex].updateBar(increment1, programMinute);
        labeled1 = false;
      }
    }
  }

  //If the user has tracked 3 or more programs then update the most used apps list
  if(bars.length >= 3){
    mostUsed(bars);
  }

}


//Functions for html buttons

//Starts the sessions timer (play button on session timer)
function startSession(){
  let errorMessage = "Please Enter Time"
  //If the time is entered correctly then....
  if(userTime.value().length == 8){
    //Get rid of possible error message
    fill('white');
    stroke('white');
    textSize(30);
    text(errorMessage, 1600, 145);
    fill('white');

    //Hide the popup and button to initially set the time
    document.getElementById('settime').style.visibility = "hidden";
    document.getElementById('timer').style.visibility = "hidden";

    //Removes the text field where the time was entered
    userTime.remove();
    
    //Displays the timer
    document.getElementById('displaytime').style.visibility = "visible";

    //Sets the flag to start the session to true and sets the pause timer to false
    timeStartSession = true;
    pause = false;
  }
  //Otherwise dipslays an error message
  else{
    errorMessage = "Please Enter Time";
    fill('red');
    textSize(30);
    noStroke();
    text(errorMessage, 1600, 145);
  }
  
}

//Pause the sesion timer (pause button on session timer)
function pauseTimer(){
  //Saves the framecount variable
  tempFrameCount = myFrameCount;
  //Sets the pause flag to true
  pause = true;
}

//Starts the break timer (play button on break timer)
function startBreak(){
  //Set the start break flag to true
  timeStartBreak = true;
}

//Resets the break timer (reset button on break timer)
function resetTimer(){
  //Set the start break flag to false
  timeStartBreak = false;
  //All variables back to zero
  myFrameCount2 = 0;
  hour = 0;
  minute = 0;
  second = 0;

  //Sets the timer display back to zero
  document.getElementById('displaytimebreak').innerHTML = "00:00:00"; 
}

//Button to set the session timer (set time button on session timer)
function setTime(){
  //Makes the input visible and hides the button
  document.getElementById('settime').style.visibility = "visible";
  document.getElementById('timer').style.visibility = "hidden";

  //Creates text input for the timer and postions on the screen
  userTime = createInput();
  userTime.position(1400, 200);
}

//Makes the input for a new to do list task visible (add task button on to do list)
function addTask(){
  document.getElementById('newtodo').style.visibility = "visible";
}

//Submit button for a new task (submit on new task pop up)
function submitTask(){
  //Sets the submit flag true so that I know a new task has been entered
  submit = true;

  //Hides the text input for a new task
  document.getElementById('newtodo').style.visibility = "hidden";
}

//Clears the to do list
function clearAll(){
  //Reset everything
  let i = 0;
  
  //Pops everything off the to do list titles array
  for(i = 0; i < titles.length; i++){
    titles.pop();
  }

  //Pops everything off the to do list details array
  for(i = 0; i < details.length; i++){
    details.pop();
  }

  //Removes all the checkbox for the tasks and the divs to display the tasks
  while(elementCount > 0){
    document.getElementById('check').remove();
    document.getElementById('displaytitle').remove();
    elementCount--;
  }

  //Reset variables to display to do list tasks
  yCord = 1; 
  yAxis = 1;

}

//"Tracks" a program (Add program to track button on Time in program graph)
function addProgram(){
  //Resets the text field to enter the program name and makes the pop up to add the program name visible
  document.getElementById('program').value = "";
  document.getElementById('programpopup').style.visibility = "visible";
}

//Submit a new program to track (submit on new program pop up)
function submitProgram(){ 
  //Makes the pop up visible, hides the add program button, and makes the end program button visible
  document.getElementById('programpopup').style.visibility = "hidden";
  document.getElementById('addprogrambutton').style.visibility = "hidden";
  document.getElementById('endprogrambutton').style.visibility = "visible";

  //Checks if the entered program has been tracked
  for(let i = 0; i < bars.length; i++){
    /* Getting the value from a text field: https://www.w3schools.com/jsref/tryit.asp?filename=tryjsref_text_get */
    let name = bars[i].getName().toLowerCase();
    let temp = document.getElementById('program').value.toLowerCase();

    //Checks if the entered program to track has already been tracked
    if(name === temp){
      //Set the new program flag to false
      newProgram = false;
      programIndex = i;
      originalTime = bars[i].getTime();

      //Sets up time in program graph
      myFrameCountProgram1 = bars[i].getFrameCount();
      programMinute = bars[i].getTime();
    }
  }

  //If the entered program hasn't already been tracked then create new bars and reset all needed variables to track the time
  if(newProgram == true){
    bars.push(new Bar(document.getElementById('program').value, bars.length + 1));
    barGroups.push(new BarGroup(document.getElementById('program').value, barGroups.length +1 ));

    programIndex = bars.length - 1;
    myFrameCountProgram1 = 0;
    programMinute = 0;
    originalTime = 0;
  }

  //Set new program flag to true, end tracking flag to false, and reset the text field
  newProgram = true;
  endTracking = false;
  document.getElementById('program').value = "";
  
}

//Ends tracking a program (end program button on time in program graph)
function endProgram(){
  let instructionsString = " "; //Asks the user how much of the ______ minutes did you work

  //Hides the end program button and makes the add program button visible
  document.getElementById('endprogrambutton').style.visibility = "hidden";
  document.getElementById('addprogrambutton').style.visibility = "visible";
  endTracking = true;

  //Sets the framecount for that bar/program
  bars[programIndex].setFrameCount(myFrameCountProgram1);

  //Reset the input area
  document.getElementById('time').value = '';

  //If the program hasn't been tracked before then use the time for that bar/program
  if(originalTime == 0){
    instructionsString = "How much of the last " + bars[programIndex].getTime() + " minutes did you work in " + bars[programIndex].getName() + "?";
  }
  //If it has been used before then get the time by subtracting the time spent in the previous session from the total time spent 
  else if(originalTime != 0){
    instructionsString = "How much of the last " + (bars[programIndex].getTime() - originalTime) + " minutes did you work in " + bars[programIndex].getName() + "?";
  }
 
  //Display the instruction to the user
  document.getElementById('workinstructions').innerHTML = instructionsString;

  //Make the pop up visible
  document.getElementById('worktime').style.visibility = "visible";
}

//Submit the time spent working (submit button on the pop up to enter the time spent working)
function submitTime(){
  let newTime = 0;
  let errorString = "Enter a time between 0 and " + bars[programIndex].getTime();
  let enteredWorkTime = Number(document.getElementById('time').value);
  let otherTime = 0;

  //Sets the error message with the correct amount of time if the program has been tracked before
  if(originalTime != 0){
    errorString = "Enter a time between 0 and " + newTime;
  }  

  //If the entered amount of time is greater then or equal to zero and less than to the amount of time spent in the app the input in valid
  if(enteredWorkTime >= 0 && enteredWorkTime <= bars[programIndex].getTime()){
    //Hides error message, hides popup, and makes the add program button visible
    document.getElementById('error').style.visibility = "hidden";
    document.getElementById('worktime').style.visibility = "hidden";
    document.getElementById('addprogrambutton').style.visibility = "visible";

    //If the program has been tracked then calculate the time spent working and time spent not working for the current session
    if(originalTime != 0){
      newTime = bars[programIndex].getTime() - originalTime;
      otherTime = newTime - enteredWorkTime;
    }
    //Otherwise just get the time for time spent not working
    else if(originalTime == 0){
      otherTime = bars[programIndex].getTime() - enteredWorkTime;
    }

    //Updates the bars for the how you spend your time graph
    barGroups[programIndex].updateWorkBar(increment2, enteredWorkTime);
    barGroups[programIndex].updateOtherBar(increment2, otherTime);

    //Checks if the bars (of how you spend your time graph) exceed the length of the x-axis and updates it if so
    if(barGroups.length > limitGraph2){
      graph2.updateXAxisLength();
      limitGraph2 = limitGraph2 * 2;
    }

    //Checks to see if the bars exceeds the maximum amount of time on the y-axis and updates it if it does
    if(barGroups[programIndex].getWorkTime() >= increment2 * 240 || barGroups[programIndex].getOtherTime() >= increment2 * 240){
      increment2++;
      labeled2 = false;
    }
  }
  //If the input is invalid displays the error message
  else{
    document.getElementById('error').innerHTML = errorString;
    document.getElementById('error').style.visibility = "visible";
  }
}


//Helper functions

//Displays time for timers
function displayTime(name){
  //Checks if the hour, minute, or second is double digit if not displays a zero in front of the number

  //Dispaly for the session timer
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
  //Display for the break timer
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
  /* Ideas for timer from the following: https://editor.p5js.org/allison.parrish/sketches/H1__vQxiW and https://www.youtube.com/watch?v=MLtAMg9_Svw */

  //If the timer has started and not paused then start counting
  if(timeStartSession == true && pause == false){
    //Sets the timer
    if(!set){
      const time = userTime.value();

      userHour = parseInt(time.substring(0, 2));
      userMinute = parseInt(time.substring(3, 5));
      userSecond = parseInt(time.substring(6, 8));

      displayTime();

      set = true;
    }

    //If the timer has been paused the get the saved framecount
    if(pause == true){
      myFrameCount = tempFrameCount;
    }

    //Counts down based off the passing of a second
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

      //Display the time
      displayTime("session");
    }
  }
}

//Logic for the break timer
function breakTimer(){
  /* Ideas for timer from the following: https://editor.p5js.org/allison.parrish/sketches/H1__vQxiW and https://www.youtube.com/watch?v=MLtAMg9_Svw */

  //If the timer has started then start the timer
  if(timeStartBreak == true){
    //Counts based off the passage of a second
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

      //Displays the time
      displayTime("break");
    }
  }
}

//Adds a new task to the to do list by adding the title and details to their respective arrays
function newTask(title, detail){
  titles.push(title);
  details.push(detail);
}

//Used to display the to do list
//CSS for displaing task on the to do list
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
  /* Credit (next 2 lines): https://stackoverflow.com/questions/5703552/css-center-text-horizontally-and-vertically-inside-a-div-block */
  titleDisplay.style('vertical-align', 'middle');
  titleDisplay.style('line-height', '43px');

  /* Credit goes to Samich for the tooltip: https://stackoverflow.com/questions/7503183/what-is-the-easiest-way-to-create-an-html-mouse-over-tool-tip */
  titleDisplay.style('cursor', 'pointer');
  if(details[details.length - 1] == ""){
    details[details.length - 1] = "N/A";
  }
  titleDisplay.attribute('title', details[details.length - 1]);

}

//Finds the 3 most used apps
function mostUsed(apps){
  /* Credit for next line Saket: https://stackoverflow.com/questions/7486085/copy-array-by-value */
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

  //Displays the most used apps to user
  displayMostUsed(mostUsedApps)
}

//Displays the three most used apps
function displayMostUsed(apps){
  document.getElementById('first').innerHTML = apps[0];
  document.getElementById('second').innerHTML = apps[1];
  document.getElementById('third').innerHTML = apps[2];   
}
