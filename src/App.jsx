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
  }

  componentDidMount(){

  };

  render() {
    return (
      <div>

    <nav className="navbar">
      <a href="/" className="navbar-brand">Chatty</a>
    </nav>
    <MessageList />
    <ChatBar user={this.state.currentUser}/>
      </div>
    );
  }
}
export default App;
