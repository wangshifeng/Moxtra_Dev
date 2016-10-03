<%@ include file="/frameworks.jsp" %>
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="Moxtra is a contextual communication and collaboration SDK and API for mobile and web apps with modules such as Chat, Draw, Clip and Meet for ios, android, javascript and REST API">
    <meta name="author" content="Moxtra">
    <title>Moxtra Developer | Draw JS Sample Code</title>
    <%@ include file="/styles.jsp" %>
  </head>

  <body>
     <%@ include file="/topnav.jsp" %>
     <div class="container-fluid docs-container">
      <%!
      String top = "JS";
      String sub = "Draw";
      %>
      <%@ include file="/docs/docs-samplecode.jsp" %>
        <nav id="outline-pane">
            <ul class="nest">
                <li class="sub"><a href="#chat_full">Start Annotation</a></li>
            </ul>
        </nav>
      <div id="novel">
        <div class="inner">
            <div id="main-content" class="novel docs layout-docs-layout">
                <div class="inner">
                    <h1>JavaScript Sample Code - Draw</h1>
                    <section class="anchor" id="chat_full">
                        <h2>Start Annotation</h2>
                        <div class="code-button">
                            <a id="try_start_draw" class="btn btn-primary try-btn" role="button" data-target="#myModal" data-toggle="modal">Try Yourself</a>
                            <a href="https://gist.github.com/moxtradeveloper/971d4f5ab040d6074c1cbf21bce93fff/archive/bb2f99c03d2ef93d6d0ac3f8aabeddfdde9719a5.zip" target="_blank" class="btn btn-primary" role="button">Download Code Sample</a>
                            <div id="chat-container" style="height:100%;min-height:100%"></div>
                            <div class="clear">
                                <p>&nbsp;&nbsp;&nbsp;</p>
                                <script src="https://gist.github.com/moxtradeveloper/971d4f5ab040d6074c1cbf21bce93fff.js"></script>
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
        var binder_id

        $.post('https://apisandbox.moxtra.com/oauth/token', "client_id=" + client_id + "&client_secret=" + client_secret + "&grant_type=http://www.moxtra.com/auth_uniqueid" + "&uniqueid=" + unique_id + "&timestamp=" + timestamp + "&language=en&firstname=demo", function(data) {
            access_token = data.access_token;
            console.log(access_token);
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
                    var dataString = 'binder_id=' + binder_id + '&access_token=' + access_token;
                    $.ajax({
                        'type': 'POST',
                        'data': dataString,
                        'url': 'http://moxtradev:8888/js_demo/web_code/upload.php',
                        'success': function(data) {
                            Moxtra.init(options);
                            $(".try-btn").removeAttr("disabled");
                        },
                        'error': function(data) {
                            console.log(data);
                        },
                        'async': false
                    });

                },
                'error': function(data) {
                    console.log(data);
                },
                'async': false
            });
        }, 'json');

        document.getElementById("try_start_draw").addEventListener('click', function() {
            // document.getElementById('modal-content').innerHTML = ''
            var draw_options = {
                //unique id of the users who will be part of the chat. These users should already exist in Moxtra.
                binder_id: binder_id,
                iframe: true,
                border: false,
                //ID of the HTML tag within which the chat window will show up. Refer https://developer.grouphour.com/moxo/docs-js-sdk/#conversation
                tagid4iframe: "modal-content",
                iframewidth: "100%",
                iframeheight: "500px",
                autostart_meet: true,
                autostart_note: true,
                start_annotate: function(event) {
                    console.log("Draw Started - session_id: " + event.session_id + "binder_id: " + event.binder_id);
                    //Your application server can upload files to draw using the binder_id and access_token
                },
                error: function(event) {
                    console.log("error code: " + event.error_code + " message: " + event.error_message);
                },
                stop_annotate: function(event) {
                    console.log("Share URL: " + event.share_url + " Binder ID: " + event.binder_id + " Download URL: " + event.download_url);
                    $('#myModal').modal('hide');
                }
            };
            Moxtra.annotate(draw_options);
        })

    });
    </script>


</body>

</html>