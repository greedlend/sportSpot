var express = require('express');
var router = express.Router();
var mongoose = require( 'mongoose' );
var Todo     = mongoose.model( 'Todo' );

var create = function ( req, res ){
    console.log(req.body);
  new Todo({
    username    : req.body.username,
    email       : req.body.email,
    updated_at  : Date.now()
  }).save( function( err, todo, count ){
    // if(err === null) res.send("alert('hi');");
    res.redirect( './adduser' );
  });
};
var display = function ( req, res ){
  Todo.find( function ( err, todos, count ){
    res.render( 'adduser', {
        "enterUser":"enter_username",
        "enterEmail":"enter_email",
        editdone  : 'Done',
        edituser  : 'Edit',
        editcancel: 'Cancel',
        title : 'Express Todo Example',
        todos : todos
    });
  });
};
var deletion = function ( req, res ){
  Todo.findById( req.params.id, function ( err, todo ){
    todo.remove( function ( err, todo ){
      res.redirect( '../adduser' );
    });
  });
};
var edit = function ( req, res ){
  Todo.findById( req.body.id, function ( err, todo ){
    todo.username    = req.body.username;
    todo.email    = req.body.email;
    todo.updated_at = Date.now();
    todo.save( function ( err, todo, count ){
      var data = todo.toObject();
      data.status=0;
      console.log(data);
      res.json(data);
    });
  });
};
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.get("/adduser", display);
router.post("/adduser", create);
router.post("/edituser", edit);
router.get("/deleteuser/:id", deletion);

// /* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

// /* GET specific user. */
// router.get('/{uid}', function(req, res, next) {
//   res.send('respond with a resource');
// });

module.exports = router;
