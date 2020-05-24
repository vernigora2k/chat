import {socket} from './client.js';
import {apiRequest} from './apiClient.js';
import {popupCreateAccount, popupAutorization, chatnameInput} from './UiElements.js';

export function checkAutorizationToken(){
    if (Cookies.get('at')) {
        popupCreateAccount.classList.add('hidden')
        popupAutorization.classList.add('hidden')
    }
}

export function checkChatname() {
    if (Cookies.get('at')) {
        chatnameInput.value = localStorage.getItem('chatname')
    }
}

export function sendMessage(msg) {
    socket.emit('message', msg);
}

socket.on('message', function(msg){
    checkAndUpdateInputMessageStatus(msg)
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
            'Authorization': `Bearer ${Cookies.get('at')}`,
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
    return (messageId)
}
getMessageId.counter = 0

function checkAndUpdateInputMessageStatus(msg) {
    const uiElementMessageOutput = document.getElementById(msg.messageId)
    console.log(uiElementMessageOutput)
    if (msg.messageId === uiElementMessageOutput.id) {
        uiElementMessageOutput.classList.remove('sended')
        uiElementMessageOutput.classList.add('delivered')
    }
}

export function getMessages(numbersOfMessages = 0) {
    const url = `api/messages?offset=${numbersOfMessages}`
    const config = {
        method: 'get',
        headers: {
            'Authorization': `Bearer ${Cookies.get('at')}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    }

    return apiRequest(url, config)
        .then()
        .catch(alert);
}