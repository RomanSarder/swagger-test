const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var PostSchema = new Schema({
  text:  String,
  username: String,
});

module.exports = mongoose.model('Post', PostSchema)