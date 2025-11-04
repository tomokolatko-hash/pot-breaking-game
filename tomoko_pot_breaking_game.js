let pots = [];
let numPots = 5;
let score = 0;
let win = false;
let timeLeft = 5; // ⏱️ Game time in seconds
let timerRunning = false;
let gameOver = false;

function setup() {
  createCanvas(800, 600);
  textFont('Arial');
  newGame();
}

function draw() {
  background(230, 240, 255);

  if (win) {
    textSize(48);
    fill(0);
    textAlign(CENTER, CENTER);
    text("🎉 All Pots Broken! 🎉", width / 2, height / 2);
    textSize(24);
    text("Click to Restart", width / 2, height / 2 + 60);
    return;
  }

  if (gameOver) {
    textSize(48);
    fill(0);
    textAlign(CENTER, CENTER);
    text("⏰ Time’s Up!", width / 2, height / 2);
    textSize(24);
    text("Click to Restart", width / 2, height / 2 + 60);
    return;
  }

  // Draw pots
  for (let p of pots) {
    if (!p.broken) {
      drawPot(p.x, p.y, p.size);
    } else {
      drawBrokenPot(p.x, p.y, p.size);
    }
  }

  // Draw score
  fill(0);
  textSize(24);
  textAlign(LEFT, TOP);
  text("Score: " + score, 20, 20);

  // Draw timer
  textAlign(RIGHT, TOP);
  text("Time: " + nf(timeLeft.toFixed(1), 1, 1), width - 20, 20);

  // Handle timer countdown
  if (timerRunning && !win) {
    timeLeft -= deltaTime / 1000; // deltaTime is milliseconds per frame
    if (timeLeft <= 0) {
      timeLeft = 0;
      timerRunning = false;
      gameOver = true;
    }
  }
}

function mousePressed() {
  if (win || gameOver) {
    newGame();
    return;
  }

  // Start timer on first click
  if (!timerRunning) {
    timerRunning = true;
  }

  // Check for pot clicks
  for (let p of pots) {
    let d = dist(mouseX, mouseY, p.x, p.y);
    if (d < p.size / 2 && !p.broken) {
      p.broken = true;
      score++;
    }
  }

  // Check win condition
  if (score === pots.length) {
    win = true;
    timerRunning = false;
  }
}

function newGame() {
  pots = [];
  score = 0;
  win = false;
  gameOver = false;
  timerRunning = false;
  timeLeft = 5; // reset timer

  for (let i = 0; i < numPots; i++) {
    pots.push({
      x: random(120, width - 120),
      y: random(180, height - 120),
      size: random(80, 120),
      broken: false
    });
  }
}

// 🏺 Draw pot
function drawPot(x, y, s) {
  push();
  translate(x, y);
  noStroke();

  let potColor = color(170, 90, 30);
  fill(potColor);

  beginShape();
  vertex(-s * 0.25, 0);
  bezierVertex(-s * 0.45, s * 0.3, -s * 0.4, s * 0.7, 0, s * 0.8);
  bezierVertex(s * 0.4, s * 0.7, s * 0.45, s * 0.3, s * 0.25, 0);
  endShape(CLOSE);

  fill(lerpColor(potColor, color(0), 0.2));
  rect(-s * 0.2, -s * 0.1, s * 0.4, s * 0.1, 5);

  fill(60, 30, 10);
  ellipse(0, -s * 0.1, s * 0.5, s * 0.15);

  fill(255, 255, 255, 50);
  ellipse(-s * 0.1, s * 0.2, s * 0.2, s * 0.4);
  pop();
}

// 💥 Broken pot
function drawBrokenPot(x, y, s) {
  push();
  translate(x, y);
  noStroke();
  fill(120, 60, 20);
  triangle(-s * 0.3, 0, -s * 0.1, s * 0.3, -s * 0.4, s * 0.4);
  triangle(s * 0.2, 0, s * 0.4, s * 0.3, s * 0.1, s * 0.4);
  triangle(0, s * 0.1, s * 0.2, s * 0.4, -s * 0.2, s * 0.4);
  pop();
}
