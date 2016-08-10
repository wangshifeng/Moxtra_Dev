/* Common app functionality */

var app = (function() {
    "use strict";

    var app = {};

    // Production
    app.baseUrl = "https://api.moxtra.com/v1/";
    var redirectUrl = "https://www.moxtra1.com/outlook/AppRead/Home/logincallback.php";
    app.mode = "production";
    app.clientId = "YTIzMjczOTM";
    app.oAuthBaseUrl = "https://api.moxtra.com/oauth/authorize?client_id=";

    //// Development/Sandbox
    //app.baseUrl = "https://apisandbox.moxtra.com/v1/";
    //var redirectUrl = "https://localhost:44300/AppCompose/Home/logincallback.html";
    //app.mode = "sandbox";
    //app.clientId = "kCAEwyu0OrE";
    //app.oAuthBaseUrl = "https://apisandbox.moxtra.com/oauth/authorize?client_id=";

    app.accessToken = null;
    app.moxtraEmail = "";

    // To verify invalid token - 0608
    app.VerifyToken = function() {
        var accessToken = localStorage.getItem("tokenci");
        console.log("https://api.moxtra.com/me?access_token=" + accessToken);
        var request = $.ajax({
            'type': 'GET',
            'url': "https://api.moxtra.com/me?access_token=" + accessToken,
            'contentType': 'application/json',
            'dataType': 'json',
            'success': function(data) {
                try {
                    console.log('verifydata' + data);
                    if (data.contains("incorrect token")) {
                        console.log('incorrect token');
                        $("#binderList").hide();
                        $("#loginPage").hide();
                        localStorage.removeItem("tokenci");
                        window.location.reload(false);
                    }
                } catch (e) {

                }
            },
            'async': false
        });

        request.error(function(httpObj, textStatus) {
            console.log("Ajax Error : " + httpObj.status);
            if (httpObj.status === 401) {
                $("#binderList").hide();
                $("#loginPage").hide();
                localStorage.removeItem("tokenci");
                window.location.reload(false);
                //app.loginAndInitMoxtra();
            }
        });
    }

    app.VerifyToken = function() {
        app.accessToken = localStorage.getItem("tokenci");
        if (app.accessToken == null || app.accessToken == "") {
            $("#binderList").hide();
            $("#tabs").hide();
            $("#loginPage").show();
        } else {
            var request = $.ajax({
                'type': 'GET',
                'url': "https://api.moxtra.com/me?access_token=" + app.accessToken,
                'contentType': 'application/json',
                'dataType': 'json',
                'success': function(data) {
                    return "success"
                },
                'async': false
            });

            request.error(function(httpObj, textStatus) {
                console.log("Ajax Error : " + httpObj.status);

                var refreshrequest = 'refresh_token=' + localStorage.getItem("refresh_token") + '&access_token=' + localStorage.getItem("tokenci")
                var refresh = $.ajax({
                    'type': 'POST',
                    'url': "https://www.moxtra1.com/outlook/Server/refresh.php",
                    'data': refreshrequest,
                    'success': function(data) {
                        console.log(data);
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
                            localStorage.removeItem("tokenci");
                            localStorage.removeItem("refrehs_token");
                            $("#binderList").hide();
                            $("#tabs").hide();
                            $("#loginPage").show();
                            localStorage.removeItem("tokenci");
                        }
                    },
                    'async': false
                });
                refresh.error(function(httpObj, textStatus) {
                    console.log("verify fail:" + JSON.stringify(httpObj));
                    localStorage.removeItem("tokenci");
                    localStorage.removeItem("refresh_token");
                    $("#binderList").hide();
                    $("#tabs").hide();
                    $("#loginPage").show();
                    localStorage.removeItem("tokenci");

                });
            });
        }

    }



    app.initMoxtra = function() {
        // Authenticate
        app.VerifyToken();
        var accessToken = localStorage.getItem("tokenci");
        app.accessToken = accessToken;
        var options = {
            mode: app.mode, //for production environment change to "production"
            client_id: app.clientId,
            access_token: accessToken, //valid access token from user authentication
            invalid_token: function(event) {
                localStorage.removeItem("tokenci");
                console.log("Access Token expired for session id: " + event.session_id);
                loginAndInitMoxtra();
            }
        };

        //console.log("initializing moxtra!");
        Moxtra.init(options);

        $(document).ajaxError(function(event, jqxhr, settings, exception) {
            //console.log("Ajax Error");
            //console.log(jqxhr);
            //console.log(event);
            //console.log(settings);
            //console.log(exception);
            //console.log('-----------------------------------------------------------------');
            if (jqxhr.statusText.indexOf("NetworkError: Failed to execute") === 0) {
                //               console.log("Removing old token");
                localStorage.removeItem("tokenci");
                app.loginAndInitMoxtra();
            }
        });


        $.getSync = function(url, callback) {
            return jQuery.ajax({
                'type': 'GET',
                'url': url,
                'contentType': 'application/json',
                'dataType': 'json',
                'success': callback,
                'async': false
            });
        };

        try {
            if (app.accessToken == null)
                app.accessToken = localStorage.getItem("tokenci");

            var url = app.baseUrl + "me?access_token=" + app.accessToken;
            // console.log(url);
            $.getSync(url, function(data) {
                //console.log(data);
                app.moxtraEmail = data.data.email;
                // console.log(app.moxtraEmail);
            });
        } catch (e) {

        }

        if (!String.prototype.encodeHTML) {
            String.prototype.encodeHTML = function() {
                return this.replace(/&/g, '&amp;')
                    .replace(/</g, '&lt;')
                    .replace(/>/g, '&gt;')
                    .replace(/"/g, '&quot;')
                    .replace(/'/g, '&apos;');
            };
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
        //console.log(emails);

        if (emails.length > 0) {
            var url = app.baseUrl + "me/binders?access_token=" + app.accessToken + "&filter=all&emails=" + emails.join();
            $.get(url, function(data) {
                //console.log(data);
                callback(data);
            }).success(function() {
                // it worked fine!
            }).error(function(httpObj, textStatus) {
                //console.log("Not logged in");
                if (httpObj.status == 401) {
                    //localStorage.removeItem("tokenci");
                    //window.location.reload();
                }
            });
        }
    }


    /// oAuth flow and then init Moxtra JS SDK
    app.loginAndInitMoxtra = function(callback) {
        console.log("[app] loginAndInitMoxtra");

        var clientId = app.clientId;

        var oauthUrl = app.oAuthBaseUrl + clientId + "&redirect_uri=" + redirectUrl + "&response_type=code";

        //var popup = window.showModalDialog(oauthUrl, "window2", 'width=500,height=500,centerscreen=1,menubar=0,toolbar=0,location=0,personalbar=0,status=0,titlebar=0,dialog=1');
        //app.initMoxtra();
        //callback();

        var is_chrome = navigator.userAgent.indexOf('Chrome') > -1;
        var is_explorer = navigator.userAgent.indexOf('MSIE') > -1 || navigator.userAgent.indexOf('Trident') > -1;
        var is_firefox = navigator.userAgent.indexOf('Firefox') > -1;
        var is_safari = navigator.userAgent.indexOf("Safari") > -1;
        var is_opera = navigator.userAgent.toLowerCase().indexOf("op") > -1;
        if ((is_chrome) && (is_safari)) { is_safari = false; }
        if ((is_chrome) && (is_opera)) { is_chrome = false; }

        //to overcome IE tokenci first time detection failure - 0608
        if (is_explorer) {
            var win = app.PopupCenter(oauthUrl, "Moxtra-oAuth", 500, 500);
            var pollTimer = window.setInterval(function() {
                if (win != undefined || win != null) {
                    console.log('115');
                    if (win.closed !== false) { // !== is required for compatibility with Opera
                        console.log('116');
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


            }, 2000);
        } else if (!is_safari) {
            console.log('111');
            var win = app.PopupCenter(oauthUrl, "Moxtra-oAuth", 500, 500);
            var pollTimer = window.setInterval(function() {
                if (win != undefined || win != null) {
                    console.log('112');
                    if (win.closed !== false) { // !== is required for compatibility with Opera
                        console.log('114');
                        window.clearInterval(pollTimer);
                        // to solve close window refresh problem - 0608
                        if (localStorage.getItem("tokenci") != undefined || localStorage.getItem("tokenci") != null) {
                            console.log('113');
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


            }, 2000);
        } else {
            var winsafari = app.PopupCenter(oauthUrl, "Moxtra-oAuth", 500, 500);
            var pollTimersafari = window.setInterval(function() {
                console.log('pollStart')
                try {
                    // We open a popup window and let the user authenticate
                    // we poll if the window url has changed and has a access token
                    if (winsafari.location.href.indexOf("access_token") !== -1 && winsafari.location.href.indexOf("refresh_token") !== -1) {
                        console.log('1')
                        window.clearInterval(pollTimersafari);
                        var access_token = winsafari.location.href.split("?")[1].split("&")[0].split("=")[1];
                        var refresh_token = winsafari.location.href.split("?")[1].split("&")[1].split("=")[1];
                        localStorage.setItem("tokenci", access_token);
                        localStorage.setItem("refresh_token", refresh_token);
                        app.accessToken = access_token;
                        winsafari.close();
                        app.initMoxtra();
                        if (callback != null)
                            callback();
                    }
                } catch (e) {
                    console.log(e);
                }
            }, 1000);
        }
    }

    /// Add email conent to binder
    app.addEmailTextToBinder = function() {

        getEmailBody(function(data) {
            if (!isNullOrWhitespace(data)) {
                var url = app.baseUrl + app.currenBinderId + "/comments?access_token=" + app.accessToken;
                $.postJSON(url, { text: data }, function(data) {});
            }
        });
    }

    /// Create new binder, invite users and add text
    app.newConversation = function(callback) {
        getSubject(function(subject) {

            if (isNullOrWhitespace(subject) === true)
                subject = "New Binder";

            // create binder


            getRecipients(function(emails) {
                if (emails.length != 0) {
                    $.postJSON(app.baseUrl + "me/binders?access_token=" + app.accessToken, { name: subject }, function(data) {
                        console.log("[app] newConversation");
                        var binderid = data.data.id;

                        // make user json object
                        var data = {
                            users: []
                        };

                        emails.forEach(function(email) {
                            data.users.push({ user: { email: email } });
                        });

                        // invite people
                        $.postJSON(app.baseUrl + binderid + "/inviteuser?access_token=" + app.accessToken, data, function(inviteResponse) {

                            // insert chat content
                            //getEmailBody(function (data) {
                            //    var url = app.baseUrl + binderid + "/comments?access_token=" + app.accessToken;
                            //    $.postJSON(url, { text: data }, function (data) { });

                            //    // call back
                            callback(binderid);
                            //});
                        });
                    });
                } else {
                    $("#errorMessage").show();
                    setTimeout(function() { $("#errorMessage").hide(); }, 8000);
                }
            });


        });
    }

    app.scheduleMeet = function(meetTitle, startDateTime, endDateTime, agenda, emails, callback) {

        getEmailBody(function(data) {
            var url = app.baseUrl + "meets/schedule?access_token=" + app.accessToken;
            $.postJSON(url, { name: meetTitle, start_time: startDateTime, end_time: endDateTime, agenda: agenda, email_off: true }, function(data) {
                console.log("Schedule POST");
                console.log(data);
                callback(data);
            });
        });
    }

    app.addMeetToCalendar = function(meetData, emails, start, end) {
        Office.context.mailbox.displayNewAppointmentForm({
            requiredAttendees: emails.split(","),
            start: start,
            end: end,
            subject: meetData.data.binder_name,
            body: JSON.stringify(meetData)
        });
    }

    app.createMeetingInExchange = function(meetData, emails, agenda, start, end, callback) {
        var soapRequest = createAppointment(meetData, emails, agenda, start, end);
        Office.context.mailbox.makeEwsRequestAsync(soapRequest, callback);

    }

    function createAppointment(meetData, emails, agenda, start, end) {

        var attendies = "";
        emails.split(",").forEach(function(email) {
            attendies = attendies + '<Attendee>' +
                '<Mailbox>' +
                '<EmailAddress>' + email + '</EmailAddress>' +
                '</Mailbox>' +
                '</Attendee>';
        });
        console.log("Emails in Tags = " + attendies);

        var result = '<?xml version="1.0" encoding="utf-8"?>' +
            '<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"' +
            ' xmlns:xsd="http://www.w3.org/2001/XMLSchema"' +
            ' xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"' +
            ' xmlns:t="http://schemas.microsoft.com/exchange/services/2006/types">' +
            '  <soap:Header>' +
            '    <RequestServerVersion Version="Exchange2013" xmlns="http://schemas.microsoft.com/exchange/services/2006/types" soap:mustUnderstand="0" />' +
            '  </soap:Header>' +
            '<soap:Body>' +
            '<CreateItem xmlns="http://schemas.microsoft.com/exchange/services/2006/messages"' +
            ' xmlns:t="http://schemas.microsoft.com/exchange/services/2006/types"' +
            ' SendMeetingInvitations="SendToAllAndSaveCopy" >' +
            '<SavedItemFolderId>' +
            '<t:DistinguishedFolderId Id="calendar"/>' +
            '</SavedItemFolderId>' +
            '<Items>' +
            '<t:CalendarItem xmlns="http://schemas.microsoft.com/exchange/services/2006/types">' +
            '<Subject>' + meetData.data.binder_name + '</Subject>' +
            '<Body BodyType="HTML">' + agenda + '</Body>' +
            '<ReminderIsSet>true</ReminderIsSet>' +
            '<ReminderMinutesBeforeStart>60</ReminderMinutesBeforeStart>' +
            '<Start>' + start.toISOString() + '</Start>' +
            '<End>' + end.toISOString() + '</End>' +
            '<IsAllDayEvent>false</IsAllDayEvent>' +
            '<LegacyFreeBusyStatus>Busy</LegacyFreeBusyStatus>' +
            '<Location>' + meetData.data.startmeet_url + '</Location>' +
            '<RequiredAttendees>' +
            attendies +
            '</RequiredAttendees>' +
            '</t:CalendarItem>' +
            '</Items>' +
            '</CreateItem>' +
            '</soap:Body>' +
            '</soap:Envelope>';
        return result;
    }

    function getEmailBody(callback) {
        Office.cast.item.toItemCompose(Office.context.mailbox.item).body.getAsync("text", { asyncContext: "addEmailTextToBinder" }, function(result) {
            callback(result.value);
        });
    }

    app.getSubject = getSubject;

    function getSubject(callback) {
        Office.cast.item.toItemCompose(Office.context.mailbox.item).subject.getAsync(function(result) {
            callback(result.value);
        });
    }

    function isNullOrWhitespace(input) {

        if (typeof input === 'undefined' || input == null) return true;

        return input.replace(/\s/g, '').length < 1;
    }

    var moxtraEmailFix = function(emailsArray) {
        var dnameVal = Office.context.mailbox.userProfile.emailAddress;
        var upperCaseNames = emailsArray.map(function(value) {
            return value.toUpperCase();
        });
        var pos = upperCaseNames.indexOf(dnameVal.toUpperCase());

        if (pos === -1) {
            // console.log("Nothing to fix in emails");
        } else {
            console.log("Fix emails " + dnameVal + " > " + app.moxtraEmail);

            emailsArray.splice(pos, 1);
            pos = upperCaseNames.indexOf(app.moxtraEmail.toUpperCase());
            if (pos === -1) {
                emailsArray.push(app.moxtraEmail);
            }
        }

        return emailsArray;
    };
    app.moxtraEmailFix = moxtraEmailFix;

    var moxtraEmailFix2 = function(emailsArray) {
        var dnameVal = Office.context.mailbox.userProfile.emailAddress;
        var upperCaseNames = emailsArray.map(function(value) {
            return value.toUpperCase();
        });
        var pos = upperCaseNames.indexOf(dnameVal.toUpperCase());

        if (pos === -1) {
            // console.log("Nothing to fix in emails");
        } else {
            console.log("Fix emails " + dnameVal + " > " + app.moxtraEmail);

            emailsArray.splice(pos, 1);
        }


        return emailsArray;
    };

    app.moxtraEmailFix2 = moxtraEmailFix2;

    app.getRecipients = getRecipients;

    function getRecipients(callback) {
        var emails = [];
        // Get TO emails
        Office.cast.item.toItemCompose(Office.context.mailbox.item).to.getAsync(function(todata) {
            // Get CC emails
            Office.cast.item.toItemCompose(Office.context.mailbox.item).cc.getAsync(function(ccdata) {
                // Get BCC emails
                Office.cast.item.toItemCompose(Office.context.mailbox.item).bcc.getAsync(function(bccdata) {
                    bccdata.value.forEach(function(recepient) {
                        emails.push(recepient.emailAddress);
                    });

                    var cleanupEmails = moxtraEmailFix(emails);
                    callback(cleanupEmails);

                });
                ccdata.value.forEach(function(recepient) {
                    emails.push(recepient.emailAddress);
                });
            });

            todata.value.forEach(function(recepient) {
                emails.push(recepient.emailAddress);
            });

        });
    }

    app.getRecipientsWithoutMoxtraEmail = getRecipientsWithoutMoxtraEmail;

    function getRecipientsWithoutMoxtraEmail(callback) {

        var emails = [];
        // Get TO emails
        Office.cast.item.toItemCompose(Office.context.mailbox.item).to.getAsync(function(todata) {
            // Get CC emails
            Office.cast.item.toItemCompose(Office.context.mailbox.item).cc.getAsync(function(ccdata) {
                // Get BCC emails
                Office.cast.item.toItemCompose(Office.context.mailbox.item).bcc.getAsync(function(bccdata) {
                    bccdata.value.forEach(function(recepient) {
                        emails.push(recepient.emailAddress);
                    });

                    var cleanupEmails = moxtraEmailFix(emails);
                    callback(cleanupEmails);

                });
                ccdata.value.forEach(function(recepient) {
                    emails.push(recepient.emailAddress);
                });
            });

            todata.value.forEach(function(recepient) {
                emails.push(recepient.emailAddress);
            });

        });
    }



    app.ShowChatView = function(binderId) {
        console.log("Starting chat with : " + binderId);
        $("#chatview").empty();
        var options = {
            binder_id: binderId,
            iframe: true,
            border: false,
            tagid4iframe: "chatview",
            autostart_note: false,
            iframewidth: "100%",
            iframeheight: "100%",
            scroll: true,
            //start_chat: function (event) {
            //    alert("ChatView started session Id: " + event.session_id);
            //},
            //request_note: function (event) {
            //    alert("Note start request");
            //},
            error: function(event) {
                alert("ChatView error code: " + event.error_code + " error message: " + event.error_message);
            }
        };
        Moxtra.chatView(options);
    }

    app.ShowPageView = function(binderId) {
        console.log("Starting page with : " + binderId);
        $("#pageview").empty();
        var options = {
            binder_id: binderId,
            iframe: true,
            border: false,
            tagid4iframe: "pageview",
            iframewidth: "100%",
            iframeheight: "100%",
            scroll: true,
            //start_page: function (event) {
            //    alert("PageView started session Id: " + event.session_id);
            //},
            //share: function (event) {
            //    alert("Share session Id: " + event.session_id + " binder Id: " + event.binder_id + " page Ids: " + event.page_id);
            //},
            error: function(event) {
                alert("PageView error code: " + event.error_code + " error message: " + event.error_message);
            }
        };
        Moxtra.pageView(options);
    }

    app.ShowTodoView = function(binderId) {
        $("#todoview").empty();
        var options = {
            binder_id: binderId,
            iframe: true,
            tagid4iframe: "todoview",
            border: false,
            iframewidth: "100%",
            iframeheight: "100%",
            scroll: true,
            //start_todo: function (event) {
            //    alert("TodoView started session Id: " + event.session_id);
            //},
            error: function(event) {
                alert("Todo error code: " + event.error_code + " error message: " + event.error_message);
            }
        };
        Moxtra.todoView(options);
    }

    /// This function gets all the binders for the user and the emails specified in the list of email addresses (emails)
    app.GetMyBinders = function(callback) {
        $.get(app.baseUrl + "me/binders?access_token=" + app.accessToken, function(data) {
            console.log("[app] GetMyBinders");
            callback(data);
        });
    }


    // Common initialization function (to be called from each page)
    app.initialize = function() {
        $('body').append(
            '<div id="notification-message">' +
            '<div class="padding">' +
            '<div id="notification-message-close"></div>' +
            '<div id="notification-message-header"></div>' +
            '<div id="notification-message-body"></div>' +
            '</div>' +
            '</div>');

        $('#notification-message-close').click(function() {
            $('#notification-message').hide();
        });


        // After initialization, expose a common notification function
        app.showNotification = function(header, text) {
            $('#notification-message-header').text(header);
            $('#notification-message-body').text(text);
            $('#notification-message').slideDown('fast');
        };
    };

    return app;
})();
