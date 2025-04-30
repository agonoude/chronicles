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

function preload() {
  comicFont = loadFont('assets/COMIC.TTF');
  JaredFront = createImg('assets/jaredfront.gif');
  JaredFront.hide(); // show it manually after setup
}

function setup() {
  let cnv = createCanvas(windowWidth, windowHeight);
  cnv.parent('sketch-container');
  cnv.position(0, 0);
  cnv.style('pointer-events', 'none');

  textAlign(CENTER, CENTER);
  textSize(20);
  textFont(comicFont);

  JaredFront.parent('sketch-container');
  JaredFront.style('position', 'absolute');
  JaredFront.style('z-index', '0');
  JaredFront.show();

  JaredFront.elt.onload = () => {
    JaredFront.size(JaredFront.width * 0.8, JaredFront.height * 0.8);

    setTimeout(() => {
      positionJared();
    }, 0);
  };

  startTyping();
}

function draw() {
  clear();

  if (!JaredFront) return;

  let jaredH = JaredFront.height;
  let boxMargin = 20;
  let boxY = jaredY + jaredH + boxMargin;
  let boxHeight = 100;
  let boxWidth = width * 0.8;
  let boxX = width / 2 - boxWidth / 2;

  fill('rgb(71,70,70)');
  noStroke();
  rect(boxX, boxY, boxWidth, boxHeight, 20);

  fill('white');
  text(displayText, width / 2, boxY + boxHeight / 2);

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

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  positionJared();
}

function positionJared() {
  let jaredX = width / 2 - JaredFront.width / 2;
  JaredFront.position(jaredX, jaredY);
}

function keyPressed() {
  if (key === 't' || key === 'T') {
    startTyping();
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