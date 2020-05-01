
export function isMessageValid (msg) {
    let trimmedMessage = msg.message.trim();
    return trimmedMessage.length > 0
}

export function isNameValid (username) {
    return username.length > 1
}

export function isPasswordValid (password) {
    return password.length > 3
}
