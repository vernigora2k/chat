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
    let inputMessageFromServer = new Message(msg, 'input');
    inputMessageFromServer.createAndAddMessageInChat();
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
            'Authorization': `Bearer ${Cookies.get('cookieUserToken')}`
        },
        body: JSON.stringify(payload)
    }

    return apiRequest(url, config)
        .then()
        .catch(alert);
        
}