var natural = require('natural');
var classifier = new natural.BayesClassifier();
var file = require('read-file');
var exports = module.exports = {}

exports.scan = function (string) {
  c = classifier.getClassifications(string);
  var a = [];
  var sum = 0;
  var total = 0;
  for(key in c) {
    sum += c[key]['value'];
    total++;
  }
  sum /= total;
  for(key2 in c) {
    console.log(c[key2]);
    if(c[key2]['value'] > sum / 2)
      a.push(c[key2])
  }
  return a;
};

exports.start = function () {
  var hotwords = JSON.parse(file.readFileSync('hotwords.json'));
  for (var key in hotwords) {
    var value = hotwords[key];
    classifier.addDocument(key, value);
  }

  classifier.train();
}
