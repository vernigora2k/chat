import {sendBtn, chat, chatnameInput, messageInput, chatnameUpdateBtn, logoutBtn, popupAutorization, settingsBtn, popupSettings} from './UiElements.js';
import {sendMessage, changeChatName} from './controller.js';
import {isMessageValid} from './validation.js';

sendBtn.addEventListener('click', () => {
            const msg = {
            user: chatnameInput.value,
            message: messageInput.value
        }
        if (isMessageValid(msg)) {
            sendMessage(msg);
            let outputMessage = new Message(msg, 'output');
            outputMessage.createAndAddMessageInChat();
        }
;})

settingsBtn.addEventListener('click', () => {
    popupSettings.classList.remove('hidden')
})

chatnameUpdateBtn.addEventListener('click', () => {
    changeChatName(chatnameInput.value)
})

logoutBtn.addEventListener('click', () => {
    Cookies.set('cookieUserToken', 'SomeToken', { expires: -1 })
    popupAutorization.classList.remove('hidden')
    document.location.reload(true)
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
        messageInput.value = '';
    }
}

