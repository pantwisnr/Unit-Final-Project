// IMPORT DECK CLASS
import {
    Deck,
    CARD,
    Player
    // freshCards
} from "./deck.js"


// GET HTML ELEMENTS
const btn = document.getElementById("btnStart");
const startPage = document.querySelector(".startPage");
const mainContent = document.querySelector(".container-main");
const exit = document.getElementById("exit");

const p1deckLength = document.getElementById("p1deckLength")
const p2deckLength = document.getElementById("p2deckLength")
const deckCount = document.querySelectorAll(".deckCount")
const p1FaceValue = document.querySelectorAll(".player1FaceValue")
const p2FaceValue = document.querySelectorAll(".player2FaceValue")
const p1faceEndSuit = document.querySelectorAll(".p1faceEndSuit")
const p2faceEndSuit = document.querySelectorAll(".p2faceEndSuit")

const scoreBoard = document.querySelector(".scoreBoard")


// Start Game button
btn.addEventListener("click", () => {
    var seconds = "2.7s";
    startPage.style.animation = `slideUp ${seconds} ease forwards`;
    setTimeout(() => {
        mainContent.style.animation = `slideIn ${seconds} ease-out forwards`;
        mainContent.style.display = "flex";
        playGame();
    }, 1500);
}); 


// Exit Game buttons
exit.addEventListener("click", () => {
    const exitGame = document.querySelector(".exitGame");
    exit.style.display = "none";
    let exitYes = document.createElement("button");
    exitYes.textContent = "YES";
    exitYes.setAttribute("id", "exitYes")
    exitGame.appendChild(exitYes)

    let exitNo = document.createElement("button");
    exitNo.textContent = "No";
    exitNo.setAttribute("id", "exitNo")
    exitGame.appendChild(exitNo)
    
    //  return to game 
    exitNo.addEventListener("click", () =>{
        exit.style.display = "block";
        exitYes.style.display = "none";
        exitNo.style.display = "none";
    })

    //  exit game
    exitYes.addEventListener("click", () =>{
        exit.style.display = "block";
        exitYes.style.display = "none";
        exitNo.style.display = "none";
        mainContent.style.display = "none"
        startPage.style.animation = `slideIn 2.5s ease-out backwards`;
        startPage.style.display = "flex"
        setTimeout(() => {
            location.reload()
        }, 1000);
    })
});


// GAME LOGIC 
function playGame(){   
    
    let Players = refreshGame()
    var Player1 = Players[0]               
    var Player2 = Players[1]

    for(let element of deckCount){
        element.addEventListener("click", (e) => {
            let target = e.target;
            if(target.getAttribute("id") == "p1deckLength"){
                if(Player1.length === Player2.length || (Player1.length - Player2.length) == 1){
                    let p1Current = Player1.shift()
                    for(let element of p1FaceValue){
                        element.textContent = p1Current.suits;
                        element.style.color = p1Current.getColor();
                    }
                    for(let element of p1faceEndSuit){
                        element.textContent = p1Current.values;
                        element.style.color = p1Current.getColor();
                    }
                    p1deckLength.textContent = Player1.length;
               }
            }

           if(target.getAttribute("id") == "p2deckLength"){
            if(Player2.length === Player1.length || (Player2.length - Player1.length) == 1){
                let p2Current = Player2.shift()
                for(let element of p2FaceValue){
                    element.textContent = p2Current.suits;
                    element.style.color = p2Current.getColor();
                }
                for(let element of p2faceEndSuit){
                    element.textContent = p2Current.values;
                    element.style.color = p2Current.getColor();
                }
                p2deckLength.textContent = Player2.length;
            }
            }

            if(Player2.length === Player1.length && (Player1.length < 26 && Player1.length > -1)){
                var p1Current = document.getElementById("player1FaceSuit").textContent
                var p2Current = document.getElementById("player2FaceSuit").textContent
                declareScore(p1Current,p2Current)
            } 
            if (Player2.length == 0 && Player1.length == 0){
                modal.style.display = "block";
                let results = displayResults()
                let p1Results = results[0]
                let p2Results = results[1]
                let winner = results[2]
                p1Results.textContent = p1TotalScore.textContent
                p2Results.textContent = p2TotalScore.textContent

                var win ="";
                if(Number(p1TotalScore.textContent) === Number(p2TotalScore.textContent)) {
                    win = "TIE GAME" 
                } else if (Number(p1TotalScore.textContent) > Number(p2TotalScore.textContent)) {
                    let p1AllScores = document.getElementById("p1AllScores");
                    p1AllScores.style.background = "green";
                    p1AllScores.style.color = "white";
                    win = "PLAYER 1 WINS!"
                } else {
                    let p2AllScores = document.getElementById("p2AllScores");
                    p2AllScores.style.background = "green";
                    p2AllScores.style.color = "white";
                    win = "PLAYER 2 WINS!"
                }
                winner.textContent = win;
            }
        })
    }
}


function refreshGame(){

    for(let element of p2FaceValue){element.textContent = "";}
    for(let element of p2faceEndSuit){element.textContent = "";}
    
    for(let element of p1FaceValue){ element.textContent = "";}
    for(let element of p1faceEndSuit){element.textContent = "";}

    var newCardDeck = new Deck();
    var lengthOfCards = newCardDeck.getCardLength();
    newCardDeck.shuffle();

    const hand1 = newCardDeck.cards.slice(0,(newCardDeck.cards.length/2)) ;
    const hand2 = newCardDeck.cards.slice((newCardDeck.cards.length/2)) ;
    var Player1 = new Player(hand1).hand                
    var Player2 = new Player(hand2).hand 
    p1deckLength.textContent = Player1.length;
    p2deckLength.textContent = Player2.length;
    return [Player1, Player2]
}


function declareScore(p1Value, p2Value){
    let convertedValues = {
        "A" : 14,
        "K" : 13,
        "Q" : 12,
        "J" : 11,
        "10" : 10,
        "9" : 9,
        "8" : 8,
        "7" : 7,
        "6" : 6,
        "5" : 5,
        "4" : 4,
        "3" : 3,
        "2" : 2,
    }
    let p1NumValue = convertedValues[p1Value]
    let p2NumValue = convertedValues[p2Value]
    if(p1NumValue === p2NumValue) {
        scoreBoard.textContent = `TIE GAME!`;
    } else if (p1NumValue > p2NumValue){
        p1TotalScore.textContent++;
        scoreBoard.textContent = `P1 WINS!!`;
    } else {  
        p2TotalScore.textContent++;
        scoreBoard.textContent = `P2 WINS!!`;
    }
    
}

function displayResults(){
    var modalContent = document.querySelector(".modal-content");
    let mainDiv = document.createElement("div");
    mainDiv.setAttribute("id", "modalText-holder")
    let h3 = document.createElement("h3");
    h3.setAttribute("id", "modal-title")
    h3.textContent = "GAME OVER!";
    let innerDiv = document.createElement("div");
    innerDiv.classList.add("allScores")
    let p1 = document.createElement("p");
    p1.textContent = "Player1";
    let p2 = document.createElement("p");
    p2.textContent = "Player2";
    let p3 = document.createElement("p");
    p3.textContent = "Player WINS!";
    p3.setAttribute("id", "winner")
    let span1 = document.createElement("span");
    span1.setAttribute("id", "p1AllScores")
    let span2 = document.createElement("span");
    span2.setAttribute("id", "p2AllScores");
    
    p1.appendChild(span1)
    p2.appendChild(span2)
    innerDiv.appendChild(p1)
    innerDiv.appendChild(p2)
    mainDiv.appendChild(h3)
    mainDiv.appendChild(innerDiv)
    mainDiv.appendChild(p3)
    modalContent.appendChild(mainDiv)

    return [span1,span2, p3]
}

var modal = document.getElementById("myModal");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}
