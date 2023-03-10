const config = {
    type: Phaser.AUTO,
    width: 1280,
    height: 720,
    physics: {
        default: 'arcade',
        arcade: {
            fps: 60,
            gravity: { x: 0 }
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};
//Flag variable for idle animation
let idleAnimationIsPlaying = false;

let player;

const game = new Phaser.Game(config);

function preload() {
    // this.load.image('ship','assets/Starship_1.gif');
    this.load.image('bg', 'assets/bg.png');
    this.load.image('Default', 'assets/Ship Start.png');
    // Load the player sprite's animation frames
    this.load.spritesheet('ship', 'assets/Ship sprite sheet.png', { frameWidth: 128, frameHeight: 128 });
    this.load.spritesheet('idle', 'assets/Ship_idle_spritesheet.png', { frameWidth: 128, frameHeight: 128 });
    this.load.audio('Game Music', 'Audio/Game Music.mp3');
}



function create() {
    let bg = this.add.image(640, 360, 'bg');
    player = this.physics.add.sprite(640, 360, 'Default');
    player.setDamping(true);
    player.setDrag(0.99);
    player.setMaxVelocity(200);

    //Added music to game
    let gameMusic = this.sound.add('Game Music');
    gameMusic.play('', 0, 1, true);
    //Creating animations from frames
    this.anims.create({
        key: 'forward',
        frames: this.anims.generateFrameNumbers('ship', { start: 0, end: 11 }),
        frameRate: 20,
        repeat: 0
    });

    this.anims.create({
        key: 'idle',
        frames: this.anims.generateFrameNumbers('idle', {
            frames: [0, 1, 2, 3, 4]
        }),
        frameRate: 10,
        repeat: 0
    });

    let camera = this.cameras.main;
    // Set the camera to follow the image
    this.cameras.main.startFollow(player);

    // Set the deadzone for the camera, so that it only follows the image when it moves out of the deadzone
    this.cameras.main.setDeadzone(64, 64);

    // Set the bounds of the camera to the size of the game world, so that it doesn't go out of bounds
    this.cameras.main.setBounds(0, 0, 12800, 7200);

    cursors = this.input.keyboard.createCursorKeys();

    player.setCollideWorldBounds(true);

}

function update() {
    console.log(player.rotation);

    // Check if the up arrow is being pressed
    if (cursors.up.isDown) {

        idleAnimationIsPlaying = true;
        // Play the 'forward' animation
        player.anims.play('forward', true);

        this.physics.velocityFromRotation(player.rotation, 200, player.body.acceleration);
    } else {
        //play the 'idle'animation if up isnt being pressed and reduce acceleration
        player.setAcceleration(0);
        //player.anims.play('idle', true);
    }
    //Play idle animation when idling and stop on last frame
    if (idleAnimationIsPlaying == true && !cursors.up.isDown) {
        idleAnimationIsPlaying = false;
        player.anims.play('idle', true);
    }

    if (cursors.left.isDown) {
        player.setAngularVelocity(-150);
    }
    else if (cursors.right.isDown) {
        player.setAngularVelocity(150);
    }
    else {
        player.setAngularVelocity(0);
    }
}


