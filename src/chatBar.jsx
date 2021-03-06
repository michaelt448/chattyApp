import React, {Component} from 'react';

class ChatBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currMessage : '',
            currUsername : ''
        }
    }

    handleUsernameChange = (e) => {
        this.setState({
            currUsername : e.target.value
        })
    }
    
    handleUsernameSubmit = () => {
        this.state.currUsername && this.props.changeUser(this.state.currUsername);
    }

    handleMessageChange = (e) => {
        this.setState({
            currMessage : e.target.value
        })
    }

    handleMessageSubmit = (e) => {
        if(e.key === 'Enter') {
            this.props.sendChangeToServer(this.state.currMessage);
            this.setState({
                currMessage : ''
            })
        }
    }

    render() {
        
        return (
            <footer className="chatbar">
                <input className="chatbar-username" 
                name="user"
                placeholder={this.state.currUsername} 
                onBlur = {this.handleUsernameSubmit } 
                onChange={this.handleUsernameChange} 
                value={this.state.currUsername}/>
                <input className="chatbar-message" 
                placeholder="Type a message and hit ENTER" 
                onKeyDown={this.handleMessageSubmit} 
                onChange = {this.handleMessageChange} 
                value={this.state.currMessage}/>
            </footer> 
        );
    }
}

export default ChatBar;
