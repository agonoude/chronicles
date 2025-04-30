let texts = [
    "oh, wow! it worked!",
    "wait...what is that?",
    "that's not a folder inside...",
    "'message to my j...'?",
    "...oh."
  ];
  
  let currentIndex = 0;
  let displayText = "";
  let charIndex = 0;
  let typing = false;
  let lastCharTime = 0;
  let typeSpeed = 50;
  let JaredFront;
  let comicFont;
  let jaredY = 40;
  let jaredLoaded = false;
  
  function preload() {
    comicFont = loadFont('assets/COMIC.TTF');
    JaredFront = createImg('assets/jaredfront.gif');
    JaredFront.hide(); // Show manually later
  }
  
  function setup() {
    let cnv = createCanvas(400, 300);
    cnv.parent('sketch-container');
    textAlign(CENTER, CENTER);
    textSize(16);
    textFont(comicFont);
  
    JaredFront.parent('sketch-container');
    JaredFront.style('position', 'absolute');
    JaredFront.style('z-index', '0');
    JaredFront.show();
  
    // Ensure loading happens even if image is cached
    if (JaredFront.elt.complete) {
      handleJaredLoad();
    } else {
      JaredFront.elt.onload = handleJaredLoad;
    }
  
    startTyping();
  }
  
  function handleJaredLoad() {
    let scale = 0.8;
    let natW = JaredFront.elt.naturalWidth || 300;
    let natH = JaredFront.elt.naturalHeight || 300;
    JaredFront.size(natW * scale, natH * scale);
    jaredLoaded = true;
    positionJared();
  }
  
  function draw() {
    clear();
    if (!jaredLoaded) return;
  
    let jaredH = JaredFront.height;
    let boxMargin = 20;
    let boxY = jaredY + jaredH + boxMargin;
    let boxHeight = 80;
    let boxWidth = 400;
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
      window.location.href = 'index.html';
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
//trying to make the code stay inside lol
  const windowContainer = document.getElementById('window-container');
  let isDragging = false;
  let offsetX = 0;
  let offsetY = 0;

  windowContainer.addEventListener('mousedown', (e) => {
    isDragging = true;
    offsetX = e.clientX - windowContainer.offsetLeft;
    offsetY = e.clientY - windowContainer.offsetTop;
    windowContainer.style.cursor = 'grabbing';
  });
  document.addEventListener('mousemove', (e) => {
    if (isDragging) {
      let x = e.clientX - offsetX;
      let y = e.clientY - offsetY;
  
      // Constrain within the window boundaries
      const maxX = window.innerWidth - windowContainer.offsetWidth;
      const maxY = window.innerHeight - windowContainer.offsetHeight;
  
      x = Math.max(0, Math.min(x, maxX));
      y = Math.max(0, Math.min(y, maxY));
  
      windowContainer.style.left = `${x}px`;
      windowContainer.style.top = `${y}px`;
    }
  });

  document.addEventListener('mouseup', () => {
    isDragging = false;
    windowContainer.style.cursor = 'move';
  });


