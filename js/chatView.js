import {buttonSend, chat, getNameOfSender, getMessage} from './UiElements.js';

{
buttonSend.addEventListener('click', function () {
        createNewMessage(true)})
}
    
function createNewMessage (isInput) {
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
                            getNameOfSender.value + ':  ' +
                            getMessage.value + '</p>' +
                            '<p class="dateOnMessage">' + 
                            date.toTimeString().slice(0,5) +
                            '</p>';
    chat.append(newMessage);
    getMessage.value = '';
}
    