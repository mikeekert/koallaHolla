console.log( 'js' );
$( document ).ready( function(){
  getKoalas();
  $('#viewKoalas').on('click', '.addButton', transferKoala);
  $( '#viewKoalas' ).on('click', '.delButton', deleteKoala);
  
  $( '#addButton' ).on( 'click', function(){
    var objectToSend = {
    name: $('#nameIn').val(),
    age: $('#ageIn').val(),
    gender: $('#genderIn').val(),
    readyForTransfer: $('#readyForTransferIn').val(),
    notes: $('#notesIn').val(),
  };
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
        var $buttonDel = ( $( ('<th>'), {class: 'delete'} ) );   
        $buttonDel.append($( ('<button>'), {class: 'delButton', text: 'Delete'} ) );  
        $display.append($buttonDel);        
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
      console.log(data);
    } // end success
  }); //end ajax
  getKoalas();        
}

function transferKoala() {
  var sendingKoala = {
    id: ( $(this).parent().parent().data('id') ).toString()
  };
  console.log( 'sending via post:', sendingKoala );
  $.ajax ({
    url: '/update',
    type: 'POST',
    data: sendingKoala,
    success: getKoalas()
  });
}

function deleteKoala() {
  console.log('click!');
  var thisID = $(this).parent().parent().data('id');
  console.log(thisID);
  $.ajax ({
    method: 'DELETE',
    url: '/koalaList/'+thisID,
    success: function(resp) {
      console.log(resp);
      getKoalas();
    }
  });
}
