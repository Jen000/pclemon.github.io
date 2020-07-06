//Javascript using the p5.js library

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
  text('Data View', 870, 60);

  //rect(x, y, width, height)

  //Outlines
  strokeWeight(3);
  stroke('#707070');
  fill('white');

  //Graphs
  rect(284, 110, 637, 392, 2);
  rect(1001, 110, 637, 392, 2);

  //Top 3
  rect(642, 540, 637, 230, 2);
}

function draw() {
 

}
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