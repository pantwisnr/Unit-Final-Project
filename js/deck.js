// Creating a deck class
const SUITS = ["♠️","♣️","♦️","♥️"];
const VALUES = ["A","2","3","4","5","6","7","8","9","10","J","Q","K"];


// A deck class containing 52 cards
export class Deck{
    constructor(cards = freshCards()) {
        this.cards = cards;
    }

    getCardLength(){
        return this.cards.length
    }
    
    //  shufle cards in deck
    shuffle(){
        let getCards = this.cards;
        for(let i=0; i < getCards.length; i++){ 
            let newIndex = Math.floor(Math.random() * getCards.length);
            let oldTemp = getCards[i]
            let newTemp = getCards[newIndex]
            getCards[i] = newTemp
            getCards[newIndex] = oldTemp
         
        }
        return getCards;
    }

    // deal(){}
} 

// class to get a card form deck class
export class CARD {
    constructor(values, suits){
        this.suits = suits;
        this.values = values;  
    }

    getColor(){
        return this.suits === "♠️" || this.suits === "♣️" ? "black": "red";
        // return this.values ;
    }
}

export class Player {
    constructor(hand){
        this.hand = hand;
    }
}


// new fresh cards created from the suits and values array
export function freshCards() {
    let cardsArray = [];
    for(let i in SUITS){
        for(let j in VALUES){
            let card = new CARD(VALUES[j], SUITS[i])
            cardsArray.push(card);
        }
    }
    return cardsArray;
}

