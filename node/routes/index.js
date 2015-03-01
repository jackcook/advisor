var express = require('express');
var file = require('read-file');
var router = express.Router();
var lang = require('../lang');

var Diffbot = require('diffbot').Diffbot;
var diffbot = new Diffbot('0d5c56d2a7a3a5a4ad6c644b326993c2');

exports.index = function(req, res) {
  res.render('index', {});
}

router.get('/:service', function(req, res, next) {
  var service = service_to_url(req.params.service);
  diffbot.article({uri: service}, function(err, resp, requ) {
    var data = lang.scan(resp.text);
    var newdata = [];
    for (var i = 0; i < data.length; i++) {
      var services = JSON.parse(file.readFileSync('flags.json'));
      var description = services[data[i]["label"]]["description"];
      newdata.push(description);
    }

    var title = req.params.service
    res.render('index', {'title': title.charAt(0).toUpperCase() + title.slice(1), objects: newdata})
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
