// Creating a deck class

const SUITS = ["♠️","♣️","♦️","♥️"];
const VALUES = ["A","2","3","4","5","6","7","8","9","10","J","Q","K"];

// A deck class containing 52 cards
export class Deck{
    constructor(cards = freshCards(SUITS, VALUES)) {
        this.cards = cards;
    }

    //  shufle cards in deck
    shuffle(){
        // let shuffledCards = "";
        let getCards = this.cards;
        let shuffledCards = "";
        for(let i=0; i < getCards.length; i++){
            let newIndex = Math.floor(Math.random() * getCards.length);
            let oldTemp = getCards[i]
            let newTemp = getCards[newIndex]
            getCards[i] = newTemp
            getCards[newIndex] = oldTemp
            
            //  shuffledCards = getCards.slice(getCards[newIndex], 1)
             // console.log("old index", shuffledCards)
            // shuffledCards.push(getCards[newTemp]);
            // let cardAtNew = getCards[newposition]
            // getCards[newposition] = card;
            // getCards[oldIndex] = cardAtNew
            // shuffledCards.push(getCards[oldIndex]);

            // console.log("old index", shuffledCards)
            // console.log("new", newposition)
            // console.log( "card", getCards[oldIndex])
            // console.log("cardatNew", getCards[newposition])
        }
        return {"shuffled cards" : getCards};
    }
}

// class to get a card form deck class
class CARD {
    consturctor(suits, values){
        this.suits = suits;
        this.values = values;  
    }
}

// new fresh cards created from the suits and values array
function freshCards() {
    let cardsArray = [];
    for(let i in SUITS){
        for(let j in VALUES){
            cardsArray.push([VALUES[j], SUITS[i]]);
        }
    }
    return cardsArray;
}

// console.log(freshCards(SUITS, VALUES)); 
let deck  = new Deck();
console.log(deck)

// let shuffled = deck.shuffle()
let shuffled = new Deck().shuffle()

console.log("shuffled =", shuffled); 