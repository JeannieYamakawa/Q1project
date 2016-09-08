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
                window.location.href = 'file:///Users/admin/galvanize/Q1project/page2.html?type=' + $cuisineType;
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


                    var message = $.ajax( {
                        url: 'https://crossorigin.me/https://yelp.com/search?find_desc=food%20truck&find_loc=' +
                            zipCodeToCheck + '&start=0&cflt=' + $cuisineType,
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
                        } );
                        domParsed.each( function( i ) {
                            var bizAddress = $( this ).find( '.secondary-attributes address' )[ 0 ].innerText; //returns 10 business addresses from the same yelp page
                            bizAddress = bizAddress.replace( /↵/g, "" )
                            bizAddress = bizAddress.trim() //remove special characters and whitespace
                            arrayOfBizInfo[ i ].address = bizAddress
                            var photoLocation = $( this ).find( '.pb-90s img' ).attr( "src" )
                            var bizYelpPageHref = $( this ).find( '.indexed-biz-name a' )[ 0 ].pathname //returns the page link
                            var yelpAddress = "https://www.yelp.com" + bizYelpPageHref
                            var truckName = "(dummy name)Truck " + ( i + 1 )
                            var hrefMinusBiz = bizYelpPageHref.substr( 5 );
                            console.log( hrefMinusBiz )
                            var yelpMapAddress = "https://www.yelp.com/map/" + hrefMinusBiz
                            arrayOfBizInfo[ i ].mapAddress = yelpMapAddress;
                            arrayOfBizInfo[ i ].yelpSite = yelpAddress;
                            arrayOfBizInfo[ i ].trucksName = truckName;
                            arrayOfBizInfo[ i ].className = "table-row" + ( i + 1 )

                        } );
                        console.log( arrayOfBizInfo );

                        window.localStorage.setItem( 'fakeJSON', JSON.stringify( arrayOfBizInfo ) );


                        window.location.href = 'file:///Users/admin/galvanize/Q1project/page3.html'




                    } ).fail( function() {
                        console.log( "Search didn't work." )
                    } )



                } else {
                    alert( "Please enter a valid zip code!" )
                }


            } ) //ends search button click function
        JSON.parse( localStorage.fakeJSON )
        var myArrayofInfo = []
        for ( var i = 0; i < ( JSON.parse( localStorage.fakeJSON ).length ); i++ ) {
            myArrayofInfo.push( ( JSON.parse( localStorage.fakeJSON ) )[ i ] )
        } //ends for loop

        var $pg3background = $( '#background-image2' )
        console.log( myArrayofInfo )
        for ( var j = 0; j < 5; j++ ) {
            var $newA = $( "<a>" )
            $newA.attr( "href", myArrayofInfo[ j ].yelpSite )
            var $newDiv = $( '<div >' )
            $newA.append( $newDiv )
            $newDiv.attr( "style", "cursor: pointer;" )
            $newDiv.text( myArrayofInfo[ j ].name )
            var $newDivsClass = 'table-row' + ( j + 1 )
            var $newDivsPrevious = 'table-row' + ( j + 2 )
            $newDiv.attr( 'class', $newDivsClass )

            $pg3background.after( $newA )
        }

        console.log( myArrayofInfo )
        for ( var k = 0; k < 5; k++ ) {
            var $newA = $( "<a>" )
            $newA.attr( "href", myArrayofInfo[ k ].mapAddress )
            console.log( myArrayofInfo[ k ].mapAddress )
            $newA.attr( "style", "cursor: pointer;" )
            var $newDivsClass2 = 'setToInline' + ( k + 1 )
            $newA.attr( 'class', $newDivsClass2 )
            $newA.text( "map & directions" )

            $pg3background.after( $newA )
        }



    } ) //ends document






//elements on dom exist already with different CSS IDs.
//need to remove them but just add and append them and add the selector to them
//
//create the div as a jquery elements var $newDiv = $("<div>")
//var $pg3body = $(".pg3body")
//append to $pg3body.append($newDiv)
//$newDiv.attr("href", "'https://www.yelp.com/map/' + bizYelpPageHref")
//var $newDivsClass = "table-row"+i
//$newDiv.attr("class", "$newDivsClass")

//'https://www.yelp.com/map/'' + bizYelpPageHref(****MINUS THE /biz)
// <div class="table-row1">truck1
// <a class="setToInline1" href="http://www.google.com">visit truck's website</a>



//
// var $newDiv = $( "<div href = " + yelpAddress + ">" )
//
// $newDiv.html( "(dummy name)Truck " + ( i + 1 ) )
// var $newDivsClass = "table-row" + ( i + 1 )
// $newDiv.addClass( $newDivsClass )
// $pg3body.append( $newDiv )
// console.log( $newDiv )


// // yelp main page is 'https://crossorigin.me/https://yelp.com' + bizYelpPageHref,
// //https://www.yelp.com/map/ + bizYelpPageHref(****MINUS THE /biz)
