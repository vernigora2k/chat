import { URL } from "./config.js";

export function apiRequest(url, config) {
    return fetch(URL + url, config)
        .then(dataFromServer => dataFromServer.json())
        .catch(err => console.log("Ошибка!", err))
}

export function createAccount(username, password) {
    const url = 'api/user'
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
        .catch(alert)  
}

