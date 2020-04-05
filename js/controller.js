import {socket} from './client.js';

socket.on('message', function(msg){
    console.log('message: ' + msg);
});

function messageSend () {
    $('form').submit(function(e){
      e.preventDefault(); 
      socket.emit('message', getMessage.val());
      getMessage.val('');
      return false;
    });
  };