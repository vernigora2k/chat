
export function isMessageValid (msg) {
    let trimmedUser = msg.user.trim();
    let trimmedMessage = msg.message.trim();
    if (trimmedUser.length>1 && trimmedMessage.length>0) {
        return true
    }
}

export function isNameValid (username) {
    return username.length > 1
}

export function isPasswordValid (password) {
    return password.length > 3
}

