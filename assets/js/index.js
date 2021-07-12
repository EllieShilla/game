var config = {
    type: Phaser.AUTO,
    width: 400,
    height: 400,
    scene: {
        preload: preload,
        create: create,
        update: update
    },
    // scale: {
    //     zoom: 2
    // },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {
                y: 0
            },
            debug: true
        }
    },
    audio: {
        disableWebAudio: true
    }
};

var game = new Phaser.Game(config);
var girl;
var boy;
let dino;
var cursors;
var info;
var info2;
var info3;
var count = 0;
var died = false;
var knifes;
var space;

function preload() {
    this.load.image('tiles', 'assets/background/free.png');
    this.load.tilemapTiledJSON('scene2', 'assets/background/scene2.json');
    // this.load.atlas('girl', 'assets/character/spritesheet.png', 'assets/character/spritesheet.json');
    cursors = this.input.keyboard.createCursorKeys();
    this.load.audio('boden', 'assets/audio/POL-water-drops-short.mp3');
    this.load.atlas('dino', 'assets/enemies/dino.png', 'assets/enemies/dino.json');
    this.load.atlas('girl', 'assets/enemies/spritesheet.png', 'assets/enemies/spritesheet.json');
    this.load.image('knife', 'assets/weapon/knife.png');

}

function create() {
    cursors = this.input.keyboard.createCursorKeys();

    const map = this.make.tilemap({ key: 'scene2' });
    const tileset = map.addTilesetImage("farm", "tiles", 16, 16);

    const collisionLayer = map.createLayer('collision', tileset, 0, 0);
    const groundLayer = map.createLayer('ground', tileset, 0, 0);
    const forestLayer = map.createLayer('forest', tileset, 0, 0);
    const forest2Layer = map.createLayer('forest2', tileset, 0, 0);

    const music = this.sound.add('boden', {
        volume: 0.5,
        loop: true,
        detune: 25
    });
    //music.play();



    collisionLayer.setCollisionByProperty({ collides: true });
    forestLayer.setCollisionByProperty({ collides: true });

    // const debugGraphics = this.add.graphics().setAlpha(0.75);
    // collisionLayer.renderDebug(debugGraphics, {
    //     tileColor: null,
    //     collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255),
    //     faceColor: new Phaser.Display.Color(40, 39, 37, 255)
    // });






    girl = this.physics.add.sprite(128, 128, 'girl', 'run-down-3.png');
    girl.body.setSize(girl.width * 0.5, girl.height * 0.8);

    this.anims.create({
        key: 'girl-stop-down',
        frames: [{ key: 'girl', frame: 'run-down-3.png' }]
    })

    this.anims.create({
        key: 'girl-stop-up',
        frames: [{ key: 'girl', frame: 'run-up-3.png' }]
    })

    this.anims.create({
        key: 'girl-stop-side',
        frames: [{ key: 'girl', frame: 'run-side-3.png' }]
    })

    this.anims.create({
        key: 'girl-go-down',
        frames: this.anims.generateFrameNames('girl', { start: 1, end: 8, prefix: 'run-down-', suffix: '.png' }),
        repeat: -1,
        frameRate: 15
    });

    this.anims.create({
        key: 'girl-go-up',
        frames: this.anims.generateFrameNames('girl', { start: 1, end: 8, prefix: 'run-up-', suffix: '.png' }),
        repeat: -1,
        frameRate: 15
    });

    this.anims.create({
        key: 'girl-go-side',
        frames: this.anims.generateFrameNames('girl', { start: 1, end: 8, prefix: 'run-side-', suffix: '.png' }),
        repeat: -1,
        frameRate: 15
    });

    this.anims.create({
        key: 'girl-faint',
        frames: this.anims.generateFrameNames('girl', { start: 1, end: 4, prefix: 'faint-', suffix: '.png' }),
        repeat: 0,
        frameRate: 10
    });

    girl.anims.play('girl-stop-down', true);



    this.physics.add.collider(girl, collisionLayer);
    this.physics.add.collider(girl, forestLayer);

    dino = this.physics.add.sprite(200, 200, 'dino', 'lizard_m_run_anim_f-0.png');
    dino2 = this.physics.add.sprite(200, 250, 'dino', 'lizard_m_run_anim_f-0.png');

    this.anims.create({
        key: 'dino-run',
        frames: [{ key: 'dino', frame: 'lizard_m_run_anim_f-0.png' }]
    });

    this.anims.create({
        key: 'dino-go',
        frames: this.anims.generateFrameNames('dino', { start: 0, end: 3, prefix: 'lizard_m_run_anim_f-', suffix: '.png' }),
        repeat: -1,
        frameRate: 10
    });

    this.anims.create({
        key: 'dino-idle',
        frames: this.anims.generateFrameNames('dino', { start: 0, end: 3, prefix: 'lizard_m_idle_anim_f-', suffix: '.png' }),
        repeat: -1,
        frameRate: 10
    });


    dino.anims.play('dino-idle', true);
    dino2.anims.play('dino-idle', true);

    

    this.physics.add.collider(dino, collisionLayer);
    this.physics.add.collider(dino2, collisionLayer);
    this.physics.add.collider(dino, forestLayer);
    this.physics.add.collider(dino2, forestLayer);
    // this.physics.add.collider(dino, girl);
    // this.physics.add.collider(dino2, girl);
    // this.physics.add.collider(knifes, collisionLayer);
    // this.physics.add.collider(knifes, dino);


    // this.cameras.main.startFollow(girl);

    info = this.add.text(0, 0, 'girl: ' + girl.body['center']['x']);
    info2 = this.add.text(0, 15, 'dino: ' + dino.body['center']['x']);
    info3 = this.add.text(0, 30, 'dino2: ' + dino2.body['center']['x']);
    info4 = this.add.text(20, 50,);


   

}

function update() {
    var character = new Character();
    var pointer = this.input.activePointer;

    character.CharAnimation();
    character.characterAttac();
    character.dinoAnimation(dino);
    character.dinoAttac(dino);
    character.dinoAttac(dino2);

    info.setText('girl: ' + girl.body['center']['x']);
    info2.setText('dino: ' + dino.body['center']['x']);
    info3.setText('dino2: ' + dino2.body['center']['x']);

    if (died == true)
        info4.setText('YOU DIED');




}



function Character_Update() {

}