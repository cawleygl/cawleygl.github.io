window.onresize = function() {
	setup();
}

function setup() {
  createCanvas(windowWidth / 2 + 200, 500);
	background(250,250,210);
	cursor('crosshair');
	frameRate(60);
}

function draw() {
  if (mouseIsPressed) {
    fill(0,0,128);
  } else {
    noFill();
		noStroke();
  }
  circle(mouseX, mouseY, 30);
}