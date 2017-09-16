var blackjack = {

    colors: [
        "hearths",
        "diamonds",
        "spades",
        "clubs"
    ],
    gameOver: false,
    // it should have a generate card function
    generateCard: function() {
        // generate a random number between 0 and 12 and return it
        var number =  Math.floor(Math.random() * 13);
        switch(number) {
            case 0:         //  this is an ace. should return 1 OR 11 TODO: Add that later
                return 1;

            case 11: 
                return 10;

            case 12:
                return 10;

            default:
                return number;
        }

    },
    // it should have a generate deck function that returns an array of 52 cards
    generateDeck: function() {
        // return an array with 52 cards. Get the random cards from the generateCard function
        // var cards = [];
        
        this.colors.forEach(function(color){
            for(var i = 0; i < 13; i++) {
                var value = this.generateCard();
                var card = {};
                card.value = value;
                card.color = color;
                this.cards.push(card);
                
            }
        }, this)
        
        
    },
    // It should have a method to deal out a card
    dealCard: function(number) {
        // number = how many cards to deal
        
            // generate a random number between 0 and 51
            var random = Math.floor(Math.random() * 51);
            // Pull out the first card on the staple (has to be shuffled first)
            return this.cards.splice(0, 1)[0]; // returns a single card object
            //TODO: Check if the cards array is empty
        

        
        
    },
    dealCardToDealer: function() {

        // give the dealer 2 cards
       
        card = this.dealCard();
        this.dealer.cards.push(card);
        return card;
        
        
    },
    dealCardToPlayer: function() {
        card = this.dealCard();
        this.player.cards.push(card);
        return card;
    },
    // It should shuffle the deck, returns a shuffled deck array
    shuffleDeck: function() {
        var j, x, i;
        for (i = this.cards.length; i; i--) {
            j = Math.floor(Math.random() * i);
            x = this.cards[i - 1];
            this.cards[i - 1] = this.cards[j];
            this.cards[j] = x;
        }
        
    },
    // store the deck object inside this array
    cards: [] ,
    // it should have a dealer that has a dealer hand
    // dealer where we add 2 cards to his hand
    dealer: { 
        cards: []
    },
    player: {
        cards: []
    }
}

var handlers = {
    
    resetGame: function() {
        
        // if the resultButton gets clicked start a new game
        // Empty player and dealer cards array deal 1 new card to the dealer and 2 new cards to the player
        blackjack.player.cards = [];
        blackjack.dealer.cards = [];
        // reactivate the buttons
        var result = document.getElementById("result");
        var resultButton = document.getElementById("resultButton");
        var playerHand = document.querySelector(".player-hand");
        var dealerHand = document.querySelector(".dealer-hand");

        //TODO: Make a button setup function
        playerHand.innerHTML = "";
        dealerHand.innerHTML = "";
        result.innerHTML = "";
        document.querySelectorAll("button").forEach(function(button) {
            button.disabled = false;
        });
        resultButton.disabled = true;
        resultButton.style = "display: none";
        
        views.playerSetup();
        views.dealerSetup();

        blackjack.gameOver = false;

    }
}

var views = {
    
    newCardPlayer: function() {
        
        var card = blackjack.dealCardToPlayer();
        var preparedCard = card.value + " of " + card.color;
        var li = document.createElement("LI");
        var text = document.createTextNode(preparedCard);
        
        li.appendChild(text);
        document.querySelector(".player-hand").appendChild(li);
        this.showPlayerScore();
        this.checkCondition();

    },
    newCardDealer: function() {
        blackjack.dealCardToDealer();
        var preparedCard = card.value + " of " + card.color;
        var li = document.createElement("LI");
        var text = document.createTextNode(preparedCard);
        
        li.appendChild(text);
        document.querySelector(".dealer-hand").appendChild(li);
        this.showDealerScore();

        this.checkCondition();
        
    },
    stand: function()
    {
        while(!blackjack.gameOver)
        {
            this.newCardDealer();
        }
    },

    playerSetup: function() {
        this.newCardPlayer();
        this.newCardPlayer();
        
    },
    dealerSetup: function() {
        this.newCardDealer();
        this.showDealerScore();
        
    },
    totalScore: function(cardArray) {
        // it should calculate the total score of cards and return it
        
        var count = 0;
        for(var i = 0; i < cardArray.length; i++) {
            count += cardArray[i].value;
        }

        return count;
    },
    showDealerScore: function() {
        var score = document.getElementById("dealerScore");
        score.innerHTML = "Score: " + this.totalScore(blackjack.dealer.cards);
    },
    showPlayerScore: function() {
        var score = document.getElementById("playerScore");
        score.innerHTML = "Score: " + this.totalScore(blackjack.player.cards);
    },
    // It should check the conditions if you hit the next card or stand button
    checkCondition: function() {
        // compare the player score with the dealer score
        var playerCards = blackjack.player.cards;
        var playerScore = this.totalScore(playerCards);
        var dealerCards = blackjack.dealer.cards;
        var dealerScore = this.totalScore(dealerCards);
        // select the result div > h2 and button
        var result = document.getElementById("result");
        var resultButton = document.getElementById("resultButton");
        if (playerScore > 21) {
            result.innerHTML = "You have burned yourself and lost, play again?"
            blackjack.gameOver = true;
            this.playAgain();
            

        } 
        // now comes the check for dealer since the player has clicked stand
        // if less then 17 do nothing
        if (dealerScore < 17 ) {

        } else if (dealerScore >= 17 && dealerScore < 22) {
            if (dealerScore > playerScore) {
                result.innerHTML = "The dealer has " + dealerScore + " and you have " + playerScore + "! You loose, Play again?";
                blackjack.gameOver = true;
                this.playAgain();
            } else if (dealerScore === playerScore) {
                result.innerHTML = "The dealer has " + dealerScore + " and you have " + playerScore + "! It's a tie, Play again?";
                blackjack.gameOver = true;
                this.playAgain();
            } else {
                result.innerHTML = "The dealer has " + dealerScore + " and you have " + playerScore + "! You win, Play again?";
                blackjack.gameOver = true;
                this.playAgain();
            }
        } else {
            result.innerHTML = "The dealer burned himself, you won! Play again?"
            blackjack.gameOver = true;
            this.playAgain();
        }

        


    },
    playAgain: function() {
        document.querySelectorAll("button").forEach(function(button) {
            button.disabled = true;
        })
        resultButton.style = "display: block";
        resultButton.disabled = false;
        
    }
    
    
}

function newGame () {
    blackjack.generateDeck();
    blackjack.shuffleDeck();
    views.playerSetup();
    views.dealerSetup();
}

// Setup a blackjack game

newGame();
