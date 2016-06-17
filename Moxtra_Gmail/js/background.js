//chrome.runtime.onMessage.addListener(function(response, sender, sendResponse){
//    alert(response)
//})
//
//var hosts = 'https://moxtra1.com';

chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
  if (request.localstorage) {
    if (typeof request.value != 'undefined') {
      localStorage[request.localstorage] = request.value;
    }
    sendResponse({localstorage: localStorage[request.localstorage]});
  } else {
    sendResponse({});
  }
});

chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
  if (request.sessionstorage) {
    if (typeof request.value != 'undefined') {
      sessionStorage[request.sessionstorage] = request.value;
    }
    sendResponse({sessionstorage: sessionStorage[request.sessionstorage]});
  } else {
    sendResponse({});
  }
});
