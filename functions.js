function set(title) {
  for(var i = 0; ; i++) {
    var a = document.getElementsByTagName("link")[i];
    if(a == null){
      break;
    }
    if(a.getAttribute("rel").indexOf("style") != -1) {
      if(a.getAttribute("title")){
        a.disabled = true;
        if(a.getAttribute("title") == title){
          a.disabled = false;
        }
      }
    }
  }
}

function get() {
  for(var i = 0; ; i++) {
    var a = document.getElementsByTagName("link")[i];
    if(a == null){
      return null;
    }
    if(a.getAttribute("rel").indexOf("style") != -1){
      if(a.getAttribute("title")){
        if(!a.disabled){
          return a.getAttribute("title");
        }
      }
    }
  }
}

function pref() {
  for(var i = 0; ; i++) {
    var a = document.getElementsByTagName("link")[i];
    if(a == null){
      return null;
    }
    if(a.getAttribute("rel").indexOf("style") != -1){
      if(a.getAttribute("rel").indexOf("alt") == -1){
        if(a.getAttribute("title")){
          return a.getAttribute("title");
        }
      }
    }
  }
}

window.onload = function(e) {
  var cookie = null;
  var ca = document.cookie.split(';');
  for(var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while(c.charAt(0)== ' ') {
      c = c.substring(1,c.length);
    }
    if(c.indexOf("style=") == 0){
      cookie = c.substring(6,c.length);
    }
  }
  var title;
  if(cookie){
    title = cookie;
  }else{
    title = pref();
  }
  set(title);
}

window.onunload = function(e) {
  var name = "style", title = get(), date = new Date();
  date.setTime(date.getTime()+(365*24*60*60*1000));
  document.cookie = name+"="+title+"; expires="+date.toGMTString()+"; path=/";
}