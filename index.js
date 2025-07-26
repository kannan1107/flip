const cards = [
  {id: 1, image: "1.jpg"},
  {id: 2, image: "2.jpg"},
  {id: 3, image: "3.jpg"},
  {id: 4, image: "4.jpg"},
  {id: 5, image: "5.jpg"},
  {id: 6, image: "6.jpg"},
  {id: 7, image: "7.jpg"},
  {id: 8, image: "8.jpg"},
];
let moveCount = 0;
let startTime,timerInterval;
let timerStarted = false;
let firstCard,secondCard;
let lockBoard = false;
let matches = 0;
let cardArray = [...cards,...cards];
cardArray.sort(()=>0.5-Math.random());
const gameBoard = document.querySelector(".game");

function createCard(card) {
  const cardElement = document.createElement("div");
  cardElement.classList.add("card");
  cardElement.dataset.id = card.id;
  cardElement.innerHTML = `
    <div class="front-face"><img src="${card.image}" alt="Card Image"  ></div>
    <div class="back-face"><img src="back.webp" alt="Card Image" ></div>
  `
  cardElement.addEventListener("click",flipCard);
  gameBoard.appendChild(cardElement);
}

cardArray.forEach(createCard);

function flipCard() {
  if(lockBoard) return;
  if(this === firstCard) return;
  if(!timerStarted) {
    startTimer();
    timerStarted = true;
  }
  this.classList.add("flip");
  if(!firstCard) {
    firstCard = this;
    return;
  }
  secondCard = this;
  lockBoard = true;
  updateMoveCounter();
  checkForMatch();
}

function startTimer() {
  startTime = new Date();
  timerInterval = setInterval(()=>{
    const elapsedTime =new Date() - startTime;
    const minutes = Math.floor(elapsedTime/60000);
    const seconds = Math.floor((elapsedTime%60000)/1000);
    document.getElementById("timer").textContent = `Time: ${minutes.toString().padStart(2,'0')}:${seconds.toString().padStart(2,'0')}`;
  },1000);
}

function updateMoveCounter() {
  moveCount++;
  document.getElementById("moveCounter").textContent = `Move: ${moveCount}`;
}

function checkForMatch() {
  let isMatch = firstCard.dataset.id === secondCard.dataset.id;
  isMatch ? disableCards() : unflipCards();
}

function disableCards() {
  firstCard.removeEventListener("click",flipCard);
  secondCard.removeEventListener("click",flipCard);

  resetBoard();
  matches++;
  if(matches === cards.length) {
    stopTimer();
    winningMessage.classList.add("show");
    setTimeout(function(){
      winningMessage.classList.remove("show");
    },2000);
  }
}

function unflipCards() {
  setTimeout(()=>{
    firstCard.classList.remove("flip");
    secondCard.classList.remove("flip");
    resetBoard();
  },1500);
}

function resetBoard() {
  [firstCard,secondCard,lockBoard] = [null,null,false];
}

function stopTimer() {
  clearInterval(timerInterval);
}

function resetGame() {
   moveCount = -1;
   updateMoveCounter();
   resetTimer();
   timerStarted = false;
   [firstCard,secondCard,lockBoard] = [null,null,false];
   matches = 0;
   cardArray.sort(()=>0.5-Math.random());
   while (gameBoard.firstChild) {
    gameBoard.removeChild(gameBoard.firstChild);
   }
   cardArray.forEach(createCard);
}

document.getElementById("resetButton").addEventListener("click",resetGame);

function resetTimer() {
  clearInterval(timerInterval);
  document.getElementById("timer").textContent = "Time: 00:00";
}































