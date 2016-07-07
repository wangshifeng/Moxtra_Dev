/* Common app functionality */
/* Common app functionality */

var app = (function () {
    "use strict";

    var app = {};

    // Production
    app.baseUrl = "https://api.moxtra.com/v1/";
    var redirectUrl = "https://www.moxtra1.com/tony/outlook/AppRead/Home/logincallback.php";
    app.mode = "production";
    app.clientId = "tZOSN9fcNEo";
    app.binderEmailSuffix = "@moxtra.me";
    app.oAuthBaseUrl = "https://api.moxtra.com/oauth/authorize?client_id=";
    app.moxtraEmail = "";

    //// Development / Sandbox
    //app.baseUrl = "https://apisandbox.moxtra.com/v1/";
    //app.mode = "sandbox";
    //app.clientId = "kCAEwyu0OrE";
    //app.binderEmailSuffix = "@sandbox.moxtra.me";
    //app.oAuthBaseUrl = "https://apisandbox.moxtra.com/oauth/authorize?client_id=";
    //var redirectUrl = "https://localhost:44300/AppCompose/Home/logincallback.html";
	
	// Verify invalid token - 0608
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
	                console.log('verifydata'+data);
	                    if (data.contains("incorrect token")) {
	                    	console.log('incorrect token');
	                    	$("#firstPage").hide();
	                    	$("#binderList").hide();
	                    	$("#tabs").hide();
	                    	$("#loginPage").hide();
	                        localStorage.removeItem("tokenci");
	                    }
	                } catch (e) {
	
	                } 
	            },
	            'async': false
	        });
	
	        request.error(function (httpObj, textStatus) {
	            console.log("Ajax Error : " + httpObj.status);
	            if (httpObj.status === 401) {
	                $("#firstPage").hide();
	                $("#binderList").hide();
	                $("#tabs").hide();
	                $("#loginPage").hide();
	                localStorage.removeItem("tokenci");
	                //app.loginAndInitMoxtra();
	            }
	        });
	    }


    app.initMoxtra = function () {
        // Authenticate
        app.VerifyToken();
        var accessToken = localStorage.getItem("tokenci");
        $(".logoutbtn").show();
        app.accessToken = accessToken;
        var options = {
            mode: app.mode, //for production environment change to "production"
            client_id: app.clientId,
            access_token: accessToken, //valid access token from user authentication
            invalid_token: function (event) {
                //alert("Access Token expired for session id: " + event.session_id);
                localStorage.removeItem("tokenci");
                //app.loginAndInitMoxtra();
            }
        };

        if (!String.prototype.startsWith) {
            String.prototype.startsWith = function (searchString, position) {
                position = position || 0;
                return this.substr(position, searchString.length) === searchString;
            };
        }

        $(document).ajaxError(function (event, jqxhr, settings, exception) {
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
        Moxtra.init(options);

        $.getSync = function (url, callback) {
            var request = $.ajax({
                'type': 'GET',
                'url': url,
                'contentType': 'application/json',
                'dataType': 'json',
                'success': callback,
                'async': false
            });

            request.error(function (httpObj, textStatus) {
                console.log("Ajax Error : " + httpObj.status);
                if (httpObj.status === 401) {
                    localStorage.removeItem("tokenci");
                    //app.loginAndInitMoxtra();
                }
            });
        };

        app.getSelfEmail = function () {
            try {
                if (app.accessToken == null)
                    app.accessToken = localStorage.getItem("tokenci");

                var url = app.baseUrl + "me?access_token=" + app.accessToken;
                console.log(url);
                $.getSync(url, function (data) {
                    //console.log(data);
                    app.moxtraEmail = data.data.email;
                    //console.log(app.moxtraEmail);
                });
            } catch (e) {

            }
        }

        $.postJSON = function (url, data, callback) {
            return jQuery.ajax({
                'type': 'POST',
                'url': url,
                'contentType': 'application/json',
                'data': JSON.stringify(data),
                'dataType': 'json',
                'success': callback
            });
        };



        String.prototype.endsWith = function (suffix) {
            return this.indexOf(suffix, this.length - suffix.length) !== -1;
        };

        if (!String.prototype.encodeHTML) {
            String.prototype.encodeHTML = function () {
                return this.replace(/&/g, '&amp;')
                           .replace(/</g, '&lt;')
                           .replace(/>/g, '&gt;')
                           .replace(/"/g, '&quot;')
                           .replace(/'/g, '&apos;');
            };
        }

        if (!Array.prototype.clean) {
            Array.prototype.clean = function (deleteValue) {
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

    app.PopupCenter = function (url, title, w, h) {
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
    app.GetCommonBinders = function (emails, callback) {
        //console.log("[app] GetCommonBinders");
        //console.log("[app] for emails");
        //console.log(emails);
        if (app.accessToken == null) {
            try {
                app.accessToken = localStorage.getItem("tokenci");
                app.getSelfEmail();
            } catch (e) {

            }

        }

        if (app.accessToken == null) {
            window.location.reload(false);
        }

        if (emails.length > 0) {
            var url = app.baseUrl + "me/binders?access_token=" + app.accessToken + "&filter=all&emails=" + emails.join();
            //console.log(url);
            var request = $.get(url, function (data) {
                //console.log(data);
                request.success(function () {
                    // it worked fine!
                });

                request.error(function (httpObj, textStatus) {
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
    
    app.GetAllBinders = function (emails, callback) {
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
                }
                //		if (emails == null){
                //			setInterval(function(){
                //				window.location.reload(false);
                //			},3000)
                //		}
    
                var url = app.baseUrl + "me/binders?access_token=" + app.accessToken + "&filter=all&sort=feeds";
                console.log(url);
                var request = $.get(url, function (data) {
                    //console.log(data);
                    request.success(function () {
                        // it worked fine!
                    });
    
                    request.error(function (httpObj, textStatus) {
                        //console.log("Not logged in");
                        if (httpObj.status == 401) {
                            //localStorage.removeItem("tokenci");
                            //app.loginAndInitMoxtra();
                        }
                    });
    
                    callback(data);
                });
    
            }

    /// Create new binder, invite users and add text
    app.newConversation = function (callback) {
        var subject = getSubject();

        if (isNullOrWhitespace(subject) === true)
            subject = "New Binder";

        // create binder
        $.postJSON(app.baseUrl + "me/binders?access_token=" + app.accessToken, { name: subject }, function (data) {
            //console.log("[app] newConversation");
            var binderid = data.data.id;

            getRecipients(function (emails) {

                // make user json object
                var data = {
                    users: []
                };

                emails.forEach(function (email) {
                    data.users.push({ user: { email: email } });
                });

                // invite people
                $.postJSON(app.baseUrl + binderid + "/inviteuser?access_token=" + app.accessToken, data, function (inviteResponse) {

                    //// insert chat content -- commented because we send out email
                    //getEmailBody(function (data) {
                    //    var url = app.baseUrl + binderid + "/comments?access_token=" + app.accessToken;
                    //    $.postJSON(url, { text: data }, function (data) { });

                    //    // call back
                    //    callback(binderid);
                    //});
                    getBinderDetails(binderid, function (binderDetails) {
                        console.log(binderDetails);
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
        console.log(url);
        $.get(url, function (data) {
            //console.log(data);
            callback(data);
        });
    }

    app.addEmailTextToBinder = function () {

        //getEmailBody(function (data) {
        //    if (!isNullOrWhitespace(data)) {
        //        var url = app.baseUrl + app.currenBinderId + "/comments?access_token=" + app.accessToken;
        //        $.postJSON(url, { text: data }, function (data) { });
        //    }
        //});
		if (app.currenBinderId == undefined)
		    return;
		showSpinner();
		
        getBinderDetails(app.currenBinderId, function (binderDetails) {
            //console.log(binderDetails);
            // forward email
            forwardEmail(binderDetails.data.binder_email, function (dataEws) {
                console.log(dataEws);
                // call back
            });
        });
    }

    app.scheduleMeet = function (meetTitle, startDateTime, endDateTime, agenda, emails, callback) {

        getEmailBody(function (data) {
            var url = app.baseUrl + "meets/schedule?access_token=" + app.accessToken;
            $.postJSON(url, { name: meetTitle, start_time: startDateTime, end_time: endDateTime, agenda: agenda, email_off: true }, function (data) {
                //console.log("Schedule POST");
                //console.log(data);
                callback(data);
            });
        });
    }

    app.addMeetToCalendar = function (meetData, emails, start, end) {
        Office.context.mailbox.displayNewAppointmentForm(
          {
              requiredAttendees: emails.split(","),
              start: start,
              end: end,
              subject: meetData.data.binder_name,
              body: JSON.stringify(meetData)
          });
    }

    app.createMeetingInExchange = function (meetData, emails, agenda, start, end, callback) {
        var soapRequest = createAppointment(meetData, emails, agenda, start, end);
        Office.context.mailbox.makeEwsRequestAsync(soapRequest, callback);

    }

    function isNullOrWhitespace(input) {

        if (typeof input === 'undefined' || input == null) return true;

        return input.replace(/\s/g, '').length < 1;
    }

    var moxtraEmailFix = function (emailsArray) {
        var dnameVal = Office.context.mailbox.userProfile.emailAddress;
        var upperCaseNames = emailsArray.map(function (value) {
            return value.toUpperCase();
        });
        var pos = upperCaseNames.indexOf(dnameVal.toUpperCase());

        if (pos === -1) {
            //console.log("Nothing to fix in emails");
        }
        else {
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

    var moxtraEmailFix2 = function (emailsArray) {
        var dnameVal = Office.context.mailbox.userProfile.emailAddress;
        var upperCaseNames = emailsArray.map(function (value) {
            return value.toUpperCase();
        });
        var pos = upperCaseNames.indexOf(dnameVal.toUpperCase());

        if (pos === -1) {
            console.log("Nothing to fix in emails");
        }
        else {
            console.log("Fix emails " + dnameVal + " > " + app.moxtraEmail);

            emailsArray.splice(pos, 1);
        }

        return emailsArray;
    };
    app.moxtraEmailFix2 = moxtraEmailFix2;



    app.getRecipients = getRecipients;
    function getRecipients(callback) {

        var emails = [];

        // Get sender emails
        console.log("Sender: " + Office.context.mailbox.item.sender.emailAddress);
        emails.push(Office.context.mailbox.item.sender.emailAddress);

        // Get TO emails
        Office.context.mailbox.item.to.forEach(function (ccitem) {
            emails.push(ccitem.emailAddress);

        });
        //  console.log("TO: " + emails.join());


        // Get CC emails
        Office.context.mailbox.item.cc.forEach(function (ccitem) {
            emails.push(ccitem.emailAddress);

        });

        //console.log("CC: " + emails.join());
        var cleanupEmails = moxtraEmailFix(emails);
        callback(cleanupEmails);
    }

    app.getRecipientsWithoutMoxtraEmail = getRecipientsWithoutMoxtraEmail;
    function getRecipientsWithoutMoxtraEmail(callback) {

        var emails = [];

        // Get sender emails
        //console.log("Sender: " + Office.context.mailbox.item.sender.emailAddress);
        emails.push(Office.context.mailbox.item.sender.emailAddress);

        // Get TO emails
        Office.context.mailbox.item.to.forEach(function (ccitem) {
            emails.push(ccitem.emailAddress);

        });
        //console.log("TO: " + emails.join());


        // Get CC emails
        Office.context.mailbox.item.cc.forEach(function (ccitem) {
            emails.push(ccitem.emailAddress);

        });

        //console.log("CC: " + emails.join());
        var cleanupEmails = moxtraEmailFix2(emails);
        callback(cleanupEmails);
    }



    // Variables that we'll use to communicate with EWS
    var item_id;
    var mailbox;

    // This function handles the click event of the sendNow button.
    // It retrieves the current mail item, so that we can get its itemId property.
    // It also retrieves the mailbox, so that we can make an EWS request
    // to get more properties of the item. In our case, we are interested in the ChangeKey
    // property, becuase we need that to forward a mail item.
    function forwardEmail(binderEmailAddress, callback) {

        app.currentBinderEmailAddress = binderEmailAddress;
        console.log("Current Binder Email: " + app.currentBinderEmailAddress);

        if (!binderEmailAddress.endsWith("moxtra.me")) {
            app.currentBinderEmailAddress = binderEmailAddress + app.binderEmailSuffix;
            console.log("Updated Binder Email: " + app.currentBinderEmailAddress);
        }

        app.currentBinderCallback = callback;

        var item = Office.context.mailbox.item;
        item_id = item.itemId;
        mailbox = Office.context.mailbox;

        // The following string is a valid SOAP envelope and request for getting the properties
        // of a mail item. Note that we use the item_id value (which we obtained above) to specify the item
        // we are interested in.
        var soapToGetItemData = '<?xml version="1.0" encoding="utf-8"?>' +
            '<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"' +
            '               xmlns:m="http://schemas.microsoft.com/exchange/services/2006/messages"' +
            '               xmlns:xsd="http://www.w3.org/2001/XMLSchema"' +
            '               xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"' +
            '               xmlns:t="http://schemas.microsoft.com/exchange/services/2006/types">' +
            '  <soap:Header>' +
            '    <RequestServerVersion Version="Exchange2013" xmlns="http://schemas.microsoft.com/exchange/services/2006/types" soap:mustUnderstand="0" />' +
            '  </soap:Header>' +
            '  <soap:Body>' +
            '    <GetItem' +
            '                xmlns="http://schemas.microsoft.com/exchange/services/2006/messages"' +
            '                xmlns:t="http://schemas.microsoft.com/exchange/services/2006/types">' +
            '      <ItemShape>' +
            '        <t:BaseShape>IdOnly</t:BaseShape>' +
            '      </ItemShape>' +
            '      <ItemIds>' +
            '        <t:ItemId Id="' + item_id + '"/>' +
            '      </ItemIds>' +
            '    </GetItem>' +
            '  </soap:Body>' +
            '</soap:Envelope>';

        // The makeEwsRequestAsync method accepts a string of SOAP and a callback function
        mailbox.makeEwsRequestAsync(soapToGetItemData, soapToGetItemDataCallback);
    }

    // This function is the callback for the makeEwsRequestAsync method
    // In brief, it first checks for an error repsonse, but if all is OK
    // it then parses the XML repsonse to extract the ChangeKey attribute of the 
    // t:ItemId element.
    function soapToGetItemDataCallback(asyncResult) {
        var parser;
        var xmlDoc;

        if (asyncResult.error != null) {
            app.showNotification("EWS Status", asyncResult.error.message);
        }
        else {
            var response = asyncResult.value;
            if (window.DOMParser) {
                console.log("DOMParser available");
                var parser = new DOMParser();
                //parser.namespaceManager.addNamespace("m", "http://schemas.microsoft.com/exchange/services/2006/messages");
                //parser.namespaceManager.addNamespace("t", "http://schemas.microsoft.com/exchange/services/2006/types");
                xmlDoc = parser.parseFromString(response, "text/xml");
            }
            else // Older Versions of Internet Explorer
            {
                console.log("DOMParser NOT available / Older Versions of Internet Explorer");

                xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
                xmlDoc.async = false;
                xmlDoc.loadXML(response);
            }
            console.log(response);
            console.log(xmlDoc.getElementsByTagNameNS("http://schemas.microsoft.com/exchange/services/2006/types", "ItemId").length);
            var changeKey = xmlDoc.getElementsByTagNameNS("http://schemas.microsoft.com/exchange/services/2006/types", "ItemId")[0].getAttribute("ChangeKey");

            // Now that we have a ChangeKey value, we can use EWS to forward the mail item.
            // The first thing we'll do is get an array of email addresses that the user
            // has typed into the To: text box.
            // We'll also get the comment that the user may have provided in the Comment: text box.
            var toAddresses = app.currentBinderEmailAddress;
            var addresses = toAddresses.split(";");
            var addressesSoap = "";

            // The following loop build an XML fragment that we will insert into the SOAP message
            for (var address = 0; address < addresses.length; address++) {
                addressesSoap += "<t:Mailbox><t:EmailAddress>" + addresses[address] + "</t:EmailAddress></t:Mailbox>";
            }
            var comment = getSubject();

            var attachments = [];

            // Check and get attachments
            if (Office.context.mailbox.item.attachments == undefined) {
                console.log("Not supported - Attachments are not supported by your Exchange server.");
            } else if (Office.context.mailbox.item.attachments.length == 0) {
                console.log("No attachments - There are no attachments on this item.");
            } else {

                // Initalize a context object for the app.
                //   Set the fields that are used on the request
                //   object to default values.
                attachments = new Array();
            }

            // The following string is a valid SOAP envelope and request for forwarding
            // a mail item. Note that we use the item_id value (which we obtained in the click event handler)
            // to specify the item we are interested in,
            // along with its ChangeKey value that we have just determined near the top of this function.
            // We also provide the XML fragment that we built in the loop above to specify the recipient addresses,
            // and the comment that the user may have provided in the Comment: text box
            var soapToForwardItem = '<?xml version="1.0" encoding="utf-8"?>' +
                '<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"' +
                '               xmlns:m="http://schemas.microsoft.com/exchange/services/2006/messages"' +
                '               xmlns:xsd="http://www.w3.org/2001/XMLSchema"' +
                '               xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"' +
                '               xmlns:t="http://schemas.microsoft.com/exchange/services/2006/types">' +
                '  <soap:Header>' +
                '    <RequestServerVersion Version="Exchange2013" xmlns="http://schemas.microsoft.com/exchange/services/2006/types" soap:mustUnderstand="0" />' +
                '  </soap:Header>' +
                '  <soap:Body>' +
                '    <m:CreateItem MessageDisposition="SendOnly">' +
                '      <m:Items>' +
                '        <t:ForwardItem>' +
                '          <t:ToRecipients>' + addressesSoap + '</t:ToRecipients>' +
                '          <t:ReferenceItemId Id="' + item_id + '" ChangeKey="' + changeKey + '" />' +
                '          <t:NewBodyContent BodyType="Text">' + comment + '</t:NewBodyContent>' +
                '        </t:ForwardItem>' +
                '      </m:Items>' +
                '    </m:CreateItem>' +
                '  </soap:Body>' +
                '</soap:Envelope>';

            // As before, the makeEwsRequestAsync method accepts a string of SOAP and a callback function.
            // The only difference this time is that the body of the SOAP message requests that the item
            // be forwarded (rather than retrieved as in the previous method call)
            mailbox.makeEwsRequestAsync(soapToForwardItem, soapToForwardItemCallback);
        }
    }

    // This function is the callback for the above makeEwsRequestAsync method
    // In brief, it first checks for an error repsonse, but if all is OK
    // it then parses the XML repsonse to extract the m:ResponseCode value.
    function soapToForwardItemCallback(asyncResult) {
        var parser;
        var xmlDoc;

        if (asyncResult.error != null) {
            app.showNotification("EWS Status", asyncResult.error.message);
        }
        else {
            var response = asyncResult.value;
            if (window.DOMParser) {
                parser = new DOMParser();
                xmlDoc = parser.parseFromString(response, "text/xml");
            }
            else // Older Versions of Internet Explorer
            {
                xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
                xmlDoc.async = false;
                xmlDoc.loadXML(response);
            }

            // Get the required response, and if it's NoError then all has succeeded, so tell the user.
            // Otherwise, tell them what the problem was. (E.G. Recipient email addresses might have been
            // entered incorrectly --- try it and see for yourself what happens!!)
            var result = xmlDoc.getElementsByTagNameNS("http://schemas.microsoft.com/exchange/services/2006/messages", "ResponseCode")[0].textContent;
            if (result == "NoError") {
                //app.showNotification("EWS Status", "Success!");
                console.log("Email forwarded to Moxtra Binder");
                app.currentBinderCallback(result);
            }
            else {
                console.log("Email could NOT be forwarded to Moxtra Binder");
                app.currentBinderCallback(result);
                //app.showNotification("EWS Status", "The following error code was recieved: " + result);
            }
        }
    }


    function createAppointment(meetData, emails, agenda, start, end) {

        var attendies = "";
        emails.split(",").forEach(function (email) {
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

    app.getSubject = getSubject;
    function getSubject() {
        return Office.context.mailbox.item.subject;
    }

    function getEmailBody(callback) {
        Office.context.mailbox.item.body.getAsync("text", { asyncContext: "addEmailTextToBinder" }, function (result) {
            callback(result.value);
        });
    }

    /// oAuth flow and then init Moxtra JS SDK
    app.loginAndInitMoxtra = function (callback) {
        console.log("[app] loginAndInitMoxtra");

        var clientId = app.clientId;

        var oauthUrl = app.oAuthBaseUrl + clientId + "&redirect_uri=" + redirectUrl + "&response_type=token";

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
        if(is_explorer){
        	var win = app.PopupCenter(oauthUrl, "Moxtra-oAuth", 500, 500);
	            var pollTimer = window.setInterval(function () {
	                if (win != undefined || win != null) {
	                console.log('115');
	                    if (win.closed !== false) { // !== is required for compatibility with Opera
	                    	console.log('116');
	                        window.clearInterval(pollTimer);
	                        		app.initMoxtra();
		                            if (callback)
		                                callback();
		                        
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
        }
        
        else if (!is_safari) {
        console.log('111');
            var win = app.PopupCenter(oauthUrl, "Moxtra-oAuth", 500, 500);
            var pollTimer = window.setInterval(function () {
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
            var pollTimersafari = window.setInterval(function () {
                try {
                    // We open a popup window and let the user authenticate
                    // we poll if the window url has changed and has a access token
                    if (winsafari.location.href.indexOf("#access_token") !== -1) {

                        window.clearInterval(pollTimersafari);
                        var url = winsafari.location.href;
                        var parts = url.split("#")[1].split("&");

                        // Parse and save access token
                        console.log(parts[0].split("=")[1]);
                        localStorage.setItem("tokenci", parts[0].split("=")[1]);
                        app.accessToken = localStorage.getItem("tokenci");
                        console.log('localtoken'+app.accessToken);
                        winsafari.close();

                        app.initMoxtra();
                        if (callback != null)
                            callback();
                    }
                } catch (e) {
                    console.log(e);
                }
            }, 5000);
        }

        //var winoauth = window.open(oauthUrl, "window2", 'width=500,height=500,centerscreen=1,menubar=0,toolbar=0,location=0,personalbar=0,status=0,titlebar=0,dialog=1');
        //var isFirefox = typeof InstallTrigger !== 'undefined';
        //if (isFirefox) {
        //    var retry = true;

        //    do {
        //        try {
        //            if (winoauth.document.URL.length > 0) {
        //                retry = false;
        //            }
        //        } catch (e) {
        //            winoauth.close();
        //            winoauth = window.open(oauthUrl, "window2", 'width=500,height=500,centerscreen=1,menubar=0,toolbar=0,location=0,personalbar=0,status=0,titlebar=0,dialog=1');
        //        }
        //    } while (retry === true)
        //}


        //var pollTimer = window.setInterval(function () {
        //    try {
        //        // We open a popup window and let the user authenticate
        //        // we poll if the window url has changed and has a access token

        //        console.log(winoauth.location.href);

        //        if (winoauth.closed) {
        //            window.clearInterval(pollTimer);
        //            app.initMoxtra();
        //            callback();
        //        }
        //    } catch (e) {
        //        console.log(e);
        //        //localStorage.removeItem("tokenci");
        //    }
        //}, 1000);
    }

    app.ShowChatView = function (binderId) {
        console.log("Starting chat with : " + binderId);
        app.currenBinderId = binderId;
        $("#chatview").empty();
        var options = {
            binder_id: binderId,
            iframe: true,
            border: true,
            tagid4iframe: "chatview",
            autostart_note: false,
            iframewidth: "100%",
            iframeheight: "350px",
            //scroll: false,
            //start_chat: function (event) {
            //    alert("ChatView started session Id: " + event.session_id);
            //},
            //request_note: function (event) {
            //    alert("Note start request");
            //},
            error: function (event) {
                alert("ChatView error code: " + event.error_code + " error message: " + event.error_message);
            }
        };
        Moxtra.chatView(options);
    }

    app.ShowPageView = function (binderId) {
        $("#profile").empty();

        var options = {
            binder_id: binderId,
            iframe: true,
            border: true,
            tagid4iframe: "profile",
            iframewidth: "100%",
            iframeheight: "350px",
            //scroll: true,
            //start_page: function (event) {
            //    alert("PageView started session Id: " + event.session_id);
            //},
            //share: function (event) {
            //    alert("Share session Id: " + event.session_id + " binder Id: " + event.binder_id + " page Ids: " + event.page_id);
            //},
            error: function (event) {
                alert("PageView error code: " + event.error_code + " error message: " + event.error_message);
            }
        };
        Moxtra.pageView(options);
    }

    app.ShowMeetView = function (binderId) {
        $("#messages").empty();
        var options = {
            binder_id: binderId,
            invite_members: true,
            autostart_meet: true,
            schedule_meet: true,
            iframe: true,
            tagid4iframe: "messages",
            border: true,
            iframewidth: "100%",
            iframeheight: "350px",
            extension: { "show_dialogs": { "meet_invite": true } },
            video: true,
            //scroll: true,
            //start_meetview: function (event) {
            //    alert("MeetView started session Id: " + event.session_id);
            //},
            //start_meet: function (event) {
            //    alert("Meet started session key: " + event.session_key +
            //                   " session id: " + event.session_id + " binder id: " + event.binder_id);
            //},
            //end_meet: function (event) {
            //    alert("Meet end event");
            //},
            error: function (event) {
                alert("MeetView error code: " + event.error_code + " error message: " + event.error_message);
            }
        };
        Moxtra.meetView(options);
    }
    app.ShowTodoView = function (binderId) {
        $("#todos").empty();
        var options = {
            binder_id: binderId,
            iframe: true,
            tagid4iframe: "todos",
            border: true,
            iframewidth: "100%",
            iframeheight: "350px",
            //scroll: true,
            //start_todo: function (event) {
            //    alert("TodoView started session Id: " + event.session_id);
            //},
            error: function (event) {
                alert("Todo error code: " + event.error_code + " error message: " + event.error_message);
            }
        };
        Moxtra.todoView(options);
    }

    /// This function gets all the binders for the user and the emails specified in the list of email addresses (emails)
    app.GetMyBinders = function (callback) {
        $.get(app.baseUrl + "me/binders?access_token=" + app.accessToken, function (data) {
            console.log("[app] GetMyBinders");
            callback(data);
        });
    }


    // Common initialization function (to be called from each page)
    app.initialize = function () {
        $('body').append(
            '<div id="notification-message">' +
                '<div class="padding">' +
                    '<div id="notification-message-close"></div>' +
                    '<div id="notification-message-header"></div>' +
                    '<div id="notification-message-body"></div>' +
                '</div>' +
            '</div>');

        $('#notification-message-close').click(function () {
            $('#notification-message').hide();
        });


        // After initialization, expose a common notification function
        app.showNotification = function (header, text) {
            $('#notification-message-header').text(header);
            $('#notification-message-body').text(text);
            $('#notification-message').slideDown('fast');
        };
    };

    return app;
})();