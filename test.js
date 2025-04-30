let img;
let texts = [
  "This is the first line of story text.",
  "Here comes the second line.",
  "The third line brings more mystery.",
  "Final thoughts before transition..."
];
let currentTextIndex = 0;
let transitionPage = "nextpage.html"; // Change to your actual destination page

function preload() {
  img = loadImage('assets/jaredfront.png'); // Replace with your image path
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  textAlign(CENTER, CENTER);
  textSize(24);
  fill(255);
}

function draw() {
  background(30);

  // Draw the centered image
  imageMode(CENTER);
  image(img, width / 2, height / 2);

  // Draw the text box
  let boxY = height * 2 / 3;
  let boxHeight = height / 3;
  fill(50);
  rect(0, boxY, width, boxHeight);

  // Draw the current text
  fill(255);
  text(texts[currentTextIndex], width / 2, boxY + boxHeight / 2);
}

function keyPressed() {
  if (key === 't' || key === 'T') {
    currentTextIndex++;
    if (currentTextIndex >= texts.length) {
      window.location.href = transitionPage;
    }
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
