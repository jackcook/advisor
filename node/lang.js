var natural = require('natural');
var classifier = new natural.BayesClassifier();
var file = require('read-file');
var exports = module.exports = {}

exports.scan = function (string) {
  c = classifier.getClassifications(string);
  var a = [];
/*  for(key in c) {
    console.log(c[key]);
    if(c[key]['value'] > 0.0000001)
      a.push(c[key])
  }*/
  a = [c[0],c[1],c[2]];
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
