// var firstAjax = $.ajax( {
//     url: "http://maps.googleapis.com/maps/api/geocode/xml?address=" + zipCodeToCheck + "&sensor=false",
//     success: function( data ) {
//
//         lat = ( $( data ).find( "location" ).find( "lat" ).first().text() )
//         long = ( $( data ).find( "location" ).find( "lng" ).first().text() )
//
//
//
//
//
//
//         var milesChosen = $( 'input[name="radioCircle"]:checked' ).val();
//         console.log( milesChosen )
//
//         var sw_latitude, sw_longitude, ne_latitude, ne_longitude;
//         sw_latitude = ( lat - 0.08689608 );
//         sw_longitude = ( long - 0.10543465 );
//         ne_latitude = ( lat - ( -0.09089659 ) );
//         ne_longitude = ( long - ( -0.09918571 ) );
//         console.log( lat, long )
//
//
//
//
//
//         console.log( lat, ",", long, ",", sw_latitude, ',', sw_longitude, ',', ne_latitude, ',', ne_longitude )
//
//
//
//
//
//
//     }
// } )

// domParsed.each( function( i ) {
//     var bizYelpPageHref = $( this ).find( '.indexed-biz-name a' )[ 0 ].pathname //returns 10 business addresses from the same yelp page
//         // /biz/taqueria-gardenia-austin
//     console.log( bizYelpPageHref )
//
//     var mapString = 'https://crossorigin.me/https://yelp.com' + bizYelpPageHref
//
//
//
//     console.log( mapString )
// } )
