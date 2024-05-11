function process_req(api_url, selectionText) {
    fetch(api_url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ text: selectionText })
      })
      .then(response => response.json())
      .then(data => {
        chrome.storage.local.set({result: data});
        chrome.action.setPopup({popup: "popup.html"});
        console.log(data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
}


chrome.runtime.onInstalled.addListener(function() {
    chrome.contextMenus.create({
      id: "sum",
      title: "Give summary",
      contexts: ["selection"]
    });
    chrome.contextMenus.create({
        id: "key",
        title: "Give keywords",
        contexts: ["selection"]
    });
    chrome.contextMenus.create({
        id: "title",
        title: "Give a title",
        contexts: ["selection"]
    });
    chrome.contextMenus.create({
        id: "length",
        title: "Count tokens",
        contexts: ["selection"]
    });
  });
  
  chrome.contextMenus.onClicked.addListener(function(info, tab) {
    if (info.menuItemId === "sum") {
      const selectionText = info.selectionText;
      process_req("http://127.0.0.1:5000/sum", selectionText);
    }
    if (info.menuItemId === "key") {
        const selectionText = info.selectionText;
        process_req("http://127.0.0.1:5000/key", selectionText);
    }
    if (info.menuItemId === "title") {
    const selectionText = info.selectionText;
    process_req("http://127.0.0.1:5000/title", selectionText);
    }
    if (info.menuItemId === "length") {
    const selectionText = info.selectionText;
    process_req("http://127.0.0.1:5000/length", selectionText);
    }
  });