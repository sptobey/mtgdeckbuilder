var deck = {

    listGames: function(terms) {
        var limit = 25;
        var termsPlus = terms.replace(/[^a-zA-Z0-9'?!]+/g, '+')
        //console.log(termsPlus);
        $.ajax({
            url: "https://videogamesrating.p.mashape.com/get.php?count=" + limit + "&game=" + termsPlus,
            headers: { 
                "Accept": "application/json"
            },
            success: function(data) {
                if (data){
                    //console.log(data);
                        $.get("/mtgdeckbuilder/games/list.jade", function(template) {
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
        $.get("/mtgdeckbuilder/games/ui.jade", function(template) {
            var html = jade.render(template);
            $("#searchdiv").html(html);
        })
        
        // list all cards
        games.listGames("Ratchet and Clank");
    }
}
