'use strict';

Player.all = [];
var playerBoard = document.getElementById('playerboard');

function Player(name) {
  this.name = name;
  this.wins = 0;
  this.losses = 0;
  this.totalMatches = 0;
  this.returning = false;
  this.winRatio = 0;
  this.match = [];
  this.nemesis = [];
  Player.all.push(this);
}

function pullStorage() {
  console.log('pulled local storage');
  var storeAll = localStorage.getItem('all');
  Player.all = JSON.parse(storeAll);
}

function wipe() {
  while (playerBoard.firstChild) {
    playerBoard.removeChild(playerBoard.firstChild);
  }
}

function playerCard(parent, type, id, content) {
  var board = document.getElementById(parent);
  var el = document.createElement(type);
  el.id = id;
  el.textContent = content;
  board.appendChild(el);
}

function buttonUp(parent,func) {
  var appTo = document.getElementById(parent);
  console.log(appTo);
  var button = document.createElement('button');
  button.innerHTML = 'Match History';
  appTo.appendChild(button);
  button.addEventListener('click', func);
}

function getMatches(event) {
  var record = event.target.parentElement.id;
  for (var i = 0; i < Player.all.length; i++) {
    if (record === Player.all[i].name) {
      wipe();
      renderMatches(Player.all[i]);
    }
  }
}

function renderMatches(player) {
  for (var i = 0; i < player.match.length; i++) {
    playerCard('playerboard', 'article', player.name + i);
    playerCard(player.name + i, 'h1', '', player.match[i].winner + ' VS ' + player.match[i].loser);
    playerCard(player.name + i, 'ul', player.name + i + '_stats');
    playerCard(player.name + i + '_stats', 'li', '', 'Winner: ' + player.match[i].winner);
    playerCard(player.name + i + '_stats', 'li', '', 'Loser: ' + player.match[i].loser);
    playerCard(player.name + i + '_stats', 'li', '', player.match[i].winner + ': ' + player.match[i].winnerScore);
    playerCard(player.name + i + '_stats', 'li', '', player.match[i].loser + ': ' + player.match[i].loserScore);
  }
}

function buildLeader() {
  for (var i = 0; i < Player.all.length; i++) {
    playerCard('playerboard', 'article', Player.all[i].name);
    playerCard(Player.all[i].name, 'h1', '', Player.all[i].name);
    playerCard(Player.all[i].name, 'ul', Player.all[i].name + '_stats');
    playerCard(Player.all[i].name + '_stats', 'li', '', 'Wins: ' + Player.all[i].wins);
    playerCard(Player.all[i].name + '_stats', 'li', '', 'Losses: ' + Player.all[i].losses);
    playerCard(Player.all[i].name + '_stats', 'li', '', 'Total: ' + Player.all[i].totalMatches);
    playerCard(Player.all[i].name + '_stats', 'li', '', 'Win Ratio: ' + (parseInt(Player.all[i].winRatio * 100)) + '%');
    playerCard(Player.all[i].name + '_stats', 'li', '', 'Nemesis: ' + Player.all[i].nemesis);
    buttonUp(Player.all[i].name,getMatches);
  }
}

// header();
//
pullStorage();
buildLeader();
// render();
