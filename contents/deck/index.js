var deck = {

    getCards: function() {
        $.ajax({
            url: "https://api.mtgdb.info/cards/random",
            success: function(data) {
                console.log("Data:", data);
                if (data){
                        $.get("/mtgdeckbuilder/deck/list.jade", function(template) {
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
        $.get("/mtgdeckbuilder/deck/ui.jade", function(template) {
            var html = jade.render(template);
            $("#searchdiv").html(html);
        })
        
        // list all cards
        deck.getCards();
    }
}
