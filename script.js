'use strict';
//selecting elements with DOM
// Selecting elements. Here we just retrieve elements and save into variables, to manipulate with them easier in future
const player0El = document.querySelector('.player--0'); //player entire section(column)
const player1El = document.querySelector('.player--1'); //player entire section(column)
const score0El = document.querySelector('#score--0'); //big score
const score1El = document.getElementById('score--1'); //big score
const current0El = document.getElementById('current--0'); //current, temporary score
const current1El = document.getElementById('current--1'); //current score

const diceEl = document.querySelector('.dice'); //dice image, according to btnRoll number
const btnNew = document.querySelector('.btn--new'); //new game
const btnRoll = document.querySelector('.btn--roll'); //new roll
const btnHold = document.querySelector('.btn--hold'); // current value transform to big scores, swith or win

let scores, currentScore, activePlayer, playing;

// Starting conditions

const init = function () {
  scores = [0, 0]; // zeroes are values. shown in menu, but there is 0 , 1 order, which is used to define.
  currentScore = 0; //used to be transfered to big score, after switch
  activePlayer = 0; //also used to define who plays
  playing = true; //for deactivate buttons and game

  score0El.textContent = 0; //big score start point
  score1El.textContent = 0; //big score
  current0El.textContent = 0; //current 0 score
  current1El.textContent = 0; //current 1 score

  diceEl.classList.add('hidden');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};
init();

const switchPlayer = function () {
  //undefined function for further usage
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};
// Rolling dice functionality
btnRoll.addEventListener('click', function () {
  if (playing) {
    // 1. Generating a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;

    // 2. Display dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    // 3. Check for rolled 1
    if (dice !== 1) {
      // Add dice to current score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // Switch to next player
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    //no need to write ===. because it is boolean itself
    // 1. Add current score to active player's score
    scores[activePlayer] += currentScore;
    // scores[0, or 1] = scores[0, or 1] + currentScore

    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer]; // current scores will be added to big scores - using scores array,at 0 or 1 position

    // 2. Check if player's score is >= 100
    if (scores[activePlayer] >= 50) {
      // Finish the game
      playing = false; //no connections to other lines of code. we just define that from now, playing is false, so game will not execute from here anymore.
      diceEl.classList.add('hidden');

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      // Switch to the next player
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', init); //we just write another function, and javascript will do it when event happens
