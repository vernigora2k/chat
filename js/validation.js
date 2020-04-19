
export function isValid (msg) {
    let trimmedUser = msg.user.trim();
    let trimmedMessage = msg.message.trim();
    if (trimmedUser.length>1 && trimmedMessage.length>0) {
        return true
    }
}

export function isNameValid (username) {
    if (username.length > 1) {
        return true
    }
}

export function isPasswordValid (password) {
    if (password.length > 3) {
        return true
    }
}

