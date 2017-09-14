console.log( 'js' );
$( document ).ready( function(){
  console.log( 'JQ' );
  // load existing koalas on page load
  getKoalas();

  // add koala button click
  $('#viewKoalas').on('click', '.addButton', transferKoala);
    // console.log($(this));
    // $(this).hide().parent().text('Transfered');

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
        var $display = ($('<tr>').data('id', data[i].id));
        $display.append($( ('<th>'), {text: data[i].name, class: 'data'} ) );
        $display.append($( ('<th>'), {text: data[i].age, class: 'data'} ) );
        $display.append($( ('<th>'), {text: data[i].gender, class: 'data'} ) );
        if ( data[i].ready_for_transfer )  {
          var $button = ( $( ('<th>'), {class: 'data'} ) );   
          $button.append($( ('<button>'), {class: 'addButton', text: 'Ready to Transfer'} ) );  
          $display.append($button);
          
        } else {
          $display.append($( ('<th></th>'), {text: 'Transfered', class: 'data'} ) );   
          
        }
        $display.append($( ('<th>'), {text: data[i].notes, class: 'data'} ) );
        $('#viewKoalas').append($display);
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

function transferKoala() {
  console.log( $(this).parent().parent().data('id') );
  var sendingKoala = Number( $(this).parent().parent().data('id') );
  $.ajax ({
    url: '/update',
    method: 'POST',
    data: $(this).parent().parent().data('id'),
    success: getKoalas()
  });
}
