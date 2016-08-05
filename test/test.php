<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8" />

    <!-- Include Moxtra JavaScript Library -->
    <script type="text/javascript" src="https://www.moxtra.com/api/js/moxtra-latest.js" id="moxtrajs"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js"></script>

    <!-- Before making any calls with Moxtra SDK, authenticate the user and get the access token -->
    <!-- Refer to the doc at https://developer.moxtra.com/docs/docs-js-sdk/ to authenticate user based on UniqueID Method -->
    <!-- For other authentication methods and overview refer to the doc at https://developer.moxtra.com/docs/docs-authentication/ -->
    <script type="text/javascript">
        var mode = 'sandbox';
        var client_id = 'i-iX-exWQQY'; //insert your client_id here
        var client_secret = 'qyHAGniHBbM'; //insert your client_secret here
        var unique_id = 'tony.xu@moxtra.com'; //insert unique user identifier
        var timestamp = new Date().getTime();
        $.ajax({
            type: "POST",
            url: "https://apisandbox.moxtra.com/oauth/token",
            data: "client_id=" + client_id + "&client_secret=" + client_secret + "&grant_type=http://www.moxtra.com/auth_uniqueid" + "&uniqueid=" + unique_id + "&timestamp=" + timestamp + "&firstname=Alice" + "&language=en",
            success: function (data) {
                var access_token = data.access_token;
                console.log(data.access_token);
                var options = {
                    mode: "sandbox",
                    client_id: client_id,
                    access_token: access_token,
                    invalid_token: function (event) {
                        //Triggered when the access token is expired or invalid
                        alert("Access Token expired for session id: " + event.session_id);
                    }
                };
                Moxtra.init(options);
            }
        })
    </script>

    <script type="text/javascript">
        // start meet function
        function start_meet() {
            var meet_options = {
            //iframe: true, //To open the meet in the same window within an iFrame.
            tab: true, //To open the meet in a new browser tab, N/A if iframe option is set to true.
            //tagid4iframe: "meet-container", //ID of the HTML tag within which the Meet window will show up. Refer https://developer.grouphour.com/moxo/docs-js-sdk/#meet
            //iframewidth: "1000px",
            //iframeheight: "750px",
            extension: {
                "show_dialogs": {
                    "meet_invite": true
                }
            },
            start_meet: function(event) {
                console.log("Meet Started - session_id: " + event.session_id + "session_key: " + event.session_key);
                //Your application server can upload files to meet using the session_id and session_key
            },
            error: function(event) {
                console.log("error code: " + event.error_code + " message: " + event.error_message);
            },
            end_meet: function(event) {
                console.log("Meet Ended");
            },
            video: true
        };
        console.log("moxtra.meet started")
        Moxtra.meet(meet_options);
        }

        // end meet function
        function end_meet() {
            Moxtra.endMeet();
        }

        // leave meet function
        function leave_meet() {
            Moxtra.leaveMeet();
        }
    </script>

</head>

<body>
    <h3><a id="start" href="javascript:start_meet();">Start Meet</a></h3>
    <div id="meet-container"></div>
    <h3><a id="end" href="javascript:end_meet();">End Meet</a></h3>
    <h3><a id="leave" href="javascript:leave_meet();">Leave Meet</a></h3>
</body>

</html>