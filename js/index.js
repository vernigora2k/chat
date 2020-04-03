import {} from './controller.js';
import {} from './chatView.js';
import {socket} from './client.js';
import { getMessage } from './UiElements.js';
 
$(function () {
    var socket = io();
    $('form').submit(function(e){
      e.preventDefault(); 
      socket.emit('chat message', getMessage.val());
      getMessage.val('');
      return false;
    });
  });
 