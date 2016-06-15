/// <reference path="../App.js" />

(function () {
    'use strict';

    // The initialize function must be run each time a new page is loaded
    Office.initialize = function (reason) {
        $(document).ready(function () {
        
        	console.log('current email'+ Office.context.mailbox.userProfile.emailAddress);
        	var currentuser = Office.context.mailbox.userProfile.emailAddress;
        	if (localStorage.getItem('tokenci')&&sessionStorage.getItem('user') && (currentuser != sessionStorage.getItem('user'))) {
        	        sessionStorage.setItem('user', currentuser);
        	        localStorage.removeItem('tokenci');
        	        window.location.reload(false);
        	        console.log('user changed')
        	    } else {
        	        sessionStorage.setItem('user', currentuser);
        	    }

            try {
                // initialize office JS
                app.initialize();

                // Do we have an access token from before
                var token = localStorage.getItem("tokenci");
                console.log(token);
                if (token == undefined || token == null) {
                    // we do not have an access token! Lets get one
                    //app.loginAndInitMoxtra(function() {
                    //    loadBinders();
                    //});
                }
                else {
                    // we have a access token so we just get started
                    app.initMoxtra();
                }
                if (token != undefined && token != null) {
                    //console.log(Office.context.mailbox.userProfile.emailAddress);

                    app.loadBinders();
                }
            } catch (e) {
                console.log("moxtra error Office.initialize");
                console.log(e);
            } 
          

        });
    };

    //function getRecipients(callback) {

    //    var emails = [];

    //    // Get sender emails
    //    console.log("Sender: " + Office.context.mailbox.item.sender.emailAddress);
    //    emails.push(Office.context.mailbox.item.sender.emailAddress);

    //    // Get TO emails
    //    Office.context.mailbox.item.to.forEach(function (ccitem) {
    //        emails.push(ccitem.emailAddress);

    //    });
    //    console.log("TO: " + emails.join());


    //    // Get CC emails
    //    Office.context.mailbox.item.cc.forEach(function (ccitem) {
    //        emails.push(ccitem.emailAddress);

    //    });

    //    console.log("CC: " + emails.join());

    //    var cleanedUp = app.moxtraEmailFix(emails);
    //    callback(cleanedUp);
    //}       

    app.loadBinders = loadBinders;
    function loadBinders() {
        try {
            $('#waitspin').css('display', 'block');
            $('#binderList').hide();
            $('#newConvMsg').css('visibility', 'collapse');
            $('.logoutbtn').show();

            // get the recepients and fetch common binders
            app.getRecipients(function (emails) {
                //console.log(emails);
                app.GetCommonBinders(emails, function (data) {
                    $('#binderListul').empty();
                    $('#binderList').hide();

                    //console.log(data.data.binders);

                    if (data.data.binders == undefined || data.data.binders == null || data.data.binders.length == 0) {
                        $('#waitspin').css('display', 'none');

                        $('#newConvMsg').css('visibility', 'visible');
                        $('#binderList').hide();
                    } else {
                        $('#waitspin').css('display', 'none');

                        $('#newConvMsg').css('visibility', 'collapse');

                        $('#binderListul').append('<li class="list-group-item" style="padding:5px 15px">Shared Binders</li>');
                        $('#binderList').show();
                        data.data.binders.forEach(function (binder) {


                             $('#binderListul').append('<li class="list-group-item share-binder-item" onclick="openBinder(\'' + binder.binder.id + '\',false)">' +
                                '<div class="media">' + 
                                  '<div class="media-left">' +
                                        '<img class="binder-thumbnail" src="' + binder.binder.thumbnail_uri + '" alt="' + binder.binder.name + '"/>' +
                                   '</div>' + 
                                   '<div class="media-body"><div class="binder-name">' + binder.binder.name + '</div></div>' +
                                   '<div class="media-right" >' +
                                        '<button onclick="openBinder(\'' + binder.binder.id + '\',true)" style="padding: 0;border: none;background: none;">' +
                                        '<img src="../../Images/copytobinder.png"  title="Add Email Content"/>' +
                                        '</button>' +
                                    '</div>' +  
                                '</div>' +
                               '</li>' );

                        });
                    }
                });
            });
        } catch (e) {
            console.log("moxtra error loadBinders");
            console.log(e);
        } 
       
    }
})();