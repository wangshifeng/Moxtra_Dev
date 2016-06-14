InboxSDK.load('1', 'sdk_moxtraforgmail_754811953b').then(function (sdk) {
    // the SDK has been loaded, now do something with it!
    sdk.Conversations.registerThreadViewHandler(function (ThreadView) {
        //        console.log(MessageView.getSender());
        //        console.log(MessageView.getRecipients());
        var el = document.createElement("div");
        el.innerHTML = '<iframe id="moxtraframe" src="chrome-extension://hngbggjcofcgnaoapfmagkafnkgdldpa/gmail/login.html" style="width:460px;border:1px solid #d7d7d7;border-top-color:transparent;height:550px"></iframe>';


        //                var iframe = document.createElement('iframe');
        //                iframe.src = chrome.runtime.getURL('gmail/login.html');
        //                iframe.id = 'moxtratopframe';
        //                iframe.style.cssText = 'width:460px;border:1px solid #d7d7d7;border-top-color:transparent;height:600px'
        ThreadView.addSidebarContentPanel({
            title: 'Moxtra for Gmail',
            el: el,
            iconUrl: 'https://moxtra1.com/tony/gmail/images/icon16.png'
        })
        var subject = ThreadView.getSubject();
        localStorage.setItem('moxtragmailsubject', subject);
        //        var messageViews = ThreadView.getMessageViews();
        //        
        //        console.log(messageViews.getSender);
    });

    sdk.Conversations.registerMessageViewHandler(function (messageView) {
        var sender = 'sd' + messageView.getSender().emailAddress;
        var recipients = messageView.getRecipients();
        var mailbody = 'mb' + messageView.getBodyElement().innerHTML;
        var subject = 'sj' + localStorage.getItem('moxtragmailsubject');
        var emaillist = 'el' + composeRecipients(sender.substr(2), recipients);
                console.log('sender:'+ sender + ' | recipients:' +recipients);

        //        console.log(mailbody);
        document.getElementById('moxtraframe').addEventListener("load", function () {
            console.log('frameloaded');
            var moxtraframe = document.getElementById("moxtraframe").contentWindow
            moxtraframe.postMessage(
                emaillist, "chrome-extension://hngbggjcofcgnaoapfmagkafnkgdldpa/*"
            );

            setTimeout(function () {
                moxtraframe.postMessage(
                    mailbody, "chrome-extension://hngbggjcofcgnaoapfmagkafnkgdldpa/*"
                );
                moxtraframe.postMessage(
                    sender, "chrome-extension://hngbggjcofcgnaoapfmagkafnkgdldpa/*"
                );
                moxtraframe.postMessage(
                    subject, "chrome-extension://hngbggjcofcgnaoapfmagkafnkgdldpa/*"
                );
            }, 1000);
        })

        console.log('message view complete')

    })

    console.log('current user:' + sdk.User.getEmailAddress());
    currentuser = sdk.User.getEmailAddress()

    if (sessionStorage.getItem('user') && (currentuser != sessionStorage.getItem('user'))) {
        sessionStorage.setItem('user', currentuser);
        console.log('user changed')
    } else {
        sessionStorage.setItem('user', currentuser);
    }

    function composeRecipients(sender, recipients) {
        var emails = [];

        emails.push(sender);
        recipients.forEach(function (recipientsitem) {
            emails.push(recipientsitem.emailAddress)
        })

        return emails;
    }
    //    sdk.Conversations.registerMessageViewHandlerAll(messageView => {
    //    if (messageView.isLoaded()) {
    //      console.log(messageView.getSender());
    //    } else {
    //      messageView.on('load', () => {
    //        console.log(messageView.getSender());
    //      });
    //    }
    //  });

    //    sdk.Widgets.showMoleView({
    //        el:'hhh'
    //    })


});