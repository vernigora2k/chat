import {sendBtn, chat, chatnameInput, messageInput, chatnameUpdateBtn, logoutBtn, popupAutorization, settingsBtn, popupSettings, createAccountBtn, createAccountLoginInput, createAccountPasswordInput, toPopupAutorizationBtn, popupCreateAccount, toPopupCreateAccountBtn, autorizationBtn, autorizationLoginInput, autorizationPasswordInput, settingsCloseCrossBtn} from './UiElements.js';
import {sendMessage, changeChatName, autorization, checkAutorizationToken, getMessageId} from './controller.js';
import {isMessageValid} from './validation.js';
import {createAccount} from './apiClient.js';

sendBtn.addEventListener('click', () => {
            const msg = {
            user: chatnameInput.value,
            message: messageInput.value,
            messageId: getMessageId(),
        }
        if (isMessageValid(msg)) {
            sendMessage(msg);
            let outputMessageFromServer = new Message(msg, 'output');
            outputMessageFromServer.createAndAddMessageInChat();
        }
;})

settingsBtn.addEventListener('click', () => {
    popupSettings.classList.remove('hidden')
})

chatnameUpdateBtn.addEventListener('click', () => {
    changeChatName(chatnameInput.value)
        .then(localStorage.setItem('chatname', chatnameInput.value)) 
        .catch(alert)  
})

logoutBtn.addEventListener('click', () => {
    Cookies.remove('cookieUserToken')
    localStorage.removeItem('chatname')
    popupAutorization.classList.remove('hidden')
    document.location.reload(true)
})

createAccountBtn.addEventListener('click', () => {
//TODO: сделать валидацию логина и пароля
    createAccount(createAccountLoginInput.value,
                  createAccountPasswordInput.value)
        .then(data => {
            if (data) {
                console.log(`Ваш аккаунт ${data.user.username} зарегистрирован! Ваш ID: ${data.user._id}`)
            }
        })
        .catch(alert)
})

autorizationBtn.addEventListener('click', () => {
    autorization(autorizationLoginInput.value,
                 autorizationPasswordInput.value)  
                 .then(data => {
                    Cookies.set('cookieUserToken', data.token, { expires: 7, path: '/'})
                    localStorage.setItem('username', data.username)
                    localStorage.setItem('chatname', data.chatname)
                    chatnameInput.value = data.chatname
                    checkAutorizationToken()
                    })
    
} )

toPopupAutorizationBtn.addEventListener('click', () => {
    popupCreateAccount.classList.add('hidden')
    popupAutorization.classList.remove('hidden')
})

toPopupCreateAccountBtn.addEventListener('click', () => {
    popupAutorization.classList.add('hidden')
    popupCreateAccount.classList.remove('hidden')
})

settingsCloseCrossBtn.addEventListener('click', () => {
    popupSettings.classList.add('hidden')
})

export class Message {
    constructor(msg, inputOrOutput) {
        this.msg = msg
        this.date = new Date()
        this.sender = this.msg.user
        this.inputOrOutput = inputOrOutput
        this.messageId = this.msg.messageId
    }
    createAndAddMessageInChat() {
        let newMessage = document.createElement('div')

        if (this.inputOrOutput == 'output') {
            newMessage.classList.add('message-output')
            newMessage.classList.add('sended')
            newMessage.setAttribute('id', this.messageId)
        } else {
            newMessage.classList.add('message-input')
            this.sender = this.msg.chatname
        }
        if (this.msg.message.length > 15) {
            this.msg.message = '<br>' + this.msg.message //добавить перенос строки если сообщение длинное
        }
    
        newMessage.innerHTML = '<p class="message__text">'+
            this.sender + ':  ' +
            this.msg.message + '</p>' +
            '<p class="date-on-message">' + 
            this.date.toTimeString().slice(0,5) +
            '</p>';
        chat.append(newMessage);
        messageInput.value = '';
    }
}

