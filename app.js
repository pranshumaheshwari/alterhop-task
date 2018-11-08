var express = require('express');
var app = express();
var path = require('path');


app.use(express.static(path.join(__dirname, 'build')));

let port = process.env.PORT || 3000;

app.listen(port);