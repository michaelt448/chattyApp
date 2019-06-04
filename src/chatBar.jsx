import React, {Component} from 'react';

class ChatBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currMessage : ''
        }
    }

    handleChange = (e) => {
        this.setState({
            currMessage : e.target.value
        })
    }
    handleKey = (e) => {
        if(e.key === 'Enter') {
        this.props.addMessage(this.state.currMessage);
        this.setState({
            currMessage : ''
        })
    }
}

    render() {
        
        return (
            <footer className="chatbar">
                <input className="chatbar-username" placeholder={this.props.user.name} />
                <input className="chatbar-message" placeholder="Type a message and hit ENTER" onKeyDown={this.handleKey} onChange = {this.handleChange} value={this.state.currMessage}/>
            </footer> 
        );
    }
}

export default ChatBar;
