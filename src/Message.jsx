import React, {Component} from 'react';

function Message({message}) {
    
    if(message.type === 'userChangeNotification') {
        return <div className="message system"> {message.notification} </div>; 
    }
    else if (message.type === 'messageNotification'){
        return (
            <div className="message">
                <span className="message-username">{message.username ? message.username:'Anonymouse'}</span>
                <span className="message-content">{message.content}</span>
            </div>)
    }
}

export default Message;
