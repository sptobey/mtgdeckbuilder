var deck = {

    cards: [],

    initCards: function() {
        deck.cards = [];
    },

    addCard: function(card, cardEditionObj) {
        var card_edition_and_id = 
            {
                "card_obj": card,
                "card_edition": cardEditionObj,
                "mult_id": cardEditionObj.multiverse_id
            }
        deck.cards.push(card_edition_and_id);
        console.log("Card Added.  deck.cards: ",deck.cards);
    },

    removeCard: function(card) {
        var len = deck.cards.length;
        for(var i = 0; i < len; i++) {
            if(deck.cards[i].mult_id == card.mult_id) {
                deck.cards.splice(i, 1);
                break;
            }
        }
        // re-display the cards
        deck.viewDeck();
    },

    resetDeck: function(event) {
        if(deck.cards != []) {
            if(confirm("Reset Deck?")) {
                deck.cards = [];
                deck.viewDeck();
            }
        }
    },

    sortByRarity: function() {
        deck.cards = _.sortBy(deck.cards, 
            function(card) {
                var rarity = card.card_edition.rarity;
                var sortRarity = 0;
                if(rarity === "mythic") {
                    sortRarity = 1;
                } else if(rarity === "rare") {
                    sortRarity = 2;
                } else if(rarity === "uncommon") {
                    sortRarity = 3;
                } else if(rarity === "common") {
                    sortRarity = 4;
                }
                return sortRarity;
            }
        );
        deck.viewDeck();
    },

    sortByCmc: function() {
        deck.cards = _.sortBy(deck.cards,
            function(card) {
                return card.card_obj.cmc;
            }
        );
        deck.viewDeck();
    },

    sortByColor: function() {
        deck.cards = _.sortBy(deck.cards,
            function(card) {
                var sortColor = 0;
                if(card.card_obj.hasOwnProperty("colors")) {
                    var colors = card.card_obj.colors;
                    var color_vals = 
                    {
                        "white": 1,
                        "blue": 2,
                        "black": 3,
                        "red": 4,
                        "green": 5
                    };
                    // Single Color
                    sortColor = color_vals[colors[0]];
                    // Multicolored
                    for(var i = 1; i < colors.length; i++) {
                        sortColor = 5 + sortColor + color_vals[colors[i]];
                    }
                // Colorless
                } else {
                    sortColor = 36;
                }
                console.log("Sort color val: ", sortColor);
                return sortColor;
            }
        );
        deck.viewDeck();
    },

    viewDeck: function () {
        $.get("/mtgdeckbuilder/deck/view.jade", function(template) {
            var html = jade.render(template, {
                data: deck.cards
            })
            $("#list").html(html)
        })
    },

    getRandom: function() {
        $.ajax({
            url: "https://api.mtgdb.info/cards/random",
            success: function(data) {
                console.log("Data:", data);
                if(data) {
                    $.get("/mtgdeckbuilder/deck/view.jade", function(template) {
                        var html = jade.render(template, {
                            data: data
                        })
                        $("#list").html(html)
                    })
                }
            }
        });
    },

    postTest: function(event) {
        //console.log("Event: ", event);
        event.preventDefault();
        $.ajax({
            type: "POST",
            url: "/mtgdeckbuilder/storage/test.json.data",
            data: {test:"testData"},
            dataType: "json",
            success: function(data) {
                console.log("Post data: ", data);
                if(data) {
                    $.get("/mtgdeckbuilder/deck/list.jade", function(template) {
                        var html = jade.render(template, {
                            data: data
                        })
                        $("#list").html(html)
                    })
                }
            }
        }).fail(function(jqXHR, textStatus, errorThrown) {
            alert(textStatus);
        });
    },
    
    saveDeck: function() {
        var json = JSON.stringify(deck.cards)
        var blob = new Blob([json], {type: "application/json;charset=utf-8"})
        saveAs(blob, "deck.json")
    },

    load: function() {
        $.get("/mtgdeckbuilder/deck/ui.jade", function(template) {
            var html = jade.render(template);
            $("#searchdiv").html(html);
        })
        
        // list all cards
        deck.viewDeck();
        console.log("Load Deck. deck.cards: ",deck.cards);
    }
}
