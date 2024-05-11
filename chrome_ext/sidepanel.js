document.addEventListener('DOMContentLoaded', function() {

    chrome.storage.local.get('api_responses', function(data) {
        var objects = data.api_responses || [];
        var resultDiv = document.getElementById('result');
        for (let i = objects.length - 1; i >= 0; i--) {
            var pTag = document.createElement('p');
            pTag.innerHTML  = `Response ${i + 1}: <br> ${objects[i].response}`;
            resultDiv.appendChild(pTag);
        };
    });

    const deleteButton = document.getElementById('deleteButton');
    deleteButton.addEventListener('click', function() {
      chrome.storage.local.clear();
    });
});