chrome.runtime.onInstalled.addListener(function() {
    chrome.contextMenus.create({
      id: "sendToAPI",
      title: "Send Selection to API",
      contexts: ["selection"]
    });
  });
  
  chrome.contextMenus.onClicked.addListener(function(info, tab) {
    if (info.menuItemId === "sendToAPI") {
      const selectionText = info.selectionText;
      fetch('http://127.0.0.1:5000/sum', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ text: selectionText })
      })
      .then(response => response.json())
      .then(data => {
        console.log(data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
    }
  });
  
  chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action === "getSelection") {
      sendResponse({selection: window.getSelection().toString()});
    }
  });
  