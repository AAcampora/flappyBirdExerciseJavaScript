
import Phaser from "phaser";

const config = { 
  //webGL (web graphics library)
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics:{
    //arcade physics plugin handles physics simulation
    default:'arcade',
    arcade:{
      gravity: {y:400},
      debug: true,
    }
  },
  scene: {
    preload,
    create,
    update
  }
}

//game variables
const flapStrenght = -300;
const birdStartPosition = {x: config.width * 0.1, y: config.height / 2}

//game objects
let bird = null;
let totalDelta = null;

// Loading assets, such as images, music, etc etc...
function preload() {
  // 'this' context - scene
  //contains functions and properties we can use
  this.load.image('sky', 'assets/sky.png');
  this.load.image('bird', 'assets/bird.png');
}

function create() {

  //background image
  this.add.image(0, 0, 'sky').setOrigin(0);
  //the bird sprite
  bird = this.physics.add.sprite(birdStartPosition.x, birdStartPosition.y, 'bird').setOrigin(0);

  this.input.keyboard.on('keydown-SPACE', Flap);
}


//if bird y position is smaller than 0 or greater than height of canvas
//console log you lost
function update(time, delta) {
  OutOfBoundsDeath();
}

function OutOfBoundsDeath() {
    //check if bird hits upper bound
    if(bird.y <= 0 -bird.height || bird.y >= config.height){
      RestartGame();
    }
}

function RestartGame() {
  bird.x = birdStartPosition.x;
  bird.y = birdStartPosition.y;
  bird.body.velocity.y  = 0;
}

function Flap() {
  bird.body.velocity.y = flapStrenght;
}

new Phaser.Game(config);