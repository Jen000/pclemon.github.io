(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
//Javascript using the p5.js library
'use strict';

const ioHook = require('./node_modules/iohook');

ioHook.start();

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
let labeled = false;
let increment1 = 1;
let bars = [];
let myFrameCountProgram1 = 0;
let newProgram = true;
let endTracking = true;
let programIndex = 0;
let programMinute = 0;
let limitGraph1 = 12;
let myFrameCountProgram2 = 0;

//Variables for graph two
let graph2;
let increment2 = 1;
let barGroups = [];
let limitGraph2 = 4;
let workMinute = 0;
let leisureMinute = 0;
let scrollingMinute = 0;
let workSecond = 0;
let leisureSecond = 0;
let scrollingSecond = 0;
let mouseMoveFlag = false;
let scrollflag = false;
let keyFlag = false;
let mouseClickFlag = false;

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

  graph2 = new Graph(2);
  graph2.yAxisNumbers(increment2, 2);

  //Testing

  //Limit 12
  // bars.push(new Bar('Slack', bars.length + 1));
  // bars.push(new Bar('Atom', bars.length + 1));
  // bars.push(new Bar('Word', bars.length + 1));
  // bars.push(new Bar('Mail', bars.length + 1));
  // bars.push(new Bar('Excel', bars.length + 1));
  

  // bars[0].updateBar(1, 30);
  // bars[1].updateBar(1, 10);
  // bars[2].updateBar(1, 50);
  // bars[3].updateBar(1, 20);
  // bars[4].updateBar(1, 70);

  // //Limit 4
  // barGroups.push(new BarGroup('Slack', barGroups.length + 1));

  // barGroups[0].updateWorkBar(1, 65);
  // barGroups[0].updateLeisureBar(1, 50);
  // barGroups[0].updateScrollingBar(1, 30);

  // barGroups.push(new BarGroup('Atom', barGroups.length + 1));

  // barGroups[1].updateWorkBar(1, 20);
  // barGroups[1].updateLeisureBar(1, 40);
  // barGroups[1].updateScrollingBar(1, 15);

  // barGroups.push(new BarGroup('Word', barGroups.length + 1));

  // barGroups[2].updateWorkBar(1, 75);
  // barGroups[2].updateLeisureBar(1, 55);
  // barGroups[2].updateScrollingBar(1, 10);

  // barGroups.push(new BarGroup('Word', barGroups.length + 1));

  // barGroups[3].updateWorkBar(1, 75);
  // barGroups[3].updateLeisureBar(1, 55);
  // barGroups[3].updateScrollingBar(1, 10);




  //graph2.updateXAxisLength();
  //graph1.updateXAxisLength();
  //mostUsed(bars);

}

function draw(){
  loop();

  if(labeled == false){
    graph1.yAxisNumbers(increment1, 1);
    labeled = true;
  }

  //Idea for separate frameCount variable by Amiral Betasin comment: https://www.khanacademy.org/computer-programming/framecount-processingjs/5893935759097856
  myFrameCount++; //Session Timer
  myFrameCount2++; //Break Timer
  myFrameCountProgram1++; //leftmost graph
  myFrameCountProgram2++; //rightmost graph
  
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
    if(activity != ""){


    }
    if(bars.length > limitGraph1){
      graph1.updateXAxisLength();
      limitGraph1 = limitGraph1 * 2;
    }
    if(barGroups.length > limitGraph2){
      graph2.updateXAxisLength();
      limitGraph2 = limitGraph2 * 2;
    }
    if(myFrameCountProgram1 % 3600 == 0){
      programMinute++;
      bars[programIndex].updateBar(increment1, programMinute);
      mostUsed(bars);
      if(bars[programIndex].getTime() >= increment1 * 240){
        increment1++;
        labeled = false;
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

      //Sets up lefttmost graph
      myFrameCountProgram1 = bars[i].getFrameCount();
      programMinute = bars[i].getTime();

      //Sets up rightmost graph
      myFrameCountProgram2 = barGroups[i].getFrameCount();
      workMinute = barGroups[i].getWorkTime();
      leisureMinute = barGroups[i].getLeisureTime();
      scrollingMinute = barGroups[i].getScrollingMinute();
    }
  }

  //If the entered program hasn't already been tracked
  if(newProgram == true){
    bars.push(new Bar(document.getElementById('program').value, bars.length + 1));
    barGroups.push(new Bar(document.getElementById('program').value, barGroups.length +1 ));

    programIndex = bars.length - 1;
    myFrameCountProgram1 = 0;
    myFrameCountProgram2 = 0;
    programMinute = 0;
  }

  newProgram = true;
  endTracking = false;
  document.getElementById('program').value = "";
  
}

function endProgram(){
  document.getElementById('endprogrambutton').style.visibility = "hidden";
  document.getElementById('addprogrambutton').style.visibility = "visible";
  endTracking = true;

  bars[programIndex].setFrameCount(myFrameCountProgram1);
  barGroups[programIndex].setFrameCount(myFrameCountProgram2);
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

},{"./node_modules/iohook":2}],2:[function(require,module,exports){
(function (process,__dirname){
const EventEmitter = require('events');
const path = require('path');

const runtime = process.versions['electron'] ? 'electron' : 'node';
const essential = runtime + '-v' + process.versions.modules + '-' + process.platform + '-' + process.arch;
const modulePath = path.join(__dirname, 'builds', essential, 'build', 'Release', 'iohook.node');
if (process.env.DEBUG) {
  console.info('Loading native binary:', modulePath);
}
let NodeHookAddon = require(modulePath);

const events = {
  3: 'keypress',
  4: 'keydown',
  5: 'keyup',
  6: 'mouseclick',
  7: 'mousedown',
  8: 'mouseup',
  9: 'mousemove',
  10: 'mousedrag',
  11: 'mousewheel'
};

class IOHook extends EventEmitter {
  constructor() {
    super();
    this.active = false;
    this.shortcuts = [];
    this.eventProperty = 'keycode';
    this.activatedShortcuts = [];

    this.lastKeydownShift = false;
    this.lastKeydownAlt = false;
    this.lastKeydownCtrl = false;
    this.lastKeydownMeta = false;

    this.load();
    this.setDebug(false);
  }

  /**
   * Start hook process
   * @param {boolean} [enableLogger] Turn on debug logging
   */
  start(enableLogger) {
    if (!this.active) {
      this.active = true;
      this.setDebug(enableLogger);
    }
  }

  /**
   * Shutdown event hook
   */
  stop() {
    if (this.active) {
      this.active = false;
    }
  }

  /**
   * Register global shortcut. When all keys in keys array pressed, callback will be called
   * @param {Array} keys Array of keycodes
   * @param {Function} callback Callback for when shortcut pressed
   * @param {Function} [releaseCallback] Callback for when shortcut has been released
   * @return {number} ShortcutId for unregister
   */
  registerShortcut(keys, callback, releaseCallback) {
    let shortcut = {};
    let shortcutId = Date.now() + Math.random();
    keys.forEach(keyCode => {
      shortcut[keyCode] = false;
    })
    shortcut.id = shortcutId;
    shortcut.callback = callback;
    shortcut.releaseCallback = releaseCallback;
    this.shortcuts.push(shortcut);
    return shortcutId;
  }

  /**
   * Unregister shortcut by ShortcutId
   * @param shortcutId
   */
  unregisterShortcut(shortcutId) {
    this.shortcuts.forEach((shortcut, i) => {
      if (shortcut.id === shortcutId) {
        this.shortcuts.splice(i, 1);
      }
    });
  }

  /**
   * Unregister shortcut via its key codes
   * @param {string} keyCodes Keyboard keys matching the shortcut that should be unregistered
   */
  unregisterShortcutByKeys(keyCodes) {
    // A traditional loop is used in order to access `this` from inside
    for (let i = 0; i < this.shortcuts.length; i++) {
      let shortcut = this.shortcuts[i];

      // Convert any keycode numbers to strings
      keyCodes.forEach((key, index) => {
        if (typeof key !== 'string' && !(key instanceof String)) {
          // Convert to string
          keyCodes[index] = key.toString();
        }
      })

      // Check if this is our shortcut
      Object.keys(shortcut).every(key => {
        if (key === 'callback' || key === 'id') return;

        // Remove all given keys from keyCodes
        // If any are not in this shortcut, then this shortcut does not match
        // If at the end we have eliminated all codes in keyCodes, then we have succeeded
        let index = keyCodes.indexOf(key);
        if (index === -1) return false; // break

        // Remove this key from the given keyCodes array
        keyCodes.splice(index, 1);
        return true;
      });

      // Is this the shortcut we want to remove?
      if (keyCodes.length === 0) {
        // Unregister this shortcut
        this.shortcuts.splice(i, 1);
        return;
      }
    }
  }

  /**
   * Unregister all shortcuts
   */
  unregisterAllShortcuts() {
    this.shortcuts.splice(0, this.shortcuts.length);
  }

  /**
   * Load native module
   */
  load() {
    NodeHookAddon.startHook(this._handler.bind(this), this.debug || false);
  }

  /**
   * Unload native module and stop hook
   */
  unload() {
    this.stop();
    NodeHookAddon.stopHook();
  }

  /**
   * Enable or disable native debug output
   * @param {Boolean} mode
   */
  setDebug(mode) {
    NodeHookAddon.debugEnable(mode);
  }

  /**
   * Specify that key event's `rawcode` property should be used instead of
   * `keycode` when listening for key presses.
   *
   * This allows iohook to be used in conjunction with other programs that may
   * only provide a keycode.
   * @param {Boolean} using
   */
  useRawcode(using) {
    // If true, use rawcode, otherwise use keycode
    this.eventProperty = using ? 'rawcode' : 'keycode';
  }

  /**
   * Disable mouse click propagation.
   * The click event are captured and the event emitted but not propagated to the window.
   */
  disableClickPropagation() {
    NodeHookAddon.grabMouseClick(true);
  }

  /**
   * Enable mouse click propagation (enabled by default).
   * The click event are emitted and propagated.
   */
  enableClickPropagation() {
    NodeHookAddon.grabMouseClick(false);
  }

  /**
   * Local event handler. Don't use it in your code!
   * @param msg Raw event message
   * @private
   */
  _handler(msg) {
    if (this.active === false || !msg) return;

    if (events[msg.type]) {
      const event = msg.mouse || msg.keyboard || msg.wheel;

      event.type = events[msg.type];

      this._handleShift(event);
      this._handleAlt(event);
      this._handleCtrl(event);
      this._handleMeta(event);

      this.emit(events[msg.type], event);

      // If there is any registered shortcuts then handle them.
      if ((event.type === 'keydown' || event.type === 'keyup') && iohook.shortcuts.length > 0) {
        this._handleShortcut(event);
      }
    }
  }

  /**
   * Handles the shift key. Whenever shift is pressed, all future events would
   * contain { shiftKey: true } in its object, until the shift key is released.
   * @param event Event object
   * @private
   */
  _handleShift(event) {
    if (event.type === 'keyup' && event.shiftKey) {
      this.lastKeydownShift = false;
    }

    if (event.type === 'keydown' && event.shiftKey) {
      this.lastKeydownShift = true;
    }

    if (this.lastKeydownShift) {
      event.shiftKey = true;
    }
  }

  /**
   * Handles the alt key. Whenever alt is pressed, all future events would
   * contain { altKey: true } in its object, until the alt key is released.
   * @param event Event object
   * @private
   */
  _handleAlt(event) {
    if (event.type === 'keyup' && event.altKey) {
      this.lastKeydownAlt = false;
    }

    if (event.type === 'keydown' && event.altKey) {
      this.lastKeydownAlt = true;
    }

    if (this.lastKeydownAlt) {
      event.altKey = true;
    }
  }

  /**
   * Handles the ctrl key. Whenever ctrl is pressed, all future events would
   * contain { ctrlKey: true } in its object, until the ctrl key is released.
   * @param event Event object
   * @private
   */
  _handleCtrl(event) {
    if (event.type === 'keyup' && event.ctrlKey) {
      this.lastKeydownCtrl = false;
    }

    if (event.type === 'keydown' && event.ctrlKey) {
      this.lastKeydownCtrl = true;
    }

    if (this.lastKeydownCtrl) {
      event.ctrlKey = true;
    }
  }

  /**
   * Handles the meta key. Whenever meta is pressed, all future events would
   * contain { metaKey: true } in its object, until the meta key is released.
   * @param event Event object
   * @private
   */
  _handleMeta(event) {
    if (event.type === 'keyup' && event.metaKey) {
      this.lastKeydownMeta = false;
    }

    if (event.type === 'keydown' && event.metaKey) {
      this.lastKeydownMeta = true;
    }

    if (this.lastKeydownMeta) {
      event.metaKey = true;
    }
  }

  /**
   * Local shortcut event handler
   * @param event Event object
   * @private
   */
  _handleShortcut(event) {
    if (this.active === false) {
      return;
    }

    // Keep track of shortcuts that are currently active
    let activatedShortcuts = this.activatedShortcuts;

    if (event.type === 'keydown') {
      this.shortcuts.forEach(shortcut => {
        if (shortcut[event[this.eventProperty]] !== undefined) {
          // Mark this key as currently being pressed
          shortcut[event[this.eventProperty]] = true;

          let keysTmpArray = [];
          let callme = true;

          // Iterate through each keyboard key in this shortcut
          Object.keys(shortcut).forEach(key => {
            if (key === 'callback' || key === 'releaseCallback' || key === 'id') return;

            // If one of the keys aren't pressed...
            if (shortcut[key] === false) {
              // Don't call the callback and empty our temp tracking array
              callme = false;
              keysTmpArray.splice(0, keysTmpArray.length);

              return;
            }

            // Otherwise, this key is being pressed.
            // Add it to the array of keyboard keys we will send as an argument
            // to our callback
            keysTmpArray.push(key);
          });
          if (callme) {
            shortcut.callback(keysTmpArray);

            // Add this shortcut from our activate shortcuts array if not
            // already activated
            if (activatedShortcuts.indexOf(shortcut) === -1) {
              activatedShortcuts.push(shortcut);
            }
          }
        }
      });
    } else if (event.type === 'keyup') {
      // Mark this key as currently not being pressed in all of our shortcuts
      this.shortcuts.forEach(shortcut => {
        if (shortcut[event[this.eventProperty]] !== undefined) {
          shortcut[event[this.eventProperty]] = false;
        }
      });

      // Check if any of our currently pressed shortcuts have been released
      // "released" means that all of the keys that the shortcut defines are no
      // longer being pressed
      this.activatedShortcuts.forEach(shortcut => {
        if (shortcut[event[this.eventProperty]] === undefined) return;

        let shortcutReleased = true;
        let keysTmpArray = [];
        Object.keys(shortcut).forEach(key => {
          if (key === 'callback' || key === 'releaseCallback' || key === 'id') return;
          keysTmpArray.push(key)

          // If any key is true, and thus still pressed, the shortcut is still
          // being held
          if (shortcut[key]) {
            shortcutReleased = false;
          }
        });

        if (shortcutReleased) {
          // Call the released function handler
          if (shortcut.releaseCallback) {
            shortcut.releaseCallback(keysTmpArray);
          }

          // Remove this shortcut from our activate shortcuts array
          const index = this.activatedShortcuts.indexOf(shortcut);
          if (index !== -1) this.activatedShortcuts.splice(index, 1);
        }
      });
    }
  }
}

const iohook = new IOHook();

module.exports = iohook;

}).call(this,require('_process'),"/node_modules/iohook")
},{"_process":5,"events":3,"path":4}],3:[function(require,module,exports){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

var objectCreate = Object.create || objectCreatePolyfill
var objectKeys = Object.keys || objectKeysPolyfill
var bind = Function.prototype.bind || functionBindPolyfill

function EventEmitter() {
  if (!this._events || !Object.prototype.hasOwnProperty.call(this, '_events')) {
    this._events = objectCreate(null);
    this._eventsCount = 0;
  }

  this._maxListeners = this._maxListeners || undefined;
}
module.exports = EventEmitter;

// Backwards-compat with node 0.10.x
EventEmitter.EventEmitter = EventEmitter;

EventEmitter.prototype._events = undefined;
EventEmitter.prototype._maxListeners = undefined;

// By default EventEmitters will print a warning if more than 10 listeners are
// added to it. This is a useful default which helps finding memory leaks.
var defaultMaxListeners = 10;

var hasDefineProperty;
try {
  var o = {};
  if (Object.defineProperty) Object.defineProperty(o, 'x', { value: 0 });
  hasDefineProperty = o.x === 0;
} catch (err) { hasDefineProperty = false }
if (hasDefineProperty) {
  Object.defineProperty(EventEmitter, 'defaultMaxListeners', {
    enumerable: true,
    get: function() {
      return defaultMaxListeners;
    },
    set: function(arg) {
      // check whether the input is a positive number (whose value is zero or
      // greater and not a NaN).
      if (typeof arg !== 'number' || arg < 0 || arg !== arg)
        throw new TypeError('"defaultMaxListeners" must be a positive number');
      defaultMaxListeners = arg;
    }
  });
} else {
  EventEmitter.defaultMaxListeners = defaultMaxListeners;
}

// Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.
EventEmitter.prototype.setMaxListeners = function setMaxListeners(n) {
  if (typeof n !== 'number' || n < 0 || isNaN(n))
    throw new TypeError('"n" argument must be a positive number');
  this._maxListeners = n;
  return this;
};

function $getMaxListeners(that) {
  if (that._maxListeners === undefined)
    return EventEmitter.defaultMaxListeners;
  return that._maxListeners;
}

EventEmitter.prototype.getMaxListeners = function getMaxListeners() {
  return $getMaxListeners(this);
};

// These standalone emit* functions are used to optimize calling of event
// handlers for fast cases because emit() itself often has a variable number of
// arguments and can be deoptimized because of that. These functions always have
// the same number of arguments and thus do not get deoptimized, so the code
// inside them can execute faster.
function emitNone(handler, isFn, self) {
  if (isFn)
    handler.call(self);
  else {
    var len = handler.length;
    var listeners = arrayClone(handler, len);
    for (var i = 0; i < len; ++i)
      listeners[i].call(self);
  }
}
function emitOne(handler, isFn, self, arg1) {
  if (isFn)
    handler.call(self, arg1);
  else {
    var len = handler.length;
    var listeners = arrayClone(handler, len);
    for (var i = 0; i < len; ++i)
      listeners[i].call(self, arg1);
  }
}
function emitTwo(handler, isFn, self, arg1, arg2) {
  if (isFn)
    handler.call(self, arg1, arg2);
  else {
    var len = handler.length;
    var listeners = arrayClone(handler, len);
    for (var i = 0; i < len; ++i)
      listeners[i].call(self, arg1, arg2);
  }
}
function emitThree(handler, isFn, self, arg1, arg2, arg3) {
  if (isFn)
    handler.call(self, arg1, arg2, arg3);
  else {
    var len = handler.length;
    var listeners = arrayClone(handler, len);
    for (var i = 0; i < len; ++i)
      listeners[i].call(self, arg1, arg2, arg3);
  }
}

function emitMany(handler, isFn, self, args) {
  if (isFn)
    handler.apply(self, args);
  else {
    var len = handler.length;
    var listeners = arrayClone(handler, len);
    for (var i = 0; i < len; ++i)
      listeners[i].apply(self, args);
  }
}

EventEmitter.prototype.emit = function emit(type) {
  var er, handler, len, args, i, events;
  var doError = (type === 'error');

  events = this._events;
  if (events)
    doError = (doError && events.error == null);
  else if (!doError)
    return false;

  // If there is no 'error' event listener then throw.
  if (doError) {
    if (arguments.length > 1)
      er = arguments[1];
    if (er instanceof Error) {
      throw er; // Unhandled 'error' event
    } else {
      // At least give some kind of context to the user
      var err = new Error('Unhandled "error" event. (' + er + ')');
      err.context = er;
      throw err;
    }
    return false;
  }

  handler = events[type];

  if (!handler)
    return false;

  var isFn = typeof handler === 'function';
  len = arguments.length;
  switch (len) {
      // fast cases
    case 1:
      emitNone(handler, isFn, this);
      break;
    case 2:
      emitOne(handler, isFn, this, arguments[1]);
      break;
    case 3:
      emitTwo(handler, isFn, this, arguments[1], arguments[2]);
      break;
    case 4:
      emitThree(handler, isFn, this, arguments[1], arguments[2], arguments[3]);
      break;
      // slower
    default:
      args = new Array(len - 1);
      for (i = 1; i < len; i++)
        args[i - 1] = arguments[i];
      emitMany(handler, isFn, this, args);
  }

  return true;
};

function _addListener(target, type, listener, prepend) {
  var m;
  var events;
  var existing;

  if (typeof listener !== 'function')
    throw new TypeError('"listener" argument must be a function');

  events = target._events;
  if (!events) {
    events = target._events = objectCreate(null);
    target._eventsCount = 0;
  } else {
    // To avoid recursion in the case that type === "newListener"! Before
    // adding it to the listeners, first emit "newListener".
    if (events.newListener) {
      target.emit('newListener', type,
          listener.listener ? listener.listener : listener);

      // Re-assign `events` because a newListener handler could have caused the
      // this._events to be assigned to a new object
      events = target._events;
    }
    existing = events[type];
  }

  if (!existing) {
    // Optimize the case of one listener. Don't need the extra array object.
    existing = events[type] = listener;
    ++target._eventsCount;
  } else {
    if (typeof existing === 'function') {
      // Adding the second element, need to change to array.
      existing = events[type] =
          prepend ? [listener, existing] : [existing, listener];
    } else {
      // If we've already got an array, just append.
      if (prepend) {
        existing.unshift(listener);
      } else {
        existing.push(listener);
      }
    }

    // Check for listener leak
    if (!existing.warned) {
      m = $getMaxListeners(target);
      if (m && m > 0 && existing.length > m) {
        existing.warned = true;
        var w = new Error('Possible EventEmitter memory leak detected. ' +
            existing.length + ' "' + String(type) + '" listeners ' +
            'added. Use emitter.setMaxListeners() to ' +
            'increase limit.');
        w.name = 'MaxListenersExceededWarning';
        w.emitter = target;
        w.type = type;
        w.count = existing.length;
        if (typeof console === 'object' && console.warn) {
          console.warn('%s: %s', w.name, w.message);
        }
      }
    }
  }

  return target;
}

EventEmitter.prototype.addListener = function addListener(type, listener) {
  return _addListener(this, type, listener, false);
};

EventEmitter.prototype.on = EventEmitter.prototype.addListener;

EventEmitter.prototype.prependListener =
    function prependListener(type, listener) {
      return _addListener(this, type, listener, true);
    };

function onceWrapper() {
  if (!this.fired) {
    this.target.removeListener(this.type, this.wrapFn);
    this.fired = true;
    switch (arguments.length) {
      case 0:
        return this.listener.call(this.target);
      case 1:
        return this.listener.call(this.target, arguments[0]);
      case 2:
        return this.listener.call(this.target, arguments[0], arguments[1]);
      case 3:
        return this.listener.call(this.target, arguments[0], arguments[1],
            arguments[2]);
      default:
        var args = new Array(arguments.length);
        for (var i = 0; i < args.length; ++i)
          args[i] = arguments[i];
        this.listener.apply(this.target, args);
    }
  }
}

function _onceWrap(target, type, listener) {
  var state = { fired: false, wrapFn: undefined, target: target, type: type, listener: listener };
  var wrapped = bind.call(onceWrapper, state);
  wrapped.listener = listener;
  state.wrapFn = wrapped;
  return wrapped;
}

EventEmitter.prototype.once = function once(type, listener) {
  if (typeof listener !== 'function')
    throw new TypeError('"listener" argument must be a function');
  this.on(type, _onceWrap(this, type, listener));
  return this;
};

EventEmitter.prototype.prependOnceListener =
    function prependOnceListener(type, listener) {
      if (typeof listener !== 'function')
        throw new TypeError('"listener" argument must be a function');
      this.prependListener(type, _onceWrap(this, type, listener));
      return this;
    };

// Emits a 'removeListener' event if and only if the listener was removed.
EventEmitter.prototype.removeListener =
    function removeListener(type, listener) {
      var list, events, position, i, originalListener;

      if (typeof listener !== 'function')
        throw new TypeError('"listener" argument must be a function');

      events = this._events;
      if (!events)
        return this;

      list = events[type];
      if (!list)
        return this;

      if (list === listener || list.listener === listener) {
        if (--this._eventsCount === 0)
          this._events = objectCreate(null);
        else {
          delete events[type];
          if (events.removeListener)
            this.emit('removeListener', type, list.listener || listener);
        }
      } else if (typeof list !== 'function') {
        position = -1;

        for (i = list.length - 1; i >= 0; i--) {
          if (list[i] === listener || list[i].listener === listener) {
            originalListener = list[i].listener;
            position = i;
            break;
          }
        }

        if (position < 0)
          return this;

        if (position === 0)
          list.shift();
        else
          spliceOne(list, position);

        if (list.length === 1)
          events[type] = list[0];

        if (events.removeListener)
          this.emit('removeListener', type, originalListener || listener);
      }

      return this;
    };

EventEmitter.prototype.removeAllListeners =
    function removeAllListeners(type) {
      var listeners, events, i;

      events = this._events;
      if (!events)
        return this;

      // not listening for removeListener, no need to emit
      if (!events.removeListener) {
        if (arguments.length === 0) {
          this._events = objectCreate(null);
          this._eventsCount = 0;
        } else if (events[type]) {
          if (--this._eventsCount === 0)
            this._events = objectCreate(null);
          else
            delete events[type];
        }
        return this;
      }

      // emit removeListener for all listeners on all events
      if (arguments.length === 0) {
        var keys = objectKeys(events);
        var key;
        for (i = 0; i < keys.length; ++i) {
          key = keys[i];
          if (key === 'removeListener') continue;
          this.removeAllListeners(key);
        }
        this.removeAllListeners('removeListener');
        this._events = objectCreate(null);
        this._eventsCount = 0;
        return this;
      }

      listeners = events[type];

      if (typeof listeners === 'function') {
        this.removeListener(type, listeners);
      } else if (listeners) {
        // LIFO order
        for (i = listeners.length - 1; i >= 0; i--) {
          this.removeListener(type, listeners[i]);
        }
      }

      return this;
    };

function _listeners(target, type, unwrap) {
  var events = target._events;

  if (!events)
    return [];

  var evlistener = events[type];
  if (!evlistener)
    return [];

  if (typeof evlistener === 'function')
    return unwrap ? [evlistener.listener || evlistener] : [evlistener];

  return unwrap ? unwrapListeners(evlistener) : arrayClone(evlistener, evlistener.length);
}

EventEmitter.prototype.listeners = function listeners(type) {
  return _listeners(this, type, true);
};

EventEmitter.prototype.rawListeners = function rawListeners(type) {
  return _listeners(this, type, false);
};

EventEmitter.listenerCount = function(emitter, type) {
  if (typeof emitter.listenerCount === 'function') {
    return emitter.listenerCount(type);
  } else {
    return listenerCount.call(emitter, type);
  }
};

EventEmitter.prototype.listenerCount = listenerCount;
function listenerCount(type) {
  var events = this._events;

  if (events) {
    var evlistener = events[type];

    if (typeof evlistener === 'function') {
      return 1;
    } else if (evlistener) {
      return evlistener.length;
    }
  }

  return 0;
}

EventEmitter.prototype.eventNames = function eventNames() {
  return this._eventsCount > 0 ? Reflect.ownKeys(this._events) : [];
};

// About 1.5x faster than the two-arg version of Array#splice().
function spliceOne(list, index) {
  for (var i = index, k = i + 1, n = list.length; k < n; i += 1, k += 1)
    list[i] = list[k];
  list.pop();
}

function arrayClone(arr, n) {
  var copy = new Array(n);
  for (var i = 0; i < n; ++i)
    copy[i] = arr[i];
  return copy;
}

function unwrapListeners(arr) {
  var ret = new Array(arr.length);
  for (var i = 0; i < ret.length; ++i) {
    ret[i] = arr[i].listener || arr[i];
  }
  return ret;
}

function objectCreatePolyfill(proto) {
  var F = function() {};
  F.prototype = proto;
  return new F;
}
function objectKeysPolyfill(obj) {
  var keys = [];
  for (var k in obj) if (Object.prototype.hasOwnProperty.call(obj, k)) {
    keys.push(k);
  }
  return k;
}
function functionBindPolyfill(context) {
  var fn = this;
  return function () {
    return fn.apply(context, arguments);
  };
}

},{}],4:[function(require,module,exports){
(function (process){
// .dirname, .basename, and .extname methods are extracted from Node.js v8.11.1,
// backported and transplited with Babel, with backwards-compat fixes

// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

// resolves . and .. elements in a path array with directory names there
// must be no slashes, empty elements, or device names (c:\) in the array
// (so also no leading and trailing slashes - it does not distinguish
// relative and absolute paths)
function normalizeArray(parts, allowAboveRoot) {
  // if the path tries to go above the root, `up` ends up > 0
  var up = 0;
  for (var i = parts.length - 1; i >= 0; i--) {
    var last = parts[i];
    if (last === '.') {
      parts.splice(i, 1);
    } else if (last === '..') {
      parts.splice(i, 1);
      up++;
    } else if (up) {
      parts.splice(i, 1);
      up--;
    }
  }

  // if the path is allowed to go above the root, restore leading ..s
  if (allowAboveRoot) {
    for (; up--; up) {
      parts.unshift('..');
    }
  }

  return parts;
}

// path.resolve([from ...], to)
// posix version
exports.resolve = function() {
  var resolvedPath = '',
      resolvedAbsolute = false;

  for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
    var path = (i >= 0) ? arguments[i] : process.cwd();

    // Skip empty and invalid entries
    if (typeof path !== 'string') {
      throw new TypeError('Arguments to path.resolve must be strings');
    } else if (!path) {
      continue;
    }

    resolvedPath = path + '/' + resolvedPath;
    resolvedAbsolute = path.charAt(0) === '/';
  }

  // At this point the path should be resolved to a full absolute path, but
  // handle relative paths to be safe (might happen when process.cwd() fails)

  // Normalize the path
  resolvedPath = normalizeArray(filter(resolvedPath.split('/'), function(p) {
    return !!p;
  }), !resolvedAbsolute).join('/');

  return ((resolvedAbsolute ? '/' : '') + resolvedPath) || '.';
};

// path.normalize(path)
// posix version
exports.normalize = function(path) {
  var isAbsolute = exports.isAbsolute(path),
      trailingSlash = substr(path, -1) === '/';

  // Normalize the path
  path = normalizeArray(filter(path.split('/'), function(p) {
    return !!p;
  }), !isAbsolute).join('/');

  if (!path && !isAbsolute) {
    path = '.';
  }
  if (path && trailingSlash) {
    path += '/';
  }

  return (isAbsolute ? '/' : '') + path;
};

// posix version
exports.isAbsolute = function(path) {
  return path.charAt(0) === '/';
};

// posix version
exports.join = function() {
  var paths = Array.prototype.slice.call(arguments, 0);
  return exports.normalize(filter(paths, function(p, index) {
    if (typeof p !== 'string') {
      throw new TypeError('Arguments to path.join must be strings');
    }
    return p;
  }).join('/'));
};


// path.relative(from, to)
// posix version
exports.relative = function(from, to) {
  from = exports.resolve(from).substr(1);
  to = exports.resolve(to).substr(1);

  function trim(arr) {
    var start = 0;
    for (; start < arr.length; start++) {
      if (arr[start] !== '') break;
    }

    var end = arr.length - 1;
    for (; end >= 0; end--) {
      if (arr[end] !== '') break;
    }

    if (start > end) return [];
    return arr.slice(start, end - start + 1);
  }

  var fromParts = trim(from.split('/'));
  var toParts = trim(to.split('/'));

  var length = Math.min(fromParts.length, toParts.length);
  var samePartsLength = length;
  for (var i = 0; i < length; i++) {
    if (fromParts[i] !== toParts[i]) {
      samePartsLength = i;
      break;
    }
  }

  var outputParts = [];
  for (var i = samePartsLength; i < fromParts.length; i++) {
    outputParts.push('..');
  }

  outputParts = outputParts.concat(toParts.slice(samePartsLength));

  return outputParts.join('/');
};

exports.sep = '/';
exports.delimiter = ':';

exports.dirname = function (path) {
  if (typeof path !== 'string') path = path + '';
  if (path.length === 0) return '.';
  var code = path.charCodeAt(0);
  var hasRoot = code === 47 /*/*/;
  var end = -1;
  var matchedSlash = true;
  for (var i = path.length - 1; i >= 1; --i) {
    code = path.charCodeAt(i);
    if (code === 47 /*/*/) {
        if (!matchedSlash) {
          end = i;
          break;
        }
      } else {
      // We saw the first non-path separator
      matchedSlash = false;
    }
  }

  if (end === -1) return hasRoot ? '/' : '.';
  if (hasRoot && end === 1) {
    // return '//';
    // Backwards-compat fix:
    return '/';
  }
  return path.slice(0, end);
};

function basename(path) {
  if (typeof path !== 'string') path = path + '';

  var start = 0;
  var end = -1;
  var matchedSlash = true;
  var i;

  for (i = path.length - 1; i >= 0; --i) {
    if (path.charCodeAt(i) === 47 /*/*/) {
        // If we reached a path separator that was not part of a set of path
        // separators at the end of the string, stop now
        if (!matchedSlash) {
          start = i + 1;
          break;
        }
      } else if (end === -1) {
      // We saw the first non-path separator, mark this as the end of our
      // path component
      matchedSlash = false;
      end = i + 1;
    }
  }

  if (end === -1) return '';
  return path.slice(start, end);
}

// Uses a mixed approach for backwards-compatibility, as ext behavior changed
// in new Node.js versions, so only basename() above is backported here
exports.basename = function (path, ext) {
  var f = basename(path);
  if (ext && f.substr(-1 * ext.length) === ext) {
    f = f.substr(0, f.length - ext.length);
  }
  return f;
};

exports.extname = function (path) {
  if (typeof path !== 'string') path = path + '';
  var startDot = -1;
  var startPart = 0;
  var end = -1;
  var matchedSlash = true;
  // Track the state of characters (if any) we see before our first dot and
  // after any path separator we find
  var preDotState = 0;
  for (var i = path.length - 1; i >= 0; --i) {
    var code = path.charCodeAt(i);
    if (code === 47 /*/*/) {
        // If we reached a path separator that was not part of a set of path
        // separators at the end of the string, stop now
        if (!matchedSlash) {
          startPart = i + 1;
          break;
        }
        continue;
      }
    if (end === -1) {
      // We saw the first non-path separator, mark this as the end of our
      // extension
      matchedSlash = false;
      end = i + 1;
    }
    if (code === 46 /*.*/) {
        // If this is our first dot, mark it as the start of our extension
        if (startDot === -1)
          startDot = i;
        else if (preDotState !== 1)
          preDotState = 1;
    } else if (startDot !== -1) {
      // We saw a non-dot and non-path separator before our dot, so we should
      // have a good chance at having a non-empty extension
      preDotState = -1;
    }
  }

  if (startDot === -1 || end === -1 ||
      // We saw a non-dot character immediately before the dot
      preDotState === 0 ||
      // The (right-most) trimmed path component is exactly '..'
      preDotState === 1 && startDot === end - 1 && startDot === startPart + 1) {
    return '';
  }
  return path.slice(startDot, end);
};

function filter (xs, f) {
    if (xs.filter) return xs.filter(f);
    var res = [];
    for (var i = 0; i < xs.length; i++) {
        if (f(xs[i], i, xs)) res.push(xs[i]);
    }
    return res;
}

// String.prototype.substr - negative index don't work in IE8
var substr = 'ab'.substr(-1) === 'b'
    ? function (str, start, len) { return str.substr(start, len) }
    : function (str, start, len) {
        if (start < 0) start = str.length + start;
        return str.substr(start, len);
    }
;

}).call(this,require('_process'))
},{"_process":5}],5:[function(require,module,exports){
// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}]},{},[1]);
