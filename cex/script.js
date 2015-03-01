document.addEventListener('DOMContentLoaded', function () {
  chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
    var url = tabs[0].url;
    url = url.replace("www.", "");

    var re1 = '.*?';
    var re2 = '(?:[a-z][a-z]+)';
    var re3 = '.*?';
    var re4 = '((?:[a-z][a-z]+))';

    var p = new RegExp(re1+re2+re3+re4, ["i"]);
    var m = p.exec(url);
    var site = m[1];

    document.getElementById('frame').setAttribute('src', 'http://localhost:3000/' + site);
  });
})
