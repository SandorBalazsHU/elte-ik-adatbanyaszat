function addObject(newObject) {
    chrome.storage.local.get({api_responses: []}, function(data) {
        var api_responses = data.api_responses;
        api_responses.push(newObject);
        chrome.storage.local.set({api_responses: api_responses});
    });
}

function process_req(api_url, selectionText, type) {
  const startTime = Date.now();
  fetch(api_url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ text: selectionText })
    })
    .then(response => response.json())
    .then(data => {
      const endTime = Date.now();
      const responseTime = endTime - startTime;
      data.type = type;
      data.ping = responseTime;
      //console.log(data);
      addObject(data);
    })
    .catch(error => {
      console.error('Error:', error);
  });
}


chrome.runtime.onInstalled.addListener(function() {
    chrome.contextMenus.create({
      id: "summary",
      title: "Give summary",
      contexts: ["selection"]
    });
    chrome.contextMenus.create({
        id: "keywords",
        title: "Give keywords",
        contexts: ["selection"]
    });
    chrome.contextMenus.create({
        id: "title",
        title: "Give a title",
        contexts: ["selection"]
    });
    chrome.contextMenus.create({
        id: "count",
        title: "Count tokens",
        contexts: ["selection"]
    });
  });
  
  chrome.contextMenus.onClicked.addListener(function(info, tab) {
    if (info.menuItemId === "summary") {
        const selectionText = info.selectionText;
        process_req("http://127.0.0.1:5000/sum", selectionText, "sum");
    }
    if (info.menuItemId === "keywords") {
        const selectionText = info.selectionText;
        process_req("http://127.0.0.1:5000/key", selectionText, "key");
    }
    if (info.menuItemId === "title") {
        const selectionText = info.selectionText;
        process_req("http://127.0.0.1:5000/title", selectionText, "title");
    }
    if (info.menuItemId === "count") {
        const selectionText = info.selectionText;
        process_req("http://127.0.0.1:5000/length", selectionText, "length");
    }
    chrome.sidePanel.open({ windowId: tab.windowId });
  });