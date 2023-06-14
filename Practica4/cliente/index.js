const clienteRouter = require('./routes/cliente.route');

var express = require('express');
const bodyParser = require('body-parser');

const port = 3002;

var app = express();

app.use(bodyParser.json({ limit: '50mb' }))
app.use(bodyParser.urlencoded({extended: true}))

app.use('/cliente', clienteRouter);

app.get('/', function (req, res) {
    res.send('hello, world!')
  })

app.listen(port, function () {
    console.log(`Server on port http://localhost:${port}`);
  });