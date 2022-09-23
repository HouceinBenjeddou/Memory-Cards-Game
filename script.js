


//debug lifes auto decrement


const cards = document.querySelectorAll(".card");
const showBtn = document.querySelector('show-btn'); 

score = document.querySelector(".score span");
winTime = document.querySelector(".winingTime span"),
scoreTag = document.querySelector(".totalScore span");
timeTag = document.querySelector(".time b"),
end = document.querySelector(".lost"),
lifeTag = document.querySelector(".lifes span"),
flipsTag = document.querySelector(".flips b"),
playAgain = document.querySelector(".won  button"),
blurTag = document.querySelector(".cards"),
refreshBtn = document.querySelector(".details button");


let mySound;
let maxTime = 20;
let initalScore = 0;
let maxLife = 3;
let initialLife = 3;
let timeLeft = maxTime;
let flips = 0;
let matchedCard = 0;
let x = 0;
let disableDeck = false;
let isPlaying = false;
let cardOne, cardTwo, timer;


function initTimer() {
    if(timeLeft <= 0) { 
        setTimeout(() =>{
            openUp.classList.add("open-popup");
            blurTag.classList.add("blur");
            winTime.innerText = timeLeft; //debug
        });
        return clearInterval(timer);
    }
    
        if(lifeTag.innerHTML <= 0){
           //stop the game
           openUp.classList.add("open-popup");
           blurTag.classList.add("blur");
        }   
        playAgain.addEventListener("click", () =>{
            openUp.classList.remove("open-popup");
            blurTag.classList.remove("blur");
        }, 1000);
    timeLeft--;
    timeTag.innerText = timeLeft;
}

function flipCard({target: clickedCard}) {
    if(!isPlaying) {
        isPlaying = true;
        timer = setInterval(initTimer, 1000);
    }
    if(clickedCard !== cardOne && !disableDeck && timeLeft > 0) {
        flips++;
        flipsTag.innerText = flips;
        clickedCard.classList.add("flip");
        if(!cardOne) {
            return cardOne = clickedCard;
        }

        cardTwo = clickedCard;
        disableDeck = true;
        let cardOneImg = cardOne.querySelector(".back-view img").src,
        cardTwoImg = cardTwo.querySelector(".back-view img").src;
        matchCards(cardOneImg, cardTwoImg);
    }
}


function matchCards(img1, img2) {
    if(img1 === img2) {
        matchedCard++;
        let x = score.innerHTML = parseInt(score.innerHTML) + 3
        scoreTag.innerHTML = x;
        if(matchedCard == 6 && timeLeft >0) {
            return clearInterval(timer);
        }
        cardOne.removeEventListener("click", flipCard);
        cardTwo.removeEventListener("click", flipCard);
        cardOne = cardTwo = "";
        return disableDeck = false;
    }
 
    setTimeout(() => {
        if(disableDeck){
                maxLife--;
                  lifeTag.innerHTML = maxLife;
        }
    });
    
    playAgain.addEventListener("click", () =>{
        openUp.classList.remove("open-popup");
        blurTag.classList.remove("blur");
    },500);
    
    setTimeout(() => {
        cardOne.classList.add("shake");
        cardTwo.classList.add("shake");
    }, 400);

    setTimeout(() => {
        cardOne.classList.remove("shake", "flip");
        cardTwo.classList.remove("shake", "flip");
        cardOne = cardTwo = "";
        disableDeck = false;
    }, 1200);
}
//to debug
function setLife(){
        for(let i = 0; i<= maxLife; i++){
            if(timeLeft > 0 && !matchCards() ){
              x[i]--;
            }
            lifeTag.innerHTML = x;
        }
 }

 function showPopup(){
    if(timeLeft <= 0){
    // setTimeout(() =>{
    //     openUp.classList.add("open-popup");
    //     blurTag.classList.add("blur");
    // });
    // playAgain.addEventListener("click", () =>{
    //     openUp.classList.remove("open-popup");
    //     blurTag.classList.remove("blur");
    // });
}
}

function shuffleCard() { 
    timeLeft = maxTime;
    score.innerText = initalScore;
    lifeTag.innerText = initialLife;
    flips = matchedCard = 0;
    cardOne = cardTwo = "";
    clearInterval(timer);
    timeTag.innerText = timeLeft;
    flipsTag.innerText = flips;
    disableDeck = isPlaying = false;

    let arr = [1, 2, 3, 4, 5, 6, 1, 2, 3, 4, 5, 6];
    arr.sort(() => Math.random() > 0.5 ? 1 : -1);
    //show image back for .5s
    cards.forEach((card, index) => {
        card.classList.remove("flip");
        let imgTag = card.querySelector(".back-view img");
        setTimeout(() => {
            imgTag.src = `images/img-${arr[index]}.png`;
        }, 500);
        card.addEventListener("click", flipCard);
    });
}
shuffleCard();
refreshBtn.addEventListener("click", shuffleCard);
playAgain.addEventListener("click", shuffleCard);
//adding click events to all cards
cards.forEach(card => {
    card.addEventListener("click", flipCard);
});

//to call when the game has eneded


