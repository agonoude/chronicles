let texts4 = [
  "sorry if this is less good than my og piece about jared—this was mainly about js integration bc eventually i will probably make a cute little website focused on just jared :)",
  "tom's everything I want to be when I get outta this place! hey, wait, let me show you around!",
  "i designed it all by myself! do you like it?! :D",
  "...why don't you talk back to me? :(",
  "oh well! i can talk for the both of us!",
  "anyways, let's leave tom be for now! :)"
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

  textAlign(LEFT, TOP);
  textSize(20);
  textFont(comicFont);
  textWrap(WORD);

  JaredFront.parent(document.body);
  JaredFront.style('position', 'fixed');
  JaredFront.style('z-index', '101');
  JaredFront.style('width', '200px');
  JaredFront.style('height', 'auto');
  JaredFront.style('left', 'calc(50% - 100px)'); // center horizontally

  jaredLoaded = true;
  startTyping();
}

function draw() {
  clear();

  if (!jaredLoaded) return;

  let boxMargin = 20;
  let boxHeight = 140;
  let boxWidth = 500;
  let boxX = width / 2 - boxWidth / 2;
  let boxY = windowHeight - boxHeight - 40; // bottom position

  // Position Jared above textbox
  JaredFront.style('top', (windowHeight * 0.3) + 'px');

  // Draw textbox
  fill('rgb(71,70,70)');
  noStroke();
  rect(boxX, boxY, boxWidth, boxHeight, 20);

  fill('white');
  text(displayText, boxX + boxMargin, boxY + boxMargin, boxWidth - boxMargin * 2, boxHeight - boxMargin * 2);

  if (typing && millis() - lastCharTime > typeSpeed) {
    if (charIndex < texts4[currentIndex].length) {
      displayText += texts4[currentIndex].charAt(charIndex);
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
  if (currentIndex === texts4.length - 1 && !typing) {
    window.location.href = 'page5.html';
    return;
  }

  if (typing) {
    displayText = texts4[currentIndex];
    typing = false;
    return;
  }

  currentIndex++;
  displayText = "";
  charIndex = 0;
  typing = true;
  lastCharTime = millis();
}