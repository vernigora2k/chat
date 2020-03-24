let buttonSend = document.querySelector('.send');
buttonSend.onclick = function () {
    createNewMessage(false);
}


function createNewMessage (isInput) {
    let chat = document.querySelector('.mainScreen__chat');
    let newMessage = document.createElement('div');
    let getNameOfSender = document.querySelector('.mainScreen__YourChatName');
    let getMessage = document.querySelector('.messageInput');

    if (isInput) { 
        newMessage.classList.add('inputMessage'); 
    } else {
        newMessage.classList.add('outputMessage');
    }
    if (getMessage.value.length > 15) {
        getMessage.value = '<br>' + getMessage.value} //добавить перенос строки если сообщение длинное
    
    newMessage.innerHTML = '<p class="message__text">'+
                            getNameOfSender.value + ':  ' +
                            getMessage.value + '</p>';
    chat.append(newMessage);
    getMessage.value = '';
}

 

 