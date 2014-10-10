var sprites = {
 ship: { sx: 0, sy: 0, w: 37, h: 42, frames: 1 },
 missile: { sx: 0, sy: 42, w: 6, h: 19, frames: 1 },
 enemy_purple: { sx: 37, sy: 0, w: 42, h: 43, frames: 1 },
 enemy_bee: { sx: 79, sy: 0, w: 37, h: 43, frames: 1 },
 enemy_ship: { sx: 116, sy: 0, w: 42, h: 43, frames: 1 },
 yellow_ball: { sx: 155, sy: 1, w: 38, h: 35, frames: 1 },
 explosion: { sx: 0, sy: 64, w: 64, h: 64, frames: 12 },
 enemy_missile: { sx: 9, sy: 42, w: 3, h: 20, frame: 1 },
 green_alien: { sx:191, sy: 0, w: 66, h: 31, frame: 1 },
 power_star: { sx:258, sy: 0, w: 45, h: 36, frame: 1},
 kill_pill: { sx: 308, sy: 1, w: 69, h: 34, frame: 1 },
 paddle: { sx: 412, sy: 0, w: 10, h: 35, frame: 1 },
 paddle2: { sx: 426, sy: 0, w: 10, h: 35, frame: 1 },
 random_boxes: { sx: 450, sy: 0, w: 24, h: 58, frames: 1 },
 random_boxes2: { sx: 485, sy: 0, w: 26, h: 58, frames: 1 }
};


var boxes = {

	green:   { x: 75,  y: -50, sprite: 'random_boxes', 
              A: 0,  B: 0, C: 1, E: 20, F: 100, G: 1, H: Math.PI/2 },			
				
	orange:{ x: 75, y: -100, sprite: 'random_boxes2',
              B: 50, C: 4, E: 100}

};

var OBJECT_PLAYER = 1,
    OBJECT_PLAYER2 = 2,
    OBJECT_BALL = 4,
    OBJECT_BOXES = 8,
    OBJECT_POWERUP = 16,
	OBJECT_KillALL = 32;

var startGame = function() {
 // Game.setBoard(0,new TableBoard(true));
 Game.setBoard(1,new pickObjects(true));
  //Game.setBoard(2,new TableBoard());
  Game.setBoard(3,new TitleScreen("Ping Pong", "Select Paddle Design",
                                  "Press Enter key to start playing",
                                  playGame));
};
var designSelected = '';
var pickObjects = function(clear){
var stars = document.createElement("canvas");
  stars.width = Game.width; 
  stars.height = Game.height;
  var starCtx = stars.getContext("2d");

  var offset = 0;

  if(clear) {
  //black backgroundColor
    starCtx.fillStyle = "blue";
    starCtx.fillRect(0,0,stars.width,stars.height);
  }
  
  
  this.draw = function(ctx) {
     var intOffset = Math.floor(offset);
    var remaining = stars.height - intOffset;
	
    if(remaining > 0) {
      ctx.drawImage(stars,
              0, 0,
              stars.width, remaining,
              0, intOffset,
              stars.width, remaining);
    } 
  };

  this.step = function(dt) {  };
};

var level1 = [
 // Start,   End, Gap,  Type,   Override
  [ 0,      250000,  40, 'green', {x: 125} ],
  [ 0,      250000,  40,  'orange', { x: 135} ]
  
  ];

  
  
var playGame = function() {
Game.setBoard(1,new TableBoard(true));
  var board = new GameBoard();
  board.add(new appearingBoxes1(boxes.green));
  board.add(new appearingBoxes2(boxes.orange));
  board.add(new PlayerShip());
  board.add(new PlayerShip2());
  board.add(new pingBall());
 // board.add(new randomDrop());//use to drop random things
  Game.setBoard(3,board);
  Game.setBoard(4,new GamePoints());
  //Game.setBoard(5,new GamePoints2());
};

var winGame = function() {
  Game.setBoard(3,new TitleScreen("You win!", 
                                  "Press Enter key to play again","",
                                  playGame2));
								  isGone = 'false';
};
var gameOVER = function() {
  Game.setBoard(3,new TitleScreen("You win! Game OVER!!", 
                                  "Press Enter key to restart","",
                                  playGame));
								  isGone = 'false';
};
var loseGame1 = function() {
  Game.setBoard(3,new TitleScreen("Player 1 Wins", 
                                  "Press Enter key to play again","",
                                  playGame));
								  isGone = 'false';
};

var loseGame2 = function() {
  Game.setBoard(3,new TitleScreen("Player 2 Wins", 
                                  "Press Enter key to play again","",
                                  playGame));
								  isGone = 'false';
};

var nextRound = function() {

  Game.setBoard(1,new TableBoard(true));
  var board = new GameBoard();
  board.add(new appearingBoxes1(boxes.green));
  board.add(new appearingBoxes2(boxes.orange));
  board.add(new PlayerShip());
  board.add(new PlayerShip2());
  board.add(new pingBall());
  Game.setBoard(3,board);
};

window.addEventListener("load", function() {
  Game.initialize("game",sprites,startGame);
});

var randomDrop = function(){
var start = 0;
var pill = 0;

var starCount = 0;
var pillCount = 0;

this.draw = function() {
};
this.step = function() {
if(starCount < 5){
 start = Math.floor(Math.random() * 500) + 1;
 if((start == 10) || (start == 23)||(start == 103) ||(start == 67) ){ 
	starCount ++;
	this.board.add(new PowerUpStar((Math.floor(Math.random() * 260) + 10), (Math.floor(Math.random() * 150) + 25)));
	}
}
	
	if(pillCount < 5){
	pill = Math.floor(Math.random() * 400) + 1;
 if((pill == 15) || (pill == 29)||(pill == 120) ||(pill == 81) ){ 
	pillCount ++;
	this.board.add(new KillPill((Math.floor(Math.random() * 260) + 10), (Math.floor(Math.random() * 150) + 25)));
	}
}
 };
};

var TableBoard = function(clear) {

  var stars = document.createElement("canvas");
  stars.width = Game.width; 
  stars.height = Game.height;
  var starCtx = stars.getContext("2d");

  var offset = 0;

  if(clear) {
  //black backgroundColor
    starCtx.fillStyle = "#000";
    starCtx.fillRect(0,0,stars.width,stars.height);
  }

  starCtx.fillStyle = "yellow";
  starCtx.fillRect(stars.width/2,0,2,stars.height);
  

  this.draw = function(ctx) {
     var intOffset = Math.floor(offset);
    var remaining = stars.height - intOffset;
	
    if(remaining > 0) {
      ctx.drawImage(stars,
              0, 0,
              stars.width, remaining,
              0, intOffset,
              stars.width, remaining);
    } 
  };

  this.step = function(dt) {  };
};

//player one
var PlayerShip = function() { 
  this.setup('paddle', { vx: 0, vy: 0, reloadTime: 0.25, maxVel: 200, maxYel:200 });

  this.reload = this.reloadTime;
  this.x = 15;
  this.y = Game.height/2;

  this.step = function(dt) {
    	
		if(Game.keys['upTwo']) { this.vy = -this.maxYel; }
    else if(Game.keys['downTwo']) { this.vy = this.maxYel; }
    else { this.vy = 0; }
	
    	
	this.y += this.vy * dt;

	if(this.y < 0) { this.y = 0; }
    else if(this.y > Game.height - this.h) { 
      this.y = Game.height - this.h;
    }  
  };
};

PlayerShip.prototype = new Sprite();
PlayerShip.prototype.type = OBJECT_PLAYER2;
//-- end of player one code

//player two
var PlayerShip2 = function() { 
  this.setup('paddle2', { vx: 90, vy: 120, reloadTime: 0.25, maxVel: 200, maxYel:200 });

  this.reload = this.reloadTime;
  this.x = Game.width - 25;
  this.y = Game.height/2;

  this.step = function(dt) {
  if(Game.keys['up']) { this.vy = -this.maxYel; }
    else if(Game.keys['down']) { this.vy = this.maxYel; }
    else { this.vy = 0; }
	
	this.y += this.vy * dt;

	if(this.y < 0) { this.y = 0; }
    else if(this.y > Game.height - this.h) { 
      this.y = Game.height - this.h;
    }
  };
};

PlayerShip2.prototype = new Sprite();
PlayerShip2.prototype.type = OBJECT_PLAYER;

//end of player two code

var pingBall = function(){
this.setup('yellow_ball', { vx: 1, vy: 1, reloadTime: 0.25, maxVel: 200, maxYel:200 });
  this.x = this.vx;
    this.y = this.vy;

};
pingBall.prototype = new Sprite();
pingBall.prototype.type = OBJECT_BALL;
pingBall.prototype.step = function(dt)  {
  this.x += this.vx*5;
    this.y += this.vy*5;
   if (this.y > Game.height-this.h || this.y <1) {
        this.vy = -this.vy;
    }
	  
  
  var collision = this.board.collide(this,OBJECT_PLAYER);
  if(collision) {
           this.vx = -this.vx  + -this.vx * .1; // make ball increase speed when hit
   
  } 
  var collision2 = this.board.collide(this,OBJECT_PLAYER2);
  if(collision2) {
          this.vx = -this.vx  + -this.vx * .1; // make ball increase speed when hit
      } 
	  
	  var collision3 = this.board.collide(this,OBJECT_BOXES);
  if(collision3) {
          this.vx = -this.vx + -this.vy*.3; // make ball increase speed when hit
      } 
  
  if(this.x > Game.width && Game.points < 9)
  {
   Game.points++;
   nextRound();
  }
  else if(this.x > Game.width && Game.points >= 9) {
   Game.points++;
   loseGame1();
  }
  
  if(this.x < 0 && Game.points2 < 9) {
   Game.points2++;
   nextRound();
  }
  else if(this.x < 0 && Game.points2 >= 9) {
    Game.points2++;
	loseGame2();
  }
};


var isGone = 'false';
var allRemoved=function(){
	if (isGone == 'false'){
	isGone = 'true';
	return false;
	}else{
		loseGame();
	}
}

//power star
var PowerUpStar = function(x,y){
this.setup('power_star', {vx: 0, vy:0, reloadTime: 0.75, maxVel: 200, maxYel:100 });
 this.x = x - this.w/2;
  this.y = y;
}

PowerUpStar.prototype = new Sprite();
PowerUpStar.prototype.type = OBJECT_POWERUP;

PowerUpStar.prototype.step = function(dt)  {
  this.t += dt;

  this.vx = 0 + 20 * Math.sin(3 * 9 + 0);
  this.vy = 0 + -30 * Math.sin(2 * 9 + 0);

  this.x += this.vx * dt;
  this.y += this.vy * dt;
 };
//power star


//kill pill
var KillPill = function(x,y){
this.setup('kill_pill', {vx: 0, vy:0, reloadTime: 0.25, maxVel: 200, maxYel:100 });
 this.x = x - this.w/2;
  this.y = y;
}

KillPill.prototype = new Sprite();
KillPill.prototype.type = OBJECT_KillALL;
KillPill.prototype.step = function(dt)  {

};
//kill pill


// Appearing Boxes 


var appearingBoxes1 = function(blueprint,override) {
  this.merge(this.baseParameters);
  this.setup(blueprint.sprite,blueprint);
  this.merge(override);
};



appearingBoxes1.prototype = new Sprite();
appearingBoxes1.prototype.type = OBJECT_BOXES;

appearingBoxes1.prototype.baseParameters = { A: 0, B: 0, C: 0, D: 0, 
                                   E: 0, F: 0, G: 0, H: 0,
                                   t: 0, reloadTime: 0.75, 
                                   reload: 0 };

appearingBoxes1.prototype.step = function(dt) {
  this.t += dt;

  this.vx = this.A + this.B * Math.sin(this.C * this.t + this.D);
  this.vy = this.E + this.F * Math.sin(this.G * this.H);
  this.x = Game.width/4;
  this.y += this.vy * dt;
  


  };

var appearingBoxes2 = function(blueprint,override) {
  this.merge(this.baseParameters);
  this.setup(blueprint.sprite,blueprint);
  this.merge(override);
};



appearingBoxes2.prototype = new Sprite();
appearingBoxes2.prototype.type = OBJECT_BOXES;

appearingBoxes2.prototype.baseParameters = { A: 0, B: 0, C: 0, D: 0, 
                                   E: 0, F: 0, G: 0, H: 0,
                                   t: 0, reloadTime: 0.75, 
                                   reload: 0 };

appearingBoxes2.prototype.step = function(dt) {
  this.t += dt;

  this.vx = this.A + this.B * Math.sin(this.C * this.t + this.D);
  this.vy = this.E + this.F * Math.sin(this.G * this.t + this.H);
  this.x = Game.width/1.33;
  this.y += this.vy * dt;
  
   if((this.y >= Game.height)|| (this.y <= 0))
	{
     this.y = -this.y;
	 }
	
  

  };












