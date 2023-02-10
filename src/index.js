
import Phaser from "phaser";

const config = { 
  //webGL (web graphics library)
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics:{
    //arcade physics plugin handles physics simulation
    default:'arcade'
  },
  scene: {
    preload: preload,
    create: create,
  }
}

// Loading assets, such as images, music, etc etc...
function preload() {
  // 'this' context - scene
  //contains functions and properties we can use
  this.load.image('sky', 'assets/sky.png');
}

function create() {

  //background image
  this.add.image(config.width/2, config.height/2, 'sky')
}


new Phaser.Game(config);