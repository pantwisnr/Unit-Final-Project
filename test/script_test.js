// NB: cd into project directory and run "npm test" in your terminal or cmd prompt to run test files 

import chai from 'chai';
import {createNewDeck} from '../js/deck.js';
var expect = chai.expect

// Test Suite  --> always start with describe
describe('functions in deck.js', () => {
    describe('createNewDeck', function (){
        // Test Spec (unit test)  --> always start with "it"
        it('should return a deck array of length 52', function (){
            var deck = createNewDeck();
            expect(deck.length).to.equal(52);
        })


        // each element of the array sohuld be of length 2
        it("should have each CARD object in the deck array with length of 2", function (){
            var deck = createNewDeck();
            expect(Object.keys(deck[0]).length).to.equal(2);
        })
    })
})