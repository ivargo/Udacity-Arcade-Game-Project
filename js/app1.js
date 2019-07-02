// Enemies our player must avoid
var Enemy = function(x, y) {
    // Variables applied to each of our instances
    // Coordinates and Random speed
    this.x = x;
    this.y = y;
    this.speed = Math.floor(Math.random() * (400 - 300)) + 300;
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // Random speed multiplied  by the dt parameter up until right boundary
    // Speed set to 0 when player wins - enemies freeze on the board
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

// Reseting enemies requires off left boundary and random speed
Enemy.prototype.reset = function() {
  this.x = -101;
  this.speed = Math.floor(Math.random() * (400 - 300)) + 300;
  }


// Draw the enemy on the screen
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Player classwith an update(), render(), handleInput() and reset() methods
class Hero {
  constructor() {
    this.x = 4*101;   //setting player to  the bottom right
    this.y = 5*83;
    this.wins = false; //win property initially set to false
    this.sprite = 'images/char-boy.png';
  }
  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }

//increment arrow movement by the dimensions of the brick (83x101)
//within the boundaries if 4x101 and 5x83
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

//resetting the Player at the bottom right
  reset(){
    this.x = 4*101;
    this.y = 5*83;
  }

//check for collision with enemies here on the y-axis
//and on the x-axis by taking a brick's width and reducing by 45
//for deeper impact => reset()
  update() {
    for (let enemy of allEnemies) {
      if ((this.y == enemy.y) && ((enemy.x + 101-45) > this.x) &&
      (enemy.x < this.x +101-45)) {
      this.reset();
    }
    }
// check for winning condition and update winning property to 'true'
    if (this.y == 0) {
      this.wins = true;
    }
  }
}

// Instantiate objects. Place all enemy objects in an array called allEnemies
// Place each enemy on a separate row, offscreen
const player = new Hero();
const enemy1 = new Enemy(-101, 83);
const enemy2 = new Enemy(-101, 2*83);
const enemy3 = new Enemy(-101, 3*83);
const allEnemies = [];
allEnemies.push(enemy1, enemy2, enemy3);

// This listens for key presses and sends the keys to handleInput() method
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

// handle modalupon clicking Replay button and Close span
const closeModal = document.getElementById('closeModal');
const modal = document.getElementById('winModal');
const replay = document.querySelector('.button');

//Modal is displayed upon winning within updateEntities(dt) at enjine.js:99
//Replaying requires reset of player and enemies and closing the modal
replay.addEventListener('click', function(){
  player.reset();
  player.wins = false;
  allEnemies.forEach(function(enemy) {
        enemy.reset();
    });
  modal.style.display = 'none';
})

//spimply closing the modal should leave all items on the board as the are
closeModal.addEventListener('click', function(){
    player.y = 0.01; // has to be different from zero to close the modal
    player.wins = false;
    modal.style.display = 'none';
})
