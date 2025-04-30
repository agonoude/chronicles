let texts = [
  "jared test3 copy???????????",
  "sigh.",
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
let jaredLoaded = false;

function preload() {
  comicFont = loadFont('assets/COMIC.TTF');
  JaredFront = createImg('assets/jaredfront.gif');
  JaredFront.hide(); // show it manually after setup
}

function setup() {
  let cnv = createCanvas(windowWidth, windowHeight);
  cnv.parent(document.body);
  cnv.position(0, 0);
  cnv.style('position', 'fixed');
  cnv.style('z-index', '100');
  cnv.style('pointer-events', 'none');

  textAlign(CENTER, CENTER);
  textSize(20);
  textFont(comicFont);

  JaredFront.parent(document.body);
  JaredFront.style('position', 'fixed'); // 👈 Fixed position to lock on screen
  JaredFront.style('z-index', '101');
  JaredFront.style('width', '200px');
  JaredFront.style('height', 'auto');
  JaredFront.style('left', 'calc(50% - 100px)'); // 👈 Centered horizontally
  JaredFront.style('top', '275px');             // 👈 Locked vertical position
  JaredFront.show();

  jaredLoaded = true; // No need to wait for size
  startTyping();
}

function draw() {
  clear();

  if (!jaredLoaded) return;

  let boxMargin = 125;
  let boxY = 275 + 200 + boxMargin; // 275px top + ~200px image height + margin
  let boxHeight = 100;
  let boxWidth = 500;
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

function keyPressed() {
  if (key === 't' || key === 'T') {
    startTyping();
  }
}

function startTyping() {
  if (currentIndex === texts.length - 1 && !typing) {
    window.location.href = 'page4.html';
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
