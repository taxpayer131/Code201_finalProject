'use strict';

// Pull Storage and Push storage functions are probably you data problems
Player.all = [];

function pullStorage() {
  var storeAll = localStorage.getItem('all');
  Player.all = JSON.parse(storeAll);
}

//
function initiatePlayers (a) {
  var playerInit;
  var playerMatch = prompt ('Enter Player ' + a + '.');
  if (Player.all.length > 0) {
    for (var i = 0; i < Player.all.length; i++) {
      if (playerMatch === Player.all[i].name) {
        alert('Welcome back ' + playerMatch + '!');
        playerInit = Player.all[i];
      }
    }
  } else {
    playerInit = new Player(playerInit);
    console.log('I created a new player in slot');
    playerInit.name = playerMatch;
    Player.all.push(playerInit);
  }
  return playerInit;
}

// returning player true/false
function Player (name){
  this.name = name;
  this.wins = 0;
  this.losses = 0;
  this.totalMatches = 0;
  this.returning = false;
  this.winRatio = (this.wins / this.totalMatches);
  this.match = [];
  this.nemesis = [];
}

function pushStorage() {
  console.log('push');
  var storeAll = JSON.stringify(Player.all);
  localStorage.setItem('all', storeAll);
  if (localStorage.all) {
    Player.all = storeAll;
  }
}


if (localStorage.length > 0) {
  pullStorage();
  console.log('I pulled Local Storage');
}

Player.playerOne = initiatePlayers(1);
Player.playerTwo = initiatePlayers(2);
pushStorage();
