let texts = [
  "jared test1",
  "hoi",
  "yay",
  "awesome",
  "this is so fun"
];
let currentIndex = 0;

function setup() {
  createCanvas(600, 400);
  textAlign(CENTER, CENTER);
  textSize(24);
}

function draw() {
  background('black');
  //text box drawn
  fill('rgb(71,70,70)');
  noStroke();
  rect(width/2 - 200, height/2 - 50, 400, 100, 20); 

//  text in the box
  fill('white');
  noStroke();
  text(texts[currentIndex], width/2, height/2);
}

//spacebar controlling text --> will be a button on screen? maybe?
function keyPressed() {
  if (key === ' ') {
    currentIndex++;
    //resetting the loop --> kinda like an npc lol
    if (currentIndex >= texts.length) {
      currentIndex = 0;
    }
  }
}