$( function() {
    var $body = $( ".pg1body" );
    var $userInput = $( "#food-table" );
    var $form = $( "#theForm" );
    var $cuisineType;
    var $userZipCode = $( "#inputText" );
    console.log( $userZipCode )
    var $userInput;
    var $within1Mile;
    var $within2Miles;
    var $within5Miles;
    var $within10Miles;
    var $checkedZipCode;
    var $arrayOfCuisine;
    var $button = $( '.button' )
    console.log( $button )
    var $truck = $( '.truck' )



    $( $body ).click( function( event ) {
        event.preventDefault()
        var cuisineType = event.target.title
        cuisineType = cuisineType.toUpperCase();
        console.log( cuisineType ) //
        window.location.href = 'file:///Users/admin/galvanize/Q1project/page2.html';
        return false;
    } );

    $userZipCode.click( function( event ) {
        event.preventDefault()
    } )
    $button.click( function( event ) {
        event.preventDefault()
        var zipCodeToCheck = $userZipCode.val()







    } );









} )
