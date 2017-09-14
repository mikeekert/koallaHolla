console.log( 'js' );

$( document ).ready( function(){
  console.log( 'JQ' );
  // load existing koalas on page load
  getKoalas();

  // add koala button click
  $( '#addButton' ).on( 'click', function(){
    // get user input and put in an object
    // NOT WORKING YET :(
    // using a test object
    var objectToSend = {
      name: $('#nameIn').val(),
      age: $('#ageIn').val(),
      gender: $('#genderIn').val(),
      readyForTransfer: $('#readyForTransferIn').val(),
      notes: $('#notesIn').val(),
    };
    // call saveKoala with the new obejct
    saveKoala( objectToSend );
    $('input:text').val('');
  }); //end addButton on click
}); // end doc ready

function getKoalas() {
  $('#viewKoalas').empty();
  
  // ajax call to server to get koalas
  $.ajax({
    url: '/koalaList',
    type: 'GET',
    success: function( data ){
      console.log('received data', data);
      for (var i = 0; i < data.length; i++) {
        $('#viewKoalas').append('<tr><th>'+ data[i].name + '</th>' +  '<th>'+ data[i].age + '</th>' + '<th>'+ data[i].gender + '</th>' + '<th>'+ data[i].ready_for_transfer + '</th>' + '<th>'+ data[i].notes + '</th>' + '</tr>');
      }
    } // end success
  }); //end ajax`
  // display on DOM with buttons that allow edit of each
} // end getKoalas

function saveKoala( newKoala ){
  // ajax call to server to get koalas
  $.ajax({
    url: '/koalaList',
    type: 'POST',
    data: newKoala,
    success: function( data ){
    } // end success
  }); //end ajax
  getKoalas();        
}