/* Common app functionality */
/* Common app functionality */

var app = (function() {
    "use strict";

    var app = {};

    // Development
    app.baseUrl = "https://api.moxtra.com/v1/";
    app.redirectUrl = "https://moxtra1.com/tony/gmail/logincallback2.php";
    app.refreshurl = "https://moxtra1.com/tony/gmail/refresh.php";
    app.mode = "production";
    app.emailurl = "https://moxtra1.com/tony/gmail/sendemail.php";
    app.clientId = "spiDUIjwKNQ";
    app.binderEmailSuffix = "@moxtra.me";
    app.oAuthBaseUrl = "https://api.moxtra.com/oauth/authorize?client_id=";
    app.moxtraEmail = "";

    // Production
    // app.baseUrl = "https://api.moxtra.com/v1/";
    // app.redirectUrl = "https://moxtra1.com/gmail/logincallback.php";
    // app.refreshurl = "https://moxtra1.com/gmail/refresh.php";
    // app.mode = "production";
    // app.emailurl = "https://moxtra1.com/gmail/sendemail.php";
    // app.clientId = "rLXS20bbNSg";
    // app.binderEmailSuffix = "@moxtra.me";
    // app.oAuthBaseUrl = "https://api.moxtra.com/oauth/authorize?client_id=";
    // app.moxtraEmail = "";

    app.VerifyToken = function() {
        var accessToken = localStorage.getItem("tokenci");
        var request = $.ajax({
            'type': 'GET',
            'url': "https://api.moxtra.com/me?access_token=" + accessToken,
            'contentType': 'application/json',
            'dataType': 'json',
            'success': function(data) {
                return "success"
            },
            'async': false
        });

        request.error(function(httpObj, textStatus) {
            console.log("Ajax Error : " + httpObj.status);
            //refresh_token
            var refreshrequest = 'refresh_token=' + localStorage.getItem("refresh_token") + '&access_token=' + localStorage.getItem("tokenci")
            var refresh = $.ajax({
                'type': 'POST',
                'url': app.refreshurl,
                'data': refreshrequest,
                'success': function(data) {
                    data = JSON.parse(data)
                    try {
                        //                    console.log('verifydata' + data);
                        if (data.access_token && data.refresh_token) {
                            console.log('access_token refreshed');
                            localStorage.setItem("tokenci", data.access_token);
                            localStorage.setItem("refresh_token", data.refresh_token);
                            return "success";
                        }

                    } catch (e) {
                        console.log("verify fail");
                        $("#firstPage").hide();
                        $("#binderList").hide();
                        $("#tabs").hide();
                        $("#loginPage").show();
                        localStorage.removeItem("tokenci");
                        localStorage.removeItem("refrehs_token")
                            //app.loginAndInitMoxtra();
                    }
                },
                'async': false
            });
            refresh.error(function(httpObj, textStatus) {
                console.log("verify fail:" + JSON.stringify(httpObj));
                $("#firstPage").hide();
                $("#binderList").hide();
                $("#tabs").hide();
                $("#loginPage").show();
                localStorage.removeItem("tokenci");
                localStorage.removeItem("refresh_token")
                return "fail";

            });

        });
    }

    app.initMoxtra = function() {
        app.VerifyToken();
        var accessToken = localStorage.getItem("tokenci");
        app.accessToken = accessToken;
        var options = {
            mode: app.mode, //for production environment change to "production",
            client_id: app.clientId,
            sdk_version:3,
            access_token: accessToken, //valid access token from user authentication
            invalid_token: function(event) {
                //alert("Access Token expired for session id: " + event.session_id);
                localStorage.removeItem("tokenci");
                localStorage.removeItem("refresh_token")
                    //app.loginAndInitMoxtra();
            }
        };
        if (!String.prototype.startsWith) {
            String.prototype.startsWith = function(searchString, position) {
                position = position || 0;
                return this.substr(position, searchString.length) === searchString;
            };
        }

        $(document).ajaxError(function(event, jqxhr, settings, exception) {
            //console.log("Ajax Error");
            //console.log(jqxhr);
            //console.log(event);
            //console.log(settings);
            //console.log(exception);
            //console.log('-----------------------------------------------------------------');
            if (jqxhr.statusText.indexOf("NetworkError: Failed to execute") === 0) {
                //console.log("Removing old token");
                //localStorage.removeItem("tokenci");
                //app.loginAndInitMoxtra();
            }
        });



        //console.log("initializing moxtra!");
        // Moxtra.version = '/service3';
        Moxtra.init(options);
        // Moxtra.version = '/service3';

        $.getSync = function(url, callback) {
            var request = $.ajax({
                'type': 'GET',
                'url': url,
                'contentType': 'application/json',
                'dataType': 'json',
                'success': callback,
                'async': false
            });

            request.error(function(httpObj, textStatus) {
                console.log("Ajax Error : " + httpObj.status);
                if (httpObj.status === 401) {
                    localStorage.removeItem("tokenci");
                    localStorage.removeItem("refresh_token")
                        //app.loginAndInitMoxtra();
                }
            });
        };

        app.getSelfEmail = function() {
            try {
                if (app.accessToken == null)
                    app.accessToken = localStorage.getItem("tokenci");

                var url = app.baseUrl + "me?access_token=" + app.accessToken;
                //                console.log(url);
                $.getSync(url, function(data) {
                    //console.log(data);
                    app.moxtraEmail = data.data.email;
                    //console.log(app.moxtraEmail);
                });
            } catch (e) {

            }
        }

        $.postJSON = function(url, data, callback) {
            return jQuery.ajax({
                'type': 'POST',
                'url': url,
                'contentType': 'application/json',
                'data': JSON.stringify(data),
                'dataType': 'json',
                'success': callback
            });
        };



        String.prototype.endsWith = function(suffix) {
            return this.indexOf(suffix, this.length - suffix.length) !== -1;
        };

        if (!String.prototype.encodeHTML) {
            String.prototype.encodeHTML = function() {
                return this.replace(/&/g, '&amp;')
                    .replace(/</g, '&lt;')
                    .replace(/>/g, '&gt;')
                    .replace(/"/g, '&quot;')
                    .replace(/'/g, '&apos;');
            };
        }

        if (!Array.prototype.clean) {
            Array.prototype.clean = function(deleteValue) {
                for (var i = 0; i < this.length; i++) {
                    if (this[i] == deleteValue) {
                        this.splice(i, 1);
                        i--;
                    }
                }
                return this;
            };
        }

        app.getSelfEmail();
    }

    app.PopupCenter = function(url, title, w, h) {
            // Fixes dual-screen position                         Most browsers      Firefox
            var dualScreenLeft = window.screenLeft != undefined ? window.screenLeft : screen.left;
            var dualScreenTop = window.screenTop != undefined ? window.screenTop : screen.top;

            var width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width;
            var height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height;

            var left = ((width / 2) - (w / 2)) + dualScreenLeft;
            var top = ((height / 2) - (h / 2)) + dualScreenTop;
            var newWindow = window.open(url, title, 'scrollbars=yes, width=' + w + ', height=' + h + ', top=' + top + ', left=' + left);

            try {
                // Puts focus on the newWindow
                if (window.focus) {
                    newWindow.focus();
                }
            } catch (e) {

            }


            return newWindow;
        }
        /// This function gets all the binders for the user and the emails specified in the list of email addresses (emails)
    app.GetCommonBinders = function(emails, callback) {
        //console.log("[app] GetCommonBinders");
        //console.log("[app] for emails");
        if (app.accessToken == null) {
            try {
                app.accessToken = localStorage.getItem("tokenci");
                app.getSelfEmail();
            } catch (e) {

            }

        }

        if (app.accessToken == null) {
            console.log('access token null')
            window.location.reload(false);
        } else {
            if (emails.length > 0) {
                var url = app.baseUrl + "me/binders?access_token=" + app.accessToken + "&filter=all&sort=feeds&emails=" + emails;
                //            console.log(url);
                var request = $.get(url, function(data) {
                    //console.log(data);
                    request.success(function() {
                        // it worked fine!
                    });

                    request.error(function(httpObj, textStatus) {
                        console.log("Not logged in");
                        if (httpObj.status == 401) {
                            //localStorage.removeItem("tokenci");
                            //app.loginAndInitMoxtra();
                        }
                    });

                    callback(data);
                });
            }
        }

    }


    /// This function gets all the binders for the user
    app.GetAllBinders = function(emails, callback) {
            //console.log("[app] GetCommonBinders");
            //console.log("[app] for emails");
            if (app.accessToken == null) {
                try {
                    app.accessToken = localStorage.getItem("tokenci");
                    app.getSelfEmail();
                } catch (e) {

                }

            }

            if (app.accessToken == null) {
                console.log('access token null')
                window.location.reload(false);
            } else {
                var url = app.baseUrl + "me/binders?access_token=" + app.accessToken + "&filter=all&sort=feeds";
                var request = $.get(url, function(data) {
                    //console.log(data);
                    request.success(function() {
                        // it worked fine!
                    });

                    request.error(function(httpObj, textStatus) {
                        //console.log("Not logged in");
                        if (httpObj.status == 401) {
                            //localStorage.removeItem("tokenci");
                            //app.loginAndInitMoxtra();
                        }
                    });

                    callback(data);
                });
            }


        }
        /// Create new binder, invite users and add text
    app.newConversation = function(callback) {
        var subject = getSubject();

        if (isNullOrWhitespace(subject) === true)
            subject = "New Binder";

        // create binder
        $.postJSON(app.baseUrl + "me/binders?access_token=" + app.accessToken, {
            name: subject
        }, function(data) {
            //console.log("[app] newConversation");
            var binderid = data.data.id;

            getRecipients(function(emails) {

                // make user json object
                var data = {
                    users: []
                };

                var emailsarray = new Array();
                emailsarray = emails.split(",");

                emailsarray.forEach(function(email) {
                    data.users.push({
                        user: {
                            email: email
                        }
                    });
                });

                //                for(var email in emails){
                //                  data.users.push({ user: {email: email } });
                //                }



                // invite people
                $.postJSON(app.baseUrl + binderid + "/inviteuser?access_token=" + app.accessToken, data, function(inviteResponse) {

                    //// insert chat content -- commented because we send out email
                    //getEmailBody(function (data) {
                    //    var url = app.baseUrl + binderid + "/comments?access_token=" + app.accessToken;
                    //    $.postJSON(url, { text: data }, function (data) { });

                    //    // call back
                    //    callback(binderid);
                    //});
                    getBinderDetails(binderid, function(binderDetails) {
                        //                        console.log(binderDetails);
                        // forward email
                        //forwardEmail(binderDetails.data.binder_email, function (dataEws) {
                        //    console.log(dataEws);
                        //    // call back
                        callback(binderid);
                        //});
                    });

                });
            });

        });
    }

    function getBinderDetails(binderId, callback) {
        var url = app.baseUrl + "/" + binderId + "?access_token=" + app.accessToken;
        //        console.log(url);
        $.get(url, function(data) {
            //console.log(data);
            callback(data);
        });
    }

    app.addEmailTextToBinder = function(binder_email) {


        var dataString = 'from_email=' + app.moxtraEmail + '&message_subject=' + localStorage.getItem('subject') + '&message_body=' + encodeURIComponent(localStorage.getItem('mailbody')) + '&binder_email=' + binder_email
            //        console.log(dataString);
        $.ajax({
            type: "POST",
            url: app.emailurl,
            data: dataString,
            success: function() {
                console.log('email sent')
            }
        });
    }



    function isNullOrWhitespace(input) {

        if (typeof input === 'undefined' || input == null) return true;

        return input.replace(/\s/g, '').length < 1;
    }

    var moxtraEmailFix = function(emailsArray) {
        var dnameVal = localStorage.getItem('emailslist')
        var upperCaseNames = emailsArray.map(function(value) {
            return value.toUpperCase();
        });
        var pos = upperCaseNames.indexOf(dnameVal.toUpperCase());

        if (pos === -1) {
            //console.log("Nothing to fix in emails");
        } else {
            //console.log("Fix emails " + dnameVal + " > " + app.moxtraEmail);

            emailsArray.splice(pos, 1);
            pos = upperCaseNames.indexOf(app.moxtraEmail.toUpperCase());
            if (pos === -1) {
                emailsArray.push(app.moxtraEmail);
            }
        }
        emailsArray.clean("");
        return emailsArray;
    };
    app.moxtraEmailFix = moxtraEmailFix;
    var moxtraEmailFix2 = function(emailsArray) {
        var dnameVal = localStorage.getItem('emailslist')
        var upperCaseNames = emailsArray.map(function(value) {
            return value.toUpperCase();
        });
        var pos = upperCaseNames.indexOf(dnameVal.toUpperCase());

        if (pos === -1) {
            console.log("Nothing to fix in emails");
        } else {
            console.log("Fix emails " + dnameVal + " > " + app.moxtraEmail);

            emailsArray.splice(pos, 1);
        }

        return emailsArray;
    };
    app.moxtraEmailFix2 = moxtraEmailFix2;



    app.getRecipients = getRecipients;

    function getRecipients(callback) {

        var emails = localStorage.getItem('emailslist');
        //        var cleanupEmails = moxtraEmailFix(emails);
        callback(emails);
    }

    app.getRecipientsWithoutMoxtraEmail = getRecipientsWithoutMoxtraEmail;

    function getRecipientsWithoutMoxtraEmail(callback) {

        var emails = localStorage.getItem('emailslist');

        //console.log("CC: " + emails.join());
        //        var cleanupEmails = moxtraEmailFix2(emails);
        callback(emails);
    }




    app.getSubject = getSubject;

    function getSubject() {
        return localStorage.getItem('subject')
    }

    function getEmailBody() {
        return localStorage.getItem('mailbody')
    }

    /// oAuth flow and then init Moxtra JS SDK
    app.loginAndInitMoxtra = function(callback) {
        console.log("[app] loginAndInitMoxtra");

        var clientId = app.clientId;

        var oauthUrl = app.oAuthBaseUrl + clientId + "&redirect_uri=" + app.redirectUrl + "&response_type=code";

        //var popup = window.showModalDialog(oauthUrl, "window2", 'width=500,height=500,centerscreen=1,menubar=0,toolbar=0,location=0,personalbar=0,status=0,titlebar=0,dialog=1');
        //app.initMoxtra();
        //callback();


        var win = app.PopupCenter(oauthUrl, "Moxtra-oAuth", 500, 500);
        var pollTimer = window.setInterval(function() {
            if (win != undefined || win != null) {
                if (win.closed !== false) { // !== is required for compatibility with Opera
                    window.clearInterval(pollTimer);
                    if (localStorage.getItem("tokenci") != undefined || localStorage.getItem("tokenci") != null) {
                        app.initMoxtra();
                        if (callback)
                            callback();
                    }
                }
            } else {
                if (localStorage.getItem("tokenci") != undefined || localStorage.getItem("tokenci") != null) {
                    window.clearInterval(pollTimer);
                    app.initMoxtra();
                    if (callback)
                        callback();
                }
            }


        }, 1000);

    }
    app.ShowChatFull = function(binderId) {
        console.log("Starting chat with : " + binderId);
        $("#chattab").click();
        $("#chatfull").empty();
        var options = {
            binder_id: binderId,
            iframe: true,
            border: false,
            tagid4iframe: "chatfull",
            autostart_note: false,
            iframewidth: "100%",
            iframeheight: "100%",
            //scroll: false,
            //start_chat: function (event) {
            //    alert("ChatView started session Id: " + event.session_id);
            //},
            //request_note: function (event) {
            //    alert("Note start request");
            //},
            error: function(event) {

                console.log("ChatView error code: " + event.error_code + " error message: " + event.error_message);
                if (event.error_code == 401) {
                    logout();
                } else {
                    $('#goToBinderList').click(function() {
                        logout();
                    })
                }
            }
        };
        Moxtra.chat(options);

    }


    /// This function gets all the binders for the user and the emails specified in the list of email addresses (emails)
    app.GetMyBinders = function(callback) {
        $.get(app.baseUrl + "me/binders?access_token=" + app.accessToken, function(data) {
            console.log("[app] GetMyBinders");
            callback(data);
        });
    }

    return app;
})();
