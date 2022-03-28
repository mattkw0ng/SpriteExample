/***********************************************************************************
  Sprite Navigation

  Simple use of the p5.play library
------------------------------------------------------------------------------------
	To use:
	Add this line to the index.html

  <script src="p5.timer.js"></script>
***********************************************************************************/

// This is a 'sprite' which we can move
var ghost;
var avatar;
var speed = 10;

// The is a static sprite
var star;
var starImg;

function preload() {
  starImg = loadImage('assets/fullStar.png');
}
// Setup code goes here
function setup() {
  createCanvas(windowWidth, windowHeight);

  // create a sprite with dimensions
  ghost = createSprite(200, 200);
  avatar = createSprite(width/2, height/2);

  // This is a *numbered* sequence of PNG files
  // We add animation to different sprites
  ghost.addAnimation('floating', 'assets/ghost_standing0001.png', 'assets/ghost_standing0007.png');
  avatar.addAnimation('default', 'assets/walk-01.png', 'assets/walk-08.png');
  // create a star in the middle of the screen
  //star = createSprite(width/2, height/2);
  //star.addImage('star', starImg);

  frameRate(30);
 }

// Draw code goes here
function draw() {
  // could draw a PNG file here
  background(255);

  // trap keyboard arrow keys
  checkMovement();
  checkMovement2();

  // drawSprites is a function in p5.play, draws all the sprites
  drawSprites();

  // callback function
  ghost.attractionPoint(5, avatar.position.x, avatar.position.y);
  avatar.overlap(ghost, avatarCollision);
}

// This will reset position
function keyPressed() {
  if( key === ' ') {
    avatarCollision();
  }
}

function checkMovement() {
  // Check x movement
  if(keyIsDown(RIGHT_ARROW)) {
    ghost.velocity.x = speed;
  }
  else if(keyIsDown(LEFT_ARROW)) {
    ghost.velocity.x = -speed;
  }
  else {
    ghost.velocity.x = 0;
  }

  // Check y movement
  if(keyIsDown(DOWN_ARROW)) {
    ghost.velocity.y = speed;
  }
  else if(keyIsDown(UP_ARROW)) {
    ghost.velocity.y = -speed;
  }
  else {
    ghost.velocity.y = 0;
  }
}

function checkMovement2() {
  // Check x movement
  if(keyIsDown(68)) {
    // D
    avatar.mirrorX(-1);
    avatar.velocity.x = speed;
  }
  else if(keyIsDown(65)) {
    // A
    avatar.mirrorX(1);
    avatar.velocity.x = -speed;
  }
  else {
    avatar.velocity.x = 0;
  }

  // Check y movement
  if(keyIsDown(83)) {
    // S
    avatar.velocity.y = speed;
  }
  else if(keyIsDown(87)) {
    // W
    avatar.velocity.y = -speed;
  }
  else {
    avatar.velocity.y = 0;
  }
}

// SpriteA is the sprite in question, spriteA will be ghost in this case
// SpriteB is the one that it collided with
function avatarCollision(spriteA, spriteB) {
  avatar.position.x = width/2;
  avatar.position.y = height/2;
  ghost.position.x = 200;
  ghost.position.y = 200;
  //spriteB.remove();
}