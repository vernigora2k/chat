
// function messageSend () {

// }

socket.on('message', function(msg){
    console.log('message: ' + msg);
});

$(function () {
    var socket = io();
    $('form').submit(function(e){
      e.preventDefault(); 
      socket.emit('message', getMessage.val());
      getMessage.val('');
      return false;
    });
  });