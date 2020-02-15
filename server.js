// Modules
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

// Express
var app = express();

// Body Parser
var urlencodeParser = bodyParser.urlencoded({
  extended: true
});
app.use(urlencodeParser);
app.use(bodyParser.json());

// CORS
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

// Routes
app.get('/', function(req,res){
  res.sendFile(path.join(__dirname + '/client/hello.html'));
});

app.get('/client/:name', function(req,res,next) {
  var options = {
    root: './client',
    dotfiles: 'deny',
    headers: {
      'x-timestamp': Date.now(),
      'x-sent': true
    }
  }

  var fileName = req.params.name;
  res.sendFile(fileName, options, function (err) {
    if (err) {
      next(err)
    } else {
      console.log('Sent:', fileName)
    }
  })
});

// Listening Port
var port = 8080;
app.listen(port);
console.log('Listening on port', port);
