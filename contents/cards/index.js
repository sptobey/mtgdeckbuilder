var cards = {

    listCards: function() {
        $.ajax({
            type: "GET",
            url: "https://api.deckbrew.com/mtg/cards?color=red&color=blue&rarity=rare&name=fire",
            success: function(data) {
                if (data){
                    console.log("ExampleData: ", data);
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
        cards.listCards();
    }
}
