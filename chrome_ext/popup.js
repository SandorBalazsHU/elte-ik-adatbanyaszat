chrome.storage.local.get(['result'], function(result) {
    //document.getElementById('result').innerText = JSON.parse(result).result.response;
    document.getElementById('result').innerText = JSON.stringify(result, null, 2);
});