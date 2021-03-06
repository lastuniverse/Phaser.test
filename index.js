/*var game = new Phaser.Game(827, 600, Phaser.AUTO, 'phaser-example', {preload: preload, create:create});
 
function preload(){
    game.load.image('bg', 'assets/bg.png');
    game.load.image('ufo', 'assets/ufo.png');
}
 
function create() {
    game.add.sprite(0, 0, 'bg');
 
    var ufo = game.add.sprite(413, 900, 'ufo');
    ufo.anchor.set(0.5);
 
    var ufoTween = game.add.tween(ufo);
    ufoTween.to( {y: ufo.y - 1170}, 8000, Phaser.Easing.Sinusoidal.InOut, true);
    ufoTween.to( {y: ufo.y}, 8000, Phaser.Easing.Sinusoidal.InOut, true);

    ufoTween.loop();
}*/


var game = new Phaser.Game(827, 720, Phaser.AUTO, 'phaser-example', { preload: preload, create: create, update: update, render: render });

var text;
var counter = 0;

function preload () {

    //  You can fill the preloader with as many assets as your game requires

    //  Here we are loading an image. The first parameter is the unique
    //  string by which we'll identify the image later in our code.

    //  The second parameter is the URL of the image (relative)
    game.load.image('einstein', 'assets/bg.png');
    game.load.image('ufo', 'assets/ufo.min.png');
    game.load.atlasJSONHash('bot', 'assets/running_bot.png', 'assets/running_bot.json');
    game.load.spritesheet('explosion.01', 'assets/explosion/explosion_01.png', 88, 93, 31);

}

var ufo;
var explosions = [];
var anim = [];

function create() {

    //  This creates a simple sprite that is using our loaded image and
    //  displays it on-screen and assign it to a variable
    var image = game.add.sprite(game.world.centerX, game.world.centerY, 'einstein');

    //  Moves the image anchor to the middle, so it centers inside the game properly
    image.anchor.set(0.5);

    //  Enables all kind of input actions on this image (click, etc)
    var bot = game.add.sprite(200, 200, 'bot')
    bot.animations.add('run');
    bot.animations.play('run', 15, true);

    ufo = game.add.sprite(400, 300, 'ufo');
    //ufo.scale.set(0.3);
    ufo.anchor.set(0.5);

    ufo.inputEnabled = true;
    text = game.add.text(250, 16, '', { fill: '#ffffff' });
    ufo.events.onInputDown.add(listener, this);



    explosions[0] = game.add.sprite(200, 360, 'explosion.01', 0);
    explosions[0].anchor.set(0.5);
    explosions[0].scale.set(1.5);

    anim[0] = explosions[0].animations.add('walk');

/*    anim[0].onStart.add(animationStarted, this);
    anim[0].onLoop.add(animationLooped, this);
    anim[0].onComplete.add(animationStopped, this);*/

    anim[0].play(10, true);

        //  And enable the Sprite to have a physics body:
    game.physics.arcade.enable(ufo);
    game.physics.arcade.enable(explosions[0]);
    //game.physics.enable(ufo, Phaser.Physics.ARCADE);
    //ufo.body.velocity.y=-25;

}

function listener () {

    counter++;
    text.text = "You clicked " + counter + " times!";

}

function animationStarted(sprite, animation) {
}

function animationLooped(sprite, animation) {
}

function animationStopped(sprite, animation) {
}

function update () {

    //  If the sprite is > 8px away from the pointer then let's move to it
    if (game.physics.arcade.distanceToPointer(ufo, game.input.activePointer) > 16)
    {
        //  Make the object seek to the active pointer (mouse or touch).
        game.physics.arcade.moveToPointer(ufo, 200);
        game.physics.arcade.moveToPointer(explosions[0], 100);
    }
    else
    {
        //  Otherwise turn off velocity because we're close enough to the pointer
        ufo.body.velocity.set(0);
        explosions[0].body.velocity.set(0);
    }

}

function render () {
	game.debug.inputInfo(32, 32);

}