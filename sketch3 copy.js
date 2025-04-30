let texts = [
  "jared test3 copy???????????",
  "sigh",
  "maybe?",
  "okay",
  "i hope so"
];

let currentIndex = 0;
let button;
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

  button = createButton('Next');
  button.mousePressed(startTyping);

  // Position the GIF after it's loaded
  JaredFront.parent('sketch-container');
  JaredFront.show();
  JaredFront.style('position', 'absolute');
  JaredFront.style('z-index', '0');
  JaredFront.elt.onload = () => {
    JaredFront.size(JaredFront.width * 0.8, JaredFront.height * 0.8);
    JaredFront.show();
  
    JaredFront.position(width / 2 - JaredFront.width / 2 + 25, jaredY);
  
    jaredH = JaredFront.height;
  };

  startTyping();
}
function draw() {
  clear();

  // Wait for Jared's height to be known
  if (jaredH === 0) return;

  // Textbox placement
  let boxMargin = 20;
  let boxY = jaredY + jaredH + boxMargin;
  let boxHeight = 100;
  let boxX = 100;
  let boxWidth = width - 2 * boxX;

  // Draw textbox
  fill('rgb(71,70,70)');
  noStroke();
  rect(boxX, boxY, boxWidth, boxHeight, 20);

  // Text inside textbox
  fill('white');
  text(displayText, boxX + 20, boxY + 20);

  // Button inside bottom-right of textbox
  let buttonWidth = 60;
  let buttonHeight = 30;
  let buttonX = boxX + boxWidth - buttonWidth - 20; // right padding
  let buttonY = boxY + boxHeight - buttonHeight - 15; // bottom padding
  button.position(buttonX, buttonY);
  button.style('position', 'absolute');
  button.style('z-index', '1');

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




function startTyping() {
  if (currentIndex === texts.length - 1 && !typing) {
    window.location.href = 'page3.html';
    return;
  }

  if (typing) {
    displayText = texts[currentIndex];
    typing = false;
    return;
  }

  currentIndex++;
  displayText = "";
  charIndex = 0;
  typing = true;
  lastCharTime = millis();
}