var cards = {

    randomCard: function() {
        $.ajax({
            type: "GET",
            url: "https://api.mtgdb.info/cards/random",
            success: function(data) {
                if (data){
                    console.log("RandomCard: ", data);
                        $.get("/mtgdeckbuilder/cards/list.jade", function(template) {
                        var html = jade.render(template, {
                            data: data
                        })
                        $("#list").html(html)
                    })
                }
            }
        });
    },
    
    onProcess: function(check){
        return check[0].checked
    },
    
    searchByName: function(name, white, blue, black, red, green, multicolor, format, type, supertype, cmc, rarity) {
        
        var query = "https://api.deckbrew.com/mtg/cards";
        var isFirst = true;
        
        // name
        if(name) {
            if(isFirst) {
                query = query + "?";
                isFirst = false;
            } else {
                query = query + "&";
            }
            query = query + "name=" + name;
        }
        // white
        if(cards.onProcess(white)) {
            if(isFirst) {
                query = query + "?";
                isFirst = false;
            } else {
                query = query + "&";
            }
            query = query + "color=" + "white";
        }
        // blue
        if(cards.onProcess(blue)) {
            if(isFirst) {
                query = query + "?";
                isFirst = false;
            } else {
                query = query + "&";
            }
            query = query + "color=" + "blue";
        }
        // black
        if(cards.onProcess(black)) {
            if(isFirst) {
                query = query + "?";
                isFirst = false;
            } else {
                query = query + "&";
            }
            query = query + "color=" + "black";
        }
        // red
        if(cards.onProcess(red)) {
            if(isFirst) {
                query = query + "?";
                isFirst = false;
            } else {
                query = query + "&";
            }
            query = query + "color=" + "red";
        }
        // green
        if(cards.onProcess(green)) {
            if(isFirst) {
                query = query + "?";
                isFirst = false;
            } else {
                query = query + "&";
            }
            query = query + "color=" + "green";
        }
        // multicolor
        if(cards.onProcess(multicolor)) {
            if(isFirst) {
                query = query + "?";
                isFirst = false;
            } else {
                query = query + "&";
            }
            query = query + "multicolor=" + cards.onProcess(multicolor);
        }
        if(format) {
            if(isFirst) {
                query = query + "?";
                isFirst = false;
            } else {
                query = query + "&";
            }
            query = query + "format=" + format;
        }
        if(type) {
            if(isFirst) {
                query = query + "?";
                isFirst = false;
            } else {
                query = query + "&";
            }
            query = query + "type=" + type;
        }
        if(supertype) {
            if(isFirst) {
                query = query + "?";
                isFirst = false;
            } else {
                query = query + "&";
            }
            query = query + "supertype=" + supertype;
        }
        if(rarity) {
            if(isFirst) {
                query = query + "?";
                isFirst = false;
            } else {
                query = query + "&";
            }
            query = query + "rarity=" + rarity;
        }
        
        console.log("Query: ", query);
        //console.log("Cmc?: ", !(!cmc));
        
        $.ajax({
            type:"GET",
            //"http://api.mtgdb.info/search/" + name
            url: query,
            success: function(data) {
                if (data){
                    console.log("SearchData: ", data.slice(0,3), "etc....");
                        $.get("/mtgdeckbuilder/cards/view.jade", function(template) {
                            data = (cmc) ? cards.filterByCmc(data, cmc) : data;
                            var html = jade.render(template, {
                                data: data
                            })
                            $("#list").html(html)
                        }
                    )
                }
            }
        });
    },

    filterByCmc: function(cards, cost) {
        return _.filter(cards, function(card) {
            return card.cmc == cost;
        });
    },

    load: function() {
        $.get("/mtgdeckbuilder/cards/ui.jade", function(template) {
            var html = jade.render(template);
            $("#searchdiv").html(html);
        })
        
        // list cards
        cards.randomCard();
    }
}
