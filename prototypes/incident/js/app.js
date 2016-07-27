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
mxenv.clientId = "gMaE3XkcwTQ";
mxenv.clientSecret = "mosG41jUJSs";
mxenv.oAuthBaseUrl = "https://apisandbox.moxtra.com/oauth/authorize?client_id=";
mxenv.mode = "sandbox";



if (!localStorage.getItem("token")) {
    var client_id = mxenv.clientId; //insert your client_id here
    var client_secret = mxenv.clientSecret; //insert your client_secret here
    var unique_id = '1@test.com'; //insert unique user identifier
    var timestamp = new Date().getTime();
    var binderId = getParameterByName("binderId");
    console.log(binderId);
    $.ajax({
        type: "POST",
        url: "https://apisandbox.moxtra.com/oauth/token",
        data: "client_id=" + client_id + "&client_secret=" + client_secret + "&grant_type=http://www.moxtra.com/auth_uniqueid" + "&uniqueid=" + unique_id + "&timestamp=" + timestamp + "&firstname=Alice" + "&language=en",
        success: function(data) {
            var access_token = data.access_token;
            console.log(data.access_token);
            localStorage.setItem("token", access_token)
        }
    })
}