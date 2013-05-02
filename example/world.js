var createEngine = require('voxel-engine');
var createTerrain = require('voxel-perlin-terrain');

// create the game
var game = createEngine({
  generateVoxelChunk: createTerrain({scaleFactor:6}),
  chunkDistance: 2,
  materials: ['obsidian', ['grass', 'dirt', 'grass_dirt'], 'grass', 'plank'],
  texturePath: './textures/',
  lightsDisabled: true
});
var container = document.getElementById('container');
game.appendTo(container);

var createPlayer = require('voxel-player')(game);
var shama = createPlayer('shama.png');
shama.yaw.position.set(0, 0, 0);
shama.possess();

// add some trees
/*var createTree = require('voxel-forest');
for (var i = 0; i < 20; i++) {
  createTree(game, { bark: 4, leaves: 3 });
}*/

// disco!
function disco(time) {
  var color = new game.THREE.Color((Math.random() * 0xffffff)|0);
  this.color(color.getHSL(), 1);
  this.spin(Math.PI * 2 * (time / 2400));
}

// create a sky
var time = document.querySelector('#time');
var createSky = require('../')(game);
var sky = createSky(), mysky, oldfn;
game.on('tick', function(dt) {
  mysky = sky(dt);
  time.innerHTML = Math.floor(mysky.time);
});

// add a toolbar
var toolbar = require('toolbar')('.bar-tab');
toolbar.on('select', function(item) {
  if (oldfn) mysky.fn = oldfn;
  if (item === 'normal')        mysky.speed(0.1);
  else if (item === 'fast')     mysky.speed(2);
  else if (item === 'ludacris') mysky.speed(10);
  else if (item === 'disco') {
    oldfn = mysky.fn;
    mysky.fn = disco;
    mysky.speed(1);
  }
});
