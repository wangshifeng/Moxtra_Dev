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



if (!localStorage.getItem("token")) {
    var unique_id = '1@firstrespond.com'; //insert unique user identifier
    var timestamp = new Date().getTime();
    var binderId = getParameterByName("binderId");
    console.log(binderId);
    $.ajax({
        type: "POST",
        url: "https://apisandbox.moxtra.com/oauth/token",
        data: "client_id=" + mxenv.clientId + "&client_secret=" + mxenv.clientSecret + "&grant_type=http://www.moxtra.com/auth_uniqueid" + "&uniqueid=" + mxenv.unique_id + "&timestamp=" + timestamp + "&firstname=Supervisor" + "&language=en&orgid="+mxenv.orgid,
        success: function(data) {
            var access_token = data.access_token;
            console.log(data.access_token);
            localStorage.setItem("token", access_token)
        }
    })
}