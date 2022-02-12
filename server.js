var express = require('express');
var app = express();
var port = 3000;
const path = require('path');

var routes = require('./routes.js');
app.use('/', routes);

// Set rendering engine
app.set(`view engine`, `html`);
app.set('views', path.join(__dirname, 'views'));
// Setup rendering engine to render html pages
app.engine(`html`, require(`ejs`).renderFile);

app.listen(port, function () {
    console.log('Server started on port ' + port);
});