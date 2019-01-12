// потом удалить комментарий
// localhost:3000/?s=fb&w=lenta&p=comp1&t=adset1&m=set1

var API_KEY = 'b298b41de1de382c83ad08454b9607c2';
var PRODUCT_ID = '4476';
var WEBMASTER_ID = '258102';
var client_ip = '127.0.0.1';
var urlParameters = {};

function getIP() {
  $.getJSON('https://ipapi.co/json/', function(data) {
    json_data = data;
    client_ip = json_data.ip;
  });
}

function getUrlParameters() {
  var query_string = {};
  var query = window.location.search.substring(1);
  var vars = query.split("&");
  
  for (var i = 0; i < vars.length; i++) {
    var pair = vars[i].split("=");
    if (typeof query_string[pair[0]] === "undefined") {
      query_string[pair[0]] = decodeURIComponent(pair[1]);
    } else if (typeof query_string[pair[0]] === "string") {
      var arr = [ query_string[pair[0]],decodeURIComponent(pair[1]) ];
      query_string[pair[0]] = arr;
    } else {
      query_string[pair[0]].push(decodeURIComponent(pair[1]));
    }
  }
  return query_string;
}

function sendData(client_name, client_phone) {
  $.ajax({
    type: 'POST',
    data: {
      ref: WEBMASTER_ID,
      api_key: API_KEY,
      product_id: PRODUCT_ID,
      phone: client_phone,
      name: client_name,
      ip: client_ip,
      s: urlParameters.s,
      w: urlParameters.w,
      t: urlParameters.t,
      p: urlParameters.p,
      m: urlParameters.m,
      referer: document.referrer,
    },
    url: 'https://m1-shop.ru/send_order/',
    success: function(data) {
      //console.log(data);
      
      try {
        data = JSON.parse(data);
        if (data.result == "ok") {
        //alert('Заказ создан, ID:' + data.id);
          window.location.replace("call/index.html?order_id=" + data.id + "&s=" + urlParameters.s + "&w=" + urlParameters.w + "&t=" + urlParameters.t + "&p=" + urlParameters.p + "&m=" + urlParameters.m);
        }
        else {
          //alert('Заказ НЕ создан, ответ: ' + data);
          window.location.replace("error/index.html?s=" + urlParameters.s + "&w=" + urlParameters.w + "&t=" + urlParameters.t + "&p=" + urlParameters.p + "&m=" + urlParameters.m);
        }  
      } catch(e) {
        window.location.replace("error/index.html?s=" + urlParameters.s + "&w=" + urlParameters.w + "&t=" + urlParameters.t + "&p=" + urlParameters.p + "&m=" + urlParameters.m);
      }
    },
    error: function(xhr, status, error) { // if error occured
      console.log(xhr.statusText, xhr.responseText, status, error);

      try {
        respjs = JSON.parse(xhr.responseText);  
        window.location.replace("error/index.html?s=" + urlParameters.s + "&w=" + urlParameters.w + "&t=" + urlParameters.t + "&p=" + urlParameters.p + "&m=" + urlParameters.m);
      } catch(e) {
        window.location.replace("error/index.html?s=" + urlParameters.s + "&w=" + urlParameters.w + "&t=" + urlParameters.t + "&p=" + urlParameters.p + "&m=" + urlParameters.m);  
      }
      
      
      //alert('Заказ НЕ создан, ответ: ' + respjs.message);
      //window.location.replace("error/index.html?s=" + urlParameters.s + "&w=" + urlParameters.w + "&t=" + urlParameters.t + "&p=" + urlParameters.p + "&m=" + urlParameters.m);
      //$(placeholder).removeClass('loading');
    }
  });
  return false;
};

function getC(name) {
  var cookie = " " + document.cookie;
  var search = " " + name + "=";
  var setStr = "";
  var offset = 0;
  var end = 0;
  if (cookie.length > 0) {
    offset = cookie.indexOf(search);
    if (offset != -1) {
      offset += search.length;
      end = cookie.indexOf(";", offset)
      if (end == -1) {
        end = cookie.length;
      }
      setStr = unescape(cookie.substring(offset, end));
    }
  }
  return(setStr);
}

function setC(name, value, expires, path, domain, secure) {
  document.cookie = name + "=" + escape(value) +
    ((expires) ? "; expires=" + expires : "") +
    ((path) ? "; path=" + path : "") +
    ((domain) ? "; domain=" + domain : "") +
    ((secure) ? "; secure" : "");
}

function getQueryParams(qs) {
  qs = qs.split("+").join(" ");

  var params = {}, tokens,
    re = /[?&]?([^=]+)=([^&]*)/g;

  while (tokens = re.exec(qs)) {
    params[decodeURIComponent(tokens[1])]
      = decodeURIComponent(tokens[2]);
  }

  return params;
}

//function urlGen(f){
//   var i1 = 'https://m1-shop.ru/send_my_order/';
//   var i2 = getC("s");
//   var i3 = getC("w");
//   var i4 = getC("t");
//   var i5 = getC("p");
//   var i6 = getC("m");
//   f.action = i1 + '?s=' + i2 + '&w=' + i3 + '&t=' + i4 + '&p=' + i5 + '&m=' + i6;
//   return true;
//}

var m1dt = new Date();
var after30days = m1dt.setDate(m1dt.getDate() + 30);
var datecoom1 = new Date(after30days);

var query = getQueryParams(document.location.search);

if (typeof query.ref !== "undefined") setC("ref", query.ref, datecoom1, "/");
else setC("ref", WEBMASTER_ID, datecoom1, "/");
if (typeof query.s !== "undefined") setC("s", query.s, datecoom1, "/");
if (typeof query.w !== "undefined") setC("w", query.w, datecoom1, "/");
if (typeof query.t !== "undefined") setC("t", query.t, datecoom1, "/");
if (typeof query.p !== "undefined") setC("p", query.p, datecoom1, "/");
if (typeof query.m !== "undefined") setC("m", query.m, datecoom1, "/");
if (typeof query.r !== "undefined") setC("r", query.r, datecoom1, "/");
if (typeof query.order_id !== "undefined") setC("order_id", query.order_id, datecoom1, "/");
if (typeof query.previous_order_id !== "undefined") setC("previous_order_id", query.previous_order_id, datecoom1, "/");


$(document).ready(function() {
  getIP();
  urlParameters = getUrlParameters();
  
  var script = document.createElement("script");
  script.src = "https://m1-shop.ru/send_order/?" + 
    "ref=" + WEBMASTER_ID +
    "&s=" + urlParameters.s +
    "&w=" + urlParameters.w +
    "&t=" + urlParameters.t +
    "&p=" + urlParameters.p + 
    "&m=" + urlParameters.m +
    "&product_id=" + PRODUCT_ID + 
    "&out=1";

  document.body.appendChild(script);
});