var natural = require('natural');
var classifier = new natural.BayesClassifier();
var file = require('read-file');
var exports = module.exports = {}

exports.scan = function (string) {
  return classifier.getClassifications(string);
};


/*
This is an internal function to collect all the hotwords
*/
exports.choochoo = function (callback) {
  var hotwords = JSON.parse(file.readFileSync('hotwords.json'));
  for (var key in hotwords) {
    var value = hotwords[key];
    classifier.addDocument(key, value);
  }
  classifier.train();
  callback();
}

classifier.events.on('trainedWithDocument', function (obj) {
  console.log(obj);
});