import {socket} from './client.js';
import {createNewMessage} from './chatView.js';
import {apiRequest} from './apiClient.js';
import {popupCreateAccount, popupAutorizationBlock} from './UiElements.js';

export function sendMessage(msg) {
    socket.emit('message', msg);
}

socket.on('message', function(msg){
    createNewMessage(msg, true);
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

(function isAutorized(){
    if (Cookies.get('cookieUserToken')) {
        popupCreateAccount.classList.add('dispNone')
        popupAutorizationBlock.classList.add('dispNone')
    }
}())

//document.cookie = "cookieUserToken=SomeToken; path=/; max-age=-1"
//document.cookie = "cookieUserToken=SomeToken";


