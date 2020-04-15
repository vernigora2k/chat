
export function isValid (msg) {
    let trimmedUser = msg.user.trim();
    let trimmedMessage = msg.message.trim();
    console.log(msg.message)
    if (trimmedUser.length>1 && trimmedMessage.length>0) {
        return true
    }
}