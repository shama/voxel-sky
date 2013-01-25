var createEngine = require('voxel-engine');
var createTerrain = require('voxel-perlin-terrain');

// create the game
var game = createEngine({
  generateVoxelChunk: createTerrain({scaleFactor:10}),
  chunkDistance: 2,
  materials: [
    'obsidian',
    ['grass', 'dirt', 'grass_dirt'],
    'grass',
    'plank'
  ],
  texturePath: './textures/',
  startingPosition: [35, -1200, 35],
  worldOrigin: [0, 0, 0],
  fogDisabled: true,
  lightsDisabled: true
});
var hasLock = false;
var container = document.getElementById('container');
game.appendTo(container);
container.addEventListener('click', function() {
  game.requestPointerLock(container);
  hasLock = true;
});

// add some trees
var createTree = require('voxel-forest');
for (var i = 0; i < 20; i++) {
  createTree(game, { bark: 4, leaves: 3 });
}

// disco!
function disco(time) {
  var color = new game.THREE.Color((Math.random() * 0xffffff)|0);
  this.color(color.getHSV(), 1);
  this.spin(Math.PI * 2 * (time / 2400));
}

// create a sky
var time = document.querySelector('#time');
var createSky = require('../')(game);
var sky = createSky(), mysky, oldfn;
game.on('tick', function() {
  mysky = sky();
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
