var express = require('express');
var router = express.Router();
var wagner = require('wagner-core');

/* GET users listing. */
router.get('/user/:uid', function(req, res, next) {
  res.send('respond with a resource for :'+req.params.uid);
});

module.exports = router;
