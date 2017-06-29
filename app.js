'use strict';

// Pull Storage and Push storage functions are probably you data problems
Player.all = [];
var startGame = document.getElementById('start_game');

function Player(name) {
  this.name = name;
  this.wins = 0;
  this.losses = 0;
  this.totalMatches = 0;
  this.winRatio = 0;
  this.match = [];
  this.nemesis = [];
  Player.all.push(this);
}

function Match(winner,loser) {
  this.winner = winner;
  this.loser = loser;
  this.winnerScore = 9;
  this.loserScore = 0;
}

function updatePlayerArray(playerOneOrTwo) {
  for (var i = 0; i < Player.all.length; i++) {
    if (playerOneOrTwo.name === Player.all[i].name) {
      console.log('Found player to update');
      Player.all[i] = playerOneOrTwo;
    }
  }
}

function go(event) {
  event.preventDefault();
  document.getElementById('game').style.display = 'block';
  document.getElementById('start').style.display = 'none';
  // document.getElementById('second').style.display = 'none';
  if (localStorage.length > 0) {
    pullStorage();
  }
  var getpone = event.target.playerone.value;
  var getptwo = event.target.playertwo.value;
  Player.playerOne = initiatePlayers(getpone);
  Player.playerTwo = initiatePlayers(getptwo);

  // Start the game execution
  game.p1.score = 0;
  game.p2.score = 0;
  //Used code from Stackexchange:
  //https://stackoverflow.com/questions/8916620/disable-arrow-key-scrolling-in-users-browser
  window.addEventListener('keydown', function(e) {
  // space and arrow keys
    if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
      e.preventDefault();
    }
  }, false);
  //////////////////////////////////////////
  MainLoop();
}

  // return new Player(value);
//
function endResults() {
  console.log('this score of p1 is' + game.p1.score);
  console.log('this score of p2 is' + game.p2.score);
  Player.playerOne.totalMatches++;
  Player.playerTwo.totalMatches++;
  if(game.p1.score > game.p2.score) {
    console.log('P1 score is > p2 score');
    Player.playerOne.wins++;
    Player.playerTwo.losses++;
    matchMaker(Player.playerOne.name, Player.playerTwo.name, game.p2.score);
  } else {
    Player.playerTwo.wins++;
    Player.playerOne.losses++;
    matchMaker(Player.playerTwo.name, Player.playerOne.name, game.p1.score);
  }
  Player.playerOne.winRatio = (Player.playerOne.wins / Player.playerOne.totalMatches);
  Player.playerTwo.winRatio = (Player.playerTwo.wins / Player.playerTwo.totalMatches);
}

function matchMaker(winner,loser, loserScore) {
  var match = new Match(winner, loser);
  match.loserScore = loserScore;
  Player.playerOne.match.push(match);
  Player.playerTwo.match.push(match);
  lastMatch(Player.playerOne);
}

function pullStorage() {
  var storeAll = localStorage.getItem('all');
  Player.all = JSON.parse(storeAll);
}

function checkPlayers(array, value) {
  for (var i = 0; i < array.length; i++) {
    if (value === array[i].name) {
      console.log('Found match');
      alert('Welcome back ' + value + '.');
      return array[i];
    }
  }
  return new Player(value);
}

function initiatePlayers(val) {
  var playerInit;
  var playerMatch = val;
  if (Player.all.length > 0) {
    playerInit = checkPlayers(Player.all, playerMatch);
    console.log('I found a existing player ' + playerInit.name + ' and local storage exists!');
  } else {
    playerInit = new Player(playerMatch);
    console.log('No local storage. Created a new player.');
  }
  return playerInit;
}

function pushStorage() {
  console.log('push');
  var storeAll = JSON.stringify(Player.all);
  localStorage.setItem('all', storeAll);
  if (localStorage.all) {
    Player.all = storeAll;
  }
}

function lastMatch(player) {
  var i = player.match.length - 1;
  playerCard('start', 'div', player.name + i);
  playerCard(player.name + i, 'h1', '', player.match[i].winner + ' VS ' + player.match[i].loser);
  playerCard(player.name + i, 'ul', player.name + i + '_stats');
  playerCard(player.name + i + '_stats', 'li', '', 'Winner: ' + player.match[i].winner);
  playerCard(player.name + i + '_stats', 'li', '', 'Loser: ' + player.match[i].loser);
  playerCard(player.name + i + '_stats', 'li', '', player.match[i].winner + ': ' + player.match[i].winnerScore);
  playerCard(player.name + i + '_stats', 'li', '', player.match[i].loser + ': ' + player.match[i].loserScore);
}

startGame.addEventListener('submit', go);
