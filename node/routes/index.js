var express = require('express');
var file = require('read-file');
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
  diffbot.article({uri: 'https://twitter.com/tos?lang=en'}, function(err, resp, req) {
    res.send(nlp.scan(resp.text));
  });
});

router.get('/evaluate/:service', function(req, res, next) {
  var service = service_to_url(req.params.service);
  diffbot.article({uri: service}, function(err, resp, req) {
    res.send(nlp.scan(resp.text));
  });
});

function service_to_url(service) {
  var services = JSON.parse(file.readFileSync('services.json'));
  for (var key in services) {
    if (key == service) {
      return services[service];
    }
  }

  return undefined;
}

module.exports = router;
