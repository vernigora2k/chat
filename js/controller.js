import {socket} from './client.js';
import {Message} from './chatView.js';
import {apiRequest} from './apiClient.js';
import {popupCreateAccount, popupAutorization} from './UiElements.js';

//document.cookie = "cookieUserToken=SomeToken; path=/; max-age=-1"
//document.cookie = "cookieUserToken=SomeToken";
const isAutorized = new function(){
    if (Cookies.get('cookieUserToken')) {
        popupCreateAccount.classList.add('hidden')
        popupAutorization.classList.add('hidden')
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

    apiRequest(ulr, config)
        .then(data => document.cookie = 'cookieUserToken=' + encodeURIComponent(data)) +
              '; path=/; max-age=100000'
        .catch(error => alert(error));      
}

export function changeChatName(newChatName) {
    const url = 'api/user'
    const payload = {
        chatname: newChatName,
    }
    const config = {
        method: 'PATCH',
        headers: {
            'Authorization': 'Bearer token'
        },
        body: JSON.stringify(payload)
    }

    apiRequest(url, config)
        .then(data => console.log(data))
        .catch(error => alert(error));
        
}