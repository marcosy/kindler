// Utils
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

function getCurrentDate() {
    var today = new Date();
    var year = today.getFullYear();
    var month = padZero(today.getMonth() + 1); // Months are zero-based
    var day = padZero(today.getDate());
    return year + '-' + month + '-' + day;
}

function padZero(num) {
    return num < 10 ? '0' + num : num;
}