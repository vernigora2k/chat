import {buttonSend, chat, getNameOfSender, getMessage} from './UiElements.js';
import {sendMessage} from './controller.js';
import {isValid} from './validation.js';

buttonSend.addEventListener('click', () => {
            const msg = {
            user: getNameOfSender.value,
            message: getMessage.value
        }
        if (isValid(msg)) {
            sendMessage(msg);
            createNewMessage(msg, false)
        }
;})

class NewMessage {
      constructor (msg, isInput) {
        let newMessage = document.createElement('div');
        let date = new Date();
        
        if (isInput) { 
            newMessage.classList.add('inputMessage'); 
        } else {
            newMessage.classList.add('outputMessage');
        }
        if (getMessage.value.length > 15) {
            getMessage.value = '<br>' + getMessage.value} //добавить перенос строки если сообщение длинное
            
        newMessage.innerHTML = '<p class="message__text">'+
            msg.user + ':  ' +
            msg.message + '</p>' +
            '<p class="dateOnMessage">' + 
            date.toTimeString().slice(0,5) +
            '</p>';
        chat.append(newMessage);
        getMessage.value = '';
    }
}

// export function createNewMessage (msg, isInput) {
//     let newMessage = document.createElement('div');
//     let date = new Date();
    
//     if (isInput) { 
//         newMessage.classList.add('inputMessage'); 
//     } else {
//         newMessage.classList.add('outputMessage');
//     }
//     if (getMessage.value.length > 15) {
//         getMessage.value = '<br>' + getMessage.value} //добавить перенос строки если сообщение длинное
        
//     newMessage.innerHTML = '<p class="message__text">'+
//         msg.user + ':  ' +
//         msg.message + '</p>' +
//         '<p class="dateOnMessage">' + 
//         date.toTimeString().slice(0,5) +
//         '</p>';
//     chat.append(newMessage);
//     getMessage.value = '';
// }