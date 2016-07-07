if (window !== null && window.location !== null && window.location.href !== null && window.location.href.indexOf("access_token") !== -1 && window.location.href.indexOf("refresh_token") !== -1) {
    var access_token = window.location.href.split("?")[1].split("&")[0].split("=")[1];
    localStorage.setItem("tokenci", access_token);
    var refresh_token = window.location.href.split("?")[1].split("&")[1].split("=")[1];
    localStorage.setItem("refresh_token",refresh_token);

    window.close();

}
else{
    console.log('no access token or refresh token')
}