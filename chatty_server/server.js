const express = require('express');
const SocketServer = require('ws');
const randomId = require('uuid/v4')

const PORT = 3001;

const server = express()
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

const sendChangeToClients = (id,type,username,content) => {
  const signal = {
    id : id,
    type : type,
    username: username,
    content : content
  }
  wss.broadcast(JSON.stringify(signal));
}; 

wss.on('connection', (ws) => {
  //send a client connected
  sendChangeToClients(null,'number',null,wss.clients.size);

  ws.on('message',(message) => {
    const {type,username,content} = JSON.parse(message);
        sendChangeToClients(randomId(),type,username,content);
  });

  ws.on('close', () => {
    // send a client disconnected
    sendChangeToClients(null,'number',null,wss.clients.size);
  });
});