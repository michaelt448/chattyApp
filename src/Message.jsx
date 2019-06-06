import React, {Component} from 'react';

class Message extends Component {
    
    render() {
    if(this.props.message.type === 'userChangeNotification') {
        return <div className="message system"> {this.props.message.notification} </div>; 
    }
    else if (this.props.message.type === 'messageNotification'){
    return (
        <div className="message">
            <span className="message-username">{this.props.message.username ? this.props.message.username:'Anonymouse'}</span>
            <span className="message-content">{this.props.message.content}</span>
        </div>)
    }
}
}

export default Message;
