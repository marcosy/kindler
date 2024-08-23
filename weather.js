var WEATHER = {
    url: 'https://api.open-meteo.com/v1/forecast?latitude=51.5085&longitude=-0.1257&hourly=apparent_temperature,precipitation_probability,wind_speed_10m&forecast_days=1',

    extract: function(){
        httpGet(this.url, this.transform)
    },

    transform: function(extracted) {
       
       this.body = "Max Apparent Temperature: " +  max(extracted.hourly.apparent_temperature) + "C</br>"
       this.body += "Min Apparent Temperature: " +  min(extracted.hourly.apparent_temperature) + "C</br>"
       this.body += "Max Precipitation Probability: " + max(extracted.hourly.precipitation_probability) + "%</br>"
       this.body += "Max Wind Speed: "+ max(extracted.hourly.wind_speed_10m)
       
                    
       this.header = 'Weather' +
                    " | " +
                    getCurrentDate()

       this.footer = 'Have a nice day!'

       // load
       writeToDiv('div-gospel-body', this.body);
       writeToDiv('div-gospel-header', this.header);
       writeToDiv('div-gospel-footer', this.footer);
    },
}

function max(numbers) {
   return Math.max.apply(null, numbers)
}
function min(numbers) {
    return Math.min.apply(null, numbers)
 }

// Main
WEATHER.extract();