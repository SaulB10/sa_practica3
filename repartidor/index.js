const repartidorRouter = require('./routes/repartidor.route');

var express = require('express');
const bodyParser = require('body-parser');

const port = 3000;

var app = express();

app.use(bodyParser.json({ limit: '50mb' }))
app.use(bodyParser.urlencoded({extended: true}))

app.use('/repartidor', repartidorRouter);

app.get('/', function (req, res) {
    res.send('hello, world!')
  })

app.listen(port, function () {
    console.log(`Server on port http://localhost:${port}`);
  });


