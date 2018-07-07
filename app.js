'use strict';

var SwaggerExpress = require('swagger-express-mw');
var app = require('express')();
const mongoose = require('mongoose');
const dbConnectionString = process.env.NODE_ENV === 'test' ? "mongodb://localhost:27017/swagger-chat-test" : "mongodb://localhost:27017/swagger-chat";
module.exports = app; // for testing

var config = {
  appRoot: __dirname // required config
};

SwaggerExpress.create(config, function(err, swaggerExpress) {
  if (err) { throw err; }
  // install middleware
  swaggerExpress.register(app);
  mongoose.connect(dbConnectionString);
  var db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', function() {
    console.log('Database connection established')
    var port = process.env.PORT || 10010;
    app.listen(port);
  })
});
