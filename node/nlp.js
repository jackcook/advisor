var natural = require('natural');
var classifier = new natural.BayesClassifier();
var file = require('read-file');

nlp.scan = function (string) {
  choochoo(function() {
	 return classifier.classify(string);
  });
};


/*
This is an internal function to collect all the hotwords
*/
var choochoo = function (callback) {
  var hotwords = JSON.parse(file.readFileSync('hotwords.json'));
  for (var key in hotwords) {
    var value = hotwords[key];
    classifier.addDocument(value, key);
  }
  classifier.train();
  callback();
}

module.exports = nlp;