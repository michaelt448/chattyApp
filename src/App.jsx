import React, { Component } from 'react';
import MessageList from './MessageList.jsx';
import ChatBar from './chatBar.jsx';

// messageList 
class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentUser : {},
      messages: [],
      totalUsers : 0
    }
    this.addMessage=this.addMessage.bind(this);
    this.socket = new WebSocket("ws://localhost:3001");
  }

  changeUser = (username) => {
    const user = this.state.currentUser.name ? this.state.currentUser.name : 'Anonymouse';
    const notification = `${user} changed his name to ${username}`;
    this.setState({
      currentUser : {
        name : username
      }
    },() => this.signalChangedUser(notification)); 
  };

  addMessage(message) {
    const messageData = {
      type : 'messageNotification',
      username: this.state.currentUser.name,
      content: message
    }
    this.socket.send(JSON.stringify(messageData));
  };

  signalChangedUser = (notification) => {
    const messageData = {
      type : 'userChangeNotification',
      notification : notification
    }
    this.socket.send(JSON.stringify(messageData));
  }

  componentDidMount() { 
    // this.socket.onopen = (socket) => {
    // }
    this.socket.onmessage = (newMessage) => {
      const message = JSON.parse(newMessage.data);
      if(message.type === 'number') {
        this.setState({
          totalUsers : message.size
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
      <a href="/" className="navbar-brand">Chatty</a>
      <p> Users : {this.state.totalUsers}</p>
    </nav>
    <MessageList messages={this.state.messages} notification={this.state.notification}/>
    <ChatBar switchUser={this.switchUser} addMessage={this.addMessage} changeUser={this.changeUser} user={this.state.currentUser}/>
      </div>
    );
  }
}
export default App;
