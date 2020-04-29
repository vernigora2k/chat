import {socket} from './client.js';
import {Message} from './chatView.js';
import {apiRequest} from './apiClient.js';
import {popupCreateAccount, popupAutorization, chatnameInput} from './UiElements.js';

export function checkAutorizationToken(){
    if (Cookies.get('cookieUserToken')) {
        popupCreateAccount.classList.add('hidden')
        popupAutorization.classList.add('hidden')
    }
}

export function checkChatname() {
    if (Cookies.get('cookieUserToken')) {
        chatnameInput.value = localStorage.getItem('chatname')
    }
}

export function sendMessage(msg) {
    socket.emit('message', msg);
}

socket.on('message', function(msg){
    // let inputMessageFromServer = new Message(msg, 'input');
    // inputMessageFromServer.createAndAddMessageInChat();
    checkAndUpdateMessageStatus(msg)
        .then(msg => markingDeliveredStatusOnMessage(msg))
        .then(msg => localStorage.removeItem(msg.messageId))
});

export function autorization(username, password) {
    const url = 'api/user/auth'
    const payload = {
        username: username,
        password: password,
    }
    const config = {
        method: 'post',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    }

    return apiRequest(url, config)
        .then()
        .catch(alert);      
}

export function changeChatName(newChatName) {
    const url = 'api/user'
    const payload = {
        chatname: newChatName,
    }
    const config = {
        method: 'PATCH',
        headers: {
            'Authorization': `Bearer ${Cookies.get('cookieUserToken')}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    }

    return apiRequest(url, config)
        .then()
        .catch(alert);
}

export function getMessageId(){
    getMessageId.counter++
    let messageId = localStorage.getItem('username')+getMessageId.counter
    localStorage.setItem(messageId, 'sended')
    return (messageId)
}
getMessageId.counter = 0

function checkAndUpdateMessageStatus(msg) {
    return new Promise(
        function(resolve) {
        console.log(msg)
        console.log(msg.messageId)
        console.log(localStorage.getItem(msg.messageId))
        if (localStorage.getItem(msg.messageId)) {
            console.log('they are!')
            localStorage.setItem(msg.messageId, 'delivered')
            resolve(msg)
        }
    })
}

function markingDeliveredStatusOnMessage(msg) {
    console.log('marking status changed')
    console.log(msg.messageId)
    let uiElementMessageOnChat = document.getElementById(msg.messageId)
    console.log(uiElementMessageOnChat)
    uiElementMessageOnChat.style.backgroundColor = '#d7ffed'
    return msg
}
