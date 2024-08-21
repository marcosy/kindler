function run() {
    getGospel("2024-08-21")
}

function getGospel(dateString) {
    httpGet(`https://publication.evangelizo.ws/SP/days/${dateString}?from=gospelComponent`)
    .then(data => {
        document.writeln(data.data.readings[2].text)
    })
}

async function httpGet(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Network response was not ok ${response.statusText}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Got error while fetching:', error)
    }
}

run()