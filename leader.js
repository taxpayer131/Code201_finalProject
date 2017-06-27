'use strict';

Player.all = [];

function Player (name){
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

function playerCard (parent, type, id, content){
  var board = document.getElementById(parent);
  var el = document.createElement(type);
  el.id = id;
  el.textContent = content;
  board.appendChild(el);
}
function buildLeader (){
  for (var i = 0; i < Player.all.length; i++) {
    playerCard('playerboard', 'article', Player.all[i].name);
    playerCard(Player.all[i].name, 'h1', '',Player.all[i].name);
    playerCard(Player.all[i].name, 'ul', Player.all[i].name + '_stats');
    playerCard(Player.all[i].name + '_stats', 'li', '','Wins: ' + Player.all[i].wins);
    playerCard(Player.all[i].name + '_stats', 'li', '','Losses: ' + Player.all[i].losses);
    playerCard(Player.all[i].name + '_stats', 'li', '','Total: ' + Player.all[i].totalMatches);
    playerCard(Player.all[i].name + '_stats', 'li', '','Win Ratio: ' + Player.all[i].winRatio);
    playerCard(Player.all[i].name + '_stats', 'li', '','Nemesis: ' + Player.all[i].nemesis);
  }
}

// header();
//
pullStorage();
buildLeader();
// render();
