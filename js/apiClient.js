import { URL } from "./config.js";

function apiRequest(url, config) {
    fetch(url, config)
        .then(dataFromServer => dataFromServer.json())
        .catch(err => console.log("Ошибка!", err))
}

export function createUser(username, password) {
    const url = URL + '/api/user'
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
    new Promise((resolve, reject) => {
        const data = apiRequest(url, config)
        resolve(data)
    })
        .then(data => console.log(data)) 
        .catch(error => alert(error))
}



// export function apiRequest(url, method, params) {
//     const config = {
//         method: `${method}`,
//         headers: {
//             'Accept': 'application/json',
//             'Content-Type': 'application/json'
//         },
//     };
   
//     fetch(url + '/api/user?' + params, config)
//         .then(dataFromServer => dataFromServer.json())
//         .catch(err => console.log("Ошибка!", err))
// }