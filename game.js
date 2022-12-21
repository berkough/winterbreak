const config = {
  type: Phaser.AUTO,
  width: 1280,
  height: 720,
  physics: {
    default: 'arcade',
    arcade: {
      fps: 60,
      gravity: {x:0}
    }
  },
  scene: {
    preload: preload,
    create: create,
    update: update
  }
};

let player;

const game = new Phaser.Game(config);

function preload(){
  this.load.image('ship','assets/Starship_1.gif');
  this.load.image('bg','assets/bg.png');
}

function create(){
  let bg = this.add.image(640,360,'bg');
  player = this.physics.add.image(640,360,'ship');
  player.setDamping(true);
  player.setDrag(0.99);
  player.setMaxVelocity(200);

  let camera = this.cameras.main;
  camera.startFollow(player);
  camera.setDeadzone(64,64);
  camera.setBounds(0,0,12800,7200);

  cursors = this.input.keyboard.createCursorKeys();
}

function update(){
  if (cursors.up.isDown){
      this.physics.velocityFromRotation(player.rotation, 200, player.body.acceleration);
  } else {
      player.setAcceleration(0);
  }

  if (cursors.left.isDown){
      player.setAngularVelocity(-150);
  } else if (cursors.right.isDown){
      player.setAngularVelocity(150);
  } else {
      player.setAngularVelocity(0);
  }
}
