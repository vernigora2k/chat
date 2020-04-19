import { URL } from "./config.js";

function apiRequest(url, config) {
    fetch(URL + url, config)
        .then(dataFromServer => dataFromServer.json())
        .catch(err => console.log("Ошибка!", err))
}

export function createUser(username, password) {
    const url = '/api/user'
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
    apiRequest(url, config)
        .then(data => console.log(data)) 
        .catch(error => alert(error))
}
