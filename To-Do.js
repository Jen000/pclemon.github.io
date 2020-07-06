//Javascript using the p5.js library

//Global variables
let titles = [];
let details = [];
let yCord = 142; 
let submit = false;
let yAxis = -878;
let elementCount = 0;

function setup() {
  createCanvas(1920, windowHeight);
  background('white');

  //Page header
  fill('#707070');
  noStroke();
  rect(0, 0, 1920, 90);
  //Page title
  fill('white');
  textSize(40);
  text('To-Do', 910, 60);

  //rect(x, y, width, height)

  //Outlines
  strokeWeight(3);
  stroke('#707070');
  fill('white');

  //List
  //rect(70, 95, 513, 880, 2);
  rect(70, 95, 513, 35, 2);

  noStroke();
  fill('#707070');
  textSize(30);
  text('To-Do:', 75, 125);


}

function draw() {
  let w = new Worker("Dash.js");
  if(submit){
    newTask(document.getElementById('inputtitle').value, document.getElementById('details').value);
    display(yCord);
    yCord += 51;
    submit = false;

    document.getElementById('inputtitle').value = '';
    document.getElementById('details').value = '';
  }

}
function menu(){
  //When the menu button is clicked show menu, hide the menu button, and show the close button
  document.getElementById('menu').style.visibility = "visible"
  document.getElementById('menubutton').style.visibility = "hidden";
  document.getElementById('menuclose').style.visibility = "visible";
}
function closeMenu(){
  submit = false;
  document.getElementById('menuclose').style.visibility = "hidden";
  document.getElementById('menubutton').style.visibility = "visible";
  document.getElementById('menu').style.visibility = "hidden";
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

  yCord = 142; 
  yAxis = -878;
}


function newTask(title, detail){
  titles.push(title);
  details.push(detail);
}

function display(y){
  elementCount++;

  let button = createButton('');
  button.id('check');
  button.position(81, y);
  button.mousePressed(function check(){button.style('background-color', 'limegreen');});

  button.style('position', 'absolute');
  button.style('height', '49px');
  button.style('width', '49px');
  button.style('background-color', 'white');
  button.style('border', 'solid');
  button.style('border-color', '#707070');
  button.style('border-radius', '2px');

  let titleDisplay = createDiv(titles[titles.length - 1]);
  titleDisplay.id('displaytitle');

  titleDisplay.style('position', 'absolute');
  titleDisplay.style('height', '43px');
  titleDisplay.style('width', '448px');
  titleDisplay.style('margin-left', '127px');
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

}