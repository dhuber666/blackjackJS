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
    cards: [] // store the deck object inside this array
}



