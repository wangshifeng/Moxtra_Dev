InboxSDK.load('1', 'sdk_moxtraforgmail_754811953b').then(function (sdk) {
    // the SDK has been loaded, now do something with it!
    sdk.Conversations.registerThreadViewHandler(function (ThreadView) {
        //        console.log(MessageView.getSender());
        //        console.log(MessageView.getRecipients());
        console.log('ThreadView Initiated');
        var el = document.createElement("div");
        var moxtraurl = chrome.extension.getURL('gmail/login.html')
            //        console.log(moxtraurl)
        el.innerHTML = '<iframe id="moxtraframe" src="' + moxtraurl + '" style="width:460px;border:1px solid #d7d7d7;border-top-color:transparent;height:550px"></iframe>';

        ThreadView.addSidebarContentPanel({
            title: 'Moxtra for Gmail',
            el: el,
            iconUrl: 'https://moxtra1.com/tony/gmail/images/icon16.png'
        })
        var subject = ThreadView.getSubject();
        console.log('subject:' + subject)
        localStorage.setItem('moxtragmailsubject', subject);
        chrome.extension.sendRequest({
            storage: 'subject',
            value: subject
        });
    });

    sdk.Conversations.registerMessageViewHandler(function (messageView) {
        console.log('MessageView Initiated');
        var sender =  messageView.getSender().emailAddress;
        var recipients = messageView.getRecipients();
        var mailbody =  messageView.getBodyElement().innerHTML;
        var subject = chrome.extension.sendRequest({storage: 'subject'});

        var emaillist = composeRecipients(sender, recipients);
        var moxtraurl = chrome.extension.getURL('gmail/login.html')
            //                console.log('sender:'+ sender + ' | recipients:' +recipients);

//        localStorage.setItem('emailslist', emaillist);
//        localStorage.setItem('mailbody', mailbody);
//        localStorage.setItem('subject', subject);
//        localStorage.setItem('sender', sender);
        chrome.extension.sendRequest({storage: 'emailslist', value: emaillist});
        chrome.extension.sendRequest({storage: 'mailbody', value: mailbody});
        chrome.extension.sendRequest({storage: 'subject', value: subject});
        chrome.extension.sendRequest({storage: 'sender', value: sender});

        console.log('message view complete')

    })

    //    console.log('current user:' + sdk.User.getEmailAddress());
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