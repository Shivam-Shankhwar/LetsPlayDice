'use strict';



// Selecting elements
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll= document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

// Initial state variables
let currentScore, activePlayer, playing, scores;

//Initialize State
const init = () => {

  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;  

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.classList.add('hidden');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');

  // Getting Player Names
  document.getElementsByTagName('h2')[0].textContent = prompt('Player-1 Enter your name ')
  document.getElementsByTagName('h2')[1].textContent = prompt('Player-2 Enter your name ')

};
init();

// Switch Player state changes
const switchPlayer = (active) => {
  document.getElementById(`current--${active}`).textContent = 0;
  currentScore = 0;
  activePlayer = active === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};



// Roll Dice Functionality
btnRoll.addEventListener('click', () => {

  if(playing){
    //1. Generating Random dice roll
    const dice = Math.floor(Math.random() * 6) + 1;

    //2. Display dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    //3. Check for rolled-1: 
    if(dice !== 1) {
      // Add dice to current score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent = currentScore;
    } else {
      // Switch to next player
      switchPlayer(activePlayer);
    } 

  }
});

btnHold.addEventListener('click', () => {
  if(playing) {
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];
    
    if(scores[activePlayer] >= 20) {
      playing = false;
      document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
      document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
      diceEl.classList.add('hidden');
    } else {
      switchPlayer(activePlayer);
    }

  }
});

// State Reset to 0
btnNew.addEventListener('click', init)