import {buttonSend, chat, getNameOfSender, getMessage, updateSettingsBtn, chatNameInput} from './UiElements.js';
import {sendMessage, changeChatName} from './controller.js';
import {isValid} from './validation.js';

buttonSend.addEventListener('click', () => {
            const msg = {
            user: getNameOfSender.value,
            message: getMessage.value
        }
        if (isValid(msg)) {
            sendMessage(msg);
            let outputMessage = new Message(msg, 'output');
            outputMessage.createAndAddMessageInChat();
            //createNewMessage(msg, false)
        }
;})

updateSettingsBtn.addEventListener('click', () => {
    let newChatName = chatNameInput.value
    changeChatName(newChatName)
})


export class Message {
    constructor(value, isInputOrOutput) {
        this.value = value
        this.date = new Date()
        this.sender = this.value.user
        this.inputOrOutput = isInputOrOutput
    }
    createAndAddMessageInChat() {
        let newMessage = document.querySelector('div')

        if (this.inputOrOutput == 'output') {
            newMessage.classList.add('outputMessage')
        } else {
            newMessage.classList.add('inputMessage')
        }
        if (this.value.message.length > 15) {
            this.value.message = '<br>' + getMessage.value //добавить перенос строки если сообщение длинное
        }
        
        newMessage.innerHTML = '<p class="message__text">'+
            this.value.user + ':  ' +
            this.value.message + '</p>' +
            '<p class="dateOnMessage">' + 
            this.date.toTimeString().slice(0,5) +
            '</p>';
        chat.append(newMessage);
        getMessage.value = '';

    }
}


// buttonSend.addEventListener('click', () => {
//     const msg = {
//     user: getNameOfSender.value,
//     message: getMessage.value
// }
// if (isValid(msg)) {
//     sendMessage(msg);
//     createNewMessage(msg, false)
// }
// ;})

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