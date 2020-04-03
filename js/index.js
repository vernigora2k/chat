import {} from './controller.js';
import {} from './chatView.js';
import {socket} from './client.js';
 
$(function () {
    var socket = io();
    $('form').submit(function(e){
      e.preventDefault(); 
      socket.emit('chat message', $('.messageInput').val());
      $('.messageInput').val('');
      return false;
    });
  });
 