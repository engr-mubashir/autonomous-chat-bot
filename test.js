"use-strict";

// Conversation class implementation
class Conversation {
    // Constructor
    constructor(file) {
        this.file = require(file);
        this.currState = "";
        this.query = "";
        this.isValidAnswer = true;
    }

    // Reply method
    reply(query) {
        // Check param and respond
        this.query = query;

        if (this.query === "") {
            this.currState = "start";
        } else {
            this.currState = this.searchMatchingState();
        }

        // Handle whether question is valid
        if (this.isValidAnswer) {
            return this.currState;
        } else {
            return "Sorry, we are unable to provide appropriate answer, would rather like to contact support at 123456789?";
        }
    }

    searchMatchingState() {
        for (let i = 0; i < this.file.length; i++) {
            let item = this.file[i];

            if ((item.id === this.currState) && item.answerOptions) {
                for (let j = 0; j < item.answerOptions.length; j++) {
                    // Match correct answer
                    if (item.answerOptions[j].answer === this.query) {
                        this.isValidAnswer = true;
                        return item.answerOptions[j].nextState;
                    } else {
                        this.isValidAnswer = false;
                    }
                }
            } else {
                this.isValidAnswer = false;
            }
        }
    }

}


// Testing code
const assert = require('assert');

describe('Conversation testing', () => {
    let conv = new Conversation('./assets/troubleshooting.json');

    describe('check start state', () => {
        it('should return start', () => {
            assert.equal('start', conv.reply(''));
        });
    });

    describe('check phoneModel state', () => {
        it('should return phoneModel', () => {
            assert.equal('phoneModel', conv.reply('My phone doesn\'t work'));
        });
    });

    describe('check samsungServiceEnd state', () => {
        it('should return samsungServiceEnd', () => {
            assert.equal('samsungServiceEnd', conv.reply('Samsung Galaxy S10'));
        });
    });

    describe('check start state', () => {
        it('should return start', () => {
            assert.equal('start', conv.reply(''));
        });
    });

    describe('check routerReset state', () => {
        it('should return routerReset', () => {
            assert.equal('routerReset', conv.reply('My internet doesn\'t work'));
        });
    });

    describe('check anotherCable state', () => {
        it('should return anotherCable', () => {
            assert.equal('anotherCable', conv.reply('Yes'));
        });
    });

    describe('check tryAnotherCableEnd state', () => {
        it('should return tryAnotherCableEnd', () => {
            assert.equal('tryAnotherCableEnd', conv.reply('No'));
        });
    });

    describe('check invalid answers', () => {
        it('should return custom message', () => {
            assert.equal('Sorry, we are unable to provide appropriate answer, would rather like to contact support at 123456789?', conv.reply('Robot'));
            assert.equal('Sorry, we are unable to provide appropriate answer, would rather like to contact support at 123456789?', conv.reply('wrong question'));
        });
    });

});