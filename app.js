/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, gamePlaying, sixInRow;
init();
document.querySelector('.btn-roll').addEventListener('click', function(){
if(gamePlaying){
  var dice1 = Math.floor(Math.random()*6)+1;
  var dice2 = Math.floor(Math.random()*6)+1;

  var dice1Dom = document.getElementById('dice-1');
  var dice2Dom = document.getElementById('dice-2');

  dice1Dom.style.display='block';
  dice2Dom.style.display='block';
  dice1Dom.src = 'dice-' + dice1 + '.png';
  dice2Dom.src = 'dice-' + dice2 + '.png';

  if(dice1!==1 && dice2!==1){
    roundScore+=(dice1+dice2);
    document.querySelector('#current-' + activePlayer).textContent = roundScore;
  }else {
    setTimeout(nextPlayer, 150);
    //document.querySelector('.player-0-panel').classList.remove('active');
    //document.querySelector('.player-1-panel').classList.add('active');
  }
  /*if(sixInRow===6 && dice===6){
    scores[activePlayer]=0;
    roundScore=0;
    document.getElementById('score-' + activePlayer).textContent = '0';
    document.getElementById('current-' + activePlayer).textContent = '0';
    sixInRow=0;
    nextPlayer();
  }else {
    sixInRow=dice;
  }
  */
}

} );

document.querySelector('.btn-hold').addEventListener('click', function(){
  if(gamePlaying){
    scores[activePlayer]+=roundScore;
    document.querySelector('#score-' + activePlayer).textContent=scores[activePlayer];
    var input = document.querySelector('.finalScore').value;
    var winningScore;
    if(input){
      winningScore=input;
    } else {
      winningScore=100;
    }
    if(scores[activePlayer]>=winningScore){
      document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
      document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
      document.querySelector('#name-' + activePlayer).textContent = 'Winner!'
      document.getElementById('dice-1').style.display='none';
      document.getElementById('dice-2').style.display='none';
      gamePlaying=false;
    } else{
      nextPlayer();
    }
  }

});

function nextPlayer(){
  activePlayer=activePlayer === 0 ? 1:0;
  roundScore=0;
  document.getElementById('current-0').textContent = '0';
  document.getElementById('current-1').textContent = '0';

  document.querySelector('.player-0-panel').classList.toggle('active');
  document.querySelector('.player-1-panel').classList.toggle('active');
  document.getElementById('dice-1').style.display='none';
  document.getElementById('dice-2').style.display='none';
}

document.querySelector('.btn-new').addEventListener('click', init);


function init(){
  scores = [0,0];
  roundScore = 0;
  activePlayer = 0; //first player=0, second = 1
  gamePlaying = true;

  //document.querySelector('#current-' + activePlayer).innerHTML='<em>'+dice+'</em>'

  document.getElementById('dice-1').style.display='none';
  document.getElementById('dice-2').style.display='none';


  document.getElementById('score-0').textContent = '0';
  document.getElementById('score-1').textContent = '0';
  document.getElementById('current-0').textContent = '0';
  document.getElementById('current-1').textContent = '0';
  document.getElementById('name-0').textContent = 'Player 1';
  document.getElementById('name-1').textContent = 'Player 2';
  document.querySelector('.player-0-panel').classList.remove('winner');
  document.querySelector('.player-1-panel').classList.remove('winner');
  document.querySelector('.player-0-panel').classList.remove('active');
  document.querySelector('.player-1-panel').classList.remove('active');
  document.querySelector('.player-0-panel').classList.add('active');
}
