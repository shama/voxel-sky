# voxel-sky

> A sky for [voxel.js](https://github.com/maxogden/voxel-engine).
> Includes a sun, moon and stars.

[View this example](http://shama.github.com/voxel-sky)

## example

First off, it is recommended to disable lights in the game when using
`voxel-sky`:
```js
var createEngine = require('voxel-engine');
var game = createEngine({
  lightsDisabled: true
});
```

To simply set the sky to a certain time of day:
```js
var createSky = require('voxel-sky')(game);
var sky = createSky(1200); // Set to noon
```

Or if you would like to run through a day/night cycle:
```js
var createSky = require('voxel-sky')(game);
var sky = createSky();
game.on('tick', sky);
```

### customize the sky

You can build your own sky using the included helpers:
```js
var createSky = require('voxel-sky')(game);
var sky = createSky(function(time) {
  
  // spin the sky once per day
  this.spin(Math.PI * 2 * (time / 2400));

  // Change the sky pink at 7AM
  if (time === 700) this.color(new this.game.THREE.Color(0xFF36AB), 1000);

  if (time === 0) {
    // paint a green square on the bottom (above your head at 1200)
    this.paint('bottom', function() {
      // The HTML canvas and context for each side are accessible
      this.context.rect((this.canvas.width/2)-25, (this.canvas.height/2)-25, 50, 50);
      this.context.fillStyle = this.rgba(0, 1, 0, 1);
      this.context.fill();
    });

    // paint 500 stars on the top and bottom
    this.paint(['top', 'bottom'], this.stars, 500);

    // paint a big red full moon on every face
    // 0 = full, 0.25 quarter waxing, 0.5 = new, 0.75 quarter waning
    this.paint('all', this.moon, 0, 100, new this.game.THREE.Color(0xFF0000));

    // paint a small green sun on each side face
    this.paint('sides', this.sun, 10, new this.game.THREE.Color(0x00FF00));
  }

  if (time === 400) {
    // clear the canvas on all sides at 4AM
    this.paint('all', this.clear);
  }

  if (time === 1800) {
    // lower the sunlight intensity at 6PM
    this.sunlight.intensity = 0.2;

    // set the ambient color (is a hemisphere light)
    this.ambient.color.setHSL(0.9, 1, 1);
  }
});
game.on('tick', sky);
```

Check the
[source of the built-in](https://github.com/shama/voxel-sky/blob/master/index.js#L164)
sky for a more in depth example.

### options

There are a variety of starting options for voxel-sky. Just make sure you always
pass it a game:
```js
var createSky = require('voxel-sky')({
  game: game,

  // starting time of the day
  time: 2400,

  // size of the sky
  size: game.worldWidth() * 2,

  // initial color of the sky
  color: new game.THREE.Color(0, 0, 0),

  // how fast the sky rotates
  speed: 0.1
});
```

## run the demo

1. `git clone git://github.com/shama/voxel-sky && cd voxel-sky`
1. `npm install`
1. `npm start`

## install

With [npm](https://npmjs.org) do:

```
npm install voxel-sky
```

Use [browserify](http://browserify.org) to `require('voxel-sky')`.

## release history
* 0.2.0 - update for voxel-engine@0.17.0. Use tic to keep in sync with game clock. Now works with fog.
* 0.1.2 - updates for voxel-engine@0.6.0 (thanks @nakedible!)
* 0.1.1 - simplify moon, no tilt, better color changes
* 0.1.0 - initial release

## license
Copyright (c) 2013 Kyle Robinson Young<br/>
Licensed under the MIT license.
