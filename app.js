var express = require('express');
var app = express();
var path = require('path');


app.use(express.static(path.join(__dirname, 'build')));


app.listen(process.env.PORT || 3000, () => {
    console.log(`Listing to PORT ${ process.env.PORT || 3000 }`);
});