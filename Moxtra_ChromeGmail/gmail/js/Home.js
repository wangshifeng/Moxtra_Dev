/// <reference path="../App.js" />


// The initialize function must be run each time a new page is loaded
var formValidator = null;
$(document).ready(function() {

    document.getElementById('loginbtn').addEventListener('click', function() {
        app.loginAndInitMoxtra(function() {
            onStart();
        });
    })

    document.getElementById('new_conversation').addEventListener('click', function() {
        new_conversation();
    });

    document.getElementById('start_meet').addEventListener('click', function() {
        start_meet();
    })

    document.getElementById('logout').addEventListener('click', function() {
        logout();
    })

    $('#addEmailTextToBinder').click(function() {

        addEmailTextToBinder($(this).data('email'));
    })

    document.getElementById('goToBinderList').addEventListener('click', function() {
        goToBinderList();
    })

    function updateTab(url, tab) {
        if (url.indexOf("tab=tab_") > -1) {
            url = url.split("tab=tab_")[0] + "tab=tab_" + tab;
            return url;
        } else {
            url = url + "&tab=tab_" + tab;
            return url;
        }
    }

    document.getElementById('meettab').addEventListener('click', function() {
        $("#chatfull").find("iframe")[0].src = updateTab($("#chatfull").find("iframe")[0].src, "meet")
    })
    document.getElementById('chattab').addEventListener('click', function() {
        $("#chatfull").find("iframe")[0].src = updateTab($("#chatfull").find("iframe")[0].src, "chat")
    })
    document.getElementById('todotab').addEventListener('click', function() {
        $("#chatfull").find("iframe")[0].src = updateTab($("#chatfull").find("iframe")[0].src, "todo")
    })
    document.getElementById('pagestab').addEventListener('click', function() {
        $("#chatfull").find("iframe")[0].src = updateTab($("#chatfull").find("iframe")[0].src, "pages")
    })






    $("#scheduleMeet").hide();
    try {
        // Do we have an access token from before
        var token = localStorage.getItem("tokenci");
        //console.log(token);
        if (token == undefined || token == null) {
            $("#firstPage").hide();
            $("#binderList").hide();
            $("#tabs").hide();
            $("#loginPage").show();
        } else {
            $("#loginPage").hide();
            $("#firstPage").show();
            $("#tabs").hide();
        }

        $("#tabs").hide();

        $("#binderList").on("mouseover", "li", function() {
            $(this).find("img").last().addClass('hover');
            $(this).find("button").last().addClass('hover');
        });

        $("#binderList").on("mouseout", "li", function() {
            $(this).find("img").last().removeClass('hover');
            $(this).find("button").last().removeClass('hover');
        });
        $("#bindersearch").keyup(function() {
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
    } catch (e) {
        console.log(e);
    }

    try {

        // Do we have an access token from before
        if (localStorage.getItem('userchanged') == '1') {
            localStorage.removeItem('tokenci');
            localStorage.setItem('userchanged', '0')
            window.location.reload('false')
        }
        var token = localStorage.getItem("tokenci");
        //        console.log(token);
        if (token == undefined || token == null) {
            // we do not have an access token! Lets get one
            //app.loginAndInitMoxtra(function() {
            //    loadBinders();
            //});
        } else {
            // we have a access token so we just get started
            app.initMoxtra();
            app.loadBinders();
        }
        if (token != undefined && token != null) {
            //console.log(Office.context.mailbox.userProfile.emailAddress);

            //                    app.loadBinders();
        }
    } catch (e) {
        console.log("moxtra error Office.initialize");
        console.log(e);
    }


});



function onStart() {
    try {
        $("#loginPage").hide();
        $("#firstPage").show();
        $("#tabs").hide();
        app.loadBinders();
    } catch (e) {

    }

}




function openBinder(binderId, email) {
    //console.log("Starting chat with : " + binderId);
    app.currenBinderId = binderId;

    $("#firstPage").hide();
    $("#binderList").hide();
    $("#tabs").show();
    app.ShowChatFull(binderId);

    if (email) {
        addEmailTextToBinder(email);
    }



};



function goToBinderList() {
    $("#firstPage").show();
    $("#binderList").show();
    $("#tabs").hide();
    app.loadBinders();
}

var showSpinner = function() {
    $("#spinner").attr("src", "images/sending.gif");
    $('#addEmailTextToBinder').addClass('notActive');
    setTimeout(hide, 5000); // 5 seconds
};

var hide = function() {
    $("#spinner").attr("src", "images/copytobinder.svg");
    $('#addEmailTextToBinder').removeClass('notActive');

}

function addEmailTextToBinder(email) {
    if (email == undefined)
        return;
    showSpinner();
    app.addEmailTextToBinder(email);
}

function logout() {
    localStorage.removeItem('tokenci');
    window.location.reload(false);
}

function start_meet() {
    app.getRecipients(function(emails) {
        var meet_options = {
            //iframe: true, //To open the meet in the same window within an iFrame.
            tab: true, //To open the meet in a new browser tab, N/A if iframe option is set to true.
            //tagid4iframe: "meet-container", //ID of the HTML tag within which the Meet window will show up. Refer https://developer.grouphour.com/moxo/docs-js-sdk/#meet
            //iframewidth: "1000px",
            //iframeheight: "750px",
            extension: {
                "show_dialogs": {
                    "meet_invite": true
                }
            },
            start_meet: function(event) {
                console.log("Meet Started - session_id: " + event.session_id + "session_key: " + event.session_key);
                //Your application server can upload files to meet using the session_id and session_key
            },
            email: emails,
            error: function(event) {
                console.log("error code: " + event.error_code + " message: " + event.error_message);
            },
            end_meet: function(event) {
                console.log("Meet Ended");
            },
            video: true
        };
        Moxtra.meet(meet_options);
    });
}

function new_conversation() {
    //console.log("new conversation");
    app.newConversation(function(binderid) {
        openBinder(binderid, false);
    });
}


function parseDate(dateAsString) {
    return new Date(dateAsString.replace(/-/g, '/'));
}


app.loadBinders = loadBinders;

function loadBinders() {
    try {
        $('#waitspin').css('display', 'block');
        $('#binderList').hide();
        $('#newConvMsg').css('display', 'none');

        // get the recepients and fetch common binders
        app.getRecipients(function(emails) {
            // Get Common Binders
            app.GetCommonBinders(emails, function(data) {
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
                    data.data.binders.forEach(function(binder) {

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

                $('#binderListul>li').click(function() {
                    app.currentBinderID = $(this).data("id");

                    $("#firstPage").hide();
                    $("#binderList").hide();
                    $("#tabs").show();

                    app.ShowChatFull(app.currentBinderID);
                    $('#addEmailTextToBinder').data('email', $(this).data('email'));
                })


                // $('#addEmailTextToBinder').click(function(){
                //     app.addEmailTextToBinder($(this).data('email'));
                // })


            });



            // Get All Binders
            app.GetAllBinders(emails, function(data) {
                $('#allbinderListul').empty();
                $('#allbinderList').hide();

                // console.log('binders:' + JSON.stringify(data.data));

                if (data.data.binders == undefined || data.data.binders == null || data.data.binders.length == 0) {

                    $('#allbinderList').hide();
                } else {


                    $('#allbinderList').show();
                    data.data.binders.forEach(function(binder) {

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

                $('#allbinderListul>li').click(function() {
                    app.currentBinderID = $(this).data("id");

                    $("#firstPage").hide();
                    $("#binderList").hide();
                    $("#tabs").show();

                    app.ShowChatFull(app.currentBinderID);

                    $('#addEmailTextToBinder').data('email', $(this).data('email'));
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
