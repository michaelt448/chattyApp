import React from 'react';

function Message({message}) {
    
    if(message.type === 'userChangeNotification') {
        return <div className="message system"> {message.content} </div>; 
    }
    else if (message.type === 'messageNotification'){
        return (
            <div className="message">
                <span className="message-username">
                    {message.username ? message.username:'Anonymous'}
                </span>
                <span className="message-content">
                    {message.content}
                </span>
            </div>)
    }
}

export default Message;
