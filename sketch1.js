let texts = [
  "jared test1",
  "hoi",
  "yay",
  "awesome",
  "this is so fun"
];

let currentIndex = 0;
let button;
let displayText = "";
let charIndex = 0;
let typing = false;
let lastCharTime = 0;
let typeSpeed = 50; // milliseconds between characters
let JaredFront;

function preload() {
  // Loading Comic Sans font and GIF
  comicFont = loadFont('assets/COMIC.TTF');
  JaredFront = createImg('assets/jaredfront.gif');
  JaredFront.hide();
}

function setup() {
  let cnv = createCanvas(600, 400);
  cnv.parent('sketch-container');
  // Remove position absolute here—let the container handle layout

  textAlign(LEFT, TOP);
  textSize(20);
  textFont(comicFont);

  // Setup GIF
  JaredFront.parent('sketch-container');
  JaredFront.style('position', 'absolute');
  JaredFront.style('z-index', '0');
  
  // Wait for GIF to load before positioning
  JaredFront.elt.onload = () => {
    JaredFront.position(width / 2 - JaredFront.width / 2, height / 2 - JaredFront.height / 2);
  };

  // Create button
  button = createButton('Next');
  button.parent('sketch-container');
  button.style('position', 'absolute');
  button.style('z-index', '2');
  button.position(width - 75, height - 50);

  startTyping();
}

function draw() {
  background('black');

  // Draw the textbox at the bottom
  fill('rgb(71,70,70)');
  noStroke();
  rect(20, height - 100, width - 40, 80, 20);

  // Draw animated text
  fill('white');
  text(displayText, 40, height - 85);

  // Typing effect
  if (typing && millis() - lastCharTime > typeSpeed) {
    if (charIndex < texts[currentIndex].length) {
      displayText += texts[currentIndex].charAt(charIndex);
      charIndex++;
      lastCharTime = millis();
    } else {
      typing = false; // done typing
    }
  }
}

function startTyping() {
  if (currentIndex === texts.length - 1 && !typing) {
    window.location.href = 'page2.html'; // Change to your desired page
    return;
  }

  // If typing is still happening, skip the animation and show full line instantly
  if (typing) {
    displayText = texts[currentIndex]; // instantly show full text
    typing = false;
    return;
  }

  // Otherwise, move to the next message and start typing
  currentIndex++;
  displayText = "";
  charIndex = 0;
  typing = true;
  lastCharTime = millis();
}