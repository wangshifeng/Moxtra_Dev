/// <reference path="../App.js" />
/// <reference path="C:\Projects\F_AllProjects\Moxtra\Moxtra\MoxtraWeb\Scripts/_officeintellisense.js" />

(function () {
    'use strict';

    // The initialize function must be run each time a new page is loaded
    Office.initialize = function (reason) {
        $(document).ready(function () {
        	//Detect user changes - 0608
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
            // initialize office JS
            app.initialize();

            // Do we have an access token from before
            var token = localStorage.getItem("tokenci");
            //console.log(token);
            if (token == undefined || token == null) {
                // we do not have an access token! Lets get one
                //app.loginAndInitMoxtra();
            }
            else {
                // we have a access token so we just get started
                app.initMoxtra();
            }

            app.pollRecepients();
        });
    };

    app.pollRecepients = function () {
        // get the recepients and fetch common binders
        var intervalTimer = setInterval(function () {

            getRecipients(function (emails) {

                if (emails.length == 0) {
                    $('#waitspin').hide();
                    $("#sharedBinders").hide();

                    $('#binderListul').empty();
                    $('#binderListul').append('<div style="width: 100%; height: 300px; margin-top: 80px; text-align: center; color: grey;"><h2>Start a New Conversation</h2><p>Click on the “New Conversation” button to start collaborating and communicating with others.</p></div>');

                    return;
                }

                console.log(emails);
                //$('#waitspin').show();

                app.GetCommonBinders(emails, function (data) {
                    $('#waitspin').hide();
                    $("#sharedBinders").hide();
                    $('#binderListul').empty();

                    // $('#binderListul').append('<div style="width: 100%; height: 300px; margin-top: 80px; text-align: center; color: grey;"><h2>Start a New Conversation</h2><p>Click on the “New Conversation” button to start collaborating and communicating with others.</p></div>');

                    console.log(data.data.binders);
                    if (data.data.binders == undefined || data.data.binders == null || data.data.binders.length == 0) {
                        //$("#sharedBinders").hide();
                        $('#binderListul').append('<div style="width: 100%; height: 300px; margin-top: 80px; text-align: center; color: grey;"><h2>Start a New Conversation</h2><p>Click on the “New Conversation” button to start collaborating and communicating with others.</p></div>');
                    } else {
                        //$("#sharedBinders").show();
                        $('#binderListul').empty();
                        $('#binderListul').append('<li class="list-group-item" style="padding:5px 15px">Shared Binders</li>');

                        data.data.binders.forEach(function (binder) {
                        	
                        	var bindername = binder.binder.name;
                        	if (bindername.length > 18) {
                        	    bindername = bindername.slice(0, 15) + '...'
                        	}

                             $('#binderListul').append('<li class="list-group-item share-binder-item" onclick="openBinder(\'' + binder.binder.id + '\',false)">' +
                                '<div class="media">' + 
                                  '<div class="media-left">' +
                                        '<img class="binder-thumbnail" src="' + binder.binder.thumbnail_uri + '" alt="' + bindername + '"/>' +
                                   '</div>' + 
                                   '<div class="media-body"><div class="binder-name" style="font-size:12px;max-width: 120px;">' + bindername + '</div></div>' +
                                   '<div class="media-right" >' +
                                        '<button onclick="openBinder(\'' + binder.binder.id + '\',true)" style="padding: 0;border: none;background: none;">' +
                                        '<img src="../../Images/copytobinder.svg" class="space2" title="Add Email Content"/>' +
                                        '</button>' +
                                    '</div>' +  
                                '</div>' +
                               '</li>' );

                        });

                    }
                });
            });
        }, 5000);
    }
    //function getRecipients(callback) {

    //    // Get TO emails
    //    Office.cast.item.toItemCompose(Office.context.mailbox.item).to.getAsync(function (data) {
    //        console.log(data);
    //        var emails = [];
    //        data.value.forEach(function (recepient) {
    //            //console.log(recepient.displayName);
    //            //console.log(recepient.emailAddress);

    //            emails.push(recepient.emailAddress);

    //            //if (emails.indexOf(recepient.emailAddress) == -1) {
    //            //    emails.push(recepient.emailAddress);
    //            //}
    //        });

    //        callback(emails);
    //    });

    //    // Get CC emails
    //    Office.cast.item.toItemCompose(Office.context.mailbox.item).cc.getAsync(function (data) {
    //        console.log(data);
    //        var emails = [];
    //        data.value.forEach(function (recepient) {
    //            emails.push(recepient.emailAddress);
    //        });

    //        callback(emails);

    //    });

    //    // Get BCC emails
    //    Office.cast.item.toItemCompose(Office.context.mailbox.item).bcc.getAsync(function (data) {
    //        console.log(data);
    //        var emails = [];
    //        data.value.forEach(function (recepient) {
    //            emails.push(recepient.emailAddress);
    //        });

    //        callback(emails);

    //    });
    //}



    function getRecipients(callback) {
        var emails = [];

        // Get TO emails
        Office.cast.item.toItemCompose(Office.context.mailbox.item).to.getAsync(function (todata) {
            // Get CC emails
            Office.cast.item.toItemCompose(Office.context.mailbox.item).cc.getAsync(function (ccdata) {
                // Get BCC emails
                Office.cast.item.toItemCompose(Office.context.mailbox.item).bcc.getAsync(function (bccdata) {
                    bccdata.value.forEach(function (recepient) {
                        emails.push(recepient.emailAddress);
                    });

                    var cleanedUp = app.moxtraEmailFix(emails)
                    callback(cleanedUp);

                });
                ccdata.value.forEach(function (recepient) {
                    emails.push(recepient.emailAddress);
                });
            });

            todata.value.forEach(function (recepient) {
                emails.push(recepient.emailAddress);
            });

        });
    }

    // Get the email addresses of all the recipients of the composed item.
    //function getRecipients(callback) {
    //    // Local objects to point to recipients of either
    //    // the appointment or message that is being composed.
    //    // bccRecipients applies to only messages, not appointments.
    //    var toRecipients, ccRecipients, bccRecipients;
    //    // Verify if the composed item is an appointment or message.
    //    if (item.itemType == Office.MailboxEnums.ItemType.Appointment) {
    //        toRecipients = item.requiredAttendees;
    //        ccRecipients = item.optionalAttendees;
    //    }
    //    else {
    //        toRecipients = item.to;
    //        ccRecipients = item.cc;
    //        bccRecipients = item.bcc;
    //    }

    //    // Use asynchronous method getAsync to get each type of recipients
    //    // of the composed item. Each time, this example passes an anonymous 
    //    // callback function that doesn't take any parameters.
    //    toRecipients.getAsync(function (asyncResult) {
    //        if (asyncResult.status == Office.AsyncResultStatus.Failed) {
    //            console.log(asyncResult.error.message);
    //        }
    //        else {
    //            // Async call to get to-recipients of the item completed.
    //            // Display the email addresses of the to-recipients. 
    //            console.log('To-recipients of the item:');
    //            console.log(asyncResult.value);
    //        }
    //    }); // End getAsync for to-recipients.

    //    // Get any cc-recipients.
    //    ccRecipients.getAsync(function (asyncResult) {
    //        if (asyncResult.status == Office.AsyncResultStatus.Failed) {
    //            write(asyncResult.error.message);
    //        }
    //        else {
    //            // Async call to get cc-recipients of the item completed.
    //            // Display the email addresses of the cc-recipients.
    //            console.log('Cc-recipients of the item:');
    //            console.log(asyncResult.value);
    //        }
    //    }); // End getAsync for cc-recipients.

    //    // If the item has the bcc field, i.e., item is message,
    //    // get any bcc-recipients.
    //    if (bccRecipients) {
    //        bccRecipients.getAsync(function (asyncResult) {
    //            if (asyncResult.status == Office.AsyncResultStatus.Failed) {
    //                console.log(asyncResult.error.message);
    //            }
    //            else {
    //                // Async call to get bcc-recipients of the item completed.
    //                // Display the email addresses of the bcc-recipients.
    //                console.log('Bcc-recipients of the item:');
    //                callback(asyncResult.value);
    //            }

    //        }); // End getAsync for bcc-recipients.
    //    }
    //}


    function getSubject() {
        Office.cast.item.toItemCompose(Office.context.mailbox.item).subject.getAsync(function (result) {
            app.showNotification('The current subject is', result.value);
        });
    }

    function addToRecipients() {
        var item = Office.context.mailbox.item;
        var addressToAdd = {
            displayName: Office.context.mailbox.userProfile.displayName,
            emailAddress: Office.context.mailbox.userProfile.emailAddress
        };

        if (item.itemType === Office.MailboxEnums.ItemType.Message) {
            Office.cast.item.toMessageCompose(item).to.addAsync([addressToAdd]);
        } else if (item.itemType === Office.MailboxEnums.ItemType.Appointment) {
            Office.cast.item.toAppointmentCompose(item).requiredAttendees.addAsync([addressToAdd]);
        }
    }

})();