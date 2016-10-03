<%@ include file="/frameworks.jsp" %>
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="Moxtra is a contextual communication and collaboration SDK and API for mobile and web apps with modules such as Chat, Draw, Clip and Meet for ios, android, javascript and REST API">
    <meta name="author" content="Moxtra">
    <title>Moxtra Developer | Chat JS Sample Code</title>
    <%@ include file="/styles.jsp" %>
  </head>

  <body>
     <%@ include file="/topnav.jsp" %>
     <div class="container-fluid docs-container">
      <%!
      String top = "JS";
      String sub = "Chat";
      %>
      <%@ include file="/docs/docs-samplecode.jsp" %>
        <nav id="outline-pane">
            <ul class="nest">
                <li class="sub"><a href="#chat_full">Chat (Full View)</a></li>
                <li class="sub"><a href="#chat_only">Chat Only View</a></li>
                <li class="sub"><a href="#page_view">Pages View</a></li>
                <li class="sub"><a href="#todo_view">To-Do View</a></li>
                <li class="sub"><a href="#meet_view">Meet View</a></li>
            </ul>
        </nav>
      <div id="novel">
        <div class="inner">
            <div id="main-content" class="novel docs layout-docs-layout">
                <div class="inner">
                    <h1>JavaScript Sample Code - Chat</h1>
                    <section class="anchor" id="chat_full">
                        <h2>Chat (Full View)</h2>
                        <div class="code-button">
                            <a id="try_chat_full" class="btn btn-primary try-btn" role="button" data-target="#myModal" data-toggle="modal">Try Yourself</a>
                            <a href="https://gist.github.com/moxtradeveloper/af25ab69073020e764e409aaa1d51048/archive/8fe0050f686639f9baa48f08231d936a7eca44a6.zip" target="_blank" class="btn btn-primary" role="button">Download Code Sample</a>
                            <div id="chat-container" style="height:100%;min-height:100%"></div>
                            <div class="clear">
                                <p>&nbsp;&nbsp;&nbsp;</p>
                                <script src="https://gist.github.com/moxtradeveloper/af25ab69073020e764e409aaa1d51048.js"></script>
                                <link rel="stylesheet" href="https://assets-cdn.github.com/assets/gist/embed-da83046148bad9b15646a63deaa158bb4d2a95b81ed18adc1f387871fcfcf2f4.css">
                            </div>
                        </div>
                    </section>
                    <section class="anchor" id="chat_only">
                        <h2>Chat Only View</h2>
                        <div class="code-button">
                            <a id="try_chat_only" class="btn btn-primary try-btn" role="button" data-target="#myModal" data-toggle="modal">Try Yourself</a>
                            <a href="https://gist.github.com/moxtradeveloper/262d02fc985173e13cd8627772e0add3/archive/0fd0eee68eea084dee5db464e59f531b8d045509.zip" target="_blank" class="btn btn-primary" role="button">Download Code Sample</a>
                            <div class="clear">
                                <p>&nbsp;&nbsp;&nbsp;</p>
                                <script src="https://gist.github.com/moxtradeveloper/262d02fc985173e13cd8627772e0add3.js"></script>
                                <link rel="stylesheet" href="https://assets-cdn.github.com/assets/gist/embed-da83046148bad9b15646a63deaa158bb4d2a95b81ed18adc1f387871fcfcf2f4.css">
                            </div>
                        </div>
                    </section>
                    <section class="anchor" id="page_view">
                        <h2>Pages View</h2>
                        <div class="code-button">
                            <a id="try_page_view" class="btn btn-primary try-btn" role="button" data-target="#myModal" data-toggle="modal">Try Yourself</a>
                            <a href="https://gist.github.com/moxtradeveloper/977fe26366834b9536e0fc15d8d49dce/archive/b266c3fa8939e6adc9a74bccfff93d2b25a7c2fb.zip" target="_blank" class="btn btn-primary" role="button">Download Code Sample</a>
                            <div class="clear">
                                <p>&nbsp;&nbsp;&nbsp;</p>
                               <script src="https://gist.github.com/moxtradeveloper/977fe26366834b9536e0fc15d8d49dce.js"></script>
                                <link rel="stylesheet" href="https://assets-cdn.github.com/assets/gist/embed-da83046148bad9b15646a63deaa158bb4d2a95b81ed18adc1f387871fcfcf2f4.css">
                            </div>
                        </div>
                    </section>
                    <section class="anchor" id="todo_view">
                        <h2>To-Do View</h2>
                        <div class="code-button">
                            <a id="try_todo_view" class="btn btn-primary try-btn" role="button" data-target="#myModal" data-toggle="modal">Try Yourself</a>
                            <a href="https://gist.github.com/moxtradeveloper/b0f195ebb79c420c3e05ce59b9c95fd8/archive/06bb9a8d1519836f670bbb253ce39279f3cadcda.zip" target="_blank" class="btn btn-primary" role="button">Download Code Sample</a>
                            <div class="clear">
                                <p>&nbsp;&nbsp;&nbsp;</p>
                                <script src="https://gist.github.com/moxtradeveloper/b0f195ebb79c420c3e05ce59b9c95fd8.js"></script>
                                <link rel="stylesheet" href="https://assets-cdn.github.com/assets/gist/embed-da83046148bad9b15646a63deaa158bb4d2a95b81ed18adc1f387871fcfcf2f4.css">
                            </div>
                        </div>
                    </section>
                    <section class="anchor" id="meet_view">
                        <h2>Meet View</h2>
                        <div class="code-button">
                            <a id="try_meet_view" class="btn btn-primary try-btn" role="button" data-target="#myModal" data-toggle="modal">Try Yourself</a>
                            <a href="https://gist.github.com/moxtradeveloper/e1a023522b87b81f116d/download" target="_blank" class="btn btn-primary" role="button">Download Code Sample</a>
                            <div class="clear">
                                <p>&nbsp;&nbsp;&nbsp;</p>
                                <script src="https://gist.github.com/moxtradeveloper/e1a023522b87b81f116d.js"></script>
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

        document.getElementById("try_chat_full").addEventListener('click', function() {
            document.getElementById('modal-content').innerHTML = ''
            var chat_options = {
                //unique id of the users who will be part of the chat. These users should already exist in Moxtra.
                binder_id: binder_id,
                iframe: true,
                border: false,
                tagid4iframe: "modal-content",
                iframewidth: "100%",
                iframeheight: "500px",
                autostart_meet: true,
                autostart_note: true,
                extension: {
                    "show_dialogs": {
                        "member_invite": true
                    }
                },
                start_chat: function(event) {
                    console.log("Chat started binder ID: " + event.binder_id);
                    //Your application server can upload files to draw using the binder_id and access_token
                },
                start_meet: function(event) {
                    console.log("Meet started session key: " + event.session_key + " session id: " + event.session_id);
                },
                end_meet: function(event) {
                    console.log("Meet end event");
                },
                invite_member: function(event) {
                    console.log("Invite member into binder Id: " + event.binder_id);
                },
                request_note: function(event) {
                    console.log("Note start request");
                },
                error: function(event) {
                    console.log("Chat error code: " + event.error_code + " error message: " + event.error_message);
                }
            };
            Moxtra.chat(chat_options);
        })

        document.getElementById("try_chat_only").addEventListener('click', function() {
            document.getElementById('modal-content').innerHTML = ''
            var chat_options = {
                //unique id of the users who will be part of the chat. These users should already exist in Moxtra.
                binder_id: binder_id,
                iframe: true,
                border: false,
                //ID of the HTML tag within which the chat window will show up. Refer https://developer.grouphour.com/moxo/docs-js-sdk/#conversation
                tagid4iframe: "modal-content",
                iframewidth: "100%",
                iframeheight: "500px",
                autostart_note: false,
                start_chat: function(event) {
                    console.log("ChatView started session Id: " + event.session_id);
                },
                request_note: function(event) {
                    console.log("Note start request");
                },
                error: function(event) {
                    console.log("ChatView error code: " + event.error_code + " error message: " + event.error_message);
                }
            };
            Moxtra.chatView(chat_options);
        })

        document.getElementById("try_page_view").addEventListener('click', function() {
            document.getElementById('modal-content').innerHTML = '';
            var chat_options = {
                binder_id: binder_id,
                iframe: true,
                border: false,
                iframewidth: "100%",
                iframeheight: "500px",
                //ID of the HTML tag within which the chat window will show up. Refer https://developer.grouphour.com/moxo/docs-js-sdk/#conversation
                tagid4iframe: "modal-content",
                start_page: function(event) {
                    console.log("PageView started session Id: " + event.session_id);
                },
                share: function(event) {
                    console.log("Share session Id: " + event.session_id + " binder Id: " + event.binder_id + " page Ids: " + event.page_id);
                },
                error: function(event) {
                    console.log("PageView error code: " + event.error_code + " error message: " + event.error_message);
                }
            };
            Moxtra.pageView(chat_options);
        })

        document.getElementById("try_todo_view").addEventListener('click', function() {
            document.getElementById('modal-content').innerHTML = ''
            var dataString = {
                name: "demo"
            }
            $(".try-btn").removeAttr("disabled");
            var chat_options = {
                binder_id: binder_id,
                iframe: true,
                border: false,
                iframewidth: "100%",
                iframeheight: "500px",
                //ID of the HTML tag within which the chat window will show up. Refer https://developer.grouphour.com/moxo/docs-js-sdk/#conversation
                tagid4iframe: "modal-content",
                start_todo: function(event) {
                    console.log("TodoView started session Id: " + event.session_id);
                },
                error: function(event) {
                    console.log("Todo error code: " + event.error_code + " error message: " + event.error_message);
                }
            };
            Moxtra.todoView(chat_options);
        })

        document.getElementById("try_meet_view").addEventListener('click', function() {
            document.getElementById('modal-content').innerHTML = '';
            var chat_options = {
                //unique id of the users who will be part of the chat. These users should already exist in Moxtra.
                binder_id: binder_id,
                invite_members: true,
                iframe: true,
                border: false,
                iframewidth: "100%",
                iframeheight: "500px",
                //ID of the HTML tag within which the chat window will show up. Refer https://developer.grouphour.com/moxo/docs-js-sdk/#conversation
                tagid4iframe: "modal-content",
                start_meetview: function(event) {
                    console.log("MeetView started session Id: " + event.session_id);
                },
                start_meet: function(event) {
                    console.log("Meet started session key: " + event.session_key +
                        " session id: " + event.session_id + " binder id: " + event.binder_id);
                },
                end_meet: function(event) {
                    console.log("Meet end event");
                },
                error: function(event) {
                    console.log("MeetView error code: " + event.error_code + " error message: " + event.error_message);
                }
            };
            Moxtra.meetView(chat_options);
        })

    });
    </script>

  </body>
</html>
