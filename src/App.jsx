import React, { Component } from 'react';
import MessageList from './MessageList.jsx';
import ChatBar from './chatBar.jsx';

// messageList 
class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentUser : {name: 'Bob'},
      messages: []
    }
    this.addMessage=this.addMessage.bind(this);
    this.socket = new WebSocket("ws://localhost:3001");
  }

  addMessage(message) {
    const messageData = {
      username: this.state.currentUser.name,
      content: message
    }
    this.socket.send(JSON.stringify(messageData));
  };

  componentDidMount() { 
    this.socket.onopen = (socket) => {
    }
    this.socket.onmessage = (newMessage) => {
      const newMessages = [...this.state.messages,JSON.parse(newMessage.data)];
      this.setState({
        messages : newMessages
      })
    }
  };

  render() {
    return (
      <div>

    <nav className="navbar">
      <a href="/" className="navbar-brand">Chatty</a>
    </nav>
    <MessageList messages={this.state.messages}/>
    <ChatBar addMessage={this.addMessage} user={this.state.currentUser}/>
      </div>
    );
  }
}
export default App;
