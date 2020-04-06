import {socket} from './client.js';
import {sendForm} from './UiElements.js';

socket.on('message', function(msg){
    console.log('message: ' + msg);
});

function messageSend () {
    sendForm.submit(function(e){
      e.preventDefault(); 
      socket.emit('message', getMessage.val());
      getMessage.val('');
      return false;
    });
  };