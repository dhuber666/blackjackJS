var blackjack = {

    colors: [
        "hearths",
        "diamonds",
        "spades",
        "clubs"
    ],
    // it should have a generate card function
    generateCard: function() {
        // generate a random number between 0 and 12 and return it
        return Math.floor(Math.random() * 13);
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
            return this.cards.splice(0, 1); // returns a single card object
            //TODO: Check if the cards array is empty
        

        
        
    },
    dealCardsToDealer: function() {

        // give the dealer 2 cards
        // TODO: show just one card (but maybe do this in the view)
        for(var i = 0; i < 2; i++)
        {
            this.dealer.cards.push(this.dealCard());
        }
    },
    dealCardToPlayer: function() {
        this.player.cards.push(this.dealCard());
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

var views = {
    
    newCardPlayer: function() {
        
        var li = document.createElement("LI");
        var text = document.createTextNode(this.craftCard());
        console.log(this.craftCard());
        li.appendChild(text);
        document.querySelector(".player-hand").appendChild(li);
        

    },
    newCardDealer: function() {
        var li = document.createElement("LI");
        var text = document.createTextNode(this.craftCard());
        console.log(this.craftCard());
        li.appendChild(text);
        document.querySelector(".dealer-hand").appendChild(li);
    },
    // it just creates a string for better output
    craftCard: function() {
        var card = blackjack.dealCard(1);
        // Return a string with the prepared card
        return (card[0].value + " of " + card[0].color);
    },
    playerSetup: function() {
        this.newCardPlayer();
        this.newCardPlayer();
    },
    dealerSetup: function() {
        this.newCardDealer();
    }
}

// Setup a blackjack game

blackjack.generateDeck();
blackjack.shuffleDeck();
views.playerSetup();
views.dealerSetup();
