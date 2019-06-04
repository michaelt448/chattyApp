import React, { Component } from 'react';
import MessageList from './MessageList.jsx';
import ChatBar from './chatBar.jsx';
// messageList 
class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentUser : {name: 'Bob'},
      messages: [
        {
          id : 1,
          username: "Bob",
          content: "Has anyone seen my marbles?",
        },
        {
          id : 2,
          username: "Anonymous",
          content: "No, I think you lost them. You lost your marbles Bob. You lost them for good."
        }
      ]
    }
    this.addMessage=this.addMessage.bind(this);
  }

  addMessage(message) {
    const newMessage = {
      id: this.state.messages.length + 2, // ------------------->>> BAD SOLUTION NEEDS TO BE GENERATED
      username: this.state.currentUser.name,
      content: message
    };
    const messages = this.state.messages.concat(newMessage)
    this.setState({messages: messages})
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
