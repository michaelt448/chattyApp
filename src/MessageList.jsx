import React from 'react';

import Message from './Message.jsx'

function MessageList({messages}) {
    
    return (
        <main className='messages'>
        {messages.map(message => {
            return <Message key = {message.id} message={message}/>
        })}
        </main>
    );
}

export default MessageList;
