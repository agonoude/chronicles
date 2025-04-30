let texts = [
    "jared test3 copy???????????",
    "sigh.",
    "maybe?",
    "okay",
    "i hope so"
  ];
  
  let bgImage;

  function preload() {
    bgImage = loadImage('assets/filefolder.jpg'); // Load the image during preload
  }
  
  function draw() {
    background(bgImage); // Set the background to the image
  }

  function setup() {
    let cnv = createCanvas(400, 300);
    cnv.parent('sketch-container');
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


