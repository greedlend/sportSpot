var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

/* GET specific user. */
router.get('/{uid}', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
