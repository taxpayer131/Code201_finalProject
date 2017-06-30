//////////////////////////////
/////GAME FUNCTIONS START/////
///////////CODE BY////////////
///////MAILSON MENEZES////////
////Modified by Re-Pong///////

//NOTE NC
function Game() {
  var canvas = document.getElementById('game');
  this.width = canvas.width;
  this.height = canvas.height;
  this.context = canvas.getContext('2d');
  this.context.font = '100px "Press Start 2P", cursive';
  this.context.fillStyle = 'white';
  this.keys = new KeyListener();
  this.p1 = new Paddle(5, 0);
  this.p1.y = this.height / 2 - this.p1.height / 2;
  this.display1 = new Display(this.width / 8, this.height - 20);
  this.p2 = new Paddle2(this.width - 5, 0);
  this.p2.y = this.height / 2 - this.p2.height / 2;
  this.display2 = new Display(this.width * 5 / 8, this.height - 20);
  this.ball = new Ball();
  this.ball.x = this.width / 2;
  this.ball.y = this.height / 2;
  this.ball.vy = Math.floor(Math.random() * 12 - 6);
  this.ball.vx = 7 - Math.abs(this.ball.vy);
}

function speedUp() {
  game.ball.vx = game.ball.vx * 1.04;
}

Game.prototype.draw = function() {
  this.context.clearRect(0, 0, this.width, this.height);
  this.context.fillRect(this.width / 2, 0, 2, this.height);
  this.context.save();
  this.context.fillStyle = '#00ff98';
  this.p1.draw(this.context);
  this.context.restore();
  this.context.save();
  this.context.fillStyle = '#9934ff';
  this.p2.draw(this.context);
  this.context.restore();
  this.context.save();
  this.context.fillStyle = 'black';
  this.display1.draw(this.context);
  this.display2.draw(this.context);
  this.context.restore();
  this.context.save();
  this.context.fillStyle = 'orange';
  this.ball.draw(this.context);
  this.context.restore();
};

// NOTE css

function randomizeBackgroundPicture() {
  document.getElementById('game').style.backgroundImage = 'url(img/TeamRePONGresized.JPG)';

}

function randomizeBackground() {
  var backgrounds = ['#ff6666', 'rgb(24,193,255)', 'rgb(255,255,136)', '#6f6f6f', randomizeBackgroundPicture()];
  var randBack = backgrounds[Math.floor(Math.random() * backgrounds.length)];
  document.getElementById('game').style.background = randBack;
}

//NOTE NC
Game.prototype.update = function() {
  if (this.pause) {
    return;
  } else {
    this.display1.value = this.p1.score;
    this.display2.value = this.p2.score;
    this.ball.update();
  }
  // To which Y direction the paddle is moving
  if (this.keys.isPressed(83)) { // DOWN
    this.p1.y = Math.min(this.height - this.p1.height, this.p1.y + 4);
  } else if (this.keys.isPressed(87)) { // UP
    this.p1.y = Math.max(0, this.p1.y - 4);
  }
  if (this.keys.isPressed(40)) { // DOWN
    this.p2.y = Math.min(this.height - this.p2.height, this.p2.y + 4);
  } else if (this.keys.isPressed(38)) { // UP
    this.p2.y = Math.max(0, this.p2.y - 4);
  }
  if (this.ball.vx > 0) {
    if (this.p2.x + this.p2.width - this.ball.width <= this.ball.x) {
      var collisionDiff = 1;
      var k = collisionDiff / this.ball.vx;
      var y = this.ball.vy * k + (this.ball.y - this.ball.vy);
      if (y >= this.p2.y && y + this.ball.height <= this.p2.y + this.p2.height) {
        // collides with right paddle
        this.ball.x = this.p2.x + this.p2.width - this.ball.width;
        this.ball.y = Math.floor(this.ball.y - this.ball.vy + this.ball.vy * k);
        if (this.keys.isPressed(40)) { // DOWN
          this.ball.vy--;
        }
        if (this.keys.isPressed(38)) { // DOWN
          this.ball.vy++;
        }
        this.ball.vx = -this.ball.vx;
        speedUp();
        randomizeBackground();
      }
    }
  } else {
    if (this.p1.x + this.p1.width >= this.ball.x) {
      var collisionDiff = 1;
      var k = collisionDiff / -this.ball.vx;
      var y = this.ball.vy * k + (this.ball.y - this.ball.vy);
      if (y >= this.p1.y && y + this.ball.height <= this.p1.y + this.p1.height) {
        // collides with the left paddle
        this.ball.x = this.p1.x + this.p1.width;
        this.ball.y = Math.floor(this.ball.y - this.ball.vy + this.ball.vy * k);
        if (this.keys.isPressed(83)) { // DOWN
          this.ball.vy--;
        }
        if (this.keys.isPressed(87)) { // DOWN
          this.ball.vy++;
        }
        this.ball.vx = -this.ball.vx;
        speedUp();
        randomizeBackground();
      }
    }
  }
  // Top and bottom collision
  if ((this.ball.vy < 0 && this.ball.y < 0) ||
    (this.ball.vy > 0 && this.ball.y + this.ball.height > this.height)) {
    this.ball.vy = -this.ball.vy;
  }
  if (this.ball.x >= this.width)
    this.score(this.p1);
  else if (this.ball.x + this.ball.width <= 0)
    this.score(this.p2);
};
// OG
// Game.prototype.score = function(p) {
//   // player scores
//   p.score++;
//   var player = p == this.p1 ? 0 : 1;
//   // set ball position
//   this.ball.x = this.width / 2;
//   this.ball.y = p.y + p.height / 2;
//   // set ball velocity
//   this.ball.vy = Math.floor(Math.random() * 12 - 6);
//   this.ball.vx = 7 - Math.abs(this.ball.vy);
//   if (player == 1)
//     this.ball.vx *= -1;
// };
//////New Score function/////
////////by RePong team///////
/////////////////////////////
///Ball resets on far side///
//////instead of middle//////
Game.prototype.score = function(p) {
  // player scores
  p.score++;
  var player = p == this.p1 ? 0 : 1;
  // set ball position
  this.ball.x = 5;
  this.ball.y = p.y + p.height / 2;
  // set ball velocity
  this.ball.vy = Math.floor(Math.random() * 12 - 6);
  // this.ball.vx = 7 - Math.abs(this.ball.vy);
  if (player == 1) {
    this.ball.x = this.width - 10;
    this.ball.vx *= -1;
  }
};
// PADDLE
function Paddle(x, y) {
  this.x = x;
  this.y = y;
  this.width = 5;
  this.height = 30;
  this.score = 0;
}
Paddle.prototype.draw = function(p) {
  p.fillRect(this.x, this.y, this.width, this.height);
};

function Paddle2(x, y) {
  this.x = x;
  this.y = y;
  this.width = -5;
  this.height = 30;
  this.score = 0;
}
Paddle2.prototype.draw = function(p) {
  p.fillRect(this.x, this.y, this.width, this.height);
};
// BALL
function Ball() {
  this.x = 0;
  this.y = 0;
  this.vx = 0;
  this.vy = 0;
  this.width = 5;
  this.height = 5;
}
Ball.prototype.update = function() {
  this.x += this.vx;
  this.y += this.vy;
};
Ball.prototype.draw = function(p) {
  p.fillRect(this.x, this.y, this.width, this.height);
};
//DISPLAY
function Display(x, y) {
  this.x = x;
  this.y = y;
  this.value = 0;
}
Display.prototype.draw = function(p) {
  p.fillText(this.value, this.x, this.y);
};
// KEY LISTENER
function KeyListener() {
  this.pressedKeys = [];
  this.keydown = function(e) {
    this.pressedKeys[e.keyCode] = true;
  };
  this.keyup = function(e) {
    this.pressedKeys[e.keyCode] = false;
  };
  document.addEventListener('keydown', this.keydown.bind(this));
  document.addEventListener('keyup', this.keyup.bind(this));
}
KeyListener.prototype.isPressed = function(key) {
  return this.pressedKeys[key] ? true : false;
};
KeyListener.prototype.addKeyPressListener = function(keyCode, callback) {
  document.addEventListener('keypress', function(e) {
    if (e.keyCode == keyCode)
      callback(e);
  });
};

// Initialize our game instance

function playerCard(parent, type, id, content) {
  var board = document.getElementById(parent);
  var el = document.createElement(type);
  el.id = id;
  el.textContent = content;
  board.appendChild(el);
}

var game = new Game();

function MainLoop() {
  if ((game.p1.score === 9) || (game.p2.score === 9)) {
    console.log('returning mainloop');
    game.update();
    game.draw();
    endResults();
    updatePlayerArray(Player.playerOne);
    updatePlayerArray(Player.playerTwo);
    pushStorage();
    document.getElementById('start_game').style.display = 'none';
    document.getElementById('game').style.display = 'none';
    document.getElementById('start').style.display = 'block';
    // document.getElementById('first').style.display = 'none';
    // document.getElementById('second').style.display = 'block';
    teamRePongTheme.pause();
    return;
  } else {
    game.update();
    game.draw();
    // Call the main loop again at a frame rate of 30fps
    setTimeout(MainLoop, 33.3333);
  }
}
