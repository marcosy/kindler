function run() {
    getGospel("2024-08-21");
}

function getGospel(dateString) {
    httpGet('https://publication.evangelizo.ws/SP/days/' + dateString + '?from=gospelComponent', 
        function(data) {
            var gospelText = data.data.readings[2].text;
            gospelText = gospelText.replace(/\[\[.*?\]\]/g, ''); // Remove any text within [[...]]
            writeToDiv('div-gospel', gospelText);
        }
    );
}

function writeToDiv(divId, text) {
    var div = document.getElementById(divId);
    if (div) {
        div.innerHTML = text;
    } else {
        console.error('Div with id ' + divId + ' not found');
    }
}

function httpGet(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                try {
                    var data = JSON.parse(xhr.responseText);
                    callback(data);
                } catch (e) {
                    console.error('Error parsing JSON:', e);
                }
            } else {
                console.error('Network response was not ok ' + xhr.statusText);
            }
        }
    };
    xhr.onerror = function() {
        console.error('Network request failed');
    };
    xhr.send();
}

run();