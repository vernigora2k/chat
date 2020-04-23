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
    constructor(msg, inputOrOutput) {
        this.msg = msg
        this.date = new Date()
        this.sender = this.msg.user
        this.inputOrOutput = inputOrOutput
    }
    createAndAddMessageInChat() {
        let newMessage = document.createElement('div')

        if (this.inputOrOutput == 'output') {
            newMessage.classList.add('outputMessage')
        } else {
            newMessage.classList.add('inputMessage')
        }
        if (this.msg.message.length > 15) {
            this.msg.message = '<br>' + this.msg.message //добавить перенос строки если сообщение длинное
        }
    
        newMessage.innerHTML = '<p class="message__text">'+
            this.msg.user + ':  ' +
            this.msg.message + '</p>' +
            '<p class="dateOnMessage">' + 
            this.date.toTimeString().slice(0,5) +
            '</p>';
        chat.append(newMessage);
        getMessage.value = '';
    }
}

