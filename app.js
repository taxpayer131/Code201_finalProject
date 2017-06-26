'use strict';

// Pull Storage and Push storage functions are probably you data problems
Player.all = [];

function pullStorage() {
  var storeAll = localStorage.getItem('all');
  Player.all = JSON.parse(storeAll);
}

function checkPlayers (array, value) {
  for (var i = 0; i < array.length; i++) {
    if (value === array[i].name) {
      console.log('Found match');
      return array[i];
    }
  }
  return new Player(value);
}

//
function initiatePlayers (a) {
  var playerInit;
  var playerMatch = prompt ('Enter Player ' + a + '.');
  if (Player.all.length > 0) {
    playerInit = checkPlayers(Player.all, playerMatch);
    console.log('I found a existing player ' + playerInit.name + ' and local storage exists!');
  } else {
    playerInit = new Player(playerMatch);
    console.log('No local storage. Created a new player.');
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
  Player.all.push(this);
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
pullStorage();
