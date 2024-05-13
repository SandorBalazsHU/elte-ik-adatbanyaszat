document.addEventListener('DOMContentLoaded', function() {

    chrome.storage.local.get('api_responses', function(data) {
        var objects = data.api_responses || [];
        var resultDiv = document.getElementById('result');
        for (let i = objects.length - 1; i >= 0; i--) {
            var pTag = document.createElement('p');
            pTag.classList.add("responseListItem");
            pTag.innerHTML  = `<u><b>Response ${i + 1}:</b></u> [ task: ${objects[i].type}, ping: ${objects[i].ping}ms ] <br> ${objects[i].response}<hr>`;
            resultDiv.appendChild(pTag);
        };
    });

    const deleteButton = document.getElementById('deleteButton');
    deleteButton.addEventListener('click', function() {
      chrome.storage.local.clear();
    });
});