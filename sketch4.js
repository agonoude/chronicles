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
  textWrap(WORD); //


  JaredFront.parent(document.body);
  JaredFront.style('position', 'fixed'); // 👈 Fixed position to lock on screen
  JaredFront.style('z-index', '101');
  JaredFront.style('width', '200px');
  JaredFront.style('height', 'auto');
  JaredFront.style('left', 'calc(50% - 100px)'); // 👈 Centered horizontally

  jaredLoaded = true; // No need to wait for size
  startTyping();
}

function draw() {
  clear();

  if (!jaredLoaded) return;

  let boxMargin = 125;
  let boxY = (windowHeight * 0.5) + 75; // Position box in the center of the window (adjusted for margins)
  let boxHeight = 100;
  let boxWidth = 500;
  let boxX = width / 2 - boxWidth / 2;

  // Adjust Jared's position dynamically based on window height
  JaredFront.style('top', (windowHeight * 0.3) + 'px'); // 30% of the window height

  fill('rgb(71,70,70)');
  noStroke();
  rect(boxX, boxY, boxWidth, boxHeight, 20);

  fill('white');
  text(displayText, boxX + boxMargin, boxY + boxMargin, boxWidth - boxMargin * 2, boxHeight - boxMargin * 2);

  if (typing && millis() - lastCharTime > typeSpeed) {
    if (charIndex < texts3[currentIndex].length) {
      displayText += texts3[currentIndex].charAt(charIndex);
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
  if (currentIndex === texts3.length - 1 && !typing) {
    window.location.href = 'page5.html';
    return;
  }

  if (typing) {
    displayText = texts3[currentIndex];
    typing = false;
    return;
  }

  currentIndex++;
  displayText = "";
  charIndex = 0;
  typing = true;
  lastCharTime = millis();
}