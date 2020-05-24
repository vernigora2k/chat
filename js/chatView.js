import {sendBtn, chat, chatnameInput, messageInput, chatnameUpdateBtn, logoutBtn, popupAutorization, settingsBtn, popupSettings, createAccountBtn, createAccountLoginInput, createAccountPasswordInput, toPopupAutorizationBtn, popupCreateAccount, toPopupCreateAccountBtn, autorizationBtn, autorizationLoginInput, autorizationPasswordInput, settingsCloseCrossBtn} from './UiElements.js';
import {sendMessage, changeChatName, autorization, checkAutorizationToken, getMessageId, getMessages} from './controller.js';
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
            chat.scrollTop = chat.scrollHeight;
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
    Cookies.remove('at')
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
                    Cookies.set('at', data.token, { expires: 7, path: '/'})
                    localStorage.setItem('username', data.username)
                    localStorage.setItem('chatname', data.chatname)
                    chatnameInput.value = data.chatname
                    checkAutorizationToken()
                    document.location.reload(true)
                    })
} )

if (Cookies.get('at')){
    getMessages()
        .then(data => {
            data.messages.forEach(element => {
                const msg = {
                    user: element.username,
                    message: element.message,
                    messageId: element._id
                }
                let recentMessageFromServer
                if (localStorage.getItem('username') == msg.user) {
                    recentMessageFromServer = new Message(msg, 'output');
                } else {
                    recentMessageFromServer = new Message(msg, 'input');
                }
                recentMessageFromServer.createAndAddMessageInChat('prepend');
                chat.scrollTop = chat.scrollHeight;
            });
        })
        .catch(alert)
}

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

chat.numbersOfMessages = 0;
chat.addEventListener('scroll', () => {
    if (!chat.scrollTop) {
        chat.numbersOfMessages += 10;
        getMessages(chat.numbersOfMessages)
        .then(data => {
            data.messages.forEach(element => {
                const msg = {
                    user: element.chatname,
                    message: element.message,
                    messageId: element._id
                }
                let recentMessageFromServer
                if (localStorage.getItem('username') == msg.user) {
                    recentMessageFromServer = new Message(msg, 'output');
                } else {
                    recentMessageFromServer = new Message(msg, 'input');
                }
                recentMessageFromServer.createAndAddMessageInChat('prepend');
            });
        })
        .catch(alert)
    }
})

export class Message {
    constructor(msg, inputOrOutput) {
        this.msg = msg
        this.date = new Date()
        this.sender = this.msg.user
        this.inputOrOutput = inputOrOutput
        this.messageId = this.msg.messageId
    }
    createAndAddMessageInChat(addMethod='append') {
        let newMessage = document.createElement('div')

        if (this.inputOrOutput == 'output') {
            newMessage.classList.add('message-output')
            newMessage.classList.add('sended')
            newMessage.setAttribute('id', this.messageId)
        } else {
            newMessage.classList.add('message-input')
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
        if(addMethod == 'append'){
            chat.append(newMessage)
        } else {
            newMessage.classList.remove('sended')
            newMessage.classList.add('delivered')
            chat.prepend(newMessage)
        }
        messageInput.value = '';
    }
}

