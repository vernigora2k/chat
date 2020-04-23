import {socket} from './client.js';
import {Message} from './chatView.js';
import {apiRequest} from './apiClient.js';
import {popupCreateAccount, popupAutorizationBlock, logoutBtn} from './UiElements.js';
import {settingsBtn, popupSettings} from './UiElements.js';

export function sendMessage(msg) {
    socket.emit('message', msg);
}

socket.on('message', function(msg){
    // let inputMessage = new Message(msg, 'input');
    // inputMessage.createAndAddMessageInChat();
});

const isAutorized = new function(){
    if (Cookies.get('cookieUserToken')) {
        popupCreateAccount.classList.add('dispNone')
        popupAutorizationBlock.classList.add('dispNone')
    }
}
//document.cookie = "cookieUserToken=SomeToken; path=/; max-age=-1"
document.cookie = "cookieUserToken=SomeToken";

logoutBtn.addEventListener('click', () => {
    Cookies.set('cookieUserToken', 'SomeToken', { expires: -1 })
    popupAutorizationBlock.classList.remove('dispNone')
    document.location.reload(true)
})

settingsBtn.addEventListener('click', () => {
    popupSettings.classList.remove('dispNone')
})

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

    apiRequest(ulr, config)
        .then(data => console.log(data))
        .catch(error => alert(error));
        
}