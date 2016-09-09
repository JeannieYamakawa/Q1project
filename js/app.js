$( function() {
        var $body = $( ".pg1body" );
        var $userInput = $( "#food-table" );
        var $form = $( "#theForm" );
        var $cuisineType;
        var $userZipCode = $( "#inputText" );
        console.log( $userZipCode )
        var $userInput;

        var $within1Mile, $within2Miles, $within5Miles, $within10Miles;
        var $checkedZipCode;
        var $arrayOfCuisine;
        var $button = $( '.button' )
        console.log( $button )
        var $truck = $( '.truck' )
        var $pg3body = $( ".pg3body" )


        function isValidZip( sZip ) {
            return /^\d{5}(-\d{4})?$/.test( sZip );
        }
        var arrayOfBizInfo = []

        $( $body ).click( function( event ) {

            if ( event.target.title == "header" ) {
                alert( "Please choose a cuisine!" )
            } else {
                event.preventDefault()
                $cuisineType = event.target.title
                $cuisineType = $cuisineType.toUpperCase();
                console.log( $cuisineType ) //
                window.location.href = '/Q1project/page2.html?type=' + $cuisineType;
                return false;
            }
        } );



        $userZipCode.click( function( event ) {
            event.preventDefault()
        } )


        $button.click( function( event ) {
                $cuisineType = window.location.search.split( "=" )[ 1 ];
                event.preventDefault()
                var zipCodeToCheck = $userZipCode.val()

                console.log( $cuisineType );

                var checkedZip = isValidZip( zipCodeToCheck )
                if ( checkedZip == true ) {
                    console.log( checkedZip )
                    var milesChosen = $( 'input[name="radioCircle"]:checked' ).val();
                    console.log( milesChosen )



                    $.ajax( {
                        url: "https://maps.googleapis.com/maps/api/geocode/xml?address=" + zipCodeToCheck + "&sensor=false"
                    } ).done( function( data ) {

                        lat = $( data ).find( "location" ).find( "lat" ).first().text();
                        long = $( data ).find( "location" ).find( "lng" ).first().text();

                        var milesChosen = $( 'input[name="radioCircle"]:checked' ).val();
                        console.log( milesChosen )

                        var message = $.ajax( {
                            //https://www.yelp.com/search?find_desc=food+truck&find_loc=78752&start=0&cflt=mexican&l=g:-97.8105926514,30.2448319153,-97.60597229,30.4226245871
                            url: 'https://crossorigin.me/https://yelp.com/search?find_desc=food%20truck&find_loc=' +
                                zipCodeToCheck + '&start=0&cflt=' + $cuisineType + radius[ milesChosen ]( lat, long ),
                            //+ '&l=g:-97.8105926514,30.2448319153,-97.60597229,30.4226245871'
                            type: 'GET',
                            dataType: "html"
                        } );

                        message.done( function( data ) {
                            var parsed = $.parseHTML( data )
                            var domParsed = $( parsed ).find( "li.regular-search-result" ) //returns an array of dom nodes
                            domParsed.each( function( i ) {
                                var bizName = $( this ).find( '.biz-name span' )[ 0 ].textContent;
                                // var bizYelpPage = $( this ).find( '.biz-name span' ).href;
                                // console.log( bizYelpPage ) //returns as separate strings 10 business names from the first yelp search page
                                var myObject = {}
                                myObject.name = bizName
                                arrayOfBizInfo[ i ] = myObject
                                console.log( myObject )
                            } );
                            domParsed.each( function( i ) {
                                var bizAddress = $( this ).find( '.secondary-attributes address' )[ 0 ]; //returns 10 business addresses from the same yelp page
                                console.log( bizAddress );
                                if ( bizAddress == undefined ) {
                                    alert( "No truck be found in your area for your chosen cuisine type. Please choose another type." )
                                    window.location.href = '/Q1project/index.html'
                                    return false

                                } else {
                                    bizAddress = $( this ).find( '.secondary-attributes address' )[ 0 ].innerText
                                    bizAddress = bizAddress.replace( /↵/g, "" );
                                    bizAddress = bizAddress.trim(); //remove special characters and whitespace
                                    arrayOfBizInfo[ i ].address = bizAddress;
                                    var photoLocation = $( this ).find( '.pb-90s img' ).attr( "src" )
                                    var bizYelpPageHref = $( this ).find( '.indexed-biz-name a' )[ 0 ].pathname //returns the page link
                                    var yelpAddress = "https://www.yelp.com" + bizYelpPageHref;
                                    var truckName = "(dummy name)Truck " + ( i + 1 );
                                    var hrefMinusBiz = bizYelpPageHref.substr( 5 );
                                    console.log( hrefMinusBiz );
                                    var yelpMapAddress = "https://www.yelp.com/map/" + hrefMinusBiz;
                                    arrayOfBizInfo[ i ].mapAddress = yelpMapAddress;
                                    arrayOfBizInfo[ i ].yelpSite = yelpAddress;
                                    arrayOfBizInfo[ i ].trucksName = truckName;
                                    arrayOfBizInfo[ i ].className = "table-row" + ( i + 1 );
                                    arrayOfBizInfo[ i ].imgLocation = photoLocation;
                                    window.location.href = '/Q1project/page3.html'
                                }
                            } );

                            //window.localStorage.setItem( 'fakeJSON', JSON.stringify( arrayOfBizInfo ) );


                            var $picture = $( "#truck" );

                            function moveRight() {
                                $picture.animate( {
                                    left: "+=80%"
                                }, 2100, "linear", changePage2 )
                            }
                            moveRight();
                            window.localStorage.setItem( 'fakeJSON', JSON.stringify( arrayOfBizInfo ) );


                        } ).fail( function() {
                            console.log( "Search didn't work." );
                        } )


                    } )

                } else {
                    alert( "Please enter a valid zip code!" );
                }


            } ) //ends search button click function
        JSON.parse( localStorage.fakeJSON )
        var myArrayofInfo = []
        for ( var i = 0; i < ( JSON.parse( localStorage.fakeJSON ).length ); i++ ) {
            myArrayofInfo.push( ( JSON.parse( localStorage.fakeJSON ) )[ i ] );
        }

        var $pg3background = $( '#background-image2' );
        console.log( myArrayofInfo );
        for ( var j = 0; j < 5; j++ ) {
            var $newA = $( "<a>" );
            $newA.attr( "href", myArrayofInfo[ j ].yelpSite );
            $newA.attr( "target", "_blank" );
            var $newDiv = $( '<div >' );
            $newA.append( $newDiv );
            $newDiv.attr( "style", "cursor: pointer;" );
            $newDiv.text( myArrayofInfo[ j ].name );
            var $newDivsClass = 'table-row' + ( j + 1 );
            var $newDivsPrevious = 'table-row' + ( j + 2 );
            $newDiv.attr( 'class', $newDivsClass );

            $pg3background.after( $newA );
        }

        console.log( myArrayofInfo )
        for ( var k = 0; k < 5; k++ ) {
            var $newA = $( "<a>" );
            $newA.attr( "href", myArrayofInfo[ k ].mapAddress );
            console.log( myArrayofInfo[ k ].mapAddress );
            $newA.attr( "style", "cursor: pointer;" );
            $newA.attr( "target", "_blank" );
            var $newDivsClass2 = 'setToInline' + ( k + 1 );
            $newA.attr( 'class', $newDivsClass2 );
            $newA.text( "map & directions" );

            $pg3background.after( $newA );
        }

        console.log( myArrayofInfo )
        for ( var m = 0; m < 5; m++ ) {

            var $newImg = $( "<img>" );
            var imageAddress = "https:" + myArrayofInfo[ m ].imgLocation;
            $newImg.attr( "src", imageAddress );
            $newImg.attr( "style", "cursor: pointer;" );
            var $newDivsClass2 = 'photo' + ( m + 1 );
            $newImg.attr( 'class', $newDivsClass2 );
            var clickImage = "window.open(" + "'" + myArrayofInfo[ m ].yelpSite + "','_blank');"
            $newImg.attr( 'onclick', clickImage );
            $pg3background.after( $newImg );
        }


    } ) //ends auto-invoked function


var radius = {
    1: function( lt, lng ) {
        var sw_latitude, sw_longitude, ne_latitude, ne_longitude;
        sw_latitude = ( lt - 0.00907207 );
        sw_longitude = ( lng - 0.0159132433 );
        ne_latitude = ( lt - ( -0.0131520187 ) );
        ne_longitude = ( lng - ( -0.0096643019 ) );
    },

    2: function( lt, lng ) {
        var sw_latitude, sw_longitude, ne_latitude, ne_longitude;
        sw_latitude = ( lt - 0.0201860072 );
        sw_longitude = ( lng - 0.0287020159 );
        ne_latitude = ( lt - ( -0.02426217 ) );
        ne_longitude = ( lng - ( -0.02245307 ) );
    },

    5: function( lt, lng ) {
        var sw_latitude, sw_longitude, ne_latitude, ne_longitude;
        sw_latitude = ( lt - 0.0424176607 );
        sw_longitude = ( lng - 0.05427956 );
        ne_latitude = ( lt - ( -0.0464786928 ) );
        ne_longitude = ( lng - ( -0.0480306196 ) );
    },

    10: function( lt, lng ) {
        var sw_latitude, sw_longitude, ne_latitude, ne_longitude;
        sw_latitude = ( lt - 0.08689608 );
        sw_longitude = ( lng - 0.10543465 );
        ne_latitude = ( lt - ( -0.09089659 ) );
        ne_longitude = ( lng - ( -0.09918571 ) );

        console.log( 'THIS WORKS', lt, ",", lng, ",", sw_latitude, ',', sw_longitude, ',', ne_latitude, ',', ne_longitude );

        var coords = [ sw_longitude, sw_latitude, ne_longitude, ne_latitude ].join( ',' );
        console.log( '&l=g:' + coords );
        console.log( '&l=g:-97.8105926514,30.2448319153,-97.60597229,30.4226245871' );
        return '&l=g:' + coords;
    }
}

function changePage2() {
    window.location.href = '/Q1project/page3.html'
}

//images on page 3 need to be linked to yelp's main page for the business
//calculate for 1, 2, and 5 miles the regular zip minus ____
// __
// _
