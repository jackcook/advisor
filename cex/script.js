document.addEventListener('DOMContentLoaded', function () {
  chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
    var url = tabs[0].url;

    var p1 = url.split("//");
    var p2 = p1[1].split("/");
    var p3 = p2[0].split(".");
    var site = p3[p3.length - 2];

    document.getElementById('frame').setAttribute('src', 'http://localhost:3000/' + site);
  });
})
