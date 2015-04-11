var games = {

    listGames: function(terms) {
        var limit = 25;
        var termsPlus = terms.replace(/[^a-zA-Z0-9'?!]+/g, '+')
        //console.log(termsPlus);
        $.ajax({
            url: "https://videogamesrating.p.mashape.com/get.php?count=" + limit + "&game=" + termsPlus,
            headers: { 
                "X-Mashape-Key": apikey["X-Mashape-Key"],
                "Accept": "application/json"
            },
            success: function(data) {
                if (data){
                    //console.log(data);
                        $.get("/week7-challenge/games/list.jade", function(template) {
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
        $.get("/week7-challenge/games/ui.jade", function(template) {
            var html = jade.render(template);
            $("#searchdiv").html(html);
        })
        
        // list all cards
        games.listGames("Ratchet and Clank");
    }
}
