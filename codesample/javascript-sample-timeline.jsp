<%@ include file="/frameworks.jsp" %>
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="Moxtra is a contextual communication and collaboration SDK and API for mobile and web apps with modules such as Chat, Draw, Clip and Meet for ios, android, javascript and REST API">
    <meta name="author" content="Moxtra">
    <title>Moxtra Developer | Timeline JS Sample Code</title>
    <%@ include file="/styles.jsp" %>
  </head>

  <body>
     <%@ include file="/topnav.jsp" %>
     <div class="container-fluid docs-container">
      <%!
      String top = "JS";
      String sub = "Timeline";
      %>
      <%@ include file="/docs/docs-samplecode.jsp" %>
        <nav id="outline-pane">
            <ul class="nest">
                <li class="sub"><a href="#chat_full">Timeline (Full View)</a></li>
                <li class="sub"><a href="#chat_only">Chat List</a></li>
            </ul>
        </nav>

      <div id="novel">
        <div class="inner">
            <div id="main-content" class="novel docs layout-docs-layout">
                <div class="inner">
                    <h1>JavaScript Sample Code - Timeline</h1>
                    <section class="anchor" id="chat_full">
                        <h2>Timeline (Full View)</h2>
                        <div class="code-button">
                            <a id="try_timeline_full" class="btn btn-primary try-btn" role="button" data-target="#myModal" data-toggle="modal">Try Yourself</a>
                            <a href="https://gist.github.com/moxtradeveloper/5b92a1892b7329de0707a688fab0f9f7/archive/92bac0088281b1500d76b983d2220d3f57d76875.zip" target="_blank" class="btn btn-primary" role="button">Download Code Sample</a>
                            <div id="chat-container" style="height:100%;min-height:100%"></div>
                            <div class="clear">
                                <p>&nbsp;&nbsp;&nbsp;</p>
                                <script src="https://gist.github.com/moxtradeveloper/5b92a1892b7329de0707a688fab0f9f7.js"></script>
                                <link rel="stylesheet" href="https://assets-cdn.github.com/assets/gist/embed-da83046148bad9b15646a63deaa158bb4d2a95b81ed18adc1f387871fcfcf2f4.css">
                            </div>
                        </div>
                    </section>
                    <section class="anchor" id="chat_only">
                        <h2>Chat List</h2>
                        <div class="code-button">
                            <a id="try_chat_only" class="btn btn-primary try-btn" role="button" data-target="#myModal" data-toggle="modal">Try Yourself</a>
                            <a href="https://gist.github.com/moxtradeveloper/43f3208da7621dd9ba42db60973a8b52/archive/36d16d5b753c93f7ae8b05e2e585e88ffb5a4237.zip" target="_blank" class="btn btn-primary" role="button">Download Code Sample</a>
                            <div class="clear">
                                <p>&nbsp;&nbsp;&nbsp;</p>
                                <script src="https://gist.github.com/moxtradeveloper/43f3208da7621dd9ba42db60973a8b52.js"></script>
                                <link rel="stylesheet" href="https://assets-cdn.github.com/assets/gist/embed-da83046148bad9b15646a63deaa158bb4d2a95b81ed18adc1f387871fcfcf2f4.css">
                            </div>
                        </div>
                    </section>
                </div>
            </div>
            <div id="myModal" class="modal fade" role="dialog">
                <div class="modal-dialog" style="width:1000px">
                    <!-- Modal content-->
                    <div class="modal-content" style="padding:0">
                        <div id="modal-content" class="modal-body">
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
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
            dataString = {
                name: "demo"
            }
            $.ajax({
                'type': 'POST',
                'data': JSON.stringify(dataString),
                'dataType': 'json',
                'contentType': 'application/json',
                'url': 'https://apisandbox.moxtra.com/me/binders?access_token=' + access_token,
                'success': function(data) {
                    binder_id = data.data.id;
                    $(".try-btn").removeAttr("disabled");
                },
                'error': function(data) {
                    console.log(data);
                },
                'async': false
            });
        }, 'json');

        document.getElementById("try_timeline_full").addEventListener('click', function() {
            document.getElementById('modal-content').innerHTML = ''
            var timeline_options = {
                //unique id of the users who will be part of the chat. These users should already exist in Moxtra.
                unique_id: unique_id,
                iframe: true,
                border: false,
                //ID of the HTML tag within which the chat window will show up. Refer https://developer.grouphour.com/moxo/docs-js-sdk/#conversation
                tagid4iframe: "modal-content",
                iframewidth: "100%",
                iframeheight: "500px",
                autostart_meet: true,
                autostart_note: true,
                extension: {
                    "show_dialogs": {
                        "meet_invite": true
                    }
                },
                request_create_binder: function(event) {
                    dataString = {
                        name: "New Binder"
                    }
                    $.ajax({
                        'type': 'POST',
                        'data': JSON.stringify(dataString),
                        'dataType': 'json',
                        'contentType': 'application/json',
                        'url': 'https://api.moxtra.com/me/binders?access_token=' + access_token,
                        'success': function(data) {
                            binder_id = data.data.id;
                            $(".try-btn").removeAttr("disabled");
                        },
                        'error': function(data) {
                            console.log(data);
                        },
                        'async': false
                    });
                },
                error: function(event) {
                    console.log("Timeline error code: " + event.error_code + " error message: " + event.error_message);
                }
            };
            Moxtra.timeline(timeline_options);
        })

        document.getElementById("try_chat_only").addEventListener('click', function() {
            document.getElementById('modal-content').innerHTML = ''
            var chat_options = {
                iframe: true,
                border: false,
                tagid4iframe: "modal-content",
                iframewidth: "100%",
                iframeheight: "500px",
                start_timeline: function(event) {
                    console.log("TimelineView started session Id: " + event.session_id);
                },
                request_view_binder: function(event) {
                    console.log("Request to view binder Id " + event.binder_id);
                },
                error: function(event) {
                    alert("TimelineView error code: " + event.error_code + " error message: " + event.error_message);
                }
            };
            Moxtra.timelineView(chat_options);
        })

    });
    </script>


</body>

</html>