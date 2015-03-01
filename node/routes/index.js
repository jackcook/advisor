var express = require('express');
var router = express.Router();
var nlp = require('../nlp');

var Diffbot = require('diffbot').Diffbot;
var diffbot = new Diffbot('0d5c56d2a7a3a5a4ad6c644b326993c2');

/* GET home page. */
router.get('/', function(req, res, next) {
  diffbot.article({uri: 'https://www.spotify.com/us/legal/end-user-agreement/'}, function(err, resp) {
    res.send(resp.text);
  });
});

router.get('/class', function(req, res, next) {
    diffbot.article({uri: 'https://www.spotify.com/us/legal/end-user-agreement/'}, function(err, resp, req) {
        console.log(nlp.scan(resp.text));
        res.send(nlp.scan(resp.text));
    });
});

module.exports = router;
