let texts = [
  "jared test1",
  "please god let this work properly pleasepretty33",
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
let typeSpeed = 50;
let JaredFront;
let comicFont;

function preload() {
  comicFont = loadFont('assets/COMIC.TTF');
  JaredFront = createImg('assets/jaredfront.gif');
  JaredFront.hide(); // show it manually after setup
}

function setup() {
  function setup() {
    let cnv = createCanvas(600, 400);
    cnv.parent('sketch-container');
  
    textAlign(LEFT, TOP);
    textSize(20);
    textFont(comicFont);
  

    JaredFront.parent('sketch-container');
    JaredFront.style('position', 'absolute');
    JaredFront.style('z-index', '0');
    JaredFront.size(JaredFront.width * 0.8, JaredFront.height * 0.8);
    JaredFront.position(width / 2 - JaredFront.width / 2 + 25, 80);
    JaredFront.show();
  
    // Button
    button = createButton('Next');
    button.parent('sketch-container');
    button.style('position', 'absolute');
    button.style('z-index', '10');
    button.position(width - 75, height - 50);
    button.mousePressed(startTyping);
  
    startTyping();
  }  };

  // Create button (unchanged)
  button = createButton('Next');
  button.parent('sketch-container');
  button.style('position', 'absolute');
  button.style('z-index', '10');
  button.position(width - 75, height - 50);
  button.mousePressed(startTyping);

  startTyping();
}

function draw() {
  background('black');

  // Textbox
  fill('rgb(71,70,70)');
  noStroke();
  rect(20, height - 100, width - 40, 80, 20);

  // Typing text
  fill('white');
  text(displayText, 40, height - 85);

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
    window.location.href = 'page2.html';
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