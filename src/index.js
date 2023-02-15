
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

var pipeGap = 110;

//game objects
let bird = null;
let pipeTop = null;
let pipeBottom = null;

// Loading assets, such as images, music, etc etc...
function preload() {
  this.load.image('sky', 'assets/sky.png');
  this.load.image('bird', 'assets/bird.png');
  this.load.image('pipe', 'assets/pipe.png')
}

function create() {

  //background image
  this.add.image(0, 0, 'sky').setOrigin(0);

  //the bird sprite
  bird = this.physics.add.sprite(birdStartPosition.x, birdStartPosition.y, 'bird').setOrigin(0);
  bird.body.gravity.y =  500;

  //spawn the obstacles
  let pipePositions = MakePipes();
  pipeTop = this.physics.add.sprite(500, pipePositions.x, 'pipe').setOrigin(0, 1);
  pipeBottom = this.physics.add.sprite(500, pipePositions.y, 'pipe').setOrigin(0, 0);

  //callBack Functions
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

function MakePipes(){
  let spawnRange = config.height - pipeGap;
  let randomPosition = Math.floor(Math.random() * spawnRange)
  return {x: randomPosition, y: randomPosition + pipeGap};
}

new Phaser.Game(config);