var express = require('express');
var file = require('read-file');
var router = express.Router();
var lang = require('../lang');

var Diffbot = require('diffbot').Diffbot;
var diffbot = new Diffbot('0d5c56d2a7a3a5a4ad6c644b326993c2');

exports.index = function(req, res) {
  res.render('index', {hideHeader: true});
}

router.get('/:service', function(req, res, next) {
  var service = service_to_url(req.params.service);
  diffbot.article({uri: service}, function(err, resp, req) {
    var data = lang.scan(resp.text);
    res.render('index', {'title': 'Title', objects: data})
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
