// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y = y;
    this.speed = speed;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if (this.x < 5*101) {
      this.x += this.speed*dt;
    }
    else {
      this.x = -101;
    }
    if (player.wins == true) {
      this.speed = 0;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

class Hero {
  constructor() {
    this.x = 4*101;
    this.y = 5*83;
    this.wins = false;
    this.sprite = 'images/char-boy.png';
  }
  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }

  handleInput(keyArrow) {
    if (keyArrow == 'left') {
      if (this.x > 0) {this.x -= 101;}
    }
    else if (keyArrow == 'right') {
      if (this.x < 4*101) {this.x += 101;}
    }
    else if (keyArrow == 'up') {
      if (this.y > 0) {this.y -= 83;}
    }
    else if (keyArrow == 'down') {
      if (this.y < 5*83) {this.y += 83;}
    }
  }

  reset(){
    this.x = 4*101;
    this.y = 5*83;
  }

  update() {
    for (let enemy of allEnemies) {
      if ((this.y == enemy.y) && ((enemy.x + 101-45) > this.x) &&
      (enemy.x < this.x +101-45)) {
      this.reset();
    }
    }

    if (this.y == 0) {
      this.wins = true;
    }
  }
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

const player = new Hero();
const enemy1 = new Enemy(-101, 83, 200);
const enemy2 = new Enemy(-101, 2*83, 250);
const enemy3 = new Enemy(-101, 3*83, 300);
const allEnemies = [];
allEnemies.push(enemy1, enemy2, enemy3);


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
