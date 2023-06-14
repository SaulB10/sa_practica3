const restauranteRoutes = require("./routes/restaurante.routes")

var express = require('express');
const bodyParser = require('body-parser');

const port = 3001;

var app = express();

app.use(bodyParser.json({ limit: '50mb' }))
app.use(bodyParser.urlencoded({extended: true}))

app.use('/restaurante', restauranteRoutes);

app.get('/', function (req, res) {
    res.send('hello, world!')
  }
);

app.listen(port, function () {
    console.log(`Server on port http://localhost:${port}`);
  }
);
