
function showPrice_() {
  var raw = httpGet('https://api.bitfinex.com/v1/pubticker/btcusd');
  var json = JSON.parse(raw);
  var price = json["last_price"];
  var bid = json["bid"];
  var ask = json["ask"];
  document.getElementById("price").innerHTML = price;
  document.getElementById("bid").innerHTML = bid;
  document.getElementById("ask").innerHTML = ask;
}

function httpGet(theUrl) {
    var xmlHttp = null;
    xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false );
    xmlHttp.send( null );
    return xmlHttp.responseText;
}

function getStuff() {
  var raw = httpGet('https://api.bitfinex.com/v1/pubticker/btcusd');
  var json = JSON.parse(raw);
  var res = json["last_price"];
  return res;
}

document.addEventListener('DOMContentLoaded', function () {
  showPrice_();
});

document.addEventListener('DOMContentLoaded', function () {
      document.querySelector('#refresher').addEventListener('change', handleChange);
});

function addEvent(element, evnt, funct){
  if (element.attachEvent)
   return element.attachEvent('on'+evnt, funct);
  else
   return element.addEventListener(evnt, funct, false);
}

function handleChange() {
  var cb = document.querySelector('#refresher');
  if(cb.checked == true){
    timer = setInterval(function(){showPrice_();}, 500);
  }
  else{
   clearInterval(timer);
  }
}
