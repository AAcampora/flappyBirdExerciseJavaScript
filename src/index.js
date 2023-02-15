
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
const FLAPSTRENGHT = -300;

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
  bird = this.physics.add.sprite(config.width * 0.1,  config.height / 2, 'bird').setOrigin(0);

  this.input.keyboard.on('keydown-SPACE', Flap);
}

function update(time, delta) {

}

function Flap(){
  bird.body.velocity.y = FLAPSTRENGHT;
}


new Phaser.Game(config);