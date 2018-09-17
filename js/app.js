/*
 * Create a list that holds all of your cards
 */


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

// var array= [1,3,2,7,9];
//  console.log(shuffle(array));
var faceDeck=["fa fa-diamond","fa fa-diamond","fa fa-paper-plane-o","fa fa-paper-plane-o","fa fa-anchor","fa fa-anchor","fa fa-bolt","fa fa-bolt","fa fa-cube","fa fa-cube","fa fa-leaf","fa fa-leaf","fa fa-bicycle","fa fa-bicycle","fa fa-bomb","fa fa-bomb"];


faceDeck=shuffle(faceDeck);

console.log(faceDeck); // done for testing

var gameSheet = document.querySelector(".deck");

//create 16 cards
for( var i=0; i<faceDeck.length; i++){
    var makeCard = document.createElement("li");
    makeCard.classList.add("card");
    makeCard.innerHTML=`<i class="${faceDeck[i]}"></i>`
    gameSheet.appendChild(makeCard);
}

var displayAllCards = document.querySelectorAll('.card');

var findAMatch=[]; // will hold only 2 slots, in order to compare
var matchGame =[]; // All 16 cards and keeps track of all matches

var attempts =0; // keeps account of the number pairs of cards believeto be a match

//holds the two values of the cards that will be compared.
var current;
var before;

var score =document.querySelector('.moves');
score.textContent =attempts;

var myTrys;
        

// var stopMe=false;


function begin(){

    for( var game=0; game<displayAllCards.length;game++){
    displayAllCards[game].addEventListener('click', function(){
        this.classList.add('open');
        this.classList.add('show');
        

        findAMatch.push(this);
        if(findAMatch.length===1)  {
            before = this;
            console.log(before.innerHTML);
         }
        if (findAMatch.length===2){

            current =this;
            Matching(before, current);

            console.log(current.innerHTML);
            
            attempts+=1; //updates the attempts
            score.textContent =attempts; // displays it on screen
               
            }//end attempts score
            

        });    
    
    }

}


begin();

//to simplify, avoid writing long codes
var placeOne;
var placeTwo;
var winner = document.querySelector('h1');

function Matching(AA,BB){

    placeOne =AA.innerHTML;
    placeTwo =BB.innerHTML;

    updateMoves();

    //checking if AA and BB are the not the same will prevent someone from clicking on the same card twice to give a false match
    if(placeOne===placeTwo && AA !=BB){

        before.classList.add('match','stopClick');
        current.classList.add('match','stopClick');

        matchGame.push(before,current);


        // console.log("My my the match.");
        if (matchGame.length===16){
        winner.textContent="Congrates! You won, play again?";
        // stopMe=true;
        clearInterval(finalTime);
        }
    }
    else{
        letsPause(AA, BB)
        // console.log("Does not match.");
    }
    findAMatch=[];
}

console.log(matchGame);


// Will allow viewer/gamer to view the mismatch cards before turning them over.
function letsPause(firstCard,secondCard){
        setTimeout(function(){
        firstCard.classList.add('red');
        secondCard.classList.add('red');
    }, 225);
    setTimeout(function(){
        firstCard.classList.remove('show','open','red');
        secondCard.classList.remove('show','open','red');
    }, 250);
}

function updateMoves(){

    myTrys = document.querySelector('.moves').textContent;

    console.log(attempts);
    myStars(myTrys);
}

var restartMe = document.querySelector(".restart");

restartMe.addEventListener('click',function(){
    //

    console.log("Starting over");

    myStars(0);
    attempts=0;
    score.textContent =attempts;

    matchGame.forEach(function(gameElement){
        gameElement.classList.remove('open','show','match','stopClick');
    });

    faceDeck=shuffle(faceDeck);
    console.log(faceDeck);

    //if user clicks a card with out attempting to match it and then clicks on reset button. This will remove the clicked card css and make it not shown or fipped
    if (findAMatch.length!=0)
    {
        findAMatch[0].classList.remove('open','show','match','stopClick');

        }

    
    findAMatch=[];
    matchGame=[];

    clearInterval(finalTime);
    resetTime()
    winner.textContent="Matching Game";

});


function resetTime() {
  seconds=0;
  minutes=0;
  finalTime = setInterval(clock, 1000);
}

function myStars(movesAmount){
    var goal =document.querySelector('.stars');
    goal.innerHTML=``;
    if (movesAmount < 19){
        goal.innerHTML=`<li><i class="fa fa-star"></i></li>
        <li><i class="fa fa-star"></i></li>
        <li><i class="fa fa-star"></i></li>`;
    }
    else if (movesAmount<25 && movesAmount>=19){
        // give it 2 stars
        goal.innerHTML=`<li><i class="fa fa-star"></i></li>
        <li><i class="fa fa-star"></i></li>
        <li>`;
    }
    else{
        //give it 1 start
        goal.innerHTML=`<li><i class="fa fa-star"></i>`;
    }

}

var seconds=0;
var minutes=0;
var currentTime;

let clock = function clockTimer(){
    var theTimer = document.querySelector('.timer');
            seconds++;

            if (seconds%60===0){
                seconds=0;
                minutes++;
            }

            if(seconds<10 && minutes<10){
            currentTime= theTimer.textContent=`Timer 0${minutes}:0${seconds}`;}
            else if(seconds=>10 && minutes<10){
            currentTime= theTimer.textContent=`Timer 0${minutes}:${seconds}`;}
            else if(seconds<10 && minutes>10){
            currentTime= theTimer.textContent=`Timer ${minutes}:0${seconds}`;}
            else{
            currentTime= theTimer.textContent=`Timer ${minutes}:${seconds}`;}

        theTimer.innerHTML=currentTime;
    }
var finalTime= setInterval(clock, 1000);


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
