function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

var mxenv = new Object();

mxenv.baseUrl = "https://apisandbox.moxtra.com/v1/";
mxenv.clientId = "q79fO5OwjlE";
mxenv.clientSecret = "neugD_YNvOM";
mxenv.orgid = "PycQPhAodDeFczgy5K865a3";
mxenv.partnerid = "Q5uJMEWyjl34fMmDJsfQKd6";
mxenv.oAuthBaseUrl = "https://apisandbox.moxtra.com/oauth/authorize?client_id=";
mxenv.mode = "sandbox";

var verifyAccessToken = $.ajax({
    'type': 'GET',
    'url': "https://apisandbox.moxtra.com/me?access_token=" + localStorage.getItem("token"),
    'contentType': 'application/json',
    'dataType': 'json',
    'success': function(data) {

    },
    'error': function(textStatus, errorThrown) {
        getNewAccessToken();
        // window.location.reload(false);
    },
    'async': false
});

if (!localStorage.getItem("token")) {
    getNewAccessToken();
}

function getNewAccessToken(){
    var unique_id = '1@firstrespond.com'; //insert unique user identifier
    var timestamp = new Date().getTime();
    $.ajax({
        type: "POST",
        url: "https://apisandbox.moxtra.com/oauth/token",
        data: "client_id=" + mxenv.clientId + "&client_secret=" + mxenv.clientSecret + "&grant_type=http://www.moxtra.com/auth_uniqueid" + "&uniqueid=" + mxenv.unique_id + "&timestamp=" + timestamp + "&firstname=Supervisor" + "&language=en&orgid=" + mxenv.orgid,
        success: function(data) {
            var access_token = data.access_token;
            console.log(data.access_token);
            localStorage.setItem("token", access_token)
        }
    })
}

function getParameterByName( name ){
  name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
  var regexS = "[\\?&]"+name+"=([^&#]*)";
  var regex = new RegExp( regexS );
  var results = regex.exec( window.location.href );
  if( results == null )
    return "";
  else
    return decodeURIComponent(results[1].replace(/\+/g, " "));
}
