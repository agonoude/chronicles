let texts = [
  "jared test3",
  "sighsighsighsighsighsighsigh",
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

  // Textbox
  fill('rgb(71,70,70)');
  noStroke();
  rect(20, height - 100, width - 40, 80, 20);

  // Text inside box
  fill('white');
  text(displayText, 40, height - 85);

  // Reposition button relative to textbox
  button.position(width - 100, height - 40);
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