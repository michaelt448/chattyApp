const express = require('express');
const SocketServer = require('ws');
const randomId = require('uuid/v4')
// Set the port to 3001
const PORT = 3001;
// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer.Server({ server });

wss.broadcast = function broadcast(data) {
    wss.clients.forEach(function each(client) {
      if (client.readyState === SocketServer.OPEN) {
        client.send(data);
      }
    });
  };
// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on('connection', (ws) => {
  const userAmount = {
    type : 'number',
    size : wss.clients.size
  }
  wss.broadcast(JSON.stringify(userAmount));

  ws.on('message',(message) => {
    const messageObj = JSON.parse(message);
    if(messageObj.type === 'messageNotification'){
      newMessageObj = {
        id : randomId(),
        type : messageObj.type,
        username : messageObj.username,
        content : messageObj.content
      }
      wss.broadcast(JSON.stringify(newMessageObj));
    }
    else if(messageObj.type === 'userChangeNotification') {
      newMessageObj = {
        id : randomId(),
        type : messageObj.type,
        notification : messageObj.notification
      }
      wss.broadcast(JSON.stringify(newMessageObj));
    }
  });
  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => {
    const userAmount = {
      type : 'number',
      size : wss.clients.size
    }
    wss.broadcast(JSON.stringify(userAmount));
    console.log('Client disconnected')
  });
});