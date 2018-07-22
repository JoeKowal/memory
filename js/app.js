//hold all cards
let card = document.getElementsByClassName("card");
let allCards = [...card];

//init
let timer;
let openCards = []; //opened cards
let matchedCards = []; //matched Cards
let firstClick = null; //1st click
let currentClick = null; //2nd click
let firstClickIcon = null; //1st click picture
let currentClickIcon = null; //2nd click picture
let shuffledCards;
let hours = 0;
let minutes = 0;
let seconds = 0;
let timerOn = false; //no timer until first move
let timeOutput;
const deck = document.querySelector(".deck");
let winStars;
let moveCounter = 0; //# of moves

//shuffle
window.onload = function() {
  shuffleCards();
};

function shuffleCards() {
  shuffledCards = shuffle(allCards);
  for (let i = 0; i < shuffledCards.length; i++) {
    deck.appendChild(shuffledCards[i]);
  }
}

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

//event listeners
document.querySelector(".deck").addEventListener("click", clickedCard);
document.querySelector(".restart").addEventListener("click", reset);
document.querySelector(".btn-primary").addEventListener("click", reset);

//flip card when clicked
function clickedCard() {
  if (timerOn === false) {
    timerOn = true;
    setTimer();
  }
  currentClick = event.target;
  if (currentClick.classList.contains("match")) {
    //do nothing this card is already matched
  } else if (currentClick.classList.contains("card")) {
    //show card and disable it from being clicked twice
    currentClick.classList.add("open", "show-card", "disabled");
    CurrentClickIcon = currentClick.lastElementChild.className;
    openedCard();
  }
}

//compare cards
function openedCard() {
  openCards.push(CurrentClickIcon);
  if (openCards.length === 1) {
    firstClick = currentClick;
    firstClickIcon = CurrentClickIcon;
  }
  //2 cards = update number of moves
  if (openCards.length === 2) {
    updateMoves();
    //do the 2 cards match
    if (openCards[0] === openCards[1]) {
      //if yes then match function
      isAMatch();
    } else {
      //if no then not a match function
      notAMatch();
    }
    openCards = [];
  }
}

//have all cards have been matched
function isAMatch() {
  currentClick.classList.add("match");
  firstClick.classList.add("match");
  matchedCards.push(currentClickIcon);
  matchedCards.push(firstClickIcon);
  if (matchedCards.length === 16) {
    //all done = winning
    win();
  }
}

function notAMatch() {
  document.querySelector(".deck").removeEventListener("click", clickedCard);
  setTimeout(function() {
    currentClick.classList.remove("open", "show-card", "disabled");
    firstClick.classList.remove("open", "show-card", "disabled");
    document.querySelector(".deck").addEventListener("click", clickedCard);
  }, 600);
}

function updateMoves() {
  moveCounter++;
  document.querySelector(".moves").innerHTML = "Moves: " + moveCounter;
  rating();
}

function win() {
  clearTimer();
  generateWinStars();
  document.querySelector(".modal-body").lastElementChild.innerHTML =
    "Moves Made: " +
    moveCounter +
    "<br />" +
    timeOutput +
    "<br />" +
    "Rating: " +
    winStars;
  $("#winModal").modal("show");
}

//reset the game
function reset() {
  clearTimer();
  for (let e of document.querySelectorAll(".stars"))
    e.children[2].style.visibility = "visible";
  for (let e of document.querySelectorAll(".stars"))
    e.children[1].style.visibility = "visible";
  moveCounter = 0;
  firstClick = null;
  currentClick = null;
  seconds = 0;
  minutes = 0;
  hours = 0;
  document.querySelector(".myTimer").innerHTML = "Time Taken: 0 secs";
  timerOn = false;
  document.querySelector(".moves").innerHTML = "Moves: " + moveCounter;
  let cards = document.getElementsByClassName("card");
  let cardsEl;
  for (let i = 0; i < cards.length; i++) {
    cardsEl = cards[i].lastElementChild.className;
    if (openCards.includes(cardsEl)) {
      cards[i].classList.remove("open", "show-card", "disabled");
    } else if (matchedCards.includes(cardsEl)) {
      cards[i].classList.remove("open", "show-card", "match", "disabled");
    }
  }
  openCards = [];
  matchedCards = [];
  shuffleCards();
}

//calculate time
function setTimer() {
  timer = setInterval(function() {
    if (seconds === 60) {
      minutes++;
      seconds = 0;
    }
    if (minutes === 60) {
      hours++;
      minutes = 0;
    }
    seconds++;
    timerOutput();
  }, 1000);
}

//stop time
function clearTimer() {
  clearInterval(timer);
}

//timer for scorecard
function timerOutput() {
  //hours
  if (hours === 1) {
    timeOutput = "Time Taken: " + hours + " hr ";
  } else if (hours > 1) {
    timeOutput = "Time Taken: " + hours + " hrs ";
  } else if (hours === 0) {
    timeOutput = "Time Taken: ";
  }
  //minutes
  if (minutes === 0 && hours === 0) {
  } else if (minutes === 1) {
    timeOutput += minutes + " min ";
  } else if (minutes != 1) {
    timeOutput += minutes + " mins ";
  }
  //seconds
  if (seconds === 1) {
    timeOutput += seconds + " sec";
  } else {
    timeOutput += seconds + " secs";
  }
  document.querySelector(".myTimer").innerHTML = timeOutput;
}

//how many stars to show
function rating() {
  if (moveCounter < 13) {
    //3 stars
  } else if (moveCounter >= 14 && moveCounter < 18) {
    for (let e of document.querySelectorAll(".stars"))
      e.children[2].style.visibility = "hidden";
  } else if (moveCounter >= 19) {
    for (let e of document.querySelectorAll(".stars"))
      e.children[1].style.visibility = "hidden";
  }
}

//code to show on win screen
function generateWinStars() {
  if (moveCounter < 11) {
    winStars = `<i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i>`;
  } else if (moveCounter >= 11 && moveCounter < 20) {
    winStars = `<i class="fa fa-star"></i><i class="fa fa-star"></i>`;
  } else if (moveCounter >= 20) {
    winStars = `<i class="fa fa-star"></i>`;
  }
}
