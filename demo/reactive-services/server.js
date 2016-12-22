'use strict';
let express = require('express'),
  SSE = require('express-sse'),
  app = express(),
  expressWs = require('express-ws')(app),
  bodyParser = require('body-parser'),
  cors = require('cors'),
  account = {
    balance: 900
  },
  accountInfoWss,
  sseAccount = new SSE(account),
  sseNotification = new SSE();
app.use(cors());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

/*
 * Pages
 */
app.get('/', function(req, res) {
    res.sendFile('index.html', {root: __dirname });
});

app.get('/consume', function(req, res) {
    res.sendFile('consume-ws.html', {root: __dirname });
});

/*
 * WebSockets
 */
accountInfoWss = expressWs.getWss('/getAccountInfo');
app.ws('/getAccountInfo', function(ws, req) {
});
app.ws('/setAccountInfo', function(ws, req) {
  ws.on('message', (msg) => {
    let objMsg = JSON.parse(msg),
        strAccount = '';
    console.log('AccountInfo: ' + msg);
    account.balance = objMsg.balance !== '' ? objMsg.balance : account.balance;
    strAccount = JSON.stringify(account);
    //Send account to each client connected to this WS
    accountInfoWss.clients.forEach((client) => {
      client.send(strAccount);
    });
    //Send account for SSE
    sseAccount.send(account);
    sseAccount.updateInit(account);
  });
});


/*
 * Server Sent Events
 */
app.get('/sseAccount', sseAccount.init);
app.get('/sseNotification', sseNotification.init);

app.post('/setNotification', (req, res) => {
  sseNotification.send({
    code: 123,
    description: req.body.notification,
    priority: 1
  });
  res.end({
    status: 'ok'
  });
})

app.listen(3000);
console.log('-- Express server listening port 3000');
