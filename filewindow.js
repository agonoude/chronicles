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


