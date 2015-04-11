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
    
    searchByName: function(name) {
        $.ajax({
            type:"GET",
            //"http://api.mtgdb.info/search/" + name
            url: "https://api.deckbrew.com/mtg/cards?name=" + name,
            success: function(data) {
                if (data){
                    console.log("SearchData: ", data);
                        $.get("/mtgdeckbuilder/cards/view.jade", function(template) {
                        var html = jade.render(template, {
                            data: data
                        })
                        $("#list").html(html)
                    })
                }
            }
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
