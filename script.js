var blackjack = {

    colors: [
        "hearths",
        "diamonds",
        "spades",
        "clubs"
    ],
    gameOver: false,
    chipsLeft: true,
    firstRound: true,
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
            // check if the deck is empty and create a new one
            if(this.cards.length === 0)
            {
                this.generateDeck();
                return this.cards.splice(0, 1)[0];
            } else {
                return this.cards.splice(0, 1)[0];
            }
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
        cards: [],
        wins: 0,
        losses: 0,
        ties: 0,
        chips: 30
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
        // bet button
        var betButton = document.getElementById("placeBet");
        betButton.style = "display: inline-block";
        // bet display
        var betDisplay = document.getElementById("betScore");
        betDisplay.innerHTML = "0";
        bet.betScore = 0;
        //warning display
        var warning = document.getElementById("warning");
        warning.innerHTML = "";


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
        if(!blackjack.chipsLeft) {
            blackjack.player.chips = 30;
        }
        warning.innerHTML = "";
        firstRound = false;
        views.showPlayerScore();
    }
}

var views = {
    
    newCardPlayer: function() {
        // deactive bet button
        if (bet.betScore > 0) {
        var betButton = document.getElementById("placeBet");
        betButton.style = "display: none";

        var card = blackjack.dealCardToPlayer();
        var preparedCard = card.value + " of " + card.color;
        var li = document.createElement("LI");
        var text = document.createTextNode(preparedCard);
        audio.play();
        li.appendChild(text);
        document.querySelector(".player-hand").appendChild(li);
        this.showPlayerScore();
        this.checkCondition();
        } else {
            alert("You have to place a bet first");
        }

    },
    newCardDealer: function() {
        
        blackjack.dealCardToDealer();
        var preparedCard = card.value + " of " + card.color;
        var li = document.createElement("LI");
        var text = document.createTextNode(preparedCard);
        
        li.appendChild(text);
        document.querySelector(".dealer-hand").appendChild(li);
        audio.play();
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

        if(!blackjack.firstRound) {
            for(var i = 0; i < 2; i++) {
                var card = blackjack.dealCardToPlayer();
                var preparedCard = card.value + " of " + card.color;
                var li = document.createElement("LI");
                var text = document.createTextNode(preparedCard);
                
                li.appendChild(text);
                document.querySelector(".player-hand").appendChild(li);
                audio.play();
                this.showPlayerScore();
                this.checkCondition();
            }
        }
        
    },
    dealerSetup: function() {
        this.newCardDealer();
        this.showDealerScore();
        // hide buttons at startup
        var nextButton = document.getElementById("nextButton");
        var standButton = document.getElementById("standButton");
        nextButton.style = "display: none";
        standButton.style = "display: none";
        
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
        score.innerHTML = "Score: " + this.totalScore(blackjack.dealer.cards) + "<br> <hr>";
    },
    showPlayerScore: function() {
        var score = document.getElementById("playerScore");
        var wins = document.getElementById("playerWins");
        score.innerHTML = "Score: " + this.totalScore(blackjack.player.cards) + "<br> <hr>";
        wins.innerHTML = "Wins: " + blackjack.player.wins + "<br> Ties: " + blackjack.player.ties + 
        "<br> Losses: " + blackjack.player.losses + "<br> <hr> " + "Chips: " + blackjack.player.chips;
        if (blackjack.player.chips <= 0 && !firstRound) {
            // select warning
            var warning = document.getElementById("warning");
            warning.innerHTML = "You have lost all your chip, want to bet your wife instead?";
            blackjack.chipsLeft = false;

        }
        

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
            blackjack.player.losses++;
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
                blackjack.player.losses++;
                this.playAgain();
            } else if (dealerScore === playerScore) {
                result.innerHTML = "The dealer has " + dealerScore + " and you have " + playerScore + "! It's a tie, Play again?";
                blackjack.gameOver = true;
                blackjack.player.ties++;
                blackjack.player.chips += bet.betScore;
                this.playAgain();
            } else {
                result.innerHTML = "The dealer has " + dealerScore + " and you have " + playerScore + "! You win, Play again?";
                blackjack.gameOver = true;
                blackjack.player.wins++;
                blackjack.player.chips += bet.betScore * 2;
                this.playAgain();
            }
        } else {
            result.innerHTML = "The dealer burned himself, you won! Play again?"
            blackjack.gameOver = true;
            blackjack.player.wins++;
            blackjack.player.chips += bet.betScore * 2;
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
var bet =  {
    // Every player should start with 30 chips
    // this means the player needs a chips variable. 

    // player can place bet before the game starts. Afterwards he can't bet anymore
        // It should have a button that adds 2 chips per click to the pot. 
        // It should have a p tag that displays the chips in pot
    betScore: 0,
    addBet: function () {
        // pick the paragraph
        if (blackjack.player.chips > 0) {
            var betValue = document.getElementById("betScore");
            this.betScore += 2;
            betValue.innerHTML = this.betScore;
            chip.play();
            // decrement the player chips every time buttin is clicked by 2
            blackjack.player.chips -= 2;
            views.showPlayerScore();
        } else {
            // select warning p tag and warn user
            var warning = document.getElementById("warning");
            warning.innerHTML = "You have no more chips left - start the game now";
        }
    },
    start: function () {
        // set the play buttons to visible
        var nextButton = document.getElementById("nextButton");
        var standButton = document.getElementById("standButton");
        nextButton.style = "display: inline-block";
        standButton.style = "display: inline-block";
    }

}

// sounds
var audio = document.getElementsByTagName("audio")[0];
var chip = document.getElementsByTagName("audio")[1];


function newGame () {
    blackjack.generateDeck();
    blackjack.shuffleDeck();
    views.playerSetup();
    views.dealerSetup();
}
// Setup a blackjack game
newGame();

//TODO: Right now we deal 2 cards to player before he places the bet. Should see his cards after placing bets
//TODO: Make that damn site prettier
//TODO: Add an option so more player can play
//TODO: Come back after I have gained much more knowledge and add backend savegame and user registration + multiplayer?

