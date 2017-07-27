var mongoose = require('mongoose');

var postShema = new mongoose.Schema({
    username: String,
    created_at: { type: Date, default: Date.now },
    message: String
});
//declare a model called Post which has schema postSchema
mongoose.model('Post', postShema);