function run() {
    getGospel("2024-08-21");
}

function getGospel(dateString) {
    httpGet('https://publication.evangelizo.ws/SP/days/' + dateString + '?from=gospelComponent')
    .then(function(data) {
        document.writeln(data.data.readings[2].text);
    });
}

function httpGet(url) {
    return new Promise(function(resolve, reject) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    try {
                        var data = JSON.parse(xhr.responseText);
                        resolve(data);
                    } catch (e) {
                        reject(e);
                    }
                } else {
                    reject(new Error('Network response was not ok ' + xhr.statusText));
                }
            }
        };
        xhr.onerror = function() {
            reject(new Error('Network request failed'));
        };
        xhr.send();
    });
}

run();