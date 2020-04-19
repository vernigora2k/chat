import {socket} from './client.js';
import {createNewMessage} from './chatView.js'
import {apiRequest} from './apiClient.js'

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
        .then()
        .catch(error => alert(error));
        )
}