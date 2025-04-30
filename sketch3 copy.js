let texts = [
  "jared test3 copy???????????",
  "please.",
  "maybe?",
  "okay",
  "i hope so"
];

let currentIndex = 0;
let displayText = "";
let charIndex = 0;
let typing = false;
let lastCharTime = 0;
let typeSpeed = 50;
let JaredFront;
let comicFont;
let jaredY = 80;
let jaredH = 0;

function preload() {
  comicFont = loadFont('assets/COMIC.TTF');
  JaredFront = createImg('assets/jaredfront.gif');
  JaredFront.hide(); // show it manually after setup
}

function setup() {
  let cnv = createCanvas(800, 600);
  cnv.parent('sketch-container');
  cnv.position(0, 0);
  cnv.style('pointer-events', 'none');

  textAlign(LEFT, TOP);
  textSize(20);
  textFont(comicFont);

  // Position the GIF after it's loaded
  JaredFront.parent('sketch-container');
  JaredFront.show();
  JaredFront.style('position', 'absolute');
  JaredFront.style('z-index', '0');
  JaredFront.elt.onload = () => {
    JaredFront.size(JaredFront.width * 0.8, JaredFront.height * 0.8);
    JaredFront.show();
  
    // Wait a moment before positioning (let layout settle)
    setTimeout(() => {
      let canvasBounds = JaredFront.parent().elt.getBoundingClientRect();
  
      let jaredX = width / 2 - JaredFront.width / 2 + 25;
      let jaredY = 80;
  
      // Set Jared's position relative to the parent container, not full page
      JaredFront.position(jaredX, jaredY);
    }, 0);
  };

  startTyping();
}

function draw() {
  clear();

  if (jaredH === 0) return;

  let boxMargin = 20;
  let boxY = jaredY + jaredH + boxMargin;
  let boxHeight = 100;
  let boxX = 100;
  let boxWidth = width - 2 * boxX;

  fill('rgb(71,70,70)');
  noStroke();
  rect(boxX, boxY, boxWidth, boxHeight, 20);

  fill('white');
  text(displayText, boxX + 20, boxY + 20);

  // Typing animation
  if (typing && millis() - lastCharTime > typeSpeed) {
    if (charIndex < texts[currentIndex].length) {
      displayText += texts[currentIndex].charAt(charIndex);
      charIndex++;
      lastCharTime = millis();
    } else {
      typing = false;
    }
  }
}

function keyPressed() {
  if (key === 't' || key === 'T') {
    startTyping();
  }
}

function startTyping() {
  if (currentIndex === texts.length - 1 && !typing) {
    window.location.href = 'page3.html'; // Change to your desired page
    return;
  }

  // If typing is still happening, skip the animation and show full line instantly
  if (typing) {
    displayText = texts[currentIndex]; // instantly show full text
    typing = false;
    return;
  }

  // Otherwise, move to next message and start typing
  currentIndex++;
  displayText = "";
  charIndex = 0;
  typing = true;
  lastCharTime = millis();
}