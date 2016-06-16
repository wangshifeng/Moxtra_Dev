//chrome.runtime.onMessage.addListener(function(response, sender, sendResponse){
//    alert(response)
//})
//
//var hosts = 'https://moxtra1.com';

chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
  if (request.storage) {
    if (typeof request.value != 'undefined') {
      localStorage[request.storage] = request.value;
    }
    sendResponse({storage: localStorage[request.storage]});
  } else {
    sendResponse({});
  }
});