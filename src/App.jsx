import React, { Component } from 'react';
import MessageList from './MessageList.jsx';
import ChatBar from './chatBar.jsx';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentUser : {},
      messages: [],
      totalUsers : 0
    }
    this.socket = new WebSocket("ws://localhost:3001");
  }

  changeUser = (username) => {
    const user = this.state.currentUser.name ? this.state.currentUser.name : 'Anonymous';
    const notification = `${user} changed his name to ${username}`;
    this.setState({
      currentUser : {
        name : username
      }
    },() => this.sendChangeToServer(notification,true)); 
  };

  sendChangeToServer = (message,type) => {
    const notificationType = type ? 'userChangeNotification' : 'messageNotification'
    const messageData = {
      type : notificationType,
      username: this.state.currentUser.name,
      content: message
    }
    this.socket.send(JSON.stringify(messageData));
  }
  componentDidMount() { 
    this.socket.onmessage = (newMessage) => {
      const message = JSON.parse(newMessage.data);
      if(message.type === 'number') {
        this.setState({
          totalUsers : message.content
        })
      }
      else {
        const newMessages = [...this.state.messages,message];
        this.setState({
          messages : newMessages
        })
      }
    }
  };

  render() {
    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">The Night Chat</a>
          <p className='user-counter'> Users : {this.state.totalUsers}</p>
        </nav>
        <MessageList messages={this.state.messages} 
        notification={this.state.notification}/>
        <ChatBar switchUser={this.switchUser} 
        sendChangeToServer={this.sendChangeToServer} 
        changeUser={this.changeUser} 
        user={this.state.currentUser}/>
      </div>
    );
  }
}
export default App;
