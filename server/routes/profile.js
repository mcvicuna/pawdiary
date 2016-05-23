var express = require('express');
var router = express.Router();
var wagner = require('wagner-core');
var status = require('http-status');

/* GET users listing. */
router.get('/api/v1/profile', function (req, res, next) {
  if ( typeof req.user === "undefined") {
    return next({ status: status.UNAUTHORIZED });
  }
  wagner.invoke(function (Model) {
    Model.User.findOne({ 'data.oauth': req.user.data.oauth }, function (err, user) {
      if (err) {
        console.log(err);  // handle errors!
        return res.status(status.INTERNAL_SERVER_ERROR).json({ error: err });
      }
      else if (user === null) {
        return res.status(status.INTERNAL_SERVER_ERROR).json({ error: 'user unknown ' + req.user });
      } {
        return res.json({ user: req.user });
      }
    });
  });
});

module.exports = router;
