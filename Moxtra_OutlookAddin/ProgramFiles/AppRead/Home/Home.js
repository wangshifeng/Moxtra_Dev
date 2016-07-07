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
        console.log('load binders')
        try {
            $('#waitspin').css('display', 'block');
            $('#binderList').hide();
            $('#newConvMsg').css('display', 'none');
    
            // get the recepients and fetch common binders
            app.getRecipients(function (emails) {
                // Get Common Binders
                app.GetCommonBinders(emails, function (data) {
                    $('#binderListul').empty();
                    $('#binderList').hide();
    
                    //                                console.log('binders:' + JSON.stringify(data.data));
    
                    if (data.data.binders == undefined || data.data.binders == null || data.data.binders.length == 0) {
                        $('#waitspin').css('display', 'none');
                        $('#shared-binder-panel').hide();
                        $('#newConvMsg').css('display', '');
                        $('#binderListul').hide();
                        $("#collapse2").addClass('in');
                    } else {
                        $('#waitspin').css('display', 'none');
                        $('#shared-binder-panel').show();
                        $('#newConvMsg').css('display', 'none');
    
                        // $('#binderListul').append('<li class="list-group-item" style="padding:5px 15px">Shared Binders</li>');
                        $('#binderList').show();
                        data.data.binders.forEach(function (binder) {
    
                            var bindername = binder.binder.name;
                            if (bindername.length > 38) {
                                bindername = bindername.slice(0, 35) + '...'
                            }
                            // bindername = bindername.slice(0,30);
                            //                        console.log(bindername)
                            $('#binderListul').append('<li class="list-group-item share-binder-item" data-id="' + binder.binder.id + '" data-email="' + binder.binder.binder_email +
                                '"<div class="media">' +
                                '<div class="media-left">' +
                                '<img class="binder-thumbnail" src="' + binder.binder.thumbnail_uri + '" alt="' + bindername + '"/>' +
                                '</div>' +
                                '<div class="media-body"><div class="binder-name">' + bindername + '</div></div>' +
                                '<div class="media-right" >' +
                                // '<button class="share-binder-item-email" data-email="' + binder.binder.binder_email + '" data-id="' + binder.binder.id + '" style="padding: 0;border: none;background: none;">' +
                                // '<img src="images/copytobinder.svg" class="blbtn" title="Add Email Content"/>' +
                                // '</button>' +
                                '</div>' +
                                '</div>' +
                                '</li>');
    
                        });
                    }
    
                    $('#binderListul>li').click(function () {
                        console.log('click on one');
                        app.currentBinderID = $(this).data("id");
    
                        $("#firstPage").hide();
                        $("#binderList").hide();
                        $("#tabs").show();
    
                        app.ShowChatView(app.currentBinderID);
                        app.ShowPageView(app.currentBinderID);
                        app.ShowMeetView(app.currentBinderID);
                        app.ShowTodoView(app.currentBinderID);
                    })
                    
    				$("#bindersearch").keyup(function () {
    				            if ($(this).val()) {
    				                $("#shared-binder-panel").hide();
    				                $("#collapse2").addClass('in');
    				            } else {
    				                if ($('#binderListul>li').length) {
    				                    $("#shared-binder-panel").show();
    				                    $("#collapse2").removeClass('in');
    				                } else {
    				
    				                }
    				
    				            }
    				        })
    
                    // $('#addEmailTextToBinder').click(function(){
                    //     app.addEmailTextToBinder($(this).data('email'));
                    // })
    
    
                });
    
    
    
                // Get All Binders
                app.GetAllBinders(emails, function (data) {
                    $('#allbinderListul').empty();
                    $('#allbinderList').hide();
    
                    //                                console.log('binders:' + JSON.stringify(data.data));
    
                    if (data.data.binders == undefined || data.data.binders == null || data.data.binders.length == 0) {
    
                        $('#allbinderList').hide();
                    } else {
    
    
                        $('#allbinderList').show();
                        data.data.binders.forEach(function (binder) {
    
                            var bindername = binder.binder.name;
                            if (bindername.length > 40) {
                                bindername = bindername.slice(0, 38) + '...'
                            }
                            // bindername = bindername.slice(0,30);
                            //                        console.log(bindername)
                            $('#allbinderListul').append('<li class="list-group-item share-binder-item" data-id="' + binder.binder.id + '" data-email="' + binder.binder.binder_email +
                                '"<div class="media">' +
                                '<div class="media-left">' +
                                '<img class="binder-thumbnail" src="' + binder.binder.thumbnail_uri + '" alt="' + bindername + '"/>' +
                                '</div>' +
                                '<div class="media-body"><div class="binder-name">' + bindername + '</div></div>' +
                                '<div class="media-right" >' +
                                // '<button class="share-binder-item-email" data-email="' + binder.binder.binder_email + '" data-id="' + binder.binder.id + '" style="padding: 0;border: none;background: none;">' +
                                // '<img src="images/copytobinder.svg" class="blbtn" title="Add Email Content"/>' +
                                // '</button>' +
                                '</div>' +
                                '</div>' +
                                '</li>');
    
                        });
                    }
    
                    $('#allbinderListul>li').click(function () {
                        console.log('click on all');
                        app.currentBinderID = $(this).data("id");
    
                        $("#firstPage").hide();
                        $("#binderList").hide();
                        $("#tabs").show();
    
                        app.ShowChatView(app.currentBinderID);
                        app.ShowPageView(app.currentBinderID);
                        app.ShowMeetView(app.currentBinderID);
                        app.ShowTodoView(app.currentBinderID);
                    })
    
                    var listoptions = {
                        valueNames: ['binder-name']
                    };
                    accordion = new List('accordion', listoptions)
    
    
    
    
    
                });
    
    
    
            });
        } catch (e) {
            console.log("moxtra error loadBinders");
            console.log(e);
        }
    
    }
})();