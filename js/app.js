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
  var currentIndex = array.length,
    temporaryValue,
    randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

let numMoves =0;

const deck = document.querySelector(".deck");

//shuffle
function shuffleCards() {
  const unshuffled = Array.from(document.querySelectorAll('.deck li'));
  const shuffled = shuffle(unshuffled);
  for (card of shuffled) {
    deck.appendChild(card);
  }
}

shuffleCards();

let flippedCards = []; //to hold clicked cards

//count number of turns
function addTurn() {
  numMoves++;
  const turnText = document.querySelector('numMoves');
  turnText.innerHTML = numMoves;
}



//flip the card
function flipCard(clickCard) {
  clickCard.classList.toggle("open");
  clickCard.classList.toggle("show");
}

//flip card when clicked
deck.addEventListener("click", event => {
  const clickCard = event.target;
  if (clickCard.classList.contains("card")) {
    flipCard(clickCard);
  }
});

//add clicked cards to array
deck.addEventListener("click", event => {
  const clickCard = event.target;
  if (isAGoodClick(clickCard)) {
    flipCard(clickCard);
    addClickCard(clickCard);
    if (flippedCards.length === 2) {
      doTheyMatch(clickCard);
      addTurn();
    }
  }
});

//add to array
function addClickCard(clickCard) {
  flippedCards.push(clickCard);
}

//is it a match?
function doTheyMatch() {
  if (
    flippedCards[0].firstelementchild.classname ===
    flippedCards[1].firstelementchild.classname
  ) {
    flippedCards[0].classlist.toggle("match");
    flippedCards[1].classlist.toggle("match");
    flippedCards = [];
  } else {
    setTimeout(() => {
      //pause to see card here
      flipCard(flippedCards[0]);
      flipCard(flippedCards[1]);
      flippedCards = [];
    }, 1450);
  }
}

//is this a real valid click
function isAGoodClick(clickCard) {
  return (
    clickCard.classlist.contains("card") &&
    !clickCard.classlist.contains("match") &&
    flippedCards.length < 2 &&
    !flippedCards.includes(clickCard)
  );
}

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
