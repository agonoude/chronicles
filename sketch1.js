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
  // loading comic sans bc i literally had to download FONTS for this...lowkey tho i should try turning my handwriting into a font
  comicFont = loadFont('assets/COMIC.TTF');
  JaredFront = createImg('assets/jaredfront.gif')
  JaredFront.hide();
}

function setup() {
  function setup() {
    let cnv = createCanvas(600, 400);
    cnv.parent('sketch-container');
    cnv.style('position', 'absolute');
    cnv.style('z-index', '1');
  
    textAlign(LEFT, TOP);
    textSize(20);
    textFont(comicFont);
  
    // Setup GIF
    JaredFront.parent('sketch-container');
    JaredFront.style('position', 'absolute');
    JaredFront.style('z-index', '0'); // behind the canvas
    setTimeout(() => {
      JaredFront.position(width / 2 - JaredFront.width / 2, height / 2 - JaredFront.height / 2);
    }, 100);
  
    // Create button
    button = createButton('Next');
    button.parent('sketch-container');
    button.style('position', 'absolute');
    button.style('z-index', '2'); // on top
    button.position(width - 75, height - 50);
    button.mousePressed(startTyping);
  
    startTyping(); // Start typing the first message
  }
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

  // animated
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

  // Otherwise, move to next message and start typing
  currentIndex++;
  displayText = "";
  charIndex = 0;
  typing = true;
  lastCharTime = millis();
}