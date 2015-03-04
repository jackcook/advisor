var natural = require('natural');
var classifier = new natural.BayesClassifier();
var file = require('read-file');
var exports = module.exports = {}

exports.scan = function (string) {
  c = classifier.getClassifications(string);
  results = [];

  var last = parseInt(c[c.length - 1]["value"].toString().split("e")[1]);

  for (var key in c) {
    var num = parseInt(c[key]["value"].toString().split("e")[1]);
    if (num - 1 > last || isNaN(num - 1)) {
      results.push(c[key]);
    }
  }

  return results;
};

exports.start = function () {
  var flags = JSON.parse(file.readFileSync('flags.json'));
  for (var key in flags) {
    var words = flags[key]["words"];
    for (var i = 0; i < words.length; i++) {
      var word = words[i];
      classifier.addDocument(word, key);
    }
  }

  classifier.train();
}
