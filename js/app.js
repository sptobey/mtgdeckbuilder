$( "#cards" ).on( "click", function( event ) {
    $("#list").empty()
    cards.load()
})

$( "#deck" ).on( "click", function( event ) {
    $("#list").empty()
    deck.load()
})

$( "#instructions" ).on( "click", function( event ) {
    $("#list").empty()
    instructions.load()
})