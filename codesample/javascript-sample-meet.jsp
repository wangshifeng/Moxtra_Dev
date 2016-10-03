<%@ include file="/frameworks.jsp" %>
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="Moxtra is a contextual communication and collaboration SDK and API for mobile and web apps with modules such as Chat, Draw, Clip and Meet for ios, android, javascript and REST API">
    <meta name="author" content="Moxtra">
    <title>Moxtra Developer | Meet JS Sample Code</title>
    <%@ include file="/styles.jsp" %>
  </head>

  <body>
     <%@ include file="/topnav.jsp" %>
     <div class="container-fluid docs-container">
      <%!
      String top = "JS";
      String sub = "Meet";
      %>
      <%@ include file="/docs/docs-samplecode.jsp" %>
        <nav id="outline-pane">
            <ul class="nest">
                <li class="sub"><a href="#start_meet">Start Meet</a></li>
                <li class="sub"><a href="#join_meet">Join Meet</a></li>
                <li class="sub"><a href="#leave_meet">Leave Meet</a></li>
                <li class="sub"><a href="#end_meet">End Meet</a></li>
            </ul>
        </nav>
      <div id="novel">
        <div class="inner">
            <div id="main-content" class="novel docs layout-docs-layout">
                <div class="inner">
                    <h1>JavaScript Sample Code - Meet</h1>
                    <section class="anchor" id="start_meet">
                        <h2>Start Meet</h2>
                        <div class="code-button">
                            <a id="try_start_meet" class="btn btn-primary try-btn" role="button" data-target="#start_meet_modal" data-toggle="modal">Try Yourself</a>
                            <a href="https://gist.github.com/moxtradeveloper/84749851968658f1830ccd2d17d0c854/archive/f01dcc5f52a88083de223d4cc0abb5cc52d7249d.zip" target="_blank" class="btn btn-primary" role="button">Download Code Sample</a>
                            <div id="chat-container" style="height:100%;min-height:100%"></div>
                            <div class="clear">
                                <p>&nbsp;&nbsp;&nbsp;</p>
                                <script src="https://gist.github.com/moxtradeveloper/84749851968658f1830ccd2d17d0c854.js"></script>
                                <link rel="stylesheet" href="https://assets-cdn.github.com/assets/gist/embed-da83046148bad9b15646a63deaa158bb4d2a95b81ed18adc1f387871fcfcf2f4.css">
                            </div>
                        </div>
                    </section>
                    <section class="anchor" id="join_meet">
                        <h2>Join Meet</h2>
                        <div class="code-button">
                            <a id="try_join_meet" class="btn btn-primary" role="button" data-target="#join_meet_modal" data-toggle="modal">Try Yourself</a>
                            <a href="https://gist.github.com/moxtradeveloper/30f75c17359e4b096543732e09a143c6/archive/459a047d373c233793b86d7fe4ceedd23320df4a.zip" target="_blank" class="btn btn-primary" role="button">Download Code Sample</a>
                            <div class="clear">
                                <p>&nbsp;&nbsp;&nbsp;</p>
                                <script src="https://gist.github.com/moxtradeveloper/30f75c17359e4b096543732e09a143c6.js"></script>
                                <link rel="stylesheet" href="https://assets-cdn.github.com/assets/gist/embed-da83046148bad9b15646a63deaa158bb4d2a95b81ed18adc1f387871fcfcf2f4.css">
                            </div>
                        </div>
                    </section>
                </div>
            </div>
            <div id="start_meet_modal" class="modal fade" role="dialog">
                <div class="modal-dialog" style="width:1000px">
                    <div class="modal-content" style="padding:0">
                        <div id="start_meet_container" class="modal-body">
                        </div>
                    </div>
                </div>
            </div>
            <div id="join_meet_modal" class="modal fade" role="dialog">
                <div class="modal-dialog" style="width:1000px">
                    <div class="modal-content" style="padding:0">
                        <div id="join_meet_container" class="modal-body">
                        </div>
                    </div>
                </div>
            </div>
            <div id="ameet-container" style="height:100%;min-height:100%"></div>
        </div>
        <%@ include file="/footer.jsp" %>
      </div>
    </div>
    <%@ include file="/scripts.jsp" %>
    <script type="text/javascript" src="https://www.moxtra.com/api/js/moxtra-latest.js" id="moxtrajs"></script>
    <!-- Login/Logout Script -->
    <script type="text/javascript" charset="utf-8">
    $(document).ready(function() {
        //Initialize Moxtra SDK Object
        var mode = 'sandbox';
        var client_id = 'vI8aRc22cNU';
        var client_secret = 'uTuM6d60vT4';
        var timestamp = new Date().getTime();
        var unique_id = Math.random().toString(36).substring(7);
        var access_token;

        $.post('https://apisandbox.moxtra.com/oauth/token', "client_id=" + client_id + "&client_secret=" + client_secret + "&grant_type=http://www.moxtra.com/auth_uniqueid" + "&uniqueid=" + unique_id + "&timestamp=" + timestamp + "&language=en&firstname=demo", function(data) {
            access_token = data.access_token;
            console.log(access_token);
            $(".try-btn").removeAttr("disabled");
            var options = {
                mode: mode,
                client_id: client_id, //
                access_token: access_token,
                sdk_version: 3,
                invalid_token: function(event) {
                    //Triggered when the access token is expired or invalid
                    alert("Access Token expired for session id: " + event.session_id);
                }
            };
            Moxtra.init(options);
        }, 'json');

        document.getElementById("try_start_meet").addEventListener('click', function() {
            var meet_options = {
                iframe: true, //To open the meet in the same window within an iFrame.
                // tab: true, //To open the meet in a new browser tab, N/A if iframe option is set to true.
                border: false,
                tagid4iframe: "start_meet_container", //ID of the HTML tag within which the Meet window will show up. Refer https://developer.grouphour.com/moxo/docs-js-sdk/#meet
                iframewidth: "100%",
                iframeheight: "500px",
                extension: {
                    "show_dialogs": {
                        "meet_invite": true
                    }
                },
                start_meet: function(event) {
                    console.log("Meet Started - session_id: " + event.session_id + "session_key: " + event.session_key);
                    //Your application server can upload files to meet using the session_id and session_key;
                },
                error: function(event) {
                    console.log("error code: " + event.error_code + " message: " + event.error_message);
                },
                end_meet: function(event) {
                    console.log("Meet Ended");
                    $('#start_meet_modal').modal('hide');
                }
            };
            Moxtra.meet(meet_options);
        })

        document.getElementById("try_join_meet").addEventListener('click', function() {
            var join_sessionkey = prompt("Please Enter a Meet ID to join a meet.", "Meet ID");
            if (join_sessionkey) {
                var join_options = {
                    iframe: true,
                    border: false,
                    session_key: join_sessionkey,
                    user_name: "Joe Smith",
                    tagid4iframe: "join_meet_container", //ID of the HTML tag within which the Meet window will show up. Refer https://developer.grouphour.com/moxo/docs-js-sdk/#meet
                    iframewidth: "100%",
                    iframeheight: "500px",
                    extension: {
                        "show_dialogs": {
                            "meet_invite": true
                        }
                    },
                    start_meet: function(event) {
                        concole.log("session key: " + event.session_key + " session id: " + event.session_id);
                    },
                    error: function(event) {
                        console.log("error code: " + event.error_code + " message: " + event.error_message);
                    },
                    end_meet: function(event) {
                        console.log("Meet ended by host event");
                        $('#myModal').modal('hide');
                    },
                    exit_meet: function(event) {
                        console.log("Meet exit event");
                        $('#myModal').modal('hide');
                    }
                };
                Moxtra.joinMeet(join_options);
            } else {
                document.getElementById('join_meet_container').innerHTML = 'No Meet ID found';
            }

        })
    });
    </script>


</body>

</html>