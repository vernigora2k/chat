
export function isMessageValid (msg) {
    let trimmedUser = msg.user.trim();
    let trimmedMessage = msg.message.trim();
    return (trimmedUser.length>1 && trimmedMessage.length>0)
}

export function isNameValid (username) {
    return username.length > 1
}

export function isPasswordValid (password) {
    return password.length > 3
}

// let msg = {
//     user: ' seijjd ',
//     message: 'Hello I am message'
// }
// console.log(isMessageValid(msg))