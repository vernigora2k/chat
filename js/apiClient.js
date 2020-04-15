import { URL } from "./config.js";

// const params = 'username=John';

export function apiRequest(url, method, params) {
    const config = {
        method: `${method}`,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    };
   
    fetch(url + '/api/user?' + params, config)
        .then(dataFromServer => dataFromServer.json())
        .catch(err => console.log("Ошибка!", err))
}

