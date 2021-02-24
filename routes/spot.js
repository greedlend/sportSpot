var express = require('express');
var router = express.Router();

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now());
  next();
});

/* GET specific spot. */
router.get('/spot/{id}', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
