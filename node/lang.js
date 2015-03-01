var natural = require('natural');
var classifier = new natural.BayesClassifier();
var file = require('read-file');
var exports = module.exports = {}

exports.scan = function (string) {
  c = classifier.getClassifications(string);
  return c;
};

exports.start = function () {
  var hotwords = JSON.parse(file.readFileSync('hotwords.json'));
  for (var key in hotwords) {
    var value = hotwords[key];
    classifier.addDocument(key, value);
  }

  classifier.train();
}
