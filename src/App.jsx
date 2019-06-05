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

    // this.socket = new WebSocket("ws://localhost:3001");
  }

  addMessage(message) {
    console.log('inside add message');
    console.log(this.state.currentUser.name); 
    const messageData = {
      username: this.state.currentUser.name,
      content: message
    }
    // console.log(messageData.username);
    this.socket.send(JSON.stringify(messageData));
    // const newMessage = {
    //   id: this.state.messages.length + 2, // ------------------->>> BAD SOLUTION NEEDS TO BE GENERATED
    //   username: this.state.currentUser.name,
    //   content: message
    // };
    // const messages = this.state.messages.concat(newMessage)
    // this.setState({messages: messages})
  };

  // catchMessage = () => {
  //   this.sockect.onmessage = function()
  // }
  componentDidMount() { 
    console.log(this.state.messages);
    console.log(this.socket);
    this.socket.onopen = (socket) => {
      console.log('Connected to the server');
    }
    this.socket.onmessage = (newMessage) => {
      // console.log(newMessage);
      // console.log(this.state.messages);
      const newMessages = [...this.state.messages,JSON.parse(newMessage.data)];
      // console.log(newMessages);
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
