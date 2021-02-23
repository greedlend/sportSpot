var mongoose = require( 'mongoose' );
var Schema   = mongoose.Schema;
 
var Todo = new Schema({
    user_id    	: String,
    username    : String,
    email    	: String,
    updated_at 	: Date
});
 
mongoose.model( 'Todo', Todo );
mongoose.connect('mongodb://localhost:27017/testSQL'); //db'name: testSQL
