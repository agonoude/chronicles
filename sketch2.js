let texts2 = [
  "jared test1",
  "yay!",
  "hmm, what to talk about... oo! why did ALANNA create me!",
  "why did ALANNA create me? well, you see, there was a period of time where she didn't have her magical phone that i've never seen! (tom says it's linked to an 'interdimensional portal' or 'ip' as she calls it)...", 
  "which allows her to go through so many programs. one day i'll go through it, i swear!)",
  "isn't that cool!?"
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
  cnv.style('position', 'absolute');
  cnv.style('pointer-events', 'none');  
  
  JaredFront.parent(document.body);
  JaredFront.style('position', 'absolute');
  JaredFront.style('position', 'absolute');
  JaredFront.style('z-index', '0');
  JaredFront.show();

  textAlign(LEFT, TOP); // Adjust text alignment to start from the left and top
  textSize(20);
  textFont(comicFont);
  textWrap(WORD); // Enable word wrapping

  JaredFront.elt.onload = () => {
    let scale = 0.8;
    let natW = JaredFront.elt.naturalWidth;
    let natH = JaredFront.elt.naturalHeight;
    JaredFront.size(natW * scale, natH * scale);
    setTimeout(() => {
      jaredLoaded = true;
      positionJared();
    }, 0);
  };

  startTyping();
}

function draw() {
  clear();

  // Always draw the text box
  let boxMargin = 20;
  let boxHeight = 150;
  let boxWidth = 600;
  let boxX = width / 2 - boxWidth / 2;
  let boxY = jaredY + JaredFront.height + 100;

  fill('rgb(71,70,70)');
  noStroke();
  rect(boxX, boxY, boxWidth, boxHeight, 20);

  fill('white');
  // Draw the text inside the box, wrapping it within the box width
  text(displayText, boxX + boxMargin, boxY + boxMargin, boxWidth - boxMargin * 2, boxHeight - boxMargin * 2);

  // Only start typing when `typing` is true
  if (typing && millis() - lastCharTime > typeSpeed) {
    if (charIndex < texts2[currentIndex].length) {
      displayText += texts2[currentIndex].charAt(charIndex);
      charIndex++;
      lastCharTime = millis();
    } else {
      typing = false;
    }
  }

  // If Jared's image has loaded, show it
  if (jaredLoaded) {
    let jaredH = JaredFront.height;
    positionJared();
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
  if (currentIndex === texts2.length - 1 && !typing) {
    window.location.href = 'page3.html';
    return;
  }

  if (typing) {
    displayText = texts2[currentIndex];
    typing = false;
    return;
  }

  currentIndex++;
  displayText = "";
  charIndex = 0;
  typing = true;
  lastCharTime = millis();
}
