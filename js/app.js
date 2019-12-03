/*
 * Create a list that holds all of your cards
 */
const allCardsArray = [].slice.call(document.querySelectorAll('.card'));

//creates list that holds all the stars
const allStars = [].slice.call(document.querySelectorAll('#stars'));


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */
let shuffledCards = shuffle(allCardsArray);

for(let i = 0; i < shuffledCards.length; i++)
{
    const deckOfCard = document.querySelector('.deck');
    deckOfCard.appendChild(shuffledCards[i]);
}

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

//turns card by adding classlist
function turnCard(e)
{
    this.classList.add("open");   
    this.classList.add("show");   

    
}

//sets up game timer
let second = 0, minute = 0;
let timer = document.querySelector(".timer");
let interval;

//starts game timer
function startTimer(){
    interval = setInterval(function(){
        timer.innerHTML = minute + " mins " + second + "  secs";
        second++;
        if(second == 60){
            minute++;
            second = 0;
        }
        if(minute == 60){
            hour++;
            minute = 0;
        }
    },1000);
}

// defines list for cards selected
let cardsOpened = [];

let counter = 0; //counter for number of moves 

let starCounter = 3; //counter for stars remaining 

//moves counter and updates modal 
function moveCounter()
{
    counter++;
    let temp = document.querySelector('.moves');
    temp.textContent = counter;

    let temp2 = document.querySelector('.movesModal');
    temp2.textContent = counter;

    let temp3 = document.querySelector('.starsModal');
    temp3.textContent = starCounter;

    let temp4 = document.querySelector('.timerModal');
    temp4.textContent = minute + " mins " + second + "  secs";

    //start timer on first move
    if(counter == 1)
    {
        second = 0;
        minute = 0; 
        hour = 0;
        startTimer(); 
    }

    if(counter == 15 )  
    {
        allStars[0].classList.add("hideStars"); //removes first star once 15 moves is reached
        starCounter--;
    }

    if(counter == 25 )
    {
        allStars[1].classList.add("hideStars"); //removes second star once 25 moves is reached
        starCounter--;
    }

    if(counter == 30 )
    {
        allStars[2].classList.add("hideStars"); //removes third star once 30 moves is reached
        starCounter--;
    }

}

//card is pushed onto cards opened list when selected and compared to see if it's a match
function cardSelected()
{
    cardsOpened.push(this); 
    let cardsChosenLength = cardsOpened.length;
    if(cardsChosenLength === 2)
    {
        moveCounter();
        if(cardsOpened[0].type === cardsOpened[1].type) //checks to see if cards match
        {
            match();
        }
        else
        {
            unmatch();    
        }
    }
}

let matchCounter = 0; //keeps track of how many matched cards there are

//Cards matched then adds match classlist 
function match()
{
    cardsOpened[0].classList.add("match");
    cardsOpened[1].classList.add("match");
    cardsOpened = [];   //removes all cards from cards opened list to reset 
    matchCounter++; 
    winGame();  //calls function to check if game is won
}

//Cards don't match then removes class list for displaying cards 
function unmatch()
{
    setTimeout(function() {
        cardsOpened[0].classList.remove("show");
        cardsOpened[0].classList.remove("open");
        cardsOpened[1].classList.remove("show");
        cardsOpened[1].classList.remove("open");
        cardsOpened = [];   // resets cards opened class lsit
        
    }, 150); //only allows short time once both cards selected if unmatched to turn them back down
}

//displays model if game is won
function displayModal()  {
    const modal = document.querySelector('.modal');
    modal.classList.toggle("show-modal");   //adds class list that displays modal

    const closeButton = document.querySelector('.close-button'); //resets game if close button is selected 
    closeButton.addEventListener("click", removeModal); 
    closeButton.addEventListener("click", resetGame);

}

//removes modal when close button is selected 
function removeModal(){
    const modal = document.querySelector('.modal');
    modal.classList.remove("show-modal");
}

//resets game 
function resetGame() {
    for (let i = 0; i < chooseCardArray.length; i++)    //loops thru cards and removes class lists to not display any cards
    {
        chooseCardArray[i].classList.remove("show");
        chooseCardArray[i].classList.remove("open");
        chooseCardArray[i].classList.remove("match");
    };
        counter = 0;    //resets card counter
        let temp = document.querySelector('.moves');    
        temp.textContent = counter; 
        shuffledCards = shuffle(allCardsArray); //shuffles cards for next game 

        for(let i = 0; i < shuffledCards.length; i++)   //displays cards once shuffled 
        {
            const deckOfCard = document.querySelector('.deck');
            deckOfCard.appendChild(shuffledCards[i]);
        }

        for(let i = 0; i < allStars.length; i++)    //adds back all 3 stars 
        {
            allStars[i].classList.remove("hideStars");
        }

        
        //reset timer
        let timer2 = document.querySelector(".timer");
        timer2.textContent = "0 mins 0 secs";
        clearInterval(interval);
    }

    //sets timer at beginning of game
    let timer2 = document.querySelector(".timer");
    timer2.textContent = "0 mins 0 secs";
    clearInterval(interval);



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
const chooseCardArray = [].slice.call(document.querySelectorAll('.card'));  

//adds event listener to enable cards to be selected 
for (let i = 0; i < chooseCardArray.length; i++){    
    chooseCardArray[i].addEventListener("click", turnCard);
    chooseCardArray[i].addEventListener("click", cardSelected);
 };

 //game is won when match coutner reaches 8 and displays modal
function winGame()
{
    if(matchCounter == 8) 
    {
       displayModal();
    }
}

//reset button restarts game
const resetClick = document.querySelector('.restart'); 
resetClick.addEventListener("click", resetGame); 
