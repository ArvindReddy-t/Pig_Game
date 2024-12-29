"use strict";
// selecting elements
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0 = document.getElementById('current--0');
const current1 = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const playerE0 = document.querySelector('.player--0');
const playerE1 = document.querySelector('.player--1');
// starting conditions

let scores,currentScore,activePlayer,playing;
const init = function(){
    scores = [0,0];
    currentScore=0;
    activePlayer =0;
    playing = true;

    score0El.textContent = 0;
    score1El.textContent = 0;
    current0.textContent = 0;
    current1.textContent = 0;

    diceEl.classList.add('hidden');
    playerE0.classList.remove('player--winner');
    playerE1.classList.remove('player--winner');
    playerE0.classList.add('player--active');
    playerE1.classList.remove('player--active');
    btnHold.disabled=false;
}
init();
const switchPlayer = function(){
    document.getElementById(`current--${activePlayer}`).textContent=0;
        currentScore = 0;
        activePlayer= activePlayer === 0?1:0;
        
        playerE0.classList.toggle('player--active');
        playerE1.classList.toggle('player--active');
};


//Rolling dice functionality
btnRoll.addEventListener('click',function(){
    if(playing){
     //1. generating a random dice roll
        const dice = Math.trunc(Math.random()*6)+1;
        console.log(dice);
        //2. displaying the dice
        diceEl.classList.remove('hidden');
        diceEl.src = `dice-${dice}.png`;

        //3. checking for rolled 1: if true , swith to next player
        if(dice !== 1){
            //add dice to the current player score
            currentScore += dice;
            document.getElementById(`current--${activePlayer}`).textContent = currentScore;
        }
        else{
            //switch the player
            switchPlayer();
        }
    }
    else{
        alert(`Game Over!
        player ${activePlayer+1} won`);
        playing=false;
       // btnRoll.disabled = true;
    }
    
});
btnHold.addEventListener('click',function(){
    //1. add current score to the active player
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent=scores[activePlayer];
    
    // 2. check if players score is >= 100
    if(scores[activePlayer] >= 10){
        playing=false;
        document.querySelector(`.player--${activePlayer}`).classList.add(
            'player--winner'
        );
    //    document.querySelector(`.player--${activePlayer}`).classList.remove(
    //       'player--active');
    btnHold.disabled=true;
    diceEl.classList.add('hidden');
    }
    else{
        switchPlayer();
    }  
});

btnNew.addEventListener('click',init);
