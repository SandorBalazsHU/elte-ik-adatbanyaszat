chrome.storage.local.get(['api_response'], function(data) {
    //document.getElementById('result').innerText = JSON.parse(result).result.result;
    //document.getElementById('result').innerText = JSON.parse(result).result.result;
    //document.getElementById('result').innerText = JSON.stringify(result, null, 2);
    //document.getElementById('result').innerText = JSON.parse(api_response).result;
    //document.getElementById('result').innerText = JSON.stringify(api_response, null, 2);
    document.getElementById('result').innerText = data.api_response.response;
});