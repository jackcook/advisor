var natural = require('natural');
var classifier = new natural.BayesClassifier();
var file = require('read-file');
var exports = module.exports = {}

exports.scan = function (string) {
  c = classifier.getClassifications(string);
  return c;
};

exports.start = function () {
  var hotwords = JSON.parse(file.readFileSync('flags.json'));
  for (var key in hotwords) {
    var phrases = hotwords[key]['phrases'];
    for (var i = 0; i < phrases.length; i++) {
      classifier.addDocument(phrases[i], key);
    }
  }

  classifier.train();
}
